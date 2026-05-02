// Caloday Design System — "The Still Hour"
// Built on Ma (間, the meaningful pause) and golden hour warmth.
// Anchor: Clay terracotta. Typography: Fraunces editorial serif + Inter.

export const THEME_MODES = {
  light: 'light',
  dark: 'dark',
}

// ─────────────────────────────────────────────────────────────
// LIGHT THEME — Bone, Linen, Clay, Moss, Honey, Ink
// ─────────────────────────────────────────────────────────────

const LIGHT = {
  // primary = Clay terracotta (single hero accent)
  primary: {
    50: '#FBF3EE',
    100: '#F5E5DA',
    200: '#EBCBB6',
    300: '#DDA992',
    400: '#D2917A',
    500: '#C97B5F',
    600: '#B26648',
    700: '#95523A',
    800: '#76402E',
    900: '#5A3024',
  },

  // secondary = Warm neutral scale (Bone → Smoke → Ink)
  // CRITICAL: warm, not cool slate. Every disabled state inherits this.
  secondary: {
    50: '#FAF7F2',
    100: '#F5F1EA',
    200: '#EDE6DA',
    300: '#D8CFC0',
    400: '#B5A99A',
    500: '#8C8074',
    600: '#6E6358',
    700: '#524841',
    800: '#3A322D',
    900: '#27211B',
  },

  // accent = Moss (affirmation, success signal)
  accent: {
    50: '#F2F4EE',
    100: '#E2E7D9',
    200: '#C8D2BB',
    300: '#A9B89B',
    400: '#92A382',
    500: '#7B8A6F',
    600: '#65745A',
    700: '#515E48',
    800: '#404A39',
    900: '#2F362A',
  },

  // Semantic colors — warm-tuned
  success: '#7B8A6F',
  warning: '#D4A668',
  error: '#B85A3C',
  info: '#5D6E78',

  // Named brand tokens (alongside the 9-shade scale)
  bone: '#FAF7F2',
  linen: '#F5F1EA',
  clay: '#C97B5F',
  moss: '#7B8A6F',
  honey: '#D4A668',
  ink: '#27211B',
  smoke: '#8C8074',
  ash: '#D8CFC0',

  // Surfaces
  bg: {
    primary: '#FAF7F2',
    secondary: '#F5F1EA',
    tertiary: '#EDE6DA',
    quaternary: '#E5DCD0',
    overlay: 'rgba(39, 33, 27, 0.5)',
  },

  // Text
  text: {
    primary: '#27211B',
    secondary: '#8C8074',
    tertiary: '#B5A99A',
    inverse: '#FAF7F2',
  },

  // Borders
  border: {
    default: '#D8CFC0',
    light: '#EDE6DA',
    dark: '#B5A99A',
  },

  // Gradients — flat-ish warm washes, not SaaS-y
  gradients: {
    primary: 'linear-gradient(135deg, #C97B5F 0%, #B26648 100%)',
    accent: 'linear-gradient(135deg, #7B8A6F 0%, #65745A 100%)',
    subtle: 'linear-gradient(180deg, #FAF7F2 0%, #F5F1EA 100%)',
    dawn: 'linear-gradient(180deg, #FBF3EE 0%, #F5E5DA 100%)',
  },
}

// ─────────────────────────────────────────────────────────────
// DARK THEME — Onyx, Carbon, Clay-glow, Moss-glow, Cream
// ─────────────────────────────────────────────────────────────

const DARK = {
  // primary = Clay-glow (warmer, lifted for dark surface)
  primary: {
    50: '#FBE0CE',
    100: '#F8CFBA',
    200: '#F5BFA6',
    300: '#F0AE91',
    400: '#ED9F84',
    500: '#E89B7A',
    600: '#D38765',
    700: '#B26C4F',
    800: '#8E5640',
    900: '#6B4030',
  },

  // secondary = Warm neutral (lightest at 50, deepest at 900 — same convention as LIGHT)
  secondary: {
    50: '#FAF7F2',
    100: '#F5F1EA',
    200: '#D8CFC0',
    300: '#B5A99A',
    400: '#8C8074',
    500: '#6E6358',
    600: '#524841',
    700: '#3A322D',
    800: '#27211B',
    900: '#1A1614',
  },

  // accent = Moss-glow
  accent: {
    50: '#F0F2EB',
    100: '#E2E7D9',
    200: '#C8D2BB',
    300: '#A9B89B',
    400: '#92A382',
    500: '#9CAB91',
    600: '#889880',
    700: '#6E7C66',
    800: '#54604E',
    900: '#3D4738',
  },

  // Semantic colors
  success: '#9CAB91',
  warning: '#E2BF85',
  error: '#D87B5A',
  info: '#8DA0AB',

  // Named brand tokens
  bone: '#F5F1EA',
  linen: '#EDE6DA',
  clay: '#E89B7A',
  moss: '#9CAB91',
  honey: '#E2BF85',
  ink: '#1A1614',
  smoke: '#B5A99A',
  ash: '#4A413A',

  // Surfaces — warm dark, never blue-black
  bg: {
    primary: '#1A1614',
    secondary: '#211D1A',
    tertiary: '#26211D',
    quaternary: '#322B26',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  // Text
  text: {
    primary: '#F5F1EA',
    secondary: '#B5A99A',
    tertiary: '#8C8074',
    inverse: '#27211B',
  },

  // Borders
  border: {
    default: '#322B26',
    light: '#26211D',
    dark: '#4A413A',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #E89B7A 0%, #D38765 100%)',
    accent: 'linear-gradient(135deg, #9CAB91 0%, #889880 100%)',
    subtle: 'linear-gradient(180deg, #1A1614 0%, #211D1A 100%)',
    dawn: 'linear-gradient(180deg, #322B26 0%, #211D1A 100%)',
  },
}

// ─────────────────────────────────────────────────────────────
// TYPOGRAPHY — Fraunces editorial serif + Inter
// ─────────────────────────────────────────────────────────────

export const TYPOGRAPHY = {
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    serif: "'Fraunces', Georgia, 'Times New Roman', serif",
    display: "'Fraunces', Georgia, 'Times New Roman', serif",
    mono: "ui-monospace, 'SF Mono', 'Menlo', 'Monaco', monospace",
  },

  fontSize: {
    xs: '12px',
    sm: '13px',
    base: '15px',
    lg: '17px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '48px',
    '5xl': '72px',
    '6xl': '96px',
    '7xl': '144px',
    '8xl': '200px',
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1,
    snug: 1.15,
    normal: 1.5,
    relaxed: 1.65,
    loose: 1.85,
  },

  letterSpacing: {
    tightest: '-0.05em',
    tighter: '-0.04em',
    tight: '-0.02em',
    normal: '0em',
    wide: '0.04em',
    wider: '0.08em',
  },
}

// Fraunces variable axis defaults — soft, optical-sized for display
const FRAUNCES_DISPLAY = '"opsz" 144, "SOFT" 100, "WONK" 0'
const FRAUNCES_TEXT = '"opsz" 14, "SOFT" 50'

// Editorial text presets
export const TEXT_STYLES = {
  // Display tier — Fraunces editorial moments. Use sparingly.
  displayHero: {
    fontSize: '96px',
    fontWeight: 300,
    lineHeight: 0.95,
    fontFamily: TYPOGRAPHY.fontFamily.display,
    letterSpacing: '-0.04em',
    fontStyle: 'italic',
    fontVariationSettings: FRAUNCES_DISPLAY,
  },
  displayNumeral: {
    fontSize: '200px',
    fontWeight: 200,
    lineHeight: 0.85,
    fontFamily: TYPOGRAPHY.fontFamily.display,
    letterSpacing: '-0.05em',
    fontVariationSettings: FRAUNCES_DISPLAY,
  },
  displayLarge: {
    fontSize: '72px',
    fontWeight: 400,
    lineHeight: 1,
    fontFamily: TYPOGRAPHY.fontFamily.display,
    letterSpacing: '-0.03em',
    fontVariationSettings: FRAUNCES_DISPLAY,
  },
  displayMedium: {
    fontSize: '56px',
    fontWeight: 400,
    lineHeight: 1.05,
    fontFamily: TYPOGRAPHY.fontFamily.display,
    letterSpacing: '-0.025em',
    fontVariationSettings: FRAUNCES_DISPLAY,
  },
  displaySmall: {
    fontSize: '40px',
    fontWeight: 400,
    lineHeight: 1.1,
    fontFamily: TYPOGRAPHY.fontFamily.display,
    letterSpacing: '-0.02em',
    fontStyle: 'italic',
    fontVariationSettings: FRAUNCES_DISPLAY,
  },

  // Headings — Fraunces for big, Inter for utility
  headingXl: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 1.15,
    fontFamily: TYPOGRAPHY.fontFamily.display,
    letterSpacing: '-0.015em',
    fontVariationSettings: FRAUNCES_TEXT,
  },
  headingLg: {
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: 1.25,
    fontFamily: TYPOGRAPHY.fontFamily.display,
    letterSpacing: '-0.01em',
    fontVariationSettings: FRAUNCES_TEXT,
  },
  headingMd: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: 1.3,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
    letterSpacing: '-0.005em',
  },
  headingSm: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.4,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  headingXs: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.4,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },

  // Body — Inter, generous line-height for breath
  bodyLg: {
    fontSize: '17px',
    fontWeight: 400,
    lineHeight: 1.65,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
    letterSpacing: '-0.005em',
  },
  bodyMd: {
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: 1.6,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  bodySm: {
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 1.55,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  bodyXs: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },

  // Labels
  labelMd: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.4,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  labelSm: {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: 1.4,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },

  // Caption — uppercase tracked, editorial metadata
  caption: {
    fontSize: '11px',
    fontWeight: 600,
    lineHeight: 1.4,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  captionSmall: {
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: 1.3,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
}

// ─────────────────────────────────────────────────────────────
// SPACING — 4px grid, generous breathing room
// ─────────────────────────────────────────────────────────────

export const SPACING = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  40: '160px',
  48: '192px',
  56: '224px',
  64: '256px',
}

// ─────────────────────────────────────────────────────────────
// SIZING
// ─────────────────────────────────────────────────────────────

export const SIZING = {
  iconXs: '16px',
  iconSm: '20px',
  iconMd: '24px',
  iconLg: '32px',
  iconXl: '48px',

  buttonSmall: '36px',
  buttonMedium: '44px',
  buttonLarge: '52px',

  inputSmall: '36px',
  inputMedium: '44px',
  inputLarge: '52px',
}

// ─────────────────────────────────────────────────────────────
// BORDER RADIUS — softer, larger
// ─────────────────────────────────────────────────────────────

export const RADIUS = {
  none: '0px',
  sm: '6px',
  md: '10px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  full: '9999px',
}

// ─────────────────────────────────────────────────────────────
// SHADOWS — warm-toned (rgba ink, not pure black)
// ─────────────────────────────────────────────────────────────

export const SHADOWS = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(39, 33, 27, 0.04)',
  sm: '0 1px 3px 0 rgba(39, 33, 27, 0.06), 0 1px 2px 0 rgba(39, 33, 27, 0.04)',
  md: '0 4px 8px -1px rgba(39, 33, 27, 0.08), 0 2px 4px -1px rgba(39, 33, 27, 0.04)',
  lg: '0 10px 24px -4px rgba(39, 33, 27, 0.10), 0 4px 8px -2px rgba(39, 33, 27, 0.04)',
  xl: '0 24px 40px -8px rgba(39, 33, 27, 0.12), 0 8px 16px -4px rgba(39, 33, 27, 0.04)',
  '2xl': '0 32px 64px -16px rgba(39, 33, 27, 0.18)',
  inner: 'inset 0 2px 4px 0 rgba(39, 33, 27, 0.04)',
}

// ─────────────────────────────────────────────────────────────
// MOTION — slow, intentional, "breath" easing
// ─────────────────────────────────────────────────────────────

export const TRANSITIONS = {
  micro: '100ms',
  fast: '200ms',
  base: '300ms',
  slow: '600ms',
  held: '800ms',
  slower: '1200ms',
}

export const EASING = {
  // Signature curve — feels like a held breath releasing
  breath: 'cubic-bezier(0.32, 0.72, 0, 1)',
  easeOut: 'cubic-bezier(0.32, 0.72, 0, 1)',
  easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  easeIn: 'cubic-bezier(0.32, 0, 0.67, 0)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
}

export const ANIMATIONS = {
  fadeIn: `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`,
  slideInUp: `@keyframes slideInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`,
  slideInDown: `@keyframes slideInDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }`,
  scaleIn: `@keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }`,
  pulse: `@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }`,
  bloom: `@keyframes bloom { 0% { opacity: 0; transform: scale(0.85); } 100% { opacity: 1; transform: scale(1); } }`,
}

// ─────────────────────────────────────────────────────────────
// Z-INDEX
// ─────────────────────────────────────────────────────────────

export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
}

// ─────────────────────────────────────────────────────────────
// BREAKPOINTS
// ─────────────────────────────────────────────────────────────

export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// ─────────────────────────────────────────────────────────────
// COMPONENT TOKENS — theme-aware
// ─────────────────────────────────────────────────────────────

export const getComponentTokens = (theme = 'light') => {
  const colors = theme === 'dark' ? DARK : LIGHT

  return {
    button: {
      primary: {
        bg: colors.primary[500],
        text: colors.bg.primary,
        border: 'transparent',
        hoverBg: colors.primary[600],
        activeBg: colors.primary[700],
        disabledBg: colors.secondary[300],
        disabledText: colors.secondary[500],
        shadow: SHADOWS.sm,
        hoverShadow: SHADOWS.md,
      },
      secondary: {
        bg: colors.secondary[100],
        text: colors.text.primary,
        border: colors.border.default,
        hoverBg: colors.secondary[200],
        activeBg: colors.secondary[300],
        disabledBg: colors.secondary[100],
        disabledText: colors.secondary[400],
      },
      outline: {
        bg: 'transparent',
        text: colors.primary[500],
        border: colors.primary[300],
        hoverBg: colors.primary[50],
        activeBg: colors.primary[100],
        disabledText: colors.secondary[400],
        disabledBorder: colors.secondary[300],
      },
    },
    input: {
      bg: colors.bg.primary,
      text: colors.text.primary,
      border: colors.border.default,
      focusBorder: colors.primary[500],
      focusRing: `0 0 0 3px ${colors.primary[50]}`,
      placeholderText: colors.text.tertiary,
      disabledBg: colors.bg.secondary,
      disabledText: colors.text.tertiary,
      disabledBorder: colors.border.light,
    },
    card: {
      bg: colors.bg.primary,
      border: colors.border.default,
      text: colors.text.primary,
      shadow: SHADOWS.sm,
      hoverShadow: SHADOWS.md,
    },
    modal: {
      bg: colors.bg.primary,
      border: colors.border.default,
      text: colors.text.primary,
      shadow: SHADOWS.xl,
    },
    tag: {
      bg: colors.primary[50],
      text: colors.primary[700],
      border: colors.primary[200],
    },
  }
}

// ─────────────────────────────────────────────────────────────
// EXPORT THEME OBJECTS
// ─────────────────────────────────────────────────────────────

export const COLORS = {
  light: LIGHT,
  dark: DARK,
}

// ─────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────

export const getThemeColors = (theme = 'light') => {
  return theme === 'dark' ? DARK : LIGHT
}

export const getCSSVariables = (theme = 'light') => {
  const colors = getThemeColors(theme)
  const vars = {}

  Object.entries(colors).forEach(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      Object.entries(value).forEach(([subKey, color]) => {
        if (typeof color === 'string') {
          vars[`--color-${key}-${subKey}`] = color
        }
      })
    } else if (typeof value === 'string') {
      vars[`--color-${key}`] = value
    }
  })

  return vars
}

export const getTextColorForBg = (bgColor, theme = 'light') => {
  const colors = getThemeColors(theme)
  if (bgColor === colors.primary[500]) return colors.bg.primary
  if (bgColor === colors.accent[500]) return colors.bg.primary
  return colors.text.primary
}

// ─────────────────────────────────────────────────────────────
// ICON SIZING
// ─────────────────────────────────────────────────────────────

export const ICON_SIZES = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
  '2xl': 64,
}

// ─────────────────────────────────────────────────────────────
// SVG ILLUSTRATIONS — bespoke, theme-reactive
// Sun cycles, breath rhythms, lunar phases, horizons.
// Single-line SVG strings (Rollup-safe pattern).
// ─────────────────────────────────────────────────────────────

export const getIllustration = {
  // booking → sun cycle (concentric arcs rising from horizon, honey apex)
  booking: (colors) => {
    const clay = colors.primary?.[500] || '#C97B5F'
    const clay300 = colors.primary?.[300] || '#DDA992'
    const clay200 = colors.primary?.[200] || '#EBCBB6'
    const honey = colors.honey || '#D4A668'
    const ash = colors.border?.default || '#D8CFC0'
    return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 30 130 A 70 70 0 0 1 170 130" stroke="${clay200}" stroke-width="1.5" stroke-linecap="round"/><path d="M 50 130 A 50 50 0 0 1 150 130" stroke="${clay300}" stroke-width="1.5" stroke-linecap="round"/><path d="M 70 130 A 30 30 0 0 1 130 130" stroke="${clay}" stroke-width="2" stroke-linecap="round"/><line x1="20" y1="130" x2="180" y2="130" stroke="${ash}" stroke-width="1"/><circle cx="100" cy="100" r="3" fill="${honey}"/></svg>`
  },

  // routines → breath rhythm (sine wave with weighted clay strokes)
  routines: (colors) => {
    const clay = colors.primary?.[500] || '#C97B5F'
    const clay300 = colors.primary?.[300] || '#DDA992'
    const ash = colors.border?.default || '#D8CFC0'
    return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="20" y1="100" x2="180" y2="100" stroke="${ash}" stroke-width="1"/><path d="M 20 100 Q 50 60 80 100 T 140 100 T 200 100" stroke="${clay}" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="50" cy="65" r="3" fill="${clay}"/><circle cx="110" cy="135" r="3" fill="${clay300}"/><circle cx="170" cy="65" r="3" fill="${clay}"/></svg>`
  },

  // calendar → lunar phases (5 moons, graduated fill)
  calendar: (colors) => {
    const clay = colors.primary?.[500] || '#C97B5F'
    const clay300 = colors.primary?.[300] || '#DDA992'
    const clay100 = colors.primary?.[100] || '#F5E5DA'
    const ash = colors.border?.default || '#D8CFC0'
    return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="100" r="12" fill="none" stroke="${ash}" stroke-width="1.5"/><circle cx="65" cy="100" r="12" fill="${clay100}" stroke="${clay300}" stroke-width="1.5"/><circle cx="100" cy="100" r="12" fill="${clay}"/><circle cx="135" cy="100" r="12" fill="${clay100}" stroke="${clay300}" stroke-width="1.5"/><circle cx="170" cy="100" r="12" fill="none" stroke="${ash}" stroke-width="1.5"/></svg>`
  },

  // success → sun bloom (linen halo + clay sun + honey ring)
  success: (colors) => {
    const clay = colors.primary?.[500] || '#C97B5F'
    const honey = colors.honey || '#D4A668'
    const linen = colors.linen || '#F5E5DA'
    const clay100 = colors.primary?.[100] || '#F5E5DA'
    return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="90" fill="${linen}" opacity="0.5"/><circle cx="100" cy="100" r="70" fill="none" stroke="${honey}" stroke-width="1" opacity="0.6"/><circle cx="100" cy="100" r="50" fill="${clay100}"/><circle cx="100" cy="100" r="38" fill="${clay}"/></svg>`
  },

  // empty → single horizon (ash line + smoke crescent moon)
  empty: (colors) => {
    const smoke = colors.text?.secondary || '#8C8074'
    const ash = colors.border?.default || '#D8CFC0'
    return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="20" y1="130" x2="180" y2="130" stroke="${ash}" stroke-width="1"/><path d="M 110 80 A 18 18 0 1 1 110 116 A 14 14 0 1 0 110 80 Z" fill="${smoke}" opacity="0.5"/></svg>`
  },
}
