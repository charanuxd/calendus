import { useState, useEffect, useContext } from 'react'
import { supabase } from '../lib/supabase'
import { getThemeColors, getComponentTokens, TEXT_STYLES, SPACING, RADIUS, SHADOWS, TRANSITIONS, EASING, ICON_SIZES } from '../lib/design-system'
import { ThemeContext } from '../lib/theme-context'
import { RoutinesIllustration, BookingIllustration, CalendarIllustration } from '../components/Illustrations'
import { SignOut, Moon, Sun, Clock, Link as LinkIcon } from 'phosphor-react'

export default function Dashboard({ session }) {
  const { theme, toggleTheme, colors } = useContext(ThemeContext) || { theme: 'light', toggleTheme: () => {}, colors: {} }
  const componentTokens = getComponentTokens(theme)

  const [view, setView] = useState('today')
  const [routines, setRoutines] = useState([])
  const [bookings, setBookings] = useState([])
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    // Load user profile and data
    const loadData = async () => {
      try {
        // Placeholder: In production, fetch from Supabase
        setProfile({ name: 'Welcome' })
      } catch (e) {
        console.error(e)
      }
    }
    loadData()
  }, [session])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.bg?.primary || '#FFFFFF',
        color: colors.text?.primary || '#111827',
        fontFamily: TEXT_STYLES.bodyMd.fontFamily,
        transition: `background ${TRANSITIONS.slow} ${EASING.easeInOut}`,
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: `1px solid ${colors.border?.default}`,
          padding: `${SPACING[4]} ${SPACING[6]}`,
          background: colors.bg?.primary,
          transition: `all ${TRANSITIONS.slow}`,
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h1
              style={{
                ...TEXT_STYLES.headingXl,
                color: colors.text?.primary,
                margin: 0,
              }}
            >
              📅 Caloday
            </h1>
            <p
              style={{
                ...TEXT_STYLES.bodySm,
                color: colors.text?.secondary,
                margin: `${SPACING[1]} 0 0 0`,
              }}
            >
              {session?.user?.email}
            </p>
          </div>

          <div style={{ display: 'flex', gap: SPACING[3], alignItems: 'center' }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                width: SPACING[10],
                height: SPACING[10],
                borderRadius: RADIUS.md,
                border: `1px solid ${colors.border?.default}`,
                background: colors.bg?.secondary,
                color: colors.text?.primary,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: `all ${TRANSITIONS.fast}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.bg?.tertiary
                e.currentTarget.style.boxShadow = SHADOWS.md
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.bg?.secondary
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {theme === 'light' ? (
                <Moon size={ICON_SIZES.md} weight="duotone" />
              ) : (
                <Sun size={ICON_SIZES.md} weight="duotone" />
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                padding: `${SPACING[2]} ${SPACING[4]}`,
                borderRadius: RADIUS.md,
                border: `1px solid ${colors.border?.default}`,
                background: colors.bg?.secondary,
                color: colors.text?.primary,
                cursor: 'pointer',
                fontSize: TEXT_STYLES.bodySm.fontSize,
                fontWeight: 600,
                transition: `all ${TRANSITIONS.base}`,
                display: 'flex',
                alignItems: 'center',
                gap: SPACING[2],
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.border?.dark
                e.currentTarget.style.boxShadow = SHADOWS.md
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.bg?.secondary
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <SignOut size={ICON_SIZES.sm} weight="duotone" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: SPACING[8],
        }}
      >
        {/* Welcome Card */}
        <div
          style={{
            background: colors.gradients?.primary,
            borderRadius: RADIUS.xl,
            padding: SPACING[8],
            marginBottom: SPACING[8],
            color: colors.bg?.primary,
            boxShadow: SHADOWS.lg,
            animation: `slideInUp ${TRANSITIONS.slow} ${EASING.easeOut}`,
          }}
        >
          <h2
            style={{
              ...TEXT_STYLES.headingXl,
              color: colors.bg?.primary,
              margin: 0,
              marginBottom: SPACING[2],
            }}
          >
            Welcome back!
          </h2>
          <p
            style={{
              ...TEXT_STYLES.bodyMd,
              color: colors.bg?.primary,
              opacity: 0.9,
              margin: 0,
            }}
          >
            You're all set. Start managing your time with intention.
          </p>
        </div>

        {/* View Tabs */}
        <div
          style={{
            display: 'flex',
            gap: SPACING[2],
            marginBottom: SPACING[6],
            borderBottom: `1px solid ${colors.border?.default}`,
            paddingBottom: SPACING[4],
          }}
        >
          {['today', 'schedule', 'booking', 'settings'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: `${SPACING[2]} ${SPACING[4]}`,
                border: 'none',
                background: 'transparent',
                color: view === v ? colors.primary?.[500] : colors.text?.secondary,
                cursor: 'pointer',
                fontSize: TEXT_STYLES.labelMd.fontSize,
                fontWeight: view === v ? 600 : 500,
                transition: `all ${TRANSITIONS.base}`,
                borderBottom: view === v ? `2px solid ${colors.primary?.[500]}` : 'none',
                marginBottom: `-${SPACING[4]}`,
              }}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Views */}
        {view === 'today' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: SPACING[6],
            }}
          >
            {/* Today's Routines Card */}
            <div
              style={{
                background: colors.bg?.primary,
                border: `1px solid ${colors.border?.default}`,
                borderRadius: RADIUS.lg,
                padding: SPACING[6],
                boxShadow: SHADOWS.md,
                transition: `all ${TRANSITIONS.base}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = SHADOWS.lg
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = SHADOWS.md
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ marginBottom: SPACING[4] }}>
                <RoutinesIllustration colors={colors} size="80px" />
              </div>
              <h3
                style={{
                  ...TEXT_STYLES.headingSm,
                  color: colors.text?.primary,
                  margin: `0 0 ${SPACING[2]} 0`,
                }}
              >
                Today's Routines
              </h3>
              <p
                style={{
                  ...TEXT_STYLES.bodySm,
                  color: colors.text?.secondary,
                  margin: 0,
                }}
              >
                No routines scheduled yet. Create one to get started.
              </p>
            </div>

            {/* Upcoming Bookings Card */}
            <div
              style={{
                background: colors.bg?.primary,
                border: `1px solid ${colors.border?.default}`,
                borderRadius: RADIUS.lg,
                padding: SPACING[6],
                boxShadow: SHADOWS.md,
                transition: `all ${TRANSITIONS.base}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = SHADOWS.lg
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = SHADOWS.md
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ marginBottom: SPACING[4] }}>
                <BookingIllustration colors={colors} size="80px" />
              </div>
              <h3
                style={{
                  ...TEXT_STYLES.headingSm,
                  color: colors.text?.primary,
                  margin: `0 0 ${SPACING[2]} 0`,
                }}
              >
                Upcoming Bookings
              </h3>
              <p
                style={{
                  ...TEXT_STYLES.bodySm,
                  color: colors.text?.secondary,
                  margin: 0,
                }}
              >
                Share your public booking link to accept meetings.
              </p>
            </div>

            {/* Quick Stats Card */}
            <div
              style={{
                background: colors.gradients?.subtle,
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
                This Week
              </h3>
              <div style={{ display: 'flex', gap: SPACING[6], alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: SPACING[3], alignItems: 'center' }}>
                  <Clock size={ICON_SIZES.lg} color={colors.primary?.[500]} weight="duotone" />
                  <div>
                    <p
                      style={{
                        ...TEXT_STYLES.caption,
                        color: colors.text?.secondary,
                        margin: 0,
                      }}
                    >
                      Routines
                    </p>
                    <p
                      style={{
                        ...TEXT_STYLES.headingLg,
                        color: colors.primary?.[500],
                        margin: `${SPACING[1]} 0 0 0`,
                      }}
                    >
                      0
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: SPACING[3], alignItems: 'center' }}>
                  <LinkIcon size={ICON_SIZES.lg} color={colors.accent?.[500]} weight="duotone" />
                  <div>
                    <p
                      style={{
                        ...TEXT_STYLES.caption,
                        color: colors.text?.secondary,
                        margin: 0,
                      }}
                    >
                      Bookings
                    </p>
                    <p
                      style={{
                        ...TEXT_STYLES.headingLg,
                        color: colors.accent?.[500],
                        margin: `${SPACING[1]} 0 0 0`,
                      }}
                    >
                      0
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'schedule' && (
          <div
            style={{
              background: colors.bg?.primary,
              border: `1px solid ${colors.border?.default}`,
              borderRadius: RADIUS.lg,
              padding: SPACING[6],
              boxShadow: SHADOWS.md,
              animation: `slideInUp ${TRANSITIONS.slow} ${EASING.easeOut}`,
            }}
          >
            <h3
              style={{
                ...TEXT_STYLES.headingSm,
                color: colors.text?.primary,
                margin: `0 0 ${SPACING[4]} 0`,
              }}
            >
              Weekly Schedule
            </h3>
            <p
              style={{
                ...TEXT_STYLES.bodySm,
                color: colors.text?.secondary,
                margin: 0,
              }}
            >
              Your schedule will appear here. Add routines to get started.
            </p>
          </div>
        )}

        {view === 'booking' && (
          <div
            style={{
              background: colors.bg?.primary,
              border: `1px solid ${colors.border?.default}`,
              borderRadius: RADIUS.lg,
              padding: SPACING[6],
              boxShadow: SHADOWS.md,
              animation: `slideInUp ${TRANSITIONS.slow} ${EASING.easeOut}`,
            }}
          >
            <h3
              style={{
                ...TEXT_STYLES.headingSm,
                color: colors.text?.primary,
                margin: `0 0 ${SPACING[4]} 0`,
              }}
            >
              Public Booking Link
            </h3>
            <p
              style={{
                ...TEXT_STYLES.bodySm,
                color: colors.text?.secondary,
                margin: `0 0 ${SPACING[4]} 0`,
              }}
            >
              Share this link with others to let them book time with you:
            </p>
            <div
              style={{
                background: colors.bg?.secondary,
                border: `1px solid ${colors.border?.default}`,
                borderRadius: RADIUS.md,
                padding: SPACING[3],
                fontFamily: 'monospace',
                fontSize: TEXT_STYLES.bodyXs.fontSize,
                color: colors.text?.secondary,
                overflow: 'auto',
              }}
            >
              https://charanuxd.github.io/calendus/book/your-slug
            </div>
          </div>
        )}

        {view === 'settings' && (
          <div
            style={{
              background: colors.bg?.primary,
              border: `1px solid ${colors.border?.default}`,
              borderRadius: RADIUS.lg,
              padding: SPACING[6],
              boxShadow: SHADOWS.md,
              animation: `slideInUp ${TRANSITIONS.slow} ${EASING.easeOut}`,
            }}
          >
            <h3
              style={{
                ...TEXT_STYLES.headingSm,
                color: colors.text?.primary,
                margin: `0 0 ${SPACING[4]} 0`,
              }}
            >
              Settings
            </h3>
            <p
              style={{
                ...TEXT_STYLES.bodySm,
                color: colors.text?.secondary,
                margin: 0,
              }}
            >
              More settings coming soon.
            </p>
          </div>
        )}
      </main>

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
