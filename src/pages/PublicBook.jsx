// src/pages/PublicBook.jsx
// ─── What the outside world sees when they visit /book/:slug ─────────────────

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { PASTEL, FULL_DAYS, MONTHS, DAYS, pad } from "../lib/theme"
import { Button, Input, Modal, CheckIcon } from "../components/UI"
import MiniCalendar from "../components/MiniCalendar"

const today = new Date()

export default function PublicBook() {
  const { slug } = useParams()
  const [profile,    setProfile]    = useState(null)
  const [routines,   setRoutines]   = useState([])
  const [bookings,   setBookings]   = useState([])
  const [selected,   setSelected]   = useState(today)
  const [showModal,  setShowModal]  = useState(false)
  const [chosenSlot, setChosenSlot] = useState("")
  const [loading,    setLoading]    = useState(true)
  const [booked,     setBooked]     = useState(false)
  const [form,       setForm]       = useState({ name:"", email:"", note:"" })
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState("")

  useEffect(() => {
    loadProfile()
  }, [slug])

  useEffect(() => {
    if (profile) loadBookings()
  }, [profile, selected])

  const loadProfile = async () => {
    setLoading(true)
    // Try Supabase first; fall back to demo data if not configured
    try {
      const { data, error } = await supabase
        .from("profiles").select("*").eq("booking_slug", slug).single()
      if (error || !data) throw error
      setProfile(data)
      const { data: r } = await supabase.from("routines").select("*").eq("user_id", data.id)
      setRoutines(r || [])
    } catch {
      // Demo / offline fallback
      setProfile({ full_name: slug || "Demo User", booking_slug: slug, availability: { days:[1,2,3,4,5], startHour:10, endHour:17, slotDuration:30 } })
    }
    setLoading(false)
  }

  const loadBookings = async () => {
    if (!profile?.id) return
    const dateStr = `${selected.getFullYear()}-${pad(selected.getMonth()+1)}-${pad(selected.getDate())}`
    const { data } = await supabase.from("bookings").select("time").eq("host_id", profile.id).eq("date", dateStr).eq("status","confirmed")
    setBookings(data || [])
  }

  const av = profile?.availability || { days:[1,2,3,4,5], startHour:10, endHour:17, slotDuration:30 }
  const dayOfWeek = selected.getDay()
  const dateStr   = `${selected.getFullYear()}-${pad(selected.getMonth()+1)}-${pad(selected.getDate())}`

  const availableSlots = (() => {
    if (!av.days.includes(dayOfWeek)) return []
    const slots = []
    for (let h = av.startHour; h < av.endHour; h++) {
      for (let m = 0; m < 60; m += av.slotDuration) {
        const t = `${pad(h)}:${pad(m)}`
        const taken = bookings.some(b => b.time === t)
        const inRoutine = routines.some(r => {
          if (!r.days?.includes(dayOfWeek)) return false
          const [rh, rm] = r.time.split(":").map(Number)
          const rStart = rh * 60 + rm, rEnd = rStart + r.duration
          const slotStart = h * 60 + m
          return slotStart >= rStart && slotStart < rEnd
        })
        if (!taken && !inRoutine) slots.push(t)
      }
    }
    return slots
  })()

  const confirmBooking = async () => {
    if (!form.name || !form.email) { setError("Please fill in your name and email."); return }
    setSubmitting(true); setError("")
    try {
      if (profile?.id) {
        await supabase.from("bookings").insert({
          host_id: profile.id, guest_name: form.name, guest_email: form.email,
          date: dateStr, time: chosenSlot, duration: av.slotDuration, note: form.note, status:"confirmed"
        })
      }
      setBooked(true); setShowModal(false)
    } catch (e) { setError(e.message) }
    setSubmitting(false)
  }

  if (loading) return (
    <div style={{ minHeight:"100vh", background: PASTEL.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ fontSize:13, color: PASTEL.textMuted }}>Loading…</div>
    </div>
  )

  if (booked) return (
    <div style={{ minHeight:"100vh", background: PASTEL.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background: PASTEL.card, borderRadius:20, padding:40, textAlign:"center", maxWidth:400, width:"100%", boxShadow:"0 8px 40px rgba(0,0,0,0.06)", animation:"scaleIn 0.3s ease" }}>
        <div style={{ width:56, height:56, borderRadius:"50%", background: PASTEL.mintSoft, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
          <CheckIcon size={24} color="#5A8A78" />
        </div>
        <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:22, marginBottom:8 }}>You're booked!</h2>
        <p style={{ fontSize:14, color: PASTEL.textMuted, marginBottom:4 }}>
          <strong>{FULL_DAYS[dayOfWeek]}, {MONTHS[selected.getMonth()]} {selected.getDate()}</strong> at <strong>{chosenSlot}</strong>
        </p>
        <p style={{ fontSize:13, color: PASTEL.textMuted }}>with {profile?.full_name}</p>
        <p style={{ fontSize:12, color: PASTEL.textLight, marginTop:16 }}>A confirmation was sent to {form.email}</p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:"100vh", background: PASTEL.bg, padding:"24px 16px", fontFamily:"'DM Sans', sans-serif" }}>
      <div style={{ maxWidth:760, margin:"0 auto" }}>
        {/* Host card */}
        <div style={{ background: PASTEL.card, borderRadius:16, padding:24, border:`1px solid ${PASTEL.border}`, marginBottom:20, display:"flex", gap:16, alignItems:"center", animation:"fadeIn 0.3s ease" }}>
          <div style={{ width:52, height:52, borderRadius:"50%", background:`linear-gradient(135deg, ${PASTEL.accent}, ${PASTEL.peach})`, display:"flex", alignItems:"center", justifyContent:"center", color: PASTEL.white, fontSize:22, fontWeight:700 }}>
            {(profile?.full_name || "U")[0].toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize:18, fontWeight:600, fontFamily:"'Playfair Display', serif" }}>{profile?.full_name}</h2>
            <p style={{ fontSize:13, color: PASTEL.textMuted }}>{av.slotDuration} min · Video / Phone Call</p>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, animation:"fadeIn 0.35s ease" }}>
          {/* Calendar */}
          <div style={{ background: PASTEL.card, borderRadius:16, padding:24, border:`1px solid ${PASTEL.border}` }}>
            <h3 style={{ fontSize:15, fontWeight:600, fontFamily:"'Playfair Display', serif", marginBottom:16 }}>Pick a date</h3>
            <MiniCalendar selectedDate={selected} onSelect={setSelected} />
          </div>

          {/* Slots */}
          <div style={{ background: PASTEL.card, borderRadius:16, padding:24, border:`1px solid ${PASTEL.border}` }}>
            <h3 style={{ fontSize:15, fontWeight:600, fontFamily:"'Playfair Display', serif", marginBottom:4 }}>
              {FULL_DAYS[dayOfWeek]}, {MONTHS[selected.getMonth()]} {selected.getDate()}
            </h3>
            <p style={{ fontSize:12, color: PASTEL.textMuted, marginBottom:16 }}>{availableSlots.length} slots available</p>

            {!av.days.includes(dayOfWeek) ? (
              <div style={{ textAlign:"center", padding:24, color: PASTEL.textLight }}>
                <div style={{ fontSize:28, marginBottom:8 }}>😴</div>
                <p style={{ fontSize:13 }}>Not available on {FULL_DAYS[dayOfWeek]}s</p>
              </div>
            ) : availableSlots.length === 0 ? (
              <div style={{ textAlign:"center", padding:24, color: PASTEL.textLight }}>
                <div style={{ fontSize:28, marginBottom:8 }}>📋</div>
                <p style={{ fontSize:13 }}>No slots available this day</p>
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, maxHeight:300, overflowY:"auto" }}>
                {availableSlots.map(slot => (
                  <button key={slot}
                    onClick={() => { setChosenSlot(slot); setShowModal(true) }}
                    style={{ padding:"10px 14px", border:`1.5px solid ${PASTEL.border}`, borderRadius:10, background: PASTEL.white, cursor:"pointer", fontSize:13, fontWeight:500, fontFamily:"'DM Sans', sans-serif", color: PASTEL.text, transition:"all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = PASTEL.accent; e.currentTarget.style.background = PASTEL.accentSoft }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = PASTEL.border;  e.currentTarget.style.background = PASTEL.white }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking confirmation modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Confirm your booking">
        <div style={{ padding:"10px 14px", background: PASTEL.accentSoft, borderRadius:10, marginBottom:16, fontSize:13, color: PASTEL.accentDark }}>
          📅 {FULL_DAYS[dayOfWeek]}, {MONTHS[selected.getMonth()]} {selected.getDate()} at {chosenSlot} · {av.slotDuration} min
        </div>
        <Input label="Your Name"  placeholder="Jane Smith"        value={form.name}  onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
        <Input label="Your Email" placeholder="jane@example.com" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
        <Input label="Note (optional)" placeholder="What's this meeting about?" value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} />
        {error && <p style={{ fontSize:12, color:"#8A5055", marginBottom:12 }}>{error}</p>}
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={confirmBooking} disabled={submitting}>{submitting ? "Booking…" : "Confirm Booking"}</Button>
        </div>
      </Modal>
    </div>
  )
}
