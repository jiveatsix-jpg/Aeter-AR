import type { ArPhase } from "../types"
import { getPhaseColor } from "../hooks/useBreathingTimer"

interface PhaseProgressBarProps {
  phases: ArPhase[]
  currentIndex: number
  cycle: number
  totalCycles: number
  running: boolean
}

export function PhaseProgressBar({
  phases,
  currentIndex,
  cycle,
  totalCycles,
  running,
}: PhaseProgressBarProps) {
  const timedPhases = phases.filter((p) => p.unit === "s" && p.duration > 0)

  return (
    <div className="w-full space-y-2">
      {/* Cycle indicator */}
      <div className="flex justify-between text-sm text-slate-400">
        <span>Cycle {cycle + 1} of {totalCycles}</span>
      </div>

      {/* Phase dots */}
      <div className="flex gap-1.5">
        {timedPhases.map((phase, i) => {
          const isActive = i === currentIndex
          const isPast = i < currentIndex
          const dotColor = getPhaseColor(phase.name)

          return (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                isActive && running ? "animate-pulse" : ""
              }`}
              style={{
                backgroundColor: isPast
                  ? "oklch(0.707 0.022 261.325)"
                  : isActive
                    ? "oklch(0.554 0.046 257.417)"
                    : "oklch(0.372 0.044 257.287)",
              }}
            >
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isActive && running ? "w-full" : isPast ? "w-full" : "w-0"
                }`}
                style={{
                  backgroundColor: isPast
                    ? dotColor.replace("text-", "").replace("border-", "")
                    : isActive
                      ? dotColor.replace("text-", "").replace("border-", "")
                      : "transparent",
                  opacity: isActive && running ? 0.7 : 1,
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Phase name */}
      <p className={`text-center text-sm font-medium capitalize ${getPhaseColor(timedPhases[currentIndex]?.name ?? "")}`}>
        {timedPhases[currentIndex]?.name ?? ""}
      </p>
    </div>
  )
}
