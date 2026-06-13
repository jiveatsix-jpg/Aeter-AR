/** Solid fill colors for PhaseProgressBar (OKLCH for smooth Tailwind v4 compatibility) */
export const PHASE_FILL_COLORS: Record<string, string> = {
  inhalation: "oklch(0.789 0.154 197.4)",
  "inhalación": "oklch(0.789 0.154 197.4)",
  "inhalación máxima": "oklch(0.789 0.154 197.4)",
  "inhalación relleno": "oklch(0.777 0.152 181.2)",
  "inhalar izquierda": "oklch(0.789 0.154 197.4)",
  "retención lleno": "oklch(0.828 0.169 84.4)",
  "retención vacío": "oklch(0.678 0.047 258.4)",
  exhalación: "oklch(0.719 0.197 296.9)",
  "exhalación lenta": "oklch(0.719 0.197 296.9)",
  "exhalación parcial": "oklch(0.719 0.197 296.9)",
  "exhalación explosiva": "oklch(0.746 0.16 48.7)",
  "exhalación con zumbido": "oklch(0.726 0.29 326.8)",
  "exhalar derecha": "oklch(0.719 0.197 296.9)",
  "pausa plena": "oklch(0.839 0.086 229.6)",
  "pausa vacía": "oklch(0.555 0.055 257.4)",
  "pausa máxima": "oklch(0.555 0.055 257.4)",
  "pausa prn": "oklch(0.718 0.202 8.8)",
  "respiraciones rápidas": "oklch(0.746 0.16 48.7)",
  "vaciado total": "oklch(0.555 0.055 257.4)",
  "recuperación": "oklch(0.787 0.196 163.5)",
  repetición: "oklch(0.555 0.055 257.4)",
  default: "oklch(0.707 0.165 261.3)",
}

export function getPhaseFillColor(name: string): string {
  const key = name.toLowerCase().trim()
  return PHASE_FILL_COLORS[key] ?? PHASE_FILL_COLORS.default
}

/** Glow colors for each phase type */
export const GLOW_COLORS = {
  inhalation: "rgba(34, 211, 238, 0.6)",
  "inhalación": "rgba(34, 211, 238, 0.6)",
  "inhalación máxima": "rgba(34, 211, 238, 0.6)",
  "inhalación relleno": "rgba(45, 212, 191, 0.6)",
  "inhalar izquierda": "rgba(34, 211, 238, 0.6)",
  "retención lleno": "rgba(251, 191, 36, 0.6)",
  "retención vacío": "rgba(148, 163, 184, 0.6)",
  exhalación: "rgba(167, 139, 250, 0.6)",
  "exhalación lenta": "rgba(167, 139, 250, 0.6)",
  "exhalación parcial": "rgba(167, 139, 250, 0.6)",
  "exhalación explosiva": "rgba(251, 146, 60, 0.6)",
  "exhalación con zumbido": "rgba(217, 70, 239, 0.6)",
  "exhalar derecha": "rgba(167, 139, 250, 0.6)",
  "pausa plena": "rgba(125, 211, 252, 0.4)",
  "pausa vacía": "rgba(100, 116, 139, 0.4)",
  "pausa máxima": "rgba(100, 116, 139, 0.5)",
  "pausa prn": "rgba(251, 113, 133, 0.5)",
  "respiraciones rápidas": "rgba(251, 146, 60, 0.5)",
  "vaciado total": "rgba(100, 116, 139, 0.4)",
  "recuperación": "rgba(52, 211, 153, 0.5)",
  repetición: "rgba(100, 116, 139, 0.3)",
  default: "rgba(96, 165, 250, 0.4)",
} as const
