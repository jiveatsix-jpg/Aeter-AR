import { getPhaseColor, getPhaseScale } from "../hooks/useBreathingTimer"

interface BreathingCircleProps {
  phaseName: string
  elapsed: number
  total: number
}

export function BreathingCircle({ phaseName, elapsed, total }: BreathingCircleProps) {
  const scale = getPhaseScale(phaseName, elapsed, total)
  const progress = total > 0 ? elapsed / total : 0
  const circumference = 2 * Math.PI * 120
  const offset = circumference * (1 - progress)
  const colorClass = getPhaseColor(phaseName)
  const borderColor = colorClass.split(" ")[0] ?? "border-blue-400"

  return (
    <div className="relative flex items-center justify-center">
      {/* Background ring */}
      <svg width={280} height={280} className="absolute">
        <circle
          cx={140}
          cy={140}
          r={120}
          fill="none"
          stroke="oklch(0.372 0.044 257.287)"
          strokeWidth={4}
          opacity={0.3}
        />
        <circle
          cx={140}
          cy={140}
          r={120}
          fill="none"
          stroke={borderColor.replace("border-", "stroke-")}
          strokeWidth={4}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-1000 ease-linear"
          transform="rotate(-90 140 140)"
        />
      </svg>

      {/* Animated circle */}
      <div
        className={`relative z-10 flex size-56 items-center justify-center rounded-full border-4 transition-all duration-1000 ease-linear ${colorClass}`}
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <span className="text-7xl font-light tabular-nums tracking-tight text-white">
          {total - elapsed}
        </span>
      </div>
    </div>
  )
}
