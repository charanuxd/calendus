import { useState, useContext } from 'react'
import { supabase } from '../lib/supabase'
import { getThemeColors, getComponentTokens, TEXT_STYLES, SPACING, RADIUS, SHADOWS, TRANSITIONS, EASING, ICON_SIZES } from '../lib/design-system'
import { ThemeContext } from '../lib/theme-context'
import { Brandmark, Wordmark, MoonGlyph, SunGlyph, LetterGlyph, SunCycleGlyph } from '../components/Illustrations'

export default function Auth() {
  const { theme, colors, toggleTheme } = useContext(ThemeContext) || { theme: 'light', colors: {}, toggleTheme: () => {} }
  const componentTokens = getComponentTokens(theme)

  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: { data: { full_name: name } },
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

  const accentColor = theme === 'dark' ? colors.accent[400] : colors.accent[500]

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme === 'dark' ? colors.bg.primary : colors.gradients.subtle,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING[4],
        fontFamily: TEXT_STYLES.bodyMd.fontFamily,
        color: colors.text.primary,
        transition: `background ${TRANSITIONS.slow} ${EASING.easeInOut}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: SPACING[6],
          right: SPACING[6],
          width: SPACING[10],
          height: SPACING[10],
          borderRadius: RADIUS.lg,
          border: `1px solid ${colors.border.default}`,
          background: colors.bg.primary,
          color: colors.text.primary,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          transition: `all ${TRANSITIONS.fast} ${EASING.easeOut}`,
          boxShadow: SHADOWS.sm,
        }}
        onMouseEnter={(e) => {
          e.target.style.background = colors.bg.secondary
          e.target.style.boxShadow = SHADOWS.md
        }}
        onMouseLeave={(e) => {
          e.target.style.background = colors.bg.primary
          e.target.style.boxShadow = SHADOWS.sm
        }}
      >
        {theme === 'light' ? (
          <MoonGlyph size={ICON_SIZES.md} color={colors.text?.primary || '#27211B'} />
        ) : (
          <SunGlyph size={ICON_SIZES.md} color={colors.text?.primary || '#F5F1EA'} />
        )}
      </button>

      {/* Decorative background elements */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: colors.gradients.primary,
          borderRadius: '50%',
          opacity: theme === 'dark' ? 0.05 : 0.08,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          transition: `opacity ${TRANSITIONS.slow}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '350px',
          height: '350px',
          background: colors.accent[500],
          borderRadius: '50%',
          opacity: theme === 'dark' ? 0.03 : 0.05,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          transition: `opacity ${TRANSITIONS.slow}`,
        }}
      />

      {/* Main Card */}
      <div
        style={{
          background: colors.bg.primary,
          borderRadius: RADIUS.xl,
          border: `1px solid ${colors.border.default}`,
          padding: SPACING[12],
          width: '100%',
          maxWidth: '460px',
          boxShadow: SHADOWS.xl,
          position: 'relative',
          zIndex: 10,
          animation: `slideInUp ${TRANSITIONS.slow} ${EASING.easeOut}`,
          transition: `all ${TRANSITIONS.slow} ${EASING.easeInOut}`,
        }}
      >
        {/* Header — Brandmark stands alone, wordmark below as editorial moment */}
        <div style={{ textAlign: 'center', marginBottom: SPACING[10] }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: SPACING[5],
            }}
          >
            <Brandmark
              size={56}
              color={colors.primary?.[500] || '#C97B5F'}
              line={colors.text?.primary || '#27211B'}
              lineOpacity={0.4}
            />
          </div>

          <h1
            style={{
              ...TEXT_STYLES.displaySmall,
              color: colors.text.primary,
              margin: 0,
            }}
          >
            <Wordmark size="lg" color={colors.text?.primary} />
          </h1>

          <p
            style={{
              ...TEXT_STYLES.bodyMd,
              color: colors.text.secondary,
              marginTop: SPACING[3],
            }}
          >
            {mode === 'login'
              ? 'The still hour. Welcome back.'
              : 'A sanctuary for your time. Begin.'}
          </p>
        </div>

        {/* Content */}
        {sent ? (
          <div
            style={{
              textAlign: 'center',
              padding: `${SPACING[6]} 0`,
              animation: `scaleIn ${TRANSITIONS.slow} ${EASING.easeOut}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: SPACING[5] }}>
              <LetterGlyph
                size={80}
                paper={colors.bg?.secondary || '#F5F1EA'}
                edge={colors.border?.default || '#D8CFC0'}
                seal={colors.primary?.[500] || '#C97B5F'}
                fold={colors.text?.tertiary || '#B5A99A'}
              />
            </div>

            <h2
              style={{
                ...TEXT_STYLES.headingMd,
                color: colors.text.primary,
                marginBottom: SPACING[2],
              }}
            >
              Check your email
            </h2>

            <p
              style={{
                ...TEXT_STYLES.bodyMd,
                color: colors.text.secondary,
                lineHeight: 1.6,
              }}
            >
              We've sent a confirmation link to
              <br />
              <strong style={{ color: colors.text.primary }}>{email}</strong>
            </p>
          </div>
        ) : (
          <>
            {/* Mode Toggle */}
            <div
              style={{
                display: 'flex',
                gap: SPACING[2],
                background: colors.bg.secondary,
                borderRadius: RADIUS.md,
                padding: SPACING[1],
                marginBottom: SPACING[6],
              }}
            >
              {['login', 'signup'].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m)
                    setError('')
                  }}
                  style={{
                    flex: 1,
                    padding: `${SPACING[2]} 0`,
                    border: 'none',
                    borderRadius: RADIUS.sm,
                    cursor: 'pointer',
                    fontSize: TEXT_STYLES.bodySm.fontSize,
                    fontWeight: 600,
                    fontFamily: TEXT_STYLES.bodySm.fontFamily,
                    transition: `all ${TRANSITIONS.base} ${EASING.easeOut}`,
                    background: mode === m ? colors.bg.primary : 'transparent',
                    color: mode === m ? colors.primary[500] : colors.text.secondary,
                    boxShadow: mode === m ? SHADOWS.sm : 'none',
                  }}
                >
                  {m === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING[4] }}>
              {mode === 'signup' && (
                <div>
                  <label
                    style={{
                      ...TEXT_STYLES.labelSm,
                      color: colors.text.primary,
                      fontWeight: 600,
                      display: 'block',
                      marginBottom: SPACING[2],
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      height: SPACING[10],
                      padding: `${SPACING[2]} ${SPACING[3]}`,
                      border: `1px solid ${colors.border.default}`,
                      borderRadius: RADIUS.md,
                      fontSize: TEXT_STYLES.bodyMd.fontSize,
                      fontFamily: TEXT_STYLES.bodyMd.fontFamily,
                      color: colors.text.primary,
                      background: colors.bg.primary,
                      transition: `all ${TRANSITIONS.base}`,
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary[500]
                      e.target.style.boxShadow = `0 0 0 3px ${colors.primary[500]}22`
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.border.default
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              )}

              <div>
                <label
                  style={{
                    ...TEXT_STYLES.labelSm,
                    color: colors.text.primary,
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: SPACING[2],
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    height: SPACING[10],
                    padding: `${SPACING[2]} ${SPACING[3]}`,
                    border: `1px solid ${colors.border.default}`,
                    borderRadius: RADIUS.md,
                    fontSize: TEXT_STYLES.bodyMd.fontSize,
                    fontFamily: TEXT_STYLES.bodyMd.fontFamily,
                    color: colors.text.primary,
                    background: colors.bg.primary,
                    transition: `all ${TRANSITIONS.base}`,
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary[500]
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary[500]}22`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border.default
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    ...TEXT_STYLES.labelSm,
                    color: colors.text.primary,
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: SPACING[2],
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  style={{
                    width: '100%',
                    height: SPACING[10],
                    padding: `${SPACING[2]} ${SPACING[3]}`,
                    border: `1px solid ${error ? colors.error : colors.border.default}`,
                    borderRadius: RADIUS.md,
                    fontSize: TEXT_STYLES.bodyMd.fontSize,
                    fontFamily: TEXT_STYLES.bodyMd.fontFamily,
                    color: colors.text.primary,
                    background: colors.bg.primary,
                    transition: `all ${TRANSITIONS.base}`,
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = error ? colors.error : colors.primary[500]
                    e.target.style.boxShadow = `0 0 0 3px ${error ? colors.error : colors.primary[500]}22`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = error ? colors.error : colors.border.default
                    e.target.style.boxShadow = 'none'
                  }}
                />
                {error && (
                  <p
                    style={{
                      ...TEXT_STYLES.bodySm,
                      color: colors.error,
                      marginTop: SPACING[2],
                    }}
                  >
                    {error}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  height: SPACING[10],
                  background: loading ? colors.secondary[300] : colors.gradients.primary,
                  border: 'none',
                  borderRadius: RADIUS.md,
                  color: colors.bg.primary,
                  fontSize: TEXT_STYLES.labelSm.fontSize,
                  fontWeight: 600,
                  fontFamily: TEXT_STYLES.labelSm.fontFamily,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: `all ${TRANSITIONS.base} ${EASING.easeOut}`,
                  opacity: loading ? 0.7 : 1,
                  boxShadow: SHADOWS.md,
                  letterSpacing: '0.5px',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.boxShadow = SHADOWS.lg
                    e.target.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.boxShadow = SHADOWS.md
                    e.target.style.transform = 'translateY(0)'
                  }
                }}
              >
                {loading ? 'Processing…' : mode === 'login' ? 'Sign In' : 'Create Account'}
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
        * {
          color-scheme: ${theme === 'dark' ? 'dark' : 'light'};
        }
      `}</style>
    </div>
  )
}
