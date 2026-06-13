import { create } from "zustand"
import type { SessionEntry, UserSettings } from "../types"

/* ─── Settings Store ─── */

const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  darkMode: true,
  hapticEnabled: true,
  autoStartNextCycle: false,
}

function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem("breathe-settings")
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } as UserSettings
  } catch { /* ignore */ }
  return DEFAULT_SETTINGS
}

function saveSettings(settings: UserSettings) {
  localStorage.setItem("breathe-settings", JSON.stringify(settings))
}

interface SettingsStore {
  settings: UserSettings
  update: (partial: Partial<UserSettings>) => void
  reset: () => void
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: loadSettings(),
  update: (partial) =>
    set((state) => {
      const next = { ...state.settings, ...partial }
      saveSettings(next)
      return { settings: next }
    }),
  reset: () => {
    saveSettings(DEFAULT_SETTINGS)
    set({ settings: DEFAULT_SETTINGS })
  },
}))

/* ─── Session History Store ─── */

function loadHistory(): SessionEntry[] {
  try {
    const raw = localStorage.getItem("breathe-history")
    if (raw) return JSON.parse(raw) as SessionEntry[]
  } catch { /* ignore */ }
  return []
}

function saveHistory(entries: SessionEntry[]) {
  localStorage.setItem("breathe-history", JSON.stringify(entries))
}

interface HistoryStore {
  entries: SessionEntry[]
  add: (entry: SessionEntry) => void
  clear: () => void
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  entries: loadHistory(),
  add: (entry) =>
    set((state) => {
      const next = [entry, ...state.entries]
      saveHistory(next)
      return { entries: next }
    }),
  clear: () => {
    saveHistory([])
    set({ entries: [] })
  },
}))

/* ─── Active Session Store ─── */

export const SESSION_STATUS = {
  IDLE: "idle",
  RUNNING: "running",
  PAUSED: "paused",
  COMPLETED: "completed",
} as const

export type SessionStatus = (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS]

interface ActiveSession {
  arId: string
  status: SessionStatus
  currentPhase: number
  phaseTimeLeft: number
  totalCycles: number
  cyclesCompleted: number
  elapsed: number // seconds
}

interface ActiveSessionStore {
  session: ActiveSession | null
  start: (arId: string) => void
  tick: () => void
  pause: () => void
  resume: () => void
  nextPhase: () => void
  complete: () => void
  reset: () => void
}

export const useActiveSessionStore = create<ActiveSessionStore>((set) => ({
  session: null,
  start: (arId) =>
    set({
      session: {
        arId,
        status: SESSION_STATUS.RUNNING,
        currentPhase: 0,
        phaseTimeLeft: 0,
        totalCycles: 0,
        cyclesCompleted: 0,
        elapsed: 0,
      },
    }),
  tick: () =>
    set((state) => {
      const s = state.session
      if (!s || s.status !== SESSION_STATUS.RUNNING) return state
      return {
        session: {
          ...s,
          elapsed: s.elapsed + 1,
          phaseTimeLeft: Math.max(0, s.phaseTimeLeft - 1),
        },
      }
    }),
  pause: () =>
    set((state) => {
      const s = state.session
      if (!s) return state
      return { session: { ...s, status: SESSION_STATUS.PAUSED } }
    }),
  resume: () =>
    set((state) => {
      const s = state.session
      if (!s) return state
      return { session: { ...s, status: SESSION_STATUS.RUNNING } }
    }),
  nextPhase: () =>
    set((state) => {
      const s = state.session
      if (!s) return state
      return { session: { ...s, currentPhase: s.currentPhase + 1 } }
    }),
  complete: () =>
    set((state) => {
      const s = state.session
      if (!s) return state
      return { session: { ...s, status: SESSION_STATUS.COMPLETED } }
    }),
  reset: () => set({ session: null }),
}))
