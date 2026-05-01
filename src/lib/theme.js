// src/lib/theme.js
// ─── Shared design tokens ─────────────────────────────────

export const PASTEL = {
  bg: "#FAFAF8",
  card: "#FFFFFF",
  border: "#EDE8E3",
  accent: "#B8A9C9",
  accentSoft: "#E8E0F0",
  accentDark: "#8B7BA3",
  mint: "#B5D8CC",
  mintSoft: "#E0F0EA",
  peach: "#F0C9B8",
  peachSoft: "#FAE8E0",
  rose: "#E0B4B7",
  roseSoft: "#F5E0E2",
  sky: "#A8C8E8",
  skySoft: "#DDE8F5",
  sand: "#D8CFC4",
  sandSoft: "#F0ECE8",
  text: "#3A3632",
  textMuted: "#8A857E",
  textLight: "#B0AAA2",
  white: "#FFFFFF",
  overlay: "rgba(58, 54, 50, 0.3)",
}

export const ROUTINE_COLORS = [
  { name: "Lavender", bg: PASTEL.accentSoft, border: PASTEL.accent,  text: PASTEL.accentDark },
  { name: "Mint",     bg: PASTEL.mintSoft,   border: PASTEL.mint,    text: "#5A8A78" },
  { name: "Peach",    bg: PASTEL.peachSoft,  border: PASTEL.peach,   text: "#9A7060" },
  { name: "Rose",     bg: PASTEL.roseSoft,   border: PASTEL.rose,    text: "#8A6062" },
  { name: "Sky",      bg: PASTEL.skySoft,    border: PASTEL.sky,     text: "#5070A0" },
  { name: "Sand",     bg: PASTEL.sandSoft,   border: PASTEL.sand,    text: "#706858" },
]

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${PASTEL.bg}; font-family: 'DM Sans', sans-serif; color: ${PASTEL.text}; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: ${PASTEL.border}; border-radius: 4px; }
  @keyframes fadeIn  { from { opacity: 0; transform: translateY(8px);  } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.95);       } to { opacity: 1; transform: scale(1);    } }
`

export const DAYS       = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
export const FULL_DAYS  = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
export const MONTHS     = ["January","February","March","April","May","June","July","August","September","October","November","December"]
export const HOURS      = Array.from({ length: 24 }, (_, i) => i + 1)

export const pad = (n) => String(n).padStart(2, "0")
export const uid = () => Math.random().toString(36).slice(2, 10)
