import { useState } from "react"
import { cn } from "../lib/cn"

const TUTORIAL_SEEN_KEY = "breathe-tutorial-seen"

interface TutorialStep {
  title: string
  text: string
}

const STEPS: TutorialStep[] = [
  {
    title: "Activos Respiratorios",
    text: "Bienvenido a Breathe: una guía de 12 técnicas de respiración con base científica. Todo se guarda en este dispositivo, sin cuentas ni nube.",
  },
  {
    title: "Catálogo",
    text: "La pestaña ARs lista las 12 técnicas, cada una con su nivel de riesgo, el patrón del ciclo y el tiempo total. Toca cualquiera para ver su ficha completa.",
  },
  {
    title: "Ficha de la técnica",
    text: "Casos de uso, mecanismo fisiológico, las fases paso a paso, el nivel de riesgo, métricas medidas y notas de investigación con su fuente. El botón «Iniciar» arranca la sesión guiada.",
  },
  {
    title: "Sesión guiada",
    text: "El círculo animado marca el ritmo de cada fase y una barra de progreso muestra en qué ciclo vas. Puedes pausar y reanudar; al completarla, la sesión queda guardada sola.",
  },
  {
    title: "Glosario e Historial",
    text: "Cualquier término técnico subrayado en una descripción te lleva directo al Glosario. La pestaña Historial guarda todas tus sesiones completadas.",
  },
  {
    title: "Ajustes",
    text: "Sonido, modo oscuro, vibración y avance automático al siguiente ciclo — todo configurable desde la pestaña Ajustes.",
  },
]

export function TutorialOverlay() {
  const [open, setOpen] = useState(() => {
    try {
      return !localStorage.getItem(TUTORIAL_SEEN_KEY)
    } catch {
      return false
    }
  })
  const [step, setStep] = useState(0)

  function close() {
    setOpen(false)
    setStep(0)
    try {
      localStorage.setItem(TUTORIAL_SEEN_KEY, "true")
    } catch {
      /* ignore */
    }
  }

  function next() {
    if (step === STEPS.length - 1) {
      close()
      return
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1))
  }

  function prev() {
    setStep((s) => Math.max(0, s - 1))
  }

  const current = STEPS[step] ?? STEPS[0]!

  return (
    <>
      <button
        onClick={() => {
          setStep(0)
          setOpen(true)
        }}
        aria-label="Ver tutorial"
        title="Ver tutorial"
        className="fixed right-4 top-4 z-40 flex size-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-sm font-bold text-slate-300 backdrop-blur-sm hover:border-slate-500 hover:text-white"
      >
        ?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div className="w-full max-w-sm rounded-xl border border-blue-800 bg-slate-900 p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Paso {step + 1} de {STEPS.length}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-blue-400">{current.title}</h2>
            <p className="mt-3 min-h-24 text-sm leading-relaxed text-slate-300">{current.text}</p>

            <div className="mt-6 flex items-center justify-between gap-3">
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "size-1.5 rounded-full",
                      i === step ? "bg-blue-500" : "bg-slate-700",
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  disabled={step === 0}
                  className="rounded-lg px-3 py-1.5 text-sm text-slate-400 disabled:opacity-30"
                >
                  Atrás
                </button>
                <button
                  onClick={next}
                  className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  {step === STEPS.length - 1 ? "Entendido" : "Siguiente"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
