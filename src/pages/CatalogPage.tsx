import { useNavigate } from "react-router-dom"
import { ARS } from "../data/ars"
import { cn } from "../lib/cn"
import { RISK_LEVEL, type RiskLevel } from "../types"
import { SmartText } from "../components/SmartText"

const RISK_COLORS: Record<RiskLevel, string> = {
  [RISK_LEVEL.NULO]: "text-green-400 border-green-800",
  [RISK_LEVEL.BAJO]: "text-yellow-400 border-yellow-800",
  [RISK_LEVEL.MEDIO]: "text-red-400 border-red-800",
}

export function CatalogPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Activos Respiratorios</h1>
        <p className="mt-1 text-sm text-slate-400">
          {ARS.length} técnicas moduladoras del sistema nervioso
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {[...ARS].map((ar) => (
          <button
            key={ar.id}
            onClick={() => navigate(`/ar/${ar.id.toLowerCase()}`)}
            className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-left transition-colors hover:border-slate-700 hover:bg-slate-900"
          >
            {/* Risk indicator */}
            <span
              className={cn(
                "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border text-xs font-bold uppercase",
                RISK_COLORS[ar.risk],
              )}
            >
              {ar.risk.slice(0, 2)}
            </span>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <h2 className="font-semibold">{ar.name}</h2>
                <span className="text-xs text-slate-500">{ar.id}</span>
              </div>
              <p className="mt-0.5 text-sm text-slate-400 line-clamp-2">
                <SmartText text={ar.mechanismShort} />
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{ar.cyclePattern}</span>
                <span>·</span>
                <span>{ar.totalTime}</span>
                <span>·</span>
                <span>{ar.timePerCycle}s/ciclo</span>
              </div>
            </div>

            {/* Arrow */}
            <span className="mt-2 text-slate-600">›</span>
          </button>
        ))}
      </div>
    </div>
  )
}
