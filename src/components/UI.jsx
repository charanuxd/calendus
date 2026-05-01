// src/components/UI.jsx
// ─── Reusable primitive components ───────────────────────

import { PASTEL } from '../lib/theme'

// ── Icons ──────────────────────────────────────────────────
export const Icon = ({ d, size = 18, color = PASTEL.textMuted, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d={d} />
  </svg>
)
export const CalendarIcon = (p) => <Icon d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" {...p} />
export const ClockIcon    = (p) => <Icon d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2" {...p} />
export const PlusIcon     = (p) => <Icon d="M12 5v14M5 12h14" {...p} />
export const XIcon        = (p) => <Icon d="M18 6L6 18M6 6l12 12" {...p} />
export const CheckIcon    = (p) => <Icon d="M20 6L9 17l-5-5" {...p} />
export const ChevronLeft  = (p) => <Icon d="M15 18l-6-6 6-6" {...p} />
export const ChevronRight = (p) => <Icon d="M9 18l6-6-6-6" {...p} />
export const RepeatIcon   = (p) => <Icon d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" {...p} />
export const SettingsIcon = (p) => <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" {...p} />
export const CopyIcon     = (p) => <Icon d="M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" {...p} />
export const TrashIcon    = (p) => <Icon d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" {...p} />
export const LogoutIcon   = (p) => <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" {...p} />
export const UserIcon     = (p) => <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" {...p} />
export const MailIcon     = (p) => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" {...p} />

// ── Button ─────────────────────────────────────────────────
export function Button({ children, variant = "primary", size = "md", onClick, style, disabled, ...props }) {
  const base = {
    border: "none", borderRadius: 10, cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
    display: "inline-flex", alignItems: "center", gap: 6,
    transition: "all 0.2s ease", letterSpacing: "0.01em", opacity: disabled ? 0.5 : 1,
  }
  const sizes   = { sm: { padding: "6px 12px", fontSize: 12 }, md: { padding: "10px 20px", fontSize: 14 }, lg: { padding: "14px 28px", fontSize: 15 } }
  const variants = {
    primary:   { background: PASTEL.accent,   color: PASTEL.white },
    secondary: { background: PASTEL.sandSoft, color: PASTEL.text,    border: `1px solid ${PASTEL.border}` },
    ghost:     { background: "transparent",   color: PASTEL.textMuted },
    danger:    { background: PASTEL.roseSoft, color: "#8A5055" },
  }
  return (
    <button disabled={disabled} onClick={onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)" }}}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = disabled ? "0.5" : "1"; e.currentTarget.style.transform = "translateY(0)" }}
      {...props}
    >
      {children}
    </button>
  )
}

// ── Modal ──────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, width = 480 }) {
  if (!open) return null
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", background: PASTEL.overlay, animation:"fadeIn 0.2s ease" }} onClick={onClose}>
      <div style={{ background: PASTEL.card, borderRadius:16, width:"90%", maxWidth:width, maxHeight:"85vh", overflow:"auto", padding:28, boxShadow:"0 20px 60px rgba(0,0,0,0.12)", animation:"scaleIn 0.25s ease" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ fontSize:18, fontWeight:600, color: PASTEL.text, fontFamily:"'Playfair Display', serif" }}>{title}</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}><XIcon /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ── Input ──────────────────────────────────────────────────
export function Input({ label, error, ...props }) {
  return (
    <div style={{ marginBottom:16 }}>
      {label && <label style={{ display:"block", fontSize:12, fontWeight:500, color: PASTEL.textMuted, marginBottom:6, fontFamily:"'DM Sans', sans-serif", textTransform:"uppercase", letterSpacing:"0.05em" }}>{label}</label>}
      <input
        style={{ width:"100%", padding:"10px 14px", border:`1.5px solid ${error ? PASTEL.rose : PASTEL.border}`, borderRadius:10, fontSize:14, fontFamily:"'DM Sans', sans-serif", color: PASTEL.text, background: PASTEL.bg, outline:"none", boxSizing:"border-box", transition:"border-color 0.2s" }}
        onFocus={(e)  => (e.target.style.borderColor = PASTEL.accent)}
        onBlur={(e)   => (e.target.style.borderColor = error ? PASTEL.rose : PASTEL.border)}
        {...props}
      />
      {error && <p style={{ fontSize:11, color:"#8A5055", marginTop:4 }}>{error}</p>}
    </div>
  )
}

// ── Badge ──────────────────────────────────────────────────
export function Badge({ children, color = PASTEL.accentSoft, textColor = PASTEL.accentDark, style }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:500, background:color, color:textColor, fontFamily:"'DM Sans', sans-serif", ...style }}>
      {children}
    </span>
  )
}

// ── Toast ──────────────────────────────────────────────────
export function Toast({ message }) {
  if (!message) return null
  return (
    <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background: PASTEL.text, color: PASTEL.white, padding:"10px 24px", borderRadius:10, fontSize:13, fontWeight:500, zIndex:2000, animation:"fadeIn 0.2s ease", boxShadow:"0 8px 24px rgba(0,0,0,0.15)", whiteSpace:"nowrap" }}>
      {message}
    </div>
  )
}
