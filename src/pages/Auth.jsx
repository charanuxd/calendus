// src/pages/Auth.jsx
import { useState } from "react"
import { supabase } from "../lib/supabase"
import { PASTEL } from "../lib/theme"
import { Button, Input } from "../components/UI"

export default function Auth() {
  const [mode,    setMode]    = useState("login") // login | signup
  const [email,   setEmail]   = useState("")
  const [pass,    setPass]    = useState("")
  const [name,    setName]    = useState("")
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState("")
  const [sent,    setSent]    = useState(false)

  const handleSubmit = async () => {
    setError(""); setLoading(true)
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password: pass,
          options: { data: { full_name: name } }
        })
        if (error) throw error
        setSent(true)
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
        if (error) throw error
      }
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight:"100vh", background: PASTEL.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background: PASTEL.card, borderRadius:20, padding:40, width:"100%", maxWidth:420, boxShadow:"0 8px 40px rgba(0,0,0,0.06)", animation:"scaleIn 0.3s ease" }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:52, height:52, borderRadius:14, background:`linear-gradient(135deg, ${PASTEL.accent}, ${PASTEL.mint})`, display:"flex", alignItems:"center", justifyContent:"center", color: PASTEL.white, fontSize:24, fontWeight:700, margin:"0 auto 12px" }}>C</div>
          <h1 style={{ fontSize:24, fontWeight:600, fontFamily:"'Playfair Display', serif" }}>Calendus</h1>
          <p style={{ fontSize:13, color: PASTEL.textMuted, marginTop:4 }}>Your personal scheduling rhythm</p>
        </div>

        {sent ? (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>📬</div>
            <h3 style={{ fontFamily:"'Playfair Display', serif", marginBottom:8 }}>Check your email</h3>
            <p style={{ fontSize:13, color: PASTEL.textMuted }}>We sent a confirmation link to <strong>{email}</strong></p>
          </div>
        ) : (
          <>
            {/* Tab toggle */}
            <div style={{ display:"flex", background: PASTEL.bg, borderRadius:12, padding:3, marginBottom:24 }}>
              {["login","signup"].map(m => (
                <button key={m} onClick={() => { setMode(m); setError("") }}
                  style={{ flex:1, padding:"9px 0", border:"none", borderRadius:10, cursor:"pointer", fontSize:13, fontWeight:500, fontFamily:"'DM Sans', sans-serif", transition:"all 0.2s",
                    background: mode === m ? PASTEL.card : "transparent",
                    color:      mode === m ? PASTEL.text  : PASTEL.textMuted,
                    boxShadow:  mode === m ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  {m === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            {mode === "signup" && (
              <Input label="Full Name" placeholder="Jane Doe" value={name} onChange={e => setName(e.target.value)} />
            )}
            <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Password" type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} error={error} />

            <Button style={{ width:"100%", justifyContent:"center" }} disabled={loading} onClick={handleSubmit}>
              {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
