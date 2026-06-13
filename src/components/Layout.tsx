import { Outlet, NavLink } from "react-router-dom"
import { cn } from "../lib/cn"

const NAV_ITEMS = [
  { to: "/", label: "ARs", icon: "◈" },
  { to: "/glossary", label: "Glosario", icon: "◇" },
  { to: "/history", label: "Historial", icon: "☰" },
  { to: "/settings", label: "Ajustes", icon: "⚙" },
] as const

export function Layout() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-slate-950 text-white">
      {/* Main content */}
      <main className="flex-1 px-4 pb-24 pt-4">
        <Outlet />
      </main>

      {/* Bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 mx-auto flex max-w-lg items-center justify-around border-t border-slate-800 bg-slate-950/90 pb-6 pt-3 backdrop-blur-sm">
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-0.5 text-xs transition-colors",
                isActive ? "text-blue-400" : "text-slate-500",
              )
            }
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
