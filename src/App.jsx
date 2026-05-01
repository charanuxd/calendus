// src/App.jsx
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { supabase } from "./lib/supabase"
import { GLOBAL_CSS } from "./lib/theme"
import Auth       from "./pages/Auth"
import Dashboard  from "./pages/Dashboard"
import PublicBook from "./pages/PublicBook"

export default function App() {
  const [session, setSession] = useState(undefined) // undefined = loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans', sans-serif", color:"#8A857E", fontSize:13 }}>
      Loading…
    </div>
  )

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <BrowserRouter>
        <Routes>
          {/* Public booking page — no auth needed */}
          <Route path="/book/:slug" element={<PublicBook />} />

          {/* Auth page */}
          <Route path="/login" element={session ? <Navigate to="/" replace /> : <Auth />} />

          {/* Protected dashboard */}
          <Route path="/*" element={session ? <Dashboard session={session} /> : <Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
