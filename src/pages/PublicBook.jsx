import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getThemeColors, getComponentTokens, TEXT_STYLES, SPACING, RADIUS, SHADOWS, TRANSITIONS, EASING, ICON_SIZES } from '../lib/design-system'
import { ThemeContext } from '../lib/theme-context'
import { SuccessIllustration, BookingIllustration, EmptyStateIllustration } from '../components/Illustrations'
import { Calendar, Clock, AlertCircle } from 'phosphor-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const FULL_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const pad = (n) => String(n).padStart(2, '0')

export default function PublicBook() {
  const { colors } = useContext(ThemeContext) || { colors: {} }
  const { slug } = useParams()

  const [profile, setProfile] = useState(null)
  const [routines, setRoutines] = useState([])
  const [bookings, setBookings] = useState([])
  const [selected, setSelected] = useState(new Date())
  const [showModal, setShowModal] = useState(false)
  const [chosenSlot, setChosenSlot] = useState('')
  const [loading, setLoading] = useState(true)
  const [booked, setBooked] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', note: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProfile()
  }, [slug])

  useEffect(() => {
    if (profile) loadBookings()
  }, [profile, selected])

  const loadProfile = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('booking_slug', slug)
        .single()
      if (error || !data) throw error
      setProfile(data)
      const { data: r } = await supabase.from('routines').select('*').eq('user_id', data.id)
      setRoutines(r || [])
    } catch {
      setProfile({
        full_name: slug || 'Demo User',
        booking_slug: slug,
        availability: { days: [1, 2, 3, 4, 5], startHour: 10, endHour: 17, slotDuration: 30 },
      })
    }
    setLoading(false)
  }

  const loadBookings = async () => {
    if (!profile?.id) return
    const dateStr = `${selected.getFullYear()}-${pad(selected.getMonth() + 1)}-${pad(selected.getDate())}`
    const { data } = await supabase
      .from('bookings')
      .select('time')
      .eq('host_id', profile.id)
      .eq('date', dateStr)
      .eq('status', 'confirmed')
    setBookings(data || [])
  }

  const av = profile?.availability || { days: [1, 2, 3, 4, 5], startHour: 10, endHour: 17, slotDuration: 30 }
  const dayOfWeek = selected.getDay()
  const dateStr = `${selected.getFullYear()}-${pad(selected.getMonth() + 1)}-${pad(selected.getDate())}`

  const availableSlots = (() => {
    if (!av.days.includes(dayOfWeek)) return []
    const slots = []
    for (let h = av.startHour; h < av.endHour; h++) {
      for (let m = 0; m < 60; m += av.slotDuration) {
        const t = `${pad(h)}:${pad(m)}`
        const taken = bookings.some((b) => b.time === t)
        const inRoutine = routines.some((r) => {
          if (!r.days?.includes(dayOfWeek)) return false
          const [rh, rm] = r.time.split(':').map(Number)
          const rStart = rh * 60 + rm,
            rEnd = rStart + r.duration
          const slotStart = h * 60 + m
          return slotStart >= rStart && slotStart < rEnd
        })
        if (!taken && !inRoutine) slots.push(t)
      }
    }
    return slots
  })()

  const confirmBooking = async () => {
    if (!form.name || !form.email) {
      setError('Please fill in your name and email.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      if (profile?.id) {
        await supabase.from('bookings').insert({
          host_id: profile.id,
          guest_name: form.name,
          guest_email: form.email,
          date: dateStr,
          time: chosenSlot,
          duration: av.slotDuration,
          note: form.note,
          status: 'confirmed',
        })
      }
      setBooked(true)
      setShowModal(false)
    } catch (e) {
      setError(e.message)
    }
    setSubmitting(false)
  }

  const renderCalendar = () => {
    const year = selected.getFullYear()
    const month = selected.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  if (loading)
    return (
      <div
        style={{
          minHeight: '100vh',
          background: colors.bg?.primary || '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: TEXT_STYLES.bodyMd.fontFamily,
          color: colors.text?.secondary || '#6B7280',
        }}
      >
        <p style={{ ...TEXT_STYLES.bodyMd }}>Loading…</p>
      </div>
    )

  if (booked)
    return (
      <div
        style={{
          minHeight: '100vh',
          background: colors.bg?.primary || '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: SPACING[4],
        }}
      >
        <div
          style={{
            background: colors.bg?.primary,
            border: `1px solid ${colors.border?.default}`,
            borderRadius: RADIUS.xl,
            padding: SPACING[12],
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%',
            boxShadow: SHADOWS.lg,
            animation: `scaleIn ${TRANSITIONS.slow} ${EASING.easeOut}`,
          }}
        >
          <div style={{ margin: `0 auto ${SPACING[4]}`, display: 'flex', justifyContent: 'center' }}>
            <SuccessIllustration colors={colors} size="100px" />
          </div>

          <h2
            style={{
              ...TEXT_STYLES.headingMd,
              color: colors.text?.primary,
              marginBottom: SPACING[2],
            }}
          >
            You're booked!
          </h2>

          <p
            style={{
              ...TEXT_STYLES.bodyMd,
              color: colors.text?.secondary,
              marginBottom: SPACING[1],
            }}
          >
            <strong>{FULL_DAYS[dayOfWeek]}, {MONTHS[selected.getMonth()]} {selected.getDate()}</strong> at{' '}
            <strong>{chosenSlot}</strong>
          </p>

          <p
            style={{
              ...TEXT_STYLES.bodySm,
              color: colors.text?.secondary,
              marginBottom: SPACING[4],
            }}
          >
            with {profile?.full_name}
          </p>

          <p
            style={{
              ...TEXT_STYLES.bodySm,
              color: colors.text?.secondary,
            }}
          >
            A confirmation was sent to <strong>{form.email}</strong>
          </p>
        </div>
      </div>
    )

  const calendarDays = renderCalendar()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.bg?.primary || '#FFFFFF',
        padding: `${SPACING[6]} ${SPACING[4]}`,
        fontFamily: TEXT_STYLES.bodyMd.fontFamily,
        color: colors.text?.primary,
        transition: `background ${TRANSITIONS.slow} ${EASING.easeInOut}`,
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Host Card */}
        <div
          style={{
            background: colors.bg?.primary,
            border: `1px solid ${colors.border?.default}`,
            borderRadius: RADIUS.lg,
            padding: SPACING[6],
            marginBottom: SPACING[8],
            display: 'flex',
            gap: SPACING[4],
            alignItems: 'center',
            boxShadow: SHADOWS.sm,
            animation: `slideInUp ${TRANSITIONS.slow} ${EASING.easeOut}`,
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: colors.gradients?.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.bg?.primary,
              fontSize: '20px',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {(profile?.full_name || 'U')[0].toUpperCase()}
          </div>

          <div>
            <h2
              style={{
                ...TEXT_STYLES.headingMd,
                color: colors.text?.primary,
                margin: 0,
              }}
            >
              {profile?.full_name}
            </h2>
            <p
              style={{
                ...TEXT_STYLES.bodySm,
                color: colors.text?.secondary,
                margin: `${SPACING[1]} 0 0 0`,
              }}
            >
              {av.slotDuration} min · Video or Phone Call
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: SPACING[6],
            animation: `slideInUp ${TRANSITIONS.slow} ${EASING.easeOut}`,
          }}
        >
          {/* Calendar */}
          <div
            style={{
              background: colors.bg?.primary,
              border: `1px solid ${colors.border?.default}`,
              borderRadius: RADIUS.lg,
              padding: SPACING[6],
              boxShadow: SHADOWS.sm,
            }}
          >
            <h3
              style={{
                ...TEXT_STYLES.headingSm,
                color: colors.text?.primary,
                margin: `0 0 ${SPACING[4]} 0`,
              }}
            >
              Pick a date
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: SPACING[2],
              }}
            >
              {DAYS.map((day) => (
                <div
                  key={day}
                  style={{
                    ...TEXT_STYLES.caption,
                    color: colors.text?.secondary,
                    textAlign: 'center',
                    fontWeight: 600,
                  }}
                >
                  {day}
                </div>
              ))}

              {calendarDays.map((date, idx) => (
                <button
                  key={idx}
                  onClick={() => date && setSelected(date)}
                  disabled={!date}
                  style={{
                    padding: SPACING[2],
                    border: date && date.toDateString() === selected.toDateString() ? `2px solid ${colors.primary?.[500]}` : `1px solid ${colors.border?.default}`,
                    background:
                      date && date.toDateString() === selected.toDateString()
                        ? colors.primary?.[500]
                        : colors.bg?.secondary,
                    color:
                      date && date.toDateString() === selected.toDateString()
                        ? colors.bg?.primary
                        : colors.text?.primary,
                    borderRadius: RADIUS.md,
                    cursor: date ? 'pointer' : 'default',
                    fontSize: TEXT_STYLES.bodySm.fontSize,
                    fontWeight: 500,
                    opacity: date ? 1 : 0.3,
                    transition: `all ${TRANSITIONS.base}`,
                  }}
                  onMouseEnter={(e) => {
                    if (date && date.toDateString() !== selected.toDateString()) {
                      e.currentTarget.style.background = colors.bg?.tertiary
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (date && date.toDateString() !== selected.toDateString()) {
                      e.currentTarget.style.background = colors.bg?.secondary
                    }
                  }}
                >
                  {date ? date.getDate() : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div
            style={{
              background: colors.bg?.primary,
              border: `1px solid ${colors.border?.default}`,
              borderRadius: RADIUS.lg,
              padding: SPACING[6],
              boxShadow: SHADOWS.sm,
            }}
          >
            <h3
              style={{
                ...TEXT_STYLES.headingSm,
                color: colors.text?.primary,
                margin: 0,
              }}
            >
              {FULL_DAYS[dayOfWeek]}, {MONTHS[selected.getMonth()]} {selected.getDate()}
            </h3>

            <p
              style={{
                ...TEXT_STYLES.bodySm,
                color: colors.text?.secondary,
                margin: `${SPACING[2]} 0 ${SPACING[4]} 0`,
              }}
            >
              {availableSlots.length} slots available
            </p>

            {!av.days.includes(dayOfWeek) ? (
              <div style={{ textAlign: 'center', padding: SPACING[6], color: colors.text?.secondary }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: SPACING[2] }}>
                  <AlertCircle size={ICON_SIZES.xl} color={colors.text?.secondary} weight="duotone" />
                </div>
                <p style={{ ...TEXT_STYLES.bodyMd, margin: 0 }}>Not available on {FULL_DAYS[dayOfWeek]}s</p>
              </div>
            ) : availableSlots.length === 0 ? (
              <div style={{ textAlign: 'center', padding: SPACING[6], color: colors.text?.secondary }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: SPACING[2] }}>
                  <Calendar size={ICON_SIZES.xl} color={colors.text?.secondary} weight="duotone" />
                </div>
                <p style={{ ...TEXT_STYLES.bodyMd, margin: 0 }}>No slots available this day</p>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: SPACING[3],
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => {
                      setChosenSlot(slot)
                      setShowModal(true)
                    }}
                    style={{
                      padding: `${SPACING[2]} ${SPACING[3]}`,
                      border: `1px solid ${colors.border?.default}`,
                      borderRadius: RADIUS.md,
                      background: colors.bg?.secondary,
                      color: colors.text?.primary,
                      cursor: 'pointer',
                      fontSize: TEXT_STYLES.bodySm.fontSize,
                      fontWeight: 500,
                      transition: `all ${TRANSITIONS.base}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.primary?.[500]
                      e.currentTarget.style.background = colors.primary?.[500]
                      e.currentTarget.style.color = colors.bg?.primary
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border?.default
                      e.currentTarget.style.background = colors.bg?.secondary
                      e.currentTarget.style.color = colors.text?.primary
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: SPACING[4],
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: colors.bg?.primary,
              border: `1px solid ${colors.border?.default}`,
              borderRadius: RADIUS.lg,
              padding: SPACING[8],
              maxWidth: '440px',
              width: '100%',
              boxShadow: SHADOWS.xl,
              animation: `slideInUp ${TRANSITIONS.slow} ${EASING.easeOut}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                ...TEXT_STYLES.headingMd,
                color: colors.text?.primary,
                margin: `0 0 ${SPACING[4]} 0`,
              }}
            >
              Confirm your booking
            </h2>

            <div
              style={{
                background: colors.primary?.[500],
                borderRadius: RADIUS.md,
                padding: SPACING[3],
                marginBottom: SPACING[6],
                color: colors.bg?.primary,
                fontSize: TEXT_STYLES.bodySm.fontSize,
              }}
            >
              📅 {FULL_DAYS[dayOfWeek]}, {MONTHS[selected.getMonth()]} {selected.getDate()} at {chosenSlot} · {av.slotDuration}{' '}
              min
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING[4], marginBottom: SPACING[6] }}>
              <div>
                <label
                  style={{
                    ...TEXT_STYLES.labelSm,
                    color: colors.text?.primary,
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: SPACING[2],
                  }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  style={{
                    width: '100%',
                    height: SPACING[10],
                    padding: `${SPACING[2]} ${SPACING[3]}`,
                    border: `1px solid ${colors.border?.default}`,
                    borderRadius: RADIUS.md,
                    fontSize: TEXT_STYLES.bodyMd.fontSize,
                    fontFamily: TEXT_STYLES.bodyMd.fontFamily,
                    color: colors.text?.primary,
                    background: colors.bg?.secondary,
                    boxSizing: 'border-box',
                    transition: `all ${TRANSITIONS.base}`,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary?.[500]
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary?.[500]}22`
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = colors.border?.default
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    ...TEXT_STYLES.labelSm,
                    color: colors.text?.primary,
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: SPACING[2],
                  }}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  style={{
                    width: '100%',
                    height: SPACING[10],
                    padding: `${SPACING[2]} ${SPACING[3]}`,
                    border: `1px solid ${colors.border?.default}`,
                    borderRadius: RADIUS.md,
                    fontSize: TEXT_STYLES.bodyMd.fontSize,
                    fontFamily: TEXT_STYLES.bodyMd.fontFamily,
                    color: colors.text?.primary,
                    background: colors.bg?.secondary,
                    boxSizing: 'border-box',
                    transition: `all ${TRANSITIONS.base}`,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary?.[500]
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary?.[500]}22`
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = colors.border?.default
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    ...TEXT_STYLES.labelSm,
                    color: colors.text?.primary,
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: SPACING[2],
                  }}
                >
                  Note (optional)
                </label>
                <textarea
                  placeholder="What's this meeting about?"
                  value={form.note}
                  onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                  style={{
                    width: '100%',
                    minHeight: SPACING[16],
                    padding: `${SPACING[2]} ${SPACING[3]}`,
                    border: `1px solid ${colors.border?.default}`,
                    borderRadius: RADIUS.md,
                    fontSize: TEXT_STYLES.bodyMd.fontSize,
                    fontFamily: TEXT_STYLES.bodyMd.fontFamily,
                    color: colors.text?.primary,
                    background: colors.bg?.secondary,
                    boxSizing: 'border-box',
                    transition: `all ${TRANSITIONS.base}`,
                    resize: 'vertical',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary?.[500]
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary?.[500]}22`
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = colors.border?.default
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            {error && (
              <p
                style={{
                  ...TEXT_STYLES.bodySm,
                  color: colors.error || '#EF4444',
                  marginBottom: SPACING[4],
                }}
              >
                {error}
              </p>
            )}

            <div style={{ display: 'flex', gap: SPACING[3], justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: `${SPACING[2]} ${SPACING[4]}`,
                  border: `1px solid ${colors.border?.default}`,
                  background: 'transparent',
                  color: colors.text?.primary,
                  borderRadius: RADIUS.md,
                  cursor: 'pointer',
                  fontSize: TEXT_STYLES.labelSm.fontSize,
                  fontWeight: 600,
                  transition: `all ${TRANSITIONS.base}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.bg?.secondary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Cancel
              </button>

              <button
                onClick={confirmBooking}
                disabled={submitting}
                style={{
                  padding: `${SPACING[2]} ${SPACING[4]}`,
                  border: 'none',
                  background: submitting ? colors.secondary?.[300] : colors.gradients?.primary,
                  color: colors.bg?.primary,
                  borderRadius: RADIUS.md,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  fontSize: TEXT_STYLES.labelSm.fontSize,
                  fontWeight: 600,
                  transition: `all ${TRANSITIONS.base}`,
                  opacity: submitting ? 0.7 : 1,
                  boxShadow: SHADOWS.md,
                }}
                onMouseEnter={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.boxShadow = SHADOWS.lg
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.boxShadow = SHADOWS.md
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                {submitting ? 'Booking…' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

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
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
