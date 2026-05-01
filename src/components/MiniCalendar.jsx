// src/components/MiniCalendar.jsx
import { useState } from "react"
import { PASTEL, DAYS, MONTHS, pad } from "../lib/theme"
import { ChevronLeft, ChevronRight } from "./UI"

export default function MiniCalendar({ selectedDate, onSelect, highlightDates = [] }) {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth())
  const [viewYear,  setViewYear]  = useState(selectedDate.getFullYear())

  const firstDay     = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth  = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isToday    = (d) => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()
  const isSelected = (d) => d === selectedDate.getDate() && viewMonth === selectedDate.getMonth() && viewYear === selectedDate.getFullYear()
  const hasBooking = (d) => {
    const ds = `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`
    return highlightDates.includes(ds)
  }

  const prev = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) } else setViewMonth(m => m - 1) }
  const next = () => { if (viewMonth === 11) { setViewMonth(0);  setViewYear(y => y + 1) } else setViewMonth(m => m + 1) }

  return (
    <div style={{ userSelect:"none" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <button onClick={prev} style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}><ChevronLeft /></button>
        <span style={{ fontSize:14, fontWeight:600, color: PASTEL.text, fontFamily:"'Playfair Display', serif" }}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button onClick={next} style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}><ChevronRight /></button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:2, textAlign:"center" }}>
        {DAYS.map(d => (
          <div key={d} style={{ fontSize:10, fontWeight:600, color: PASTEL.textLight, padding:"4px 0", fontFamily:"'DM Sans', sans-serif", textTransform:"uppercase", letterSpacing:"0.05em" }}>{d}</div>
        ))}
        {cells.map((d, i) => (
          <div key={i} onClick={() => d && onSelect(new Date(viewYear, viewMonth, d))}
            style={{
              fontSize:13, fontWeight: isSelected(d) ? 600 : 400,
              width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center",
              borderRadius:"50%", cursor: d ? "pointer" : "default", margin:"0 auto", transition:"all 0.15s",
              background: isSelected(d) ? PASTEL.accent : isToday(d) ? PASTEL.accentSoft : "transparent",
              color:       isSelected(d) ? PASTEL.white  : d ? PASTEL.text : "transparent",
              fontFamily: "'DM Sans', sans-serif", position:"relative",
            }}
          >
            {d || ""}
            {d && hasBooking(d) && !isSelected(d) && (
              <div style={{ position:"absolute", bottom:2, width:4, height:4, borderRadius:"50%", background: PASTEL.mint }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
