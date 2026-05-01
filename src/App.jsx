// src/App.jsx
import { useState, useEffect, useContext } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { supabase } from "./lib/supabase"
import { ThemeProvider, ThemeContext } from "./lib/theme-context"
import { TYPOGRAPHY } from "./lib/design-system"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import PublicBook from "./pages/PublicBook"

function AppRoutes() {
  const { colors, isLoading } = useContext(ThemeContext) || { colors: {}, isLoading: true }
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  if (isLoading || session === undefined)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: TYPOGRAPHY.fontFamily.sans,
          color: colors.text?.secondary || "#6B7280",
          fontSize: "14px",
          background: colors.bg?.primary || "#FFFFFF",
          transition: "background 200ms",
        }}
      >
        Loading…
      </div>
    )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/book/:slug" element={<PublicBook />} />
        <Route path="/login" element={session ? <Navigate to="/" replace /> : <Auth />} />
        <Route path="/*" element={session ? <Dashboard session={session} /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}
