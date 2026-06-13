import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { GLOSSARY } from "../data/glossary"

export function GlossaryPage() {
  // Sort alphabetically
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term))

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Glosario</h1>
      <p className="text-sm text-slate-400">
        Términos científicos y técnicos usados en las descripciones de los Activos Respiratorios.
        Hacé click en cualquier término subrayado dentro de la app para llegar directamente acá.
      </p>

      <div className="space-y-3">
        {sorted.map((entry) => (
          <GlossaryCard key={entry.term} entry={entry} />
        ))}
      </div>
    </div>
  )
}

function GlossaryCard({ entry }: { entry: (typeof GLOSSARY)[number] }) {
  const slug = encodeURIComponent(entry.term.toLowerCase().replace(/\s+/g, "-"))
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isHighlighted = location.hash === `#${slug}`

  // Scroll into view on mount if this card is the target
  useEffect(() => {
    if (isHighlighted && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [isHighlighted])

  return (
    <div
      ref={ref}
      id={slug}
      className={`scroll-mt-24 rounded-lg border p-4 transition-colors ${
        isHighlighted
          ? "border-blue-600 bg-blue-950/30"
          : "border-slate-800 bg-slate-900/50"
      }`}
    >
      <h3 className="font-semibold text-white capitalize">{entry.term}</h3>
      {entry.aliases.length > 1 && (
        <p className="mt-0.5 text-xs text-slate-500">
          También: {entry.aliases.filter((a) => a !== entry.term).join(", ")}
        </p>
      )}
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{entry.definition}</p>
    </div>
  )
}
