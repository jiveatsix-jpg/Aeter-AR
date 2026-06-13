import type { ArPhase } from "../types"
import { getPhaseFillColor } from "../lib/glow"

interface PhaseProgressBarProps {
  phases: ArPhase[]
  currentIndex: number
  cycle: number
  totalCycles: number
  running: boolean
  elapsed: number
  phaseDuration: number
}

export function PhaseProgressBar({
  phases,
  currentIndex,
  cycle,
  totalCycles,
  running,
  elapsed,
  phaseDuration,
}: PhaseProgressBarProps) {
  const timedPhases = phases.filter((p): p is ArPhase & { duration: number } => p.unit === "s" && p.duration > 0)
  const totalDuration = timedPhases.reduce((sum, p) => sum + p.duration, 0)

  if (timedPhases.length === 0) return null

  const currentPhase = timedPhases[currentIndex]
  const fillPercent = phaseDuration > 0 ? Math.min(1, elapsed / phaseDuration) : 0
  const remaining = phaseDuration > 0 ? Math.max(0, Math.ceil(phaseDuration - elapsed)) : 0

  return (
    <div className="w-full space-y-2">
      {/* Cycle indicator */}
      <div className="flex justify-between text-xs text-slate-400">
        <span> ciclo {cycle + 1} de {totalCycles}</span>
        {running && (
          <span className="tabular-nums">{remaining}s</span>
        )}
      </div>

      {/* Phase segments bar */}
      <div className="flex h-6 gap-0.5 overflow-hidden rounded-full bg-slate-800">
        {timedPhases.map((phase, i) => {
          const isActive = i === currentIndex && running
          const isPast = i < currentIndex
          const segmentWidth = (phase.duration / totalDuration) * 100
          const color = getPhaseFillColor(phase.name)

          let fillWidth = 0
          if (isPast) fillWidth = 100
          else if (isActive) fillWidth = fillPercent * 100

          return (
            <div
              key={i}
              className="relative h-full transition-all duration-300"
              style={{ width: `${segmentWidth}%` }}
            >
              {/* Background (empty) */}
              <div
                className="absolute inset-0 rounded-full opacity-20"
                style={{ backgroundColor: color }}
              />

              {/* Fill */}
              <div
                className="h-full rounded-full transition-all duration-500 ease-linear"
                style={{
                  width: `${fillWidth}%`,
                  backgroundColor: color,
                  opacity: isActive ? 1 : isPast ? 0.85 : 0,
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Phase name + time */}
      <div className="flex items-center justify-between">
        <p
          className="text-sm font-medium capitalize"
          style={{ color: currentPhase ? getPhaseFillColor(currentPhase.name) : undefined }}
        >
          {currentPhase?.name ?? ""}
        </p>
        {running && (
          <span className="text-xs tabular-nums text-slate-500">
            {Math.max(0, Math.ceil(fillPercent * phaseDuration))}s / {phaseDuration}s
          </span>
        )}
      </div>
    </div>
  )
}
