import { useParams, useNavigate } from "react-router-dom"
import { ARS } from "../data/ars"
import { cn } from "../lib/cn"
import { RISK_LEVEL } from "../types"
import type { RiskLevel } from "../types"
import { SmartText } from "../components/SmartText"

const RISK_COLORS: Record<RiskLevel, string> = {
  [RISK_LEVEL.NULO]: "text-green-400 border-green-800 bg-green-950/30",
  [RISK_LEVEL.BAJO]: "text-yellow-400 border-yellow-800 bg-yellow-950/30",
  [RISK_LEVEL.MEDIO]: "text-red-400 border-red-800 bg-red-950/30",
}

export function ArDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const ar = [...ARS].find((a) => a.id.toLowerCase() === id?.toLowerCase())

  if (!ar) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-slate-400">AR no encontrado</p>
        <button onClick={() => navigate("/")} className="text-sm text-blue-400 underline">
          Volver al catálogo
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-sm text-slate-500 hover:text-white"
        >
          ← Volver
        </button>
        <h1 className="text-2xl font-bold">{ar.name}</h1>
        <p className="text-sm text-slate-500">{ar.id} · {ar.officialName}</p>
        <p className="mt-2 text-sm text-slate-400">
          <SmartText text={ar.longDescription} />
        </p>
      </div>

      {/* Infographic placeholder */}
      <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/50">
        <p className="text-sm text-slate-600">Infografía: {ar.id}.png</p>
      </div>

      {/* Mechanism */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Mecanismo</h2>
        <p className="text-sm leading-relaxed text-slate-300">
          <SmartText text={ar.mechanism} />
        </p>
      </section>

      {/* Phases */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Fases</h2>
        <div className="space-y-2">
          {ar.phases.map((phase, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-slate-800 p-3"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-slate-800 text-xs text-slate-400">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">{phase.name}</span>
                  <span className="text-xs text-slate-500">
                    {phase.duration}{{ s: "s", min: "min", rep: " rep", ciclos: " ciclos" }[phase.unit]}
                  </span>
                  <span className="text-xs lowercase text-slate-500">{phase.via}</span>
                </div>
                <p className="mt-0.5 text-sm text-slate-400">
                  <SmartText text={phase.notes} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Risk */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Riesgo</h2>
        <div
          className={cn(
            "rounded-lg border px-4 py-3 text-sm",
            RISK_COLORS[ar.risk],
          )}
        >
          <strong className="uppercase">{ar.risk}</strong> — {ar.riskNotes}
        </div>
      </section>

      {/* Metrics */}
      {ar.metrics.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Retorno Medido</h2>
          <div className="grid grid-cols-2 gap-2">
            {ar.metrics.map((m, i) => (
              <div key={i} className="rounded-lg border border-slate-800 p-3">
                <p className="text-xs text-slate-500">{m.name}</p>
                <p className="mt-1 text-lg font-semibold text-blue-400">
                  {m.value}
                  {m.unit ? <span className="ml-1 text-xs font-normal text-slate-500">{m.unit}</span> : null}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Research notes */}
      {ar.researchNotes && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Notas de Investigación</h2>
          <p className="text-sm leading-relaxed text-slate-400">
            <SmartText text={ar.researchNotes} />
          </p>
          {ar.citation && (
            <p className="text-xs text-slate-600">Fuente: {ar.citation}</p>
          )}
        </section>
      )}

      {/* Action button */}
      <button
        onClick={() => navigate(`/ar/${ar.id.toLowerCase()}/guide`)}
        className="w-full rounded-xl bg-blue-600 py-4 text-center font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Iniciar {ar.name}
      </button>
    </div>
  )
}
