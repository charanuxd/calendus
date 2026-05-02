import { useId } from 'react'
import { getIllustration } from '../lib/design-system'

// ─────────────────────────────────────────────────────────────
// Brandmark — "The Threshold"
// A solid Clay disc on a thin horizon line that extends past
// the disc on both sides. The disc covers the middle portion
// of the horizon — the line passes BEHIND it (z-order).
// Concept: the sun pausing at the horizon — the still hour,
// neither rising nor setting. Ma, the meaningful pause.
// Use for: app icon, favicon, header lockup, isolated brand mark.
// ─────────────────────────────────────────────────────────────

export function Brandmark({
  size = 32,
  color = '#C97B5F',
  line = '#27211B',
  lineOpacity = 0.35,
  ariaHidden = false,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaHidden ? undefined : 'Caloday'}
      role={ariaHidden ? 'presentation' : 'img'}
      aria-hidden={ariaHidden || undefined}
      style={{ display: 'block', flexShrink: 0 }}
    >
      <line
        x1="0"
        y1="50"
        x2="100"
        y2="50"
        stroke={line}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={lineOpacity}
      />
      <circle cx="50" cy="50" r="34" fill={color} />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// Wordmark — "caloday" set in Fraunces light italic, lowercase.
// Pure typography. No decorative dot — the Brandmark carries
// that symbolic weight when the two are composed in a Lockup.
// ─────────────────────────────────────────────────────────────

export function Wordmark({ size = 'md', color }) {
  const sizes = { xs: 16, sm: 20, md: 28, lg: 44, xl: 72, '2xl': 96 }
  const fontSize = sizes[size] || sizes.md

  return (
    <span
      style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontWeight: 300,
        fontStyle: 'italic',
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        letterSpacing: '-0.03em',
        color: color || 'currentColor',
        fontVariationSettings: '"opsz" 144, "SOFT" 100',
        whiteSpace: 'nowrap',
      }}
    >
      caloday
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
// Lockup — Brandmark + Wordmark, optically aligned.
// Use for: app headers, marketing surfaces, anywhere the
// brand identifies itself in full.
// ─────────────────────────────────────────────────────────────

export function Lockup({ size = 'md', color, mark, line }) {
  const sizes = { xs: 16, sm: 20, md: 28, lg: 44, xl: 72 }
  const fontSize = sizes[size] || sizes.md
  // Mark is sized slightly smaller than cap-height for optical balance
  const markSize = Math.round(fontSize * 0.95)
  const gap = Math.round(fontSize * 0.4)

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${gap}px`,
        lineHeight: 1,
      }}
    >
      <Brandmark
        size={markSize}
        color={mark || '#C97B5F'}
        line={line || color || '#27211B'}
        ariaHidden
      />
      <Wordmark size={size} color={color} />
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
// LetterGlyph — bespoke envelope for email confirmation moments.
// A soft rectangular form with a triangular fold suggestion at
// the top, and the Brandmark disc centered as the "seal" — the
// moment being delivered. Echoes the Threshold motif.
// ─────────────────────────────────────────────────────────────

export function LetterGlyph({
  size = 80,
  paper = '#F5F1EA',
  edge = '#D8CFC0',
  seal = '#C97B5F',
  fold = '#B5A99A',
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <rect x="14" y="28" width="72" height="50" rx="4" fill={paper} stroke={edge} strokeWidth="1.25" />
      <path d="M 14 30 L 50 56 L 86 30" stroke={fold} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="50" cy="68" r="5" fill={seal} />
    </svg>
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
// SunGlyph — bespoke sun for theme toggle (light mode active).
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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" fill={color} />
      {rays}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// MoonGlyph — bespoke crescent for theme toggle (dark mode active).
// Soft tilted crescent — geometric, no nose-shape cliché.
// ─────────────────────────────────────────────────────────────

export function MoonGlyph({ size = 24, color = 'currentColor' }) {
  const id = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <mask id={`moon-mask-${id}`}>
        <rect width="24" height="24" fill="white" />
        <circle cx="16" cy="9" r="8.5" fill="black" />
      </mask>
      <circle cx="12" cy="12" r="9" fill={color} mask={`url(#moon-mask-${id})`} />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// Legacy SVG-string wrappers (Phase 1 carryover for back-compat
// with existing Dashboard/PublicBook call sites). Kept until all
// surfaces are migrated to bespoke JSX glyphs.
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
