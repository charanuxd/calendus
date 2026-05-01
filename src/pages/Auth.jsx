// src/pages/Auth.jsx
import { useState } from "react"
import { supabase } from "../lib/supabase"
import { COLORS, TEXT_STYLES, SPACING, RADIUS, SHADOWS, TRANSITIONS, EASING } from "../lib/design-system"
import { Button, Input } from "../components/UI"

export default function Auth() {
  const [mode,    setMode]    = useState("login")
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
    <div style={{
      minHeight: "100vh",
      background: COLORS.gradients.subtle,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: SPACING[4],
      fontFamily: TEXT_STYLES.bodyMd.fontFamily,
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: "absolute",
        top: "5%",
        right: "10%",
        width: "300px",
        height: "300px",
        background: COLORS.gradients.primary,
        borderRadius: "50%",
        opacity: 0.08,
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "5%",
        left: "10%",
        width: "250px",
        height: "250px",
        background: COLORS.primary[500],
        borderRadius: "50%",
        opacity: 0.06,
        filter: "blur(50px)",
        pointerEvents: "none",
      }} />

      <div style={{
        background: COLORS.bg.default,
        borderRadius: RADIUS.xl,
        padding: SPACING[12],
        width: "100%",
        maxWidth: "440px",
        boxShadow: SHADOWS.xl,
        position: "relative",
        zIndex: 10,
        animation: `slideInUp ${TRANSITIONS.slow} ${EASING.easeOut}`,
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: SPACING[8] }}>
          {/* Logo Badge */}
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: RADIUS.lg,
            background: COLORS.gradients.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.bg.default,
            fontSize: "28px",
            fontWeight: 700,
            margin: `0 auto ${SPACING[4]}`,
            boxShadow: SHADOWS.lg,
          }}>
            📅
          </div>

          <h1 style={{
            ...TEXT_STYLES.displaySmall,
            color: COLORS.neutral[900],
            marginBottom: SPACING[2],
          }}>
            Calendus
          </h1>

          <p style={{
            ...TEXT_STYLES.bodyMd,
            color: COLORS.neutral[500],
            marginTop: SPACING[2],
          }}>
            {mode === "login"
              ? "Welcome back. Manage your time effortlessly."
              : "Get started and take control of your schedule."}
          </p>
        </div>

        {/* Content */}
        {sent ? (
          <div style={{
            textAlign: "center",
            padding: `${SPACING[6]} 0`,
          }}>
            <div style={{
              fontSize: "48px",
              marginBottom: SPACING[4],
              animation: `slideInUp ${TRANSITIONS.slow} ${EASING.easeOut}`,
            }}>
              ✉️
            </div>

            <h2 style={{
              ...TEXT_STYLES.headingMd,
              color: COLORS.neutral[900],
              marginBottom: SPACING[2],
            }}>
              Check your email
            </h2>

            <p style={{
              ...TEXT_STYLES.bodyMd,
              color: COLORS.neutral[600],
              lineHeight: 1.6,
            }}>
              We sent a confirmation link to <br />
              <strong style={{ color: COLORS.neutral[900] }}>{email}</strong>
            </p>
          </div>
        ) : (
          <>
            {/* Mode Toggle */}
            <div style={{
              display: "flex",
              gap: SPACING[2],
              background: COLORS.neutral[100],
              borderRadius: RADIUS.md,
              padding: SPACING[1],
              marginBottom: SPACING[6],
            }}>
              {["login", "signup"].map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError("") }}
                  style={{
                    flex: 1,
                    padding: `${SPACING[2]} 0`,
                    border: "none",
                    borderRadius: RADIUS.sm,
                    cursor: "pointer",
                    fontSize: TEXT_STYLES.bodySm.fontSize,
                    fontWeight: 600,
                    fontFamily: TEXT_STYLES.bodySm.fontFamily,
                    transition: `all ${TRANSITIONS.base} ${EASING.easeOut}`,
                    background: mode === m ? COLORS.bg.default : "transparent",
                    color: mode === m ? COLORS.primary[500] : COLORS.neutral[500],
                    boxShadow: mode === m ? SHADOWS.sm : "none",
                  }}
                >
                  {m === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            {/* Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: SPACING[4] }}>
              {mode === "signup" && (
                <div>
                  <label style={{
                    ...TEXT_STYLES.bodySm,
                    color: COLORS.neutral[700],
                    fontWeight: 600,
                    display: "block",
                    marginBottom: SPACING[2],
                  }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: "100%",
                      height: SPACING[10],
                      padding: `${SPACING[2]} ${SPACING[3]}`,
                      border: `1px solid ${COLORS.neutral[300]}`,
                      borderRadius: RADIUS.md,
                      fontSize: TEXT_STYLES.bodyMd.fontSize,
                      fontFamily: TEXT_STYLES.bodyMd.fontFamily,
                      color: COLORS.neutral[900],
                      transition: `all ${TRANSITIONS.base} ${EASING.easeOut}`,
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = COLORS.primary[500]
                      e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary[50]}`
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = COLORS.neutral[300]
                      e.target.style.boxShadow = "none"
                    }}
                  />
                </div>
              )}

              <div>
                <label style={{
                  ...TEXT_STYLES.bodySm,
                  color: COLORS.neutral[700],
                  fontWeight: 600,
                  display: "block",
                  marginBottom: SPACING[2],
                }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    height: SPACING[10],
                    padding: `${SPACING[2]} ${SPACING[3]}`,
                    border: `1px solid ${COLORS.neutral[300]}`,
                    borderRadius: RADIUS.md,
                    fontSize: TEXT_STYLES.bodyMd.fontSize,
                    fontFamily: TEXT_STYLES.bodyMd.fontFamily,
                    color: COLORS.neutral[900],
                    transition: `all ${TRANSITIONS.base} ${EASING.easeOut}`,
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = COLORS.primary[500]
                    e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary[50]}`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = COLORS.neutral[300]
                    e.target.style.boxShadow = "none"
                  }}
                />
              </div>

              <div>
                <label style={{
                  ...TEXT_STYLES.bodySm,
                  color: COLORS.neutral[700],
                  fontWeight: 600,
                  display: "block",
                  marginBottom: SPACING[2],
                }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  style={{
                    width: "100%",
                    height: SPACING[10],
                    padding: `${SPACING[2]} ${SPACING[3]}`,
                    border: `1px solid ${error ? COLORS.error : COLORS.neutral[300]}`,
                    borderRadius: RADIUS.md,
                    fontSize: TEXT_STYLES.bodyMd.fontSize,
                    fontFamily: TEXT_STYLES.bodyMd.fontFamily,
                    color: COLORS.neutral[900],
                    transition: `all ${TRANSITIONS.base} ${EASING.easeOut}`,
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = error ? COLORS.error : COLORS.primary[500]
                    e.target.style.boxShadow = `0 0 0 3px ${error ? COLORS.error + '20' : COLORS.primary[50]}`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = error ? COLORS.error : COLORS.neutral[300]
                    e.target.style.boxShadow = "none"
                  }}
                />
                {error && (
                  <p style={{
                    ...TEXT_STYLES.bodySm,
                    color: COLORS.error,
                    marginTop: SPACING[2],
                  }}>
                    {error}
                  </p>
                )}
              </div>

              <button
                disabled={loading}
                onClick={handleSubmit}
                style={{
                  width: "100%",
                  height: SPACING[10],
                  background: loading ? COLORS.neutral[300] : COLORS.gradients.primary,
                  border: "none",
                  borderRadius: RADIUS.md,
                  color: COLORS.bg.default,
                  fontSize: TEXT_STYLES.bodySm.fontSize,
                  fontWeight: 600,
                  fontFamily: TEXT_STYLES.bodySm.fontFamily,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: `all ${TRANSITIONS.base} ${EASING.easeOut}`,
                  opacity: loading ? 0.7 : 1,
                  boxShadow: SHADOWS.md,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.boxShadow = SHADOWS.lg
                    e.target.style.transform = "translateY(-2px)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.boxShadow = SHADOWS.md
                    e.target.style.transform = "translateY(0)"
                  }
                }}
              >
                {loading ? "Processing…" : mode === "login" ? "Sign In" : "Create Account"}
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
