import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "../components/Layout"
import { CatalogPage } from "../pages/CatalogPage"
import { ArDetailPage } from "../pages/ArDetailPage"
import { GuidePage } from "../pages/GuidePage"
import { HistoryPage } from "../pages/HistoryPage"
import { SettingsPage } from "../pages/SettingsPage"
import { GlossaryPage } from "../pages/GlossaryPage"

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/ar/:id" element={<ArDetailPage />} />
          <Route path="/ar/:id/guide" element={<GuidePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
