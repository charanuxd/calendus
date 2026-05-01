// Design System v1.0 — Calendus
// Core tokens for consistent design language across the app

// ─────────────────────────────────────────────
// COLOR PALETTE
// ─────────────────────────────────────────────

export const COLORS = {
  // Primary palette — main brand color
  primary: {
    50: '#F0E8F8',
    100: '#E0D0F0',
    200: '#C1A1E1',
    300: '#A272D3',
    400: '#8856C4',
    500: '#6F3BA8',  // Primary brand
    600: '#5A2E8A',
    700: '#45226B',
    800: '#30174D',
    900: '#1B0C2E',
  },

  // Secondary palette — supporting color
  secondary: {
    50: '#F0F5FB',
    100: '#E0EAF7',
    200: '#C1D5EF',
    300: '#A2C0E7',
    400: '#83ABDF',
    500: '#6496D7',  // Secondary
    600: '#4581CF',
    700: '#326CA7',
    800: '#1F577F',
    900: '#0C4257',
  },

  // Accent palette — highlights & CTAs
  accent: {
    50: '#FFF3E6',
    100: '#FFE7CC',
    200: '#FFCF99',
    300: '#FFB766',
    400: '#FF9F33',
    500: '#FF8C1A',  // Accent
    600: '#E67A00',
    700: '#CC6600',
    800: '#B35400',
    900: '#804000',
  },

  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Neutral palette
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',  // Neutral text
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Background & surface
  bg: {
    default: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #6F3BA8 0%, #6496D7 100%)',
    accent: 'linear-gradient(135deg, #FF8C1A 0%, #FF9F33 100%)',
    subtle: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
  },
}

// ─────────────────────────────────────────────
// TYPOGRAPHY
// ─────────────────────────────────────────────

export const TYPOGRAPHY = {
  // Font families
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    serif: "'Playfair Display', Georgia, serif",
    mono: "'Fira Code', 'Courier New', monospace",
  },

  // Font sizes (in px)
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  },

  // Font weights
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}

// Preset text styles
export const TEXT_STYLES = {
  // Display — large headings
  displayLarge: {
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: 1.2,
    fontFamily: TYPOGRAPHY.fontFamily.serif,
  },
  displayMedium: {
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: 1.2,
    fontFamily: TYPOGRAPHY.fontFamily.serif,
  },
  displaySmall: {
    fontSize: '30px',
    fontWeight: 700,
    lineHeight: 1.3,
    fontFamily: TYPOGRAPHY.fontFamily.serif,
  },

  // Heading
  headingXl: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 1.3,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  headingLg: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: 1.4,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  headingMd: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: 1.4,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  headingSm: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.5,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  headingXs: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.5,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },

  // Body text
  bodyLg: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.6,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  bodyMd: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.6,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  bodySm: {
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  bodyXs: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },

  // Caption
  caption: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1.4,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  captionSmall: {
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: 1.3,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
}

// ─────────────────────────────────────────────
// SPACING
// ─────────────────────────────────────────────

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
  36: '144px',
  40: '160px',
}

// ─────────────────────────────────────────────
// SIZING
// ─────────────────────────────────────────────

export const SIZING = {
  // Icon sizes
  iconXs: '16px',
  iconSm: '20px',
  iconMd: '24px',
  iconLg: '32px',
  iconXl: '48px',

  // Component sizes
  buttonSmall: '32px',
  buttonMedium: '40px',
  buttonLarge: '48px',

  // Input sizes
  inputSmall: '32px',
  inputMedium: '40px',
  inputLarge: '48px',
}

// ─────────────────────────────────────────────
// BORDER RADIUS
// ─────────────────────────────────────────────

export const RADIUS = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
}

// ─────────────────────────────────────────────
// SHADOWS
// ─────────────────────────────────────────────

export const SHADOWS = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
}

// ─────────────────────────────────────────────
// TRANSITIONS & ANIMATIONS
// ─────────────────────────────────────────────

export const TRANSITIONS = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
}

export const EASING = {
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  linear: 'linear',
}

export const ANIMATIONS = {
  fadeIn: {
    animation: `fadeIn ${TRANSITIONS.base} ${EASING.easeOut}`,
    keyframes: `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`,
  },
  slideInUp: {
    animation: `slideInUp ${TRANSITIONS.base} ${EASING.easeOut}`,
    keyframes: `@keyframes slideInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`,
  },
  slideInDown: {
    animation: `slideInDown ${TRANSITIONS.base} ${EASING.easeOut}`,
    keyframes: `@keyframes slideInDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`,
  },
  scaleIn: {
    animation: `scaleIn ${TRANSITIONS.base} ${EASING.easeOut}`,
    keyframes: `@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`,
  },
  pulse: {
    animation: `pulse ${TRANSITIONS.slower} ${EASING.easeInOut} infinite`,
    keyframes: `@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`,
  },
}

// ─────────────────────────────────────────────
// BREAKPOINTS
// ─────────────────────────────────────────────

export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// ─────────────────────────────────────────────
// Z-INDEX
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// COMPONENT TOKENS
// ─────────────────────────────────────────────

export const COMPONENT_TOKENS = {
  button: {
    primary: {
      bg: COLORS.primary[500],
      text: '#FFFFFF',
      border: 'transparent',
      hoverBg: COLORS.primary[600],
      activeBg: COLORS.primary[700],
      disabledBg: COLORS.neutral[300],
      disabledText: COLORS.neutral[500],
    },
    secondary: {
      bg: COLORS.neutral[100],
      text: COLORS.neutral[900],
      border: COLORS.neutral[300],
      hoverBg: COLORS.neutral[200],
      activeBg: COLORS.neutral[300],
      disabledBg: COLORS.neutral[100],
      disabledText: COLORS.neutral[400],
    },
    outline: {
      bg: 'transparent',
      text: COLORS.primary[500],
      border: COLORS.primary[500],
      hoverBg: COLORS.primary[50],
      activeBg: COLORS.primary[100],
      disabledText: COLORS.neutral[400],
      disabledBorder: COLORS.neutral[300],
    },
  },
  input: {
    bg: '#FFFFFF',
    text: COLORS.neutral[900],
    border: COLORS.neutral[300],
    focusBorder: COLORS.primary[500],
    focusRing: `0 0 0 3px ${COLORS.primary[50]}`,
    placeholderText: COLORS.neutral[500],
    disabledBg: COLORS.neutral[100],
    disabledText: COLORS.neutral[500],
    disabledBorder: COLORS.neutral[200],
  },
  card: {
    bg: '#FFFFFF',
    border: COLORS.neutral[200],
    text: COLORS.neutral[900],
    shadow: SHADOWS.md,
  },
  modal: {
    bg: '#FFFFFF',
    border: COLORS.neutral[200],
    text: COLORS.neutral[900],
    shadow: SHADOWS.xl,
  },
}

// ─────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────

export const getTextColor = (background) => {
  // Determine if text should be dark or light based on background
  const rgb = parseInt(background.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? COLORS.neutral[900] : '#FFFFFF'
}

export const getCSSVariables = () => {
  const vars = {}

  // Color variables
  Object.entries(COLORS).forEach(([key, value]) => {
    if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, color]) => {
        vars[`--color-${key}-${subKey}`] = color
      })
    } else {
      vars[`--color-${key}`] = value
    }
  })

  // Spacing variables
  Object.entries(SPACING).forEach(([key, value]) => {
    vars[`--spacing-${key}`] = value
  })

  // Sizing variables
  Object.entries(SIZING).forEach(([key, value]) => {
    vars[`--size-${key}`] = value
  })

  // Radius variables
  Object.entries(RADIUS).forEach(([key, value]) => {
    vars[`--radius-${key}`] = value
  })

  return vars
}
