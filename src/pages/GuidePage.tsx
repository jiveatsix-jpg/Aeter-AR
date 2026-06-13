import { useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ARS } from "../data/ars"
import { useBreathingTimer } from "../hooks/useBreathingTimer"
import { BreathingCircle } from "../components/BreathingCircle"
import { PhaseProgressBar } from "../components/PhaseProgressBar"
import { useSettingsStore, useHistoryStore } from "../store"

export function GuidePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const ar = [...ARS].find((a) => a.id.toLowerCase() === id?.toLowerCase())
  const soundEnabled = useSettingsStore((s) => s.settings.soundEnabled)

  if (!ar) return <p className="py-20 text-center text-slate-400">AR no encontrado</p>

  return (
    <GuideInner
      arId={ar.id}
      arName={ar.name}
      phases={ar.phases}
      soundEnabled={soundEnabled}
      navigate={navigate}
    />
  )
}

interface GuideInnerProps {
  arId: string
  arName: string
  phases: import("../types").ArPhase[]
  soundEnabled: boolean
  navigate: (path: string) => void
}

function GuideInner({ arId, arName, phases, soundEnabled, navigate }: GuideInnerProps) {
  const { state, start, pause, resume, stop, timedPhases } = useBreathingTimer(phases, 3, soundEnabled)
  const addEntry = useHistoryStore((s) => s.add)
  const savedRef = useRef(false)

  // Calculate total session duration: sum of all timed phases * total cycles
  const totalDuration = timedPhases.reduce((sum, p) => sum + p.duration, 0) * state.totalCycles

  // Save session once when transitioning to completed
  useEffect(() => {
    if (state.completed && !savedRef.current) {
      savedRef.current = true
      addEntry({
        id: crypto.randomUUID(),
        arId,
        date: new Date().toISOString(),
        duration: timedPhases.reduce((sum, p) => sum + p.duration, 0) * state.cycle,
        cyclesCompleted: state.cycle,
        notes: "",
      })
    }
  }, [state.completed, state.cycle, arId, timedPhases, addEntry])

  // Reset save flag when starting a new session
  const handleStart = () => {
    savedRef.current = false
    start()
  }

  if (timedPhases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-slate-400">Este AR no tiene fases temporizadas</p>
        <button
          onClick={() => navigate(`/ar/${arId.toLowerCase()}`)}
          className="text-sm text-slate-500 underline hover:text-white"
        >
          Volver al detalle
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl font-bold">{arName}</h1>
        <p className="text-sm text-slate-500">
          {state.completed
            ? "Sesión completada"
            : state.running
              ? `Ciclo ${state.cycle + 1} de ${state.totalCycles}`
              : state.paused
                ? "En pausa"
                : `${state.totalCycles} ciclos · ${totalDuration}s`}
        </p>
      </div>

      {/* Circle */}
      <BreathingCircle
        phaseName={state.phase.name}
        elapsed={state.elapsed}
        total={state.phase.duration}
      />

      {/* Phase progress */}
      <PhaseProgressBar
        phases={phases}
        currentIndex={state.phase.index}
        cycle={state.cycle}
        totalCycles={state.totalCycles}
        running={state.running}
      />

      {/* Controls */}
      <div className="flex gap-4">
        {!state.running && !state.completed ? (
          <button
            onClick={handleStart}
            className="rounded-full bg-white px-8 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-200"
          >
            Iniciar
          </button>
        ) : null}

        {state.running ? (
          <>
            <button
              onClick={pause}
              className="rounded-full bg-amber-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-amber-400"
            >
              Pausar
            </button>
            <button
              onClick={stop}
              className="rounded-full border border-slate-600 px-8 py-3 font-semibold text-slate-300 transition-colors hover:border-red-500 hover:text-red-400"
            >
              Detener
            </button>
          </>
        ) : null}

        {state.paused ? (
          <>
            <button
              onClick={resume}
              className="rounded-full bg-cyan-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-cyan-400"
            >
              Reanudar
            </button>
            <button
              onClick={stop}
              className="rounded-full border border-slate-600 px-8 py-3 font-semibold text-slate-300 transition-colors hover:border-red-500 hover:text-red-400"
            >
              Detener
            </button>
          </>
        ) : null}

        {state.completed ? (
          <button
            onClick={() => navigate(`/history`)}
            className="rounded-full bg-emerald-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-emerald-400"
          >
            Ver historial
          </button>
        ) : null}
      </div>

      {/* Back link */}
      {!state.running ? (
        <button
          onClick={() => navigate(`/ar/${arId.toLowerCase()}`)}
          className="text-sm text-slate-500 underline hover:text-white transition-colors"
        >
          Volver al detalle
        </button>
      ) : null}
    </div>
  )
}
