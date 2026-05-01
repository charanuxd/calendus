// src/pages/Dashboard.jsx
import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { PASTEL, ROUTINE_COLORS, DAYS, FULL_DAYS, MONTHS, HOURS, pad, uid } from "../lib/theme"
import {
  Button, Modal, Input, Badge, Toast,
  PlusIcon, XIcon, CheckIcon, CopyIcon, RepeatIcon,
  SettingsIcon, TrashIcon, LogoutIcon, ChevronLeft, ChevronRight
} from "../components/UI"
import MiniCalendar from "../components/MiniCalendar"

const today = new Date()
const ICONS = ["📌","🧘","💪","🎯","📖","✍️","🥗","🏃","💻","🎨","🎵","☕","🧠","❤️","🌙","🔥","🌿","⚡"]

export default function Dashboard({ session }) {
  const [view,      setView]      = useState("dashboard")
  const [selected,  setSelected]  = useState(today)
  const [routines,  setRoutines]  = useState([])
  const [bookings,  setBookings]  = useState([])
  const [profile,   setProfile]   = useState(null)
  const [toast,     setToast]     = useState("")
  const [loading,   setLoading]   = useState(true)

  // modals
  const [showRoutineModal, setShowRoutineModal] = useState(false)
  const [showBookModal,    setShowBookModal]    = useState(false)
  const [editingId,        setEditingId]        = useState(null)
  const [copied,           setCopied]           = useState(false)
  const [gcalOn,           setGcalOn]           = useState(false)

  // forms
  const emptyR = { title:"", time:"08:00", duration:30, days:[1,2,3,4,5], color:0, icon:"📌" }
  const [rForm, setRForm] = useState(emptyR)
  const emptyB = { name:"", email:"", time:"", note:"" }
  const [bForm, setBForm] = useState(emptyB)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500) }

  // ── Load data ──────────────────────────────────────────────
  useEffect(() => { loadAll() }, [session])

  const loadAll = async () => {
    setLoading(true)
    const uid = session?.user?.id
    if (!uid) { setLoading(false); return }

    const [{ data: p }, { data: r }, { data: b }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", uid).single(),
      supabase.from("routines").select("*").eq("user_id", uid).order("time"),
      supabase.from("bookings").select("*").eq("host_id", uid).eq("status","confirmed").order("date").order("time"),
    ])
    if (p) setProfile(p)
    if (r) setRoutines(r)
    if (b) setBookings(b)
    setLoading(false)
  }

  // ── Derived ────────────────────────────────────────────────
  const dayOfWeek  = selected.getDay()
  const dateStr    = `${selected.getFullYear()}-${pad(selected.getMonth()+1)}-${pad(selected.getDate())}`
  const av         = profile?.availability || { days:[1,2,3,4,5], startHour:10, endHour:17, slotDuration:30 }
  const todayR     = routines.filter(r => r.days?.includes(dayOfWeek))
  const todayB     = bookings.filter(b => b.date === dateStr)
  const bookDates  = bookings.map(b => b.date)
  const slug       = profile?.booking_slug || session?.user?.email?.split("@")[0] || "you"

  const availableSlots = (() => {
    if (!av.days.includes(dayOfWeek)) return []
    const slots = []
    for (let h = av.startHour; h < av.endHour; h++) {
      for (let m = 0; m < 60; m += av.slotDuration) {
        const t = `${pad(h)}:${pad(m)}`
        const taken     = todayB.some(b => b.time === t)
        const inRoutine = todayR.some(r => {
          const [rh,rm] = r.time.split(":").map(Number)
          const rStart = rh*60+rm, rEnd = rStart+r.duration
          const s = h*60+m
          return s >= rStart && s < rEnd
        })
        if (!taken && !inRoutine) slots.push(t)
      }
    }
    return slots
  })()

  const timelineItems = [
    ...todayR.map(r  => ({ type:"routine", ...r })),
    ...todayB.map(b  => ({ type:"booking", id:b.id, title:b.guest_name, time:b.time, duration:b.duration, note:b.note })),
  ].sort((a,b) => a.time.localeCompare(b.time))

  // ── Routine CRUD ───────────────────────────────────────────
  const openNewR = () => { setEditingId(null); setRForm(emptyR); setShowRoutineModal(true) }
  const openEditR = (r) => { setEditingId(r.id); setRForm({ title:r.title, time:r.time, duration:r.duration, days:[...r.days], color:r.color||0, icon:r.icon||"📌" }); setShowRoutineModal(true) }

  const saveRoutine = async () => {
    if (!rForm.title) return
    const uid = session?.user?.id
    if (editingId) {
      await supabase.from("routines").update({ ...rForm }).eq("id", editingId)
      setRoutines(prev => prev.map(r => r.id === editingId ? { ...r, ...rForm } : r))
      showToast("Routine updated ✨")
    } else {
      const { data } = await supabase.from("routines").insert({ user_id: uid, ...rForm }).select().single()
      if (data) setRoutines(prev => [...prev, data])
      showToast("Routine added ✨")
    }
    setShowRoutineModal(false)
  }

  const deleteRoutine = async (id) => {
    await supabase.from("routines").delete().eq("id", id)
    setRoutines(prev => prev.filter(r => r.id !== id))
    showToast("Routine removed")
  }

  // ── Booking CRUD ───────────────────────────────────────────
  const saveBooking = async () => {
    if (!bForm.name || !bForm.time) return
    const { data } = await supabase.from("bookings").insert({
      host_id: session.user.id, guest_name: bForm.name, guest_email: bForm.email,
      date: dateStr, time: bForm.time, duration: av.slotDuration, note: bForm.note, status:"confirmed"
    }).select().single()
    if (data) setBookings(prev => [...prev, data])
    setBForm(emptyB); setShowBookModal(false); showToast("Meeting booked ✨")
  }

  const cancelBooking = async (id) => {
    await supabase.from("bookings").update({ status:"cancelled" }).eq("id", id)
    setBookings(prev => prev.filter(b => b.id !== id))
    showToast("Booking cancelled")
  }

  // ── Save availability ──────────────────────────────────────
  const saveAv = async (newAv) => {
    const next = { ...av, ...newAv }
    setProfile(p => ({ ...p, availability: next }))
    await supabase.from("profiles").update({ availability: next }).eq("id", session.user.id)
  }

  // ── Copy booking link ──────────────────────────────────────
  const copyLink = () => {
    const link = `${window.location.origin}/book/${slug}`
    navigator.clipboard?.writeText(link)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
    showToast("Link copied!")
  }

  const NAV = [
    { id:"dashboard", label:"Today",    icon:"◉" },
    { id:"schedule",  label:"Schedule", icon:"▦" },
    { id:"booking",   label:"Booking",  icon:"◎" },
    { id:"settings",  label:"Settings", icon:"⚙" },
  ]

  if (loading) return (
    <div style={{ minHeight:"100vh", background: PASTEL.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <p style={{ color: PASTEL.textMuted, fontSize:13 }}>Loading your schedule…</p>
    </div>
  )

  return (
    <div style={{ minHeight:"100vh", background: PASTEL.bg, fontFamily:"'DM Sans', sans-serif", color: PASTEL.text }}>
      <Toast message={toast} />

      {/* ── Header ── */}
      <header style={{ padding:"14px 24px", background: PASTEL.card, borderBottom:`1px solid ${PASTEL.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg, ${PASTEL.accent}, ${PASTEL.mint})`, display:"flex", alignItems:"center", justifyContent:"center", color: PASTEL.white, fontSize:16, fontWeight:700 }}>C</div>
          <div>
            <h1 style={{ fontSize:17, fontWeight:600, fontFamily:"'Playfair Display', serif" }}>MyCalendly</h1>
            <p style={{ fontSize:11, color: PASTEL.textLight }}>Hi, {profile?.full_name || session?.user?.email?.split("@")[0]} 👋</p>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ display:"flex", gap:4, background: PASTEL.bg, padding:3, borderRadius:12 }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setView(n.id)}
                style={{ padding:"7px 14px", border:"none", borderRadius:10, cursor:"pointer", fontSize:13, fontWeight:500, fontFamily:"'DM Sans', sans-serif", transition:"all 0.2s",
                  background: view === n.id ? PASTEL.card : "transparent",
                  color:      view === n.id ? PASTEL.text  : PASTEL.textMuted,
                  boxShadow:  view === n.id ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
                }}
              >
                <span style={{ marginRight:5 }}>{n.icon}</span>{n.label}
              </button>
            ))}
          </div>
          <button onClick={() => supabase.auth.signOut()} title="Sign out"
            style={{ background:"none", border:"none", cursor:"pointer", padding:6, opacity:0.5 }}>
            <LogoutIcon size={16} />
          </button>
        </div>
      </header>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 16px" }}>

        {/* ━━━ DASHBOARD ━━━ */}
        {view === "dashboard" && (
          <div style={{ display:"grid", gridTemplateColumns:"300px 1fr", gap:24, animation:"fadeIn 0.3s ease" }}>
            <div>
              <div style={{ background: PASTEL.card, borderRadius:16, padding:20, border:`1px solid ${PASTEL.border}`, marginBottom:14 }}>
                <MiniCalendar selectedDate={selected} onSelect={setSelected} highlightDates={bookDates} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                {[
                  { label:"Routines",   value: todayR.length,   color: PASTEL.accentSoft, icon:"🎯" },
                  { label:"Meetings",   value: todayB.length,   color: PASTEL.mintSoft,   icon:"📅" },
                  { label:"Free Slots", value: availableSlots.length, color: PASTEL.peachSoft, icon:"✨" },
                  { label:"Focus Hrs",  value: `${Math.round(todayR.reduce((a,r)=>a+r.duration,0)/60)}h`, color: PASTEL.skySoft, icon:"⏱" },
                ].map((s,i) => (
                  <div key={i} style={{ background:s.color, borderRadius:14, padding:"14px 16px" }}>
                    <div style={{ fontSize:18, marginBottom:4 }}>{s.icon}</div>
                    <div style={{ fontSize:22, fontWeight:700, fontFamily:"'Playfair Display', serif" }}>{s.value}</div>
                    <div style={{ fontSize:11, color: PASTEL.textMuted, fontWeight:500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: PASTEL.card, borderRadius:14, padding:16, border:`1px solid ${PASTEL.border}` }}>
                <div style={{ fontSize:11, fontWeight:600, color: PASTEL.textMuted, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:8 }}>Your Booking Link</div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <div style={{ flex:1, padding:"8px 12px", background: PASTEL.bg, borderRadius:8, fontSize:11, color: PASTEL.textMuted, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {window.location.origin}/book/{slug}
                  </div>
                  <button onClick={copyLink} style={{ background: copied ? PASTEL.mintSoft : PASTEL.accentSoft, border:"none", borderRadius:8, padding:"8px 10px", cursor:"pointer", transition:"all 0.2s" }}>
                    {copied ? <CheckIcon color="#5A8A78" size={14} /> : <CopyIcon color={PASTEL.accentDark} size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <div>
                  <h2 style={{ fontSize:22, fontWeight:600, fontFamily:"'Playfair Display', serif" }}>
                    {FULL_DAYS[dayOfWeek]}, {MONTHS[selected.getMonth()]} {selected.getDate()}
                  </h2>
                  <p style={{ fontSize:13, color: PASTEL.textMuted, marginTop:2 }}>{timelineItems.length} items scheduled</p>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <Button variant="secondary" size="sm" onClick={openNewR}><PlusIcon size={14} /> Routine</Button>
                  <Button size="sm" onClick={() => setShowBookModal(true)}><PlusIcon size={14} color="#fff" /> Book</Button>
                </div>
              </div>
              <div style={{ background: PASTEL.card, borderRadius:16, border:`1px solid ${PASTEL.border}`, overflow:"hidden" }}>
                {timelineItems.length === 0 ? (
                  <div style={{ padding:40, textAlign:"center", color: PASTEL.textLight }}>
                    <div style={{ fontSize:32, marginBottom:8 }}>🌿</div>
                    <p style={{ fontSize:14 }}>Nothing scheduled</p>
                  </div>
                ) : timelineItems.map((item, i) => {
                  const c = item.type === "routine" ? ROUTINE_COLORS[item.color||0] : { bg: PASTEL.mintSoft, border: PASTEL.mint, text:"#5A8A78" }
                  return (
                    <div key={item.id} style={{ display:"flex", gap:14, padding:"16px 20px", borderBottom: i < timelineItems.length-1 ? `1px solid ${PASTEL.border}` : "none", animation:`slideIn 0.3s ease ${i*0.04}s both` }}>
                      <div style={{ minWidth:52, textAlign:"right", paddingTop:2 }}>
                        <div style={{ fontSize:14, fontWeight:600 }}>{item.time}</div>
                        <div style={{ fontSize:11, color: PASTEL.textLight }}>{item.duration}m</div>
                      </div>
                      <div style={{ width:3, borderRadius:3, background:c.border, flexShrink:0 }} />
                      <div style={{ flex:1, background:c.bg, borderRadius:12, padding:"12px 16px" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                          <div>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                              {item.type === "routine" && <span style={{ fontSize:16 }}>{item.icon}</span>}
                              <span style={{ fontSize:14, fontWeight:600, color:c.text }}>{item.title}</span>
                            </div>
                            {item.type === "booking" && item.note && <p style={{ fontSize:12, color: PASTEL.textMuted, marginTop:4 }}>{item.note}</p>}
                          </div>
                          <div style={{ display:"flex", gap:4 }}>
                            {item.type === "routine" && (
                              <button onClick={() => openEditR(routines.find(r => r.id === item.id))} style={{ background:"none", border:"none", cursor:"pointer", padding:4, opacity:0.5 }}>
                                <SettingsIcon size={14} color={c.text} />
                              </button>
                            )}
                            {item.type === "booking" && (
                              <button onClick={() => cancelBooking(item.id)} style={{ background:"none", border:"none", cursor:"pointer", padding:4, opacity:0.5 }}>
                                <XIcon size={14} color="#8A5055" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ━━━ SCHEDULE ━━━ */}
        {view === "schedule" && (
          <div style={{ animation:"fadeIn 0.3s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h2 style={{ fontSize:22, fontWeight:600, fontFamily:"'Playfair Display', serif" }}>Weekly Schedule</h2>
              <Button size="sm" onClick={openNewR}><PlusIcon size={14} color="#fff" /> Add Routine</Button>
            </div>
            <div style={{ background: PASTEL.card, borderRadius:16, border:`1px solid ${PASTEL.border}`, overflow:"auto" }}>
              <div style={{ display:"grid", gridTemplateColumns:"60px repeat(7, 1fr)", minWidth:700 }}>
                <div style={{ padding:12, borderBottom:`1px solid ${PASTEL.border}` }} />
                {FULL_DAYS.map((d,i) => (
                  <div key={d} style={{ padding:"12px 8px", borderBottom:`1px solid ${PASTEL.border}`, borderLeft:`1px solid ${PASTEL.border}`, textAlign:"center" }}>
                    <div style={{ fontSize:12, fontWeight:600, color: i === today.getDay() ? PASTEL.accent : PASTEL.text }}>{d.slice(0,3)}</div>
                  </div>
                ))}
                {HOURS.map(h => (
                  <>
                    <div key={`h-${h}`} style={{ padding:"8px 8px", fontSize:11, color: PASTEL.textLight, textAlign:"right", borderBottom:`1px solid ${PASTEL.border}`, height:52 }}>
                      {h > 12 ? h-12 : h}{h >= 12 ? "p" : "a"}
                    </div>
                    {Array.from({ length:7 }, (_,di) => {
                      const rMatch = routines.filter(r => r.days?.includes(di) && +r.time.split(":")[0] === h)
                      const bMatch = bookings.filter(b => +b.time.split(":")[0] === h && new Date(b.date).getDay() === di)
                      return (
                        <div key={`${h}-${di}`} style={{ borderLeft:`1px solid ${PASTEL.border}`, borderBottom:`1px solid ${PASTEL.border}`, padding:2, height:52 }}>
                          {rMatch.map(r => { const c = ROUTINE_COLORS[r.color||0]; return (
                            <div key={r.id} onClick={() => openEditR(r)} style={{ background:c.bg, border:`1px solid ${c.border}`, borderRadius:6, padding:"3px 6px", fontSize:10, fontWeight:500, color:c.text, cursor:"pointer", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", marginBottom:1 }}>
                              {r.icon} {r.title}
                            </div>
                          )})}
                          {bMatch.map(b => (
                            <div key={b.id} style={{ background: PASTEL.mintSoft, border:`1px solid ${PASTEL.mint}`, borderRadius:6, padding:"3px 6px", fontSize:10, fontWeight:500, color:"#5A8A78", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                              📅 {b.guest_name}
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ━━━ BOOKING ━━━ */}
        {view === "booking" && (
          <div style={{ animation:"fadeIn 0.3s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div>
                <h2 style={{ fontSize:22, fontWeight:600, fontFamily:"'Playfair Display', serif" }}>Booking Page</h2>
                <p style={{ fontSize:13, color: PASTEL.textMuted, marginTop:2 }}>Your public booking link preview</p>
              </div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <div style={{ padding:"8px 14px", background: PASTEL.bg, borderRadius:10, fontSize:11, color: PASTEL.textMuted, border:`1px solid ${PASTEL.border}` }}>
                  {window.location.origin}/book/{slug}
                </div>
                <Button size="sm" variant="secondary" onClick={copyLink}>
                  {copied ? <CheckIcon size={14} color="#5A8A78" /> : <CopyIcon size={14} />} {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              <div style={{ background: PASTEL.card, borderRadius:16, border:`1px solid ${PASTEL.border}`, overflow:"hidden" }}>
                <div style={{ padding:"20px 20px 16px", borderBottom:`1px solid ${PASTEL.border}` }}>
                  <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                    <div style={{ width:44, height:44, borderRadius:"50%", background:`linear-gradient(135deg, ${PASTEL.accent}, ${PASTEL.peach})`, display:"flex", alignItems:"center", justifyContent:"center", color: PASTEL.white, fontSize:18, fontWeight:700 }}>
                      {(profile?.full_name || "U")[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 style={{ fontSize:15, fontWeight:600, fontFamily:"'Playfair Display', serif" }}>{profile?.full_name || "Your Name"}</h3>
                      <p style={{ fontSize:12, color: PASTEL.textMuted }}>{av.slotDuration} min · Video / Phone</p>
                    </div>
                  </div>
                </div>
                <div style={{ padding:20 }}>
                  <MiniCalendar selectedDate={selected} onSelect={setSelected} highlightDates={bookDates} />
                </div>
              </div>
              <div style={{ background: PASTEL.card, borderRadius:16, border:`1px solid ${PASTEL.border}`, padding:24 }}>
                <h3 style={{ fontSize:15, fontWeight:600, fontFamily:"'Playfair Display', serif", marginBottom:4 }}>
                  {FULL_DAYS[dayOfWeek]}, {MONTHS[selected.getMonth()]} {selected.getDate()}
                </h3>
                <p style={{ fontSize:12, color: PASTEL.textMuted, marginBottom:16 }}>{availableSlots.length} slots available</p>
                {!av.days.includes(dayOfWeek) ? (
                  <div style={{ textAlign:"center", padding:24, color: PASTEL.textLight }}>
                    <div style={{ fontSize:28, marginBottom:8 }}>😴</div>
                    <p style={{ fontSize:13 }}>Not available on {FULL_DAYS[dayOfWeek]}s</p>
                  </div>
                ) : (
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, maxHeight:280, overflowY:"auto" }}>
                    {availableSlots.map(s => (
                      <button key={s} onClick={() => { setBForm(p => ({...p,time:s})); setShowBookModal(true) }}
                        style={{ padding:"10px 14px", border:`1.5px solid ${PASTEL.border}`, borderRadius:10, background: PASTEL.white, cursor:"pointer", fontSize:13, fontWeight:500, fontFamily:"'DM Sans', sans-serif", color: PASTEL.text, transition:"all 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = PASTEL.accent; e.currentTarget.style.background = PASTEL.accentSoft }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = PASTEL.border;  e.currentTarget.style.background = PASTEL.white }}
                      >{s}</button>
                    ))}
                  </div>
                )}
                {todayB.length > 0 && (
                  <div style={{ marginTop:20, paddingTop:16, borderTop:`1px solid ${PASTEL.border}` }}>
                    <h4 style={{ fontSize:12, fontWeight:600, color: PASTEL.textMuted, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:10 }}>Booked Today</h4>
                    {todayB.map(b => (
                      <div key={b.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px", background: PASTEL.mintSoft, borderRadius:10, marginBottom:6 }}>
                        <div>
                          <div style={{ fontSize:13, fontWeight:600, color:"#5A8A78" }}>{b.time} — {b.guest_name}</div>
                          {b.note && <div style={{ fontSize:11, color: PASTEL.textMuted }}>{b.note}</div>}
                        </div>
                        <button onClick={() => cancelBooking(b.id)} style={{ background:"none", border:"none", cursor:"pointer" }}><XIcon size={14} color="#8A5055" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ━━━ SETTINGS ━━━ */}
        {view === "settings" && (
          <div style={{ maxWidth:600, animation:"fadeIn 0.3s ease" }}>
            <h2 style={{ fontSize:22, fontWeight:600, fontFamily:"'Playfair Display', serif", marginBottom:20 }}>Settings</h2>

            {/* Profile */}
            <div style={{ background: PASTEL.card, borderRadius:16, border:`1px solid ${PASTEL.border}`, padding:24, marginBottom:16 }}>
              <h3 style={{ fontSize:15, fontWeight:600, fontFamily:"'Playfair Display', serif", marginBottom:16 }}>Profile</h3>
              <Input label="Full Name" value={profile?.full_name || ""} onChange={e => setProfile(p => ({...p, full_name: e.target.value}))} />
              <Input label="Booking Slug" value={profile?.booking_slug || ""} onChange={e => setProfile(p => ({...p, booking_slug: e.target.value}))} />
              <Button onClick={async () => { await supabase.from("profiles").update({ full_name: profile.full_name, booking_slug: profile.booking_slug }).eq("id", session.user.id); showToast("Profile saved ✨") }}>Save Profile</Button>
            </div>

            {/* Availability */}
            <div style={{ background: PASTEL.card, borderRadius:16, border:`1px solid ${PASTEL.border}`, padding:24, marginBottom:16 }}>
              <h3 style={{ fontSize:15, fontWeight:600, fontFamily:"'Playfair Display', serif", marginBottom:16 }}>Availability</h3>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:12, fontWeight:500, color: PASTEL.textMuted, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>Available Days</label>
                <div style={{ display:"flex", gap:6 }}>
                  {DAYS.map((d,i) => (
                    <button key={d} onClick={() => saveAv({ days: av.days.includes(i) ? av.days.filter(x=>x!==i) : [...av.days,i].sort() })}
                      style={{ width:40, height:40, borderRadius:10, border:`1.5px solid ${av.days.includes(i) ? PASTEL.accent : PASTEL.border}`, background: av.days.includes(i) ? PASTEL.accentSoft : PASTEL.white, color: av.days.includes(i) ? PASTEL.accentDark : PASTEL.textMuted, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', sans-serif", transition:"all 0.15s" }}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                {[
                  { label:"Start", key:"startHour", options: Array.from({length:12},(_,i)=>i+6) },
                  { label:"End",   key:"endHour",   options: Array.from({length:12},(_,i)=>i+12) },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display:"block", fontSize:12, fontWeight:500, color: PASTEL.textMuted, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>{f.label}</label>
                    <select value={av[f.key]} onChange={e => saveAv({ [f.key]: +e.target.value })} style={{ width:"100%", padding:"10px 14px", border:`1.5px solid ${PASTEL.border}`, borderRadius:10, fontSize:14, fontFamily:"'DM Sans', sans-serif", color: PASTEL.text, background: PASTEL.bg }}>
                      {f.options.map(h => <option key={h} value={h}>{pad(h)}:00</option>)}
                    </select>
                  </div>
                ))}
                <div>
                  <label style={{ display:"block", fontSize:12, fontWeight:500, color: PASTEL.textMuted, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Slot</label>
                  <select value={av.slotDuration} onChange={e => saveAv({ slotDuration: +e.target.value })} style={{ width:"100%", padding:"10px 14px", border:`1.5px solid ${PASTEL.border}`, borderRadius:10, fontSize:14, fontFamily:"'DM Sans', sans-serif", color: PASTEL.text, background: PASTEL.bg }}>
                    {[15,30,45,60].map(m => <option key={m} value={m}>{m} min</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Google Calendar */}
            <div style={{ background: PASTEL.card, borderRadius:16, border:`1px solid ${PASTEL.border}`, padding:24, marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <h3 style={{ fontSize:15, fontWeight:600, fontFamily:"'Playfair Display', serif" }}>Google Calendar</h3>
                  <p style={{ fontSize:12, color: PASTEL.textMuted, marginTop:4 }}>Sync events to avoid double-bookings</p>
                </div>
                <button onClick={() => { setGcalOn(!gcalOn); showToast(gcalOn ? "Disconnected" : "Google Calendar connected! ✨") }}
                  style={{ padding:"10px 20px", borderRadius:10, border: gcalOn ? `1.5px solid ${PASTEL.mint}` : `1.5px solid ${PASTEL.border}`, background: gcalOn ? PASTEL.mintSoft : PASTEL.white, color: gcalOn ? "#5A8A78" : PASTEL.text, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', sans-serif", transition:"all 0.2s" }}>
                  {gcalOn ? "✓ Connected" : "Connect"}
                </button>
              </div>
            </div>

            {/* Routines */}
            <div style={{ background: PASTEL.card, borderRadius:16, border:`1px solid ${PASTEL.border}`, padding:24 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <h3 style={{ fontSize:15, fontWeight:600, fontFamily:"'Playfair Display', serif" }}>Routines ({routines.length})</h3>
                <Button size="sm" onClick={openNewR}><PlusIcon size={14} color="#fff" /> Add</Button>
              </div>
              {routines.map((r,i) => { const c = ROUTINE_COLORS[r.color||0]; return (
                <div key={r.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", background:c.bg, borderRadius:12, marginBottom:8, animation:`slideIn 0.3s ease ${i*0.03}s both` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:18 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:c.text }}>{r.title}</div>
                      <div style={{ fontSize:11, color: PASTEL.textMuted }}>{r.time} · {r.duration}min · {r.days?.map(d=>DAYS[d]).join(", ")}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:4 }}>
                    <button onClick={() => openEditR(r)} style={{ background:"none", border:"none", cursor:"pointer", padding:6 }}><SettingsIcon size={14} /></button>
                    <button onClick={() => deleteRoutine(r.id)} style={{ background:"none", border:"none", cursor:"pointer", padding:6 }}><TrashIcon size={14} color="#8A5055" /></button>
                  </div>
                </div>
              )})}
            </div>
          </div>
        )}
      </div>

      {/* ── Routine Modal ── */}
      <Modal open={showRoutineModal} onClose={() => setShowRoutineModal(false)} title={editingId ? "Edit Routine" : "New Routine"}>
        <Input label="Title" placeholder="e.g. Morning Run" value={rForm.title} onChange={e => setRForm(p=>({...p,title:e.target.value}))} />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <Input label="Time" type="time" value={rForm.time} onChange={e => setRForm(p=>({...p,time:e.target.value}))} />
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:500, color: PASTEL.textMuted, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Duration</label>
            <select value={rForm.duration} onChange={e => setRForm(p=>({...p,duration:+e.target.value}))} style={{ width:"100%", padding:"10px 14px", border:`1.5px solid ${PASTEL.border}`, borderRadius:10, fontSize:14, fontFamily:"'DM Sans', sans-serif", color: PASTEL.text, background: PASTEL.bg }}>
              {[15,20,30,45,60,90,120].map(m => <option key={m} value={m}>{m} min</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ display:"block", fontSize:12, fontWeight:500, color: PASTEL.textMuted, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>Repeat Days</label>
          <div style={{ display:"flex", gap:6 }}>
            {DAYS.map((d,i) => (
              <button key={d} onClick={() => setRForm(p=>({...p, days: p.days.includes(i) ? p.days.filter(x=>x!==i) : [...p.days,i].sort()}))}
                style={{ width:40, height:40, borderRadius:10, border:`1.5px solid ${rForm.days.includes(i) ? PASTEL.accent : PASTEL.border}`, background: rForm.days.includes(i) ? PASTEL.accentSoft : PASTEL.white, color: rForm.days.includes(i) ? PASTEL.accentDark : PASTEL.textMuted, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
                {d}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ display:"block", fontSize:12, fontWeight:500, color: PASTEL.textMuted, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>Color</label>
          <div style={{ display:"flex", gap:8 }}>
            {ROUTINE_COLORS.map((c,i) => (
              <button key={i} onClick={() => setRForm(p=>({...p,color:i}))}
                style={{ width:32, height:32, borderRadius:8, background:c.bg, border:`2px solid ${rForm.color===i ? c.border : "transparent"}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {rForm.color===i && <CheckIcon size={14} color={c.text} />}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:20 }}>
          <label style={{ display:"block", fontSize:12, fontWeight:500, color: PASTEL.textMuted, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>Icon</label>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {ICONS.map(e => (
              <button key={e} onClick={() => setRForm(p=>({...p,icon:e}))}
                style={{ width:36, height:36, borderRadius:8, border:`1.5px solid ${rForm.icon===e ? PASTEL.accent : PASTEL.border}`, background: rForm.icon===e ? PASTEL.accentSoft : PASTEL.white, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {e}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
          <Button variant="secondary" onClick={() => setShowRoutineModal(false)}>Cancel</Button>
          <Button onClick={saveRoutine}>{editingId ? "Update" : "Add"} Routine</Button>
        </div>
      </Modal>

      {/* ── Book Modal ── */}
      <Modal open={showBookModal} onClose={() => { setShowBookModal(false); setBForm(emptyB) }} title="Book a Meeting">
        <div style={{ padding:"10px 14px", background: PASTEL.accentSoft, borderRadius:10, marginBottom:16, fontSize:13, color: PASTEL.accentDark }}>
          📅 {FULL_DAYS[dayOfWeek]}, {MONTHS[selected.getMonth()]} {selected.getDate()} {bForm.time && `at ${bForm.time}`}
        </div>
        <Input label="Guest Name"  placeholder="Guest name"       value={bForm.name}  onChange={e => setBForm(p=>({...p,name:e.target.value}))} />
        <Input label="Guest Email" placeholder="guest@email.com"  type="email" value={bForm.email} onChange={e => setBForm(p=>({...p,email:e.target.value}))} />
        {!bForm.time && (
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:500, color: PASTEL.textMuted, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>Select Time</label>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, maxHeight:160, overflowY:"auto" }}>
              {availableSlots.map(s => (
                <button key={s} onClick={() => setBForm(p=>({...p,time:s}))}
                  style={{ padding:"8px 12px", border:`1.5px solid ${bForm.time===s ? PASTEL.accent : PASTEL.border}`, borderRadius:8, background: bForm.time===s ? PASTEL.accentSoft : PASTEL.white, fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        <Input label="Note (optional)" placeholder="What's this about?" value={bForm.note} onChange={e => setBForm(p=>({...p,note:e.target.value}))} />
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
          <Button variant="secondary" onClick={() => { setShowBookModal(false); setBForm(emptyB) }}>Cancel</Button>
          <Button onClick={saveBooking}>Confirm Booking</Button>
        </div>
      </Modal>
    </div>
  )
}
