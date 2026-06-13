import { getPhaseColor, getPhaseScale } from "../hooks/useBreathingTimer"
import { GLOW_COLORS } from "../lib/glow"

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
  const [borderClass] = colorClass.split(" ")
  const strokeClass = borderClass?.replace("border-", "stroke-") ?? "stroke-blue-400"
  const glow = GLOW_COLORS[phaseName.toLowerCase().trim() as keyof typeof GLOW_COLORS] ?? GLOW_COLORS.default

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow layer */}
      <div
        className="absolute rounded-full transition-all duration-1000 ease-in-out"
        style={{
          width: 280,
          height: 280,
          boxShadow: `0 0 80px 20px ${glow}`,
          opacity: 0.25 + progress * 0.15,
        }}
      />

      {/* Background ring */}
      <svg
        viewBox="0 0 280 280"
        className="w-64 md:w-80 lg:w-96"
      >
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
          stroke={strokeClass}
          strokeWidth={4}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-in-out"
          transform="rotate(-90 140 140)"
        />
      </svg>

      {/* Animated circle */}
      <div
        className={`absolute flex items-center justify-center rounded-full border-4 transition-all duration-1000 ease-in-out ${colorClass}`}
        style={{
          width: "calc(100% - 48px)",
          aspectRatio: "1 / 1",
          maxWidth: 240,
          transform: `scale(${scale})`,
        }}
      >
        <span className="text-5xl font-light tabular-nums tracking-tight text-white md:text-6xl lg:text-7xl">
          {total - elapsed}
        </span>
      </div>
    </div>
  )
}
