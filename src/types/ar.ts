/** Risk level for each AR technique */
export const RISK_LEVEL = {
  NULO: "nulo",
  BAJO: "bajo",
  MEDIO: "medio",
} as const

export type RiskLevel = (typeof RISK_LEVEL)[keyof typeof RISK_LEVEL]

/** Breathing phase within an AR cycle */
export interface ArPhase {
  name: string
  duration: number
  unit: "s" | "min" | "rep" | "ciclos"
  via: "nasal" | "bucal" | "nasal/bucal" | "—"
  notes: string
}

/** Measurable return metric */
export interface ArMetric {
  name: string
  value: string
  unit?: string
}

/** Full AR definition */
export interface ArData {
  id: string
  name: string
  officialName: string
  cyclePattern: string
  timePerCycle: number
  totalTime: string
  mechanism: string
  mechanismShort: string
  risk: RiskLevel
  riskNotes: string
  phases: ArPhase[]
  metrics: ArMetric[]
  context: string
  longDescription: string
  researchNotes: string
  citation?: string
}
