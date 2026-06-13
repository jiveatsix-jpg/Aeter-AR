import { useCallback, useEffect, useRef, useState } from "react"
import type { ArPhase } from "../types"
import { playChime, playCycleComplete, playSessionComplete } from "../lib/sound"

export const PHASE_COLORS = {
  inhalation: "border-cyan-400 text-cyan-400",
  "inhalación": "border-cyan-400 text-cyan-400",
  "inhalación máxima": "border-cyan-400 text-cyan-400",
  "inhalación relleno": "border-teal-400 text-teal-400",
  "inhalar izquierda": "border-cyan-400 text-cyan-400",
  "retención lleno": "border-amber-400 text-amber-400",
  "retención vacío": "border-slate-400 text-slate-400",
  exhalación: "border-violet-400 text-violet-400",
  "exhalación lenta": "border-violet-400 text-violet-400",
  "exhalación parcial": "border-violet-400 text-violet-400",
  "exhalación explosiva": "border-orange-400 text-orange-400",
  "exhalar derecha": "border-violet-400 text-violet-400",
  "pausa plena": "border-sky-300 text-sky-300",
  "pausa vacía": "border-slate-500 text-slate-500",
  "pausa máxima": "border-slate-500 text-slate-500",
  "pausa prn": "border-rose-400 text-rose-400",
  "respiraciones rápidas": "border-orange-400 text-orange-400",
  "vaciado total": "border-slate-500 text-slate-500",
  "recuperación": "border-emerald-400 text-emerald-400",
  repetición: "border-slate-500 text-slate-500",
  default: "border-blue-400 text-blue-400",
} as const

type PhaseName = keyof typeof PHASE_COLORS

export function getPhaseColor(name: string): string {
  const key = name.toLowerCase().trim() as PhaseName
  return PHASE_COLORS[key] ?? PHASE_COLORS.default
}

export function getPhaseScale(name: string, elapsed: number, total: number): number {
  const progress = total > 0 ? elapsed / total : 0
  const n = name.toLowerCase()

  if (n.includes("inhal")) return 0.7 + 0.3 * progress
  if (n.includes("exhal") && !n.includes("explosiva")) return 1.0 - 0.3 * progress
  if (n.includes("exhalación explosiva")) return 0.6 + 0.1 * Math.sin(elapsed * 10)
  if (n.includes("rete") || n.includes("paus") || n.includes("vac")) return 0.85 + 0.05 * Math.sin(elapsed * 2)
  if (n.includes("respira")) return 0.7 + 0.2 * Math.sin(elapsed * 4)

  return 0.85
}

export interface PhaseInfo {
  name: string
  index: number
  duration: number
}

export interface TimerState {
  phase: PhaseInfo
  cycle: number
  totalCycles: number
  elapsed: number
  running: boolean
  paused: boolean
  completed: boolean
}

function initialState(totalCycles: number): TimerState {
  return {
    phase: { name: "", index: 0, duration: 0 },
    cycle: 0,
    totalCycles,
    elapsed: 0,
    running: false,
    paused: false,
    completed: false,
  }
}

export function useBreathingTimer(phases: ArPhase[], totalCycles_: number, soundEnabled: boolean) {
  const timedPhases = phases.filter((p): p is ArPhase & { duration: number } => p.unit === "s" && p.duration > 0)
  const totalCycles = Math.max(1, totalCycles_)

  const [state, setState] = useState<TimerState>(initialState(totalCycles))

  const phaseIndexRef = useRef(0)
  const cycleRef = useRef(0)
  const runningRef = useRef(false)
  const pausedRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (tickRef.current) {
      clearInterval(tickRef.current)
      tickRef.current = null
    }
  }, [])

  const advance = useCallback(() => {
    if (!runningRef.current || pausedRef.current) return

    const nextIdx = phaseIndexRef.current + 1

    if (nextIdx >= timedPhases.length) {
      cycleRef.current += 1
      if (cycleRef.current >= totalCycles) {
        runningRef.current = false
        clearTimers()
        setState((prev) => ({ ...prev, running: false, paused: false, completed: true }))
        if (soundEnabled) playSessionComplete()
        return
      }
      phaseIndexRef.current = 0
      if (soundEnabled) playCycleComplete()
    } else {
      phaseIndexRef.current = nextIdx
      if (soundEnabled) playChime()
    }

    const p = timedPhases[phaseIndexRef.current]
    if (!p) {
      runningRef.current = false
      clearTimers()
      setState((prev) => ({ ...prev, running: false, paused: false, completed: true }))
      return
    }

    setState((prev) => ({
      ...prev,
      phase: { name: p.name, index: phaseIndexRef.current, duration: p.duration },
      cycle: cycleRef.current,
      elapsed: 0,
    }))

    timeoutRef.current = setTimeout(advance, p.duration * 1000)
  }, [timedPhases, totalCycles, soundEnabled, clearTimers])

  const start = useCallback(() => {
    if (timedPhases.length === 0) return
    clearTimers()

    phaseIndexRef.current = 0
    cycleRef.current = 0
    runningRef.current = true
    pausedRef.current = false

    const first = timedPhases[0]!
    setState({
      phase: { name: first.name, index: 0, duration: first.duration },
      cycle: 0,
      totalCycles,
      elapsed: 0,
      running: true,
      paused: false,
      completed: false,
    })

    tickRef.current = setInterval(() => {
      if (!runningRef.current) return
      setState((prev) => ({ ...prev, elapsed: prev.elapsed + 1 }))
    }, 1000)

    timeoutRef.current = setTimeout(advance, first.duration * 1000)
  }, [timedPhases, totalCycles, advance, clearTimers])

  const pause = useCallback(() => {
    runningRef.current = false
    pausedRef.current = true
    clearTimers()
    setState((prev) => ({ ...prev, running: false, paused: true }))
  }, [clearTimers])

  const resume = useCallback(() => {
    if (state.completed) return

    runningRef.current = true
    pausedRef.current = false
    setState((prev) => ({ ...prev, running: true, paused: false }))

    tickRef.current = setInterval(() => {
      if (!runningRef.current) return
      setState((prev) => ({ ...prev, elapsed: prev.elapsed + 1 }))
    }, 1000)

    const remaining = state.phase.duration - state.elapsed
    if (remaining > 0) {
      timeoutRef.current = setTimeout(advance, remaining * 1000)
    } else {
      advance()
    }
  }, [state.completed, state.phase.duration, state.elapsed, advance, clearTimers])

  const stop = useCallback(() => {
    runningRef.current = false
    pausedRef.current = false
    clearTimers()
    setState((prev) => ({ ...prev, running: false, paused: false, completed: true }))
  }, [clearTimers])

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])

  return { state, start, pause, resume, stop, timedPhases }
}
