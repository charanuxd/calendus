import { useId } from 'react'
import { getIllustration } from '../lib/design-system'

// ─────────────────────────────────────────────────────────────
// Legacy SVG-string wrappers (keep for back-compat with existing
// Dashboard/PublicBook call sites — Phase 2 surfaces will migrate
// to the bespoke JSX glyphs below).
// ─────────────────────────────────────────────────────────────

export function BookingIllustration({ colors, size = '120px' }) {
  return (
    <div
      style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      dangerouslySetInnerHTML={{ __html: getIllustration.booking(colors) }}
    />
  )
}

export function RoutinesIllustration({ colors, size = '120px' }) {
  return (
    <div
      style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      dangerouslySetInnerHTML={{ __html: getIllustration.routines(colors) }}
    />
  )
}

export function CalendarIllustration({ colors, size = '120px' }) {
  return (
    <div
      style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      dangerouslySetInnerHTML={{ __html: getIllustration.calendar(colors) }}
    />
  )
}

export function SuccessIllustration({ colors, size = '80px' }) {
  return (
    <div
      style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      dangerouslySetInnerHTML={{ __html: getIllustration.success(colors) }}
    />
  )
}

export function EmptyStateIllustration({ colors, size = '120px' }) {
  return (
    <div
      style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      dangerouslySetInnerHTML={{ __html: getIllustration.empty(colors) }}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// Wordmark — "caloday" set in Fraunces light italic, lowercase,
// with a custom dot above the `a` (sun symbol).
// ─────────────────────────────────────────────────────────────

export function Wordmark({ size = 'md', color, accent }) {
  const sizes = { sm: 18, md: 26, lg: 40, xl: 64 }
  const fontSize = sizes[size] || sizes.md
  const dotSize = Math.max(2, fontSize * 0.08)

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 0,
        fontFamily: "'Fraunces', Georgia, serif",
        fontWeight: 300,
        fontStyle: 'italic',
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        letterSpacing: '-0.03em',
        color: color || 'currentColor',
        fontVariationSettings: '"opsz" 144, "SOFT" 100',
        position: 'relative',
      }}
    >
      caloda
      <span style={{ position: 'relative', display: 'inline-block' }}>
        y
        <span
          style={{
            position: 'absolute',
            top: `-${fontSize * 0.55}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${dotSize * 2}px`,
            height: `${dotSize * 2}px`,
            borderRadius: '50%',
            background: accent || '#C97B5F',
          }}
        />
      </span>
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
// SunCycleGlyph — concentric arcs rising from horizon, honey apex.
// The signature illustration. Used for hero moments and success.
// ─────────────────────────────────────────────────────────────

export function SunCycleGlyph({
  size = 200,
  primary = '#C97B5F',
  secondary = '#DDA992',
  tertiary = '#EBCBB6',
  honey = '#D4A668',
  ground = '#D8CFC0',
  opacity = 1,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, display: 'block' }}
    >
      <path d="M 20 140 A 80 80 0 0 1 180 140" stroke={tertiary} strokeWidth="1.25" strokeLinecap="round" />
      <path d="M 40 140 A 60 60 0 0 1 160 140" stroke={secondary} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 60 140 A 40 40 0 0 1 140 140" stroke={primary} strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="140" x2="190" y2="140" stroke={ground} strokeWidth="1" />
      <circle cx="100" cy="100" r="3.5" fill={honey} />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// SunGlyph — bespoke sun for theme toggle (light mode active state).
// Eight short rays radiating from a soft circle.
// ─────────────────────────────────────────────────────────────

export function SunGlyph({ size = 24, color = 'currentColor', strokeWidth = 1.5 }) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI) / 4
    const x1 = 12 + Math.cos(angle) * 7
    const y1 = 12 + Math.sin(angle) * 7
    const x2 = 12 + Math.cos(angle) * 10.5
    const y2 = 12 + Math.sin(angle) * 10.5
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  })

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4.5" fill={color} />
      {rays}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// MoonGlyph — bespoke crescent for theme toggle (dark mode active).
// Soft tilted crescent, no nose-shape clichés.
// ─────────────────────────────────────────────────────────────

export function MoonGlyph({ size = 24, color = 'currentColor' }) {
  const id = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id={`moon-mask-${id}`}>
        <rect width="24" height="24" fill="white" />
        <circle cx="16" cy="9" r="8.5" fill="black" />
      </mask>
      <circle cx="12" cy="12" r="9" fill={color} mask={`url(#moon-mask-${id})`} />
    </svg>
  )
}
