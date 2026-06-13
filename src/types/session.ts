/** A completed breathing session */
export interface SessionEntry {
  id: string
  arId: string
  date: string // ISO string
  duration: number // seconds
  cyclesCompleted: number
  notes: string
}
