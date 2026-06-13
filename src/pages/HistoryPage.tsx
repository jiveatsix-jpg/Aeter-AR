import { useHistoryStore } from "../store"
import { ARS } from "../data/ars"
import { useNavigate } from "react-router-dom"

function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  if (m === 0) return `${s}s`
  return `${m}m ${s}s`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function HistoryPage() {
  const { entries, clear } = useHistoryStore()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Historial</h1>
        {entries.length > 0 && (
          <button onClick={clear} className="text-sm text-red-400 hover:text-red-300 transition-colors">
            Limpiar todo
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="py-12 text-center text-slate-500">Sin sesiones registradas todavía</p>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => {
            const ar = [...ARS].find((a) => a.id === entry.arId)
            return (
              <button
                key={entry.id}
                onClick={() => navigate(`/ar/${entry.arId.toLowerCase()}`)}
                className="w-full rounded-lg border border-slate-800 p-3 text-left text-sm transition-colors hover:border-slate-700 hover:bg-slate-900/50"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-medium text-white">{ar?.name ?? entry.arId}</span>
                  <span className="text-xs text-slate-500">{formatDate(entry.date)}</span>
                </div>
                <div className="mt-1 flex gap-3 text-xs text-slate-500">
                  <span>{formatDuration(entry.duration)}</span>
                  <span>·</span>
                  <span>{entry.cyclesCompleted} ciclo{entry.cyclesCompleted !== 1 ? "s" : ""}</span>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
