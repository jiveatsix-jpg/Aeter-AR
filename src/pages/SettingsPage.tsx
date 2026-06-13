import { useSettingsStore } from "../store"

export function SettingsPage() {
  const { settings, update } = useSettingsStore()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Ajustes</h1>

      <div className="space-y-4">
        {/* Sound */}
        <label className="flex items-center justify-between">
          <span className="text-sm">Sonido</span>
          <button
            onClick={() => update({ soundEnabled: !settings.soundEnabled })}
            className={`h-6 w-11 rounded-full transition-colors ${
              settings.soundEnabled ? "bg-blue-600" : "bg-slate-700"
            }`}
          >
            <span
              className={`block size-5 rounded-full bg-white transition-transform ${
                settings.soundEnabled ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </label>

        {/* Dark Mode */}
        <label className="flex items-center justify-between">
          <span className="text-sm">Modo oscuro</span>
          <button
            onClick={() => update({ darkMode: !settings.darkMode })}
            className={`h-6 w-11 rounded-full transition-colors ${
              settings.darkMode ? "bg-blue-600" : "bg-slate-700"
            }`}
          >
            <span
              className={`block size-5 rounded-full bg-white transition-transform ${
                settings.darkMode ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </label>

        {/* Haptic */}
        <label className="flex items-center justify-between">
          <span className="text-sm">Vibración (Tauri)</span>
          <button
            onClick={() => update({ hapticEnabled: !settings.hapticEnabled })}
            className={`h-6 w-11 rounded-full transition-colors ${
              settings.hapticEnabled ? "bg-blue-600" : "bg-slate-700"
            }`}
          >
            <span
              className={`block size-5 rounded-full bg-white transition-transform ${
                settings.hapticEnabled ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </label>

        {/* Auto Start */}
        <label className="flex items-center justify-between">
          <span className="text-sm">Auto-siguiente ciclo</span>
          <button
            onClick={() => update({ autoStartNextCycle: !settings.autoStartNextCycle })}
            className={`h-6 w-11 rounded-full transition-colors ${
              settings.autoStartNextCycle ? "bg-blue-600" : "bg-slate-700"
            }`}
          >
            <span
              className={`block size-5 rounded-full bg-white transition-transform ${
                settings.autoStartNextCycle ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </label>
      </div>
    </div>
  )
}
