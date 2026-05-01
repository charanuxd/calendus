// Calendus Design System v2.0 — Premium, Handcrafted
// Inspired by Linear, Stripe, Superhuman
// Every pixel intentional. Timeless. Sophisticated.

// ─────────────────────────────────────────────────────────────
// THEME MODE DETECTION & MANAGEMENT
// ─────────────────────────────────────────────────────────────

export const THEME_MODES = {
  light: 'light',
  dark: 'dark',
}

// ─────────────────────────────────────────────────────────────
// PREMIUM COLOR SYSTEM — LIGHT THEME
// ─────────────────────────────────────────────────────────────

const LIGHT = {
  // Primary: Deep, sophisticated purple (versatile, timeless)
  primary: {
    50: '#F8F6FF',
    100: '#F0EBFF',
    200: '#E1D7FF',
    300: '#D3C3FF',
    400: '#B393FF',
    500: '#8B5CF6',  // Premium purple
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },

  // Secondary: Sophisticated slate (neutral, refined)
  secondary: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Accent: Vibrant emerald (sophisticated, energetic)
  accent: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',  // Premium green
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#145231',
  },

  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Backgrounds & Surfaces
  bg: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
    quaternary: '#EBEBF0',
    overlay: 'rgba(17, 24, 39, 0.5)',
  },

  // Text
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  // Borders
  border: {
    default: '#E5E7EB',
    light: '#F3F4F6',
    dark: '#D1D5DB',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    accent: 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)',
    subtle: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
  },
}

// ─────────────────────────────────────────────────────────────
// PREMIUM COLOR SYSTEM — DARK THEME
// ─────────────────────────────────────────────────────────────

const DARK = {
  // Primary: Bright purple (pops in dark mode)
  primary: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A78BFA',  // Bright purple for dark mode
    600: '#9333EA',
    700: '#7E22CE',
    800: '#6B21A8',
    900: '#581C87',
  },

  // Secondary: Cool slate (dark mode friendly)
  secondary: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },

  // Accent: Bright emerald (energetic in dark)
  accent: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#34D399',  // Bright green for dark mode
    600: '#10B981',
    700: '#059669',
    800: '#047857',
    900: '#065F46',
  },

  // Semantic colors
  success: '#10B981',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',

  // Backgrounds & Surfaces
  bg: {
    primary: '#0F172A',    // Deep navy (true dark)
    secondary: '#1E293B',  // Slightly lighter
    tertiary: '#334155',   // Card backgrounds
    quaternary: '#475569', // Hover states
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  // Text
  text: {
    primary: '#F1F5F9',    // Almost white
    secondary: '#CBD5E1',  // Light gray
    tertiary: '#94A3B8',   // Muted gray
    inverse: '#0F172A',    // Dark for inverted
  },

  // Borders
  border: {
    default: '#334155',    // Visible borders
    light: '#475569',      // Subtle borders
    dark: '#1E293B',       // Dark borders
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #A78BFA 0%, #C084FC 100%)',
    accent: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
    subtle: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
  },
}

// ─────────────────────────────────────────────────────────────
// TYPOGRAPHY — PREMIUM STACK
// ─────────────────────────────────────────────────────────────

export const TYPOGRAPHY = {
  fontFamily: {
    sans: "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    serif: "'Playfair Display', Georgia, serif",
    mono: "'Fira Code', 'Menlo', 'Monaco', monospace",
  },

  fontSize: {
    xs: '12px',
    sm: '13px',
    base: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '30px',
    '5xl': '36px',
    '6xl': '48px',
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0em',
    wide: '0.01em',
    wider: '0.025em',
  },
}

// Premium text presets
export const TEXT_STYLES = {
  // Display: Serif headlines
  displayLarge: {
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: 1.2,
    fontFamily: TYPOGRAPHY.fontFamily.serif,
    letterSpacing: '-0.02em',
  },
  displayMedium: {
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: 1.25,
    fontFamily: TYPOGRAPHY.fontFamily.serif,
    letterSpacing: '-0.02em',
  },
  displaySmall: {
    fontSize: '30px',
    fontWeight: 700,
    lineHeight: 1.3,
    fontFamily: TYPOGRAPHY.fontFamily.serif,
    letterSpacing: '-0.015em',
  },

  // Headings
  headingXl: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 1.35,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
    letterSpacing: '-0.01em',
  },
  headingLg: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: 1.4,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
    letterSpacing: '-0.01em',
  },
  headingMd: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: 1.4,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
    letterSpacing: '-0.005em',
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

  // Body: Premium reading experience
  bodyLg: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.6,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
    letterSpacing: '-0.005em',
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
    lineHeight: 1.55,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  bodyXs: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },

  // Label: UI labels
  labelMd: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },
  labelSm: {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  },

  // Caption: Small metadata
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

// ─────────────────────────────────────────────────────────────
// SPACING — 4px GRID (PREMIUM BREATHING ROOM)
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

  buttonSmall: '32px',
  buttonMedium: '40px',
  buttonLarge: '48px',

  inputSmall: '32px',
  inputMedium: '40px',
  inputLarge: '48px',
}

// ─────────────────────────────────────────────────────────────
// BORDER RADIUS — SUBTLE, REFINED
// ─────────────────────────────────────────────────────────────

export const RADIUS = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
}

// ─────────────────────────────────────────────────────────────
// SHADOWS — PREMIUM ELEVATION MODEL
// ─────────────────────────────────────────────────────────────

export const SHADOWS = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
}

// ─────────────────────────────────────────────────────────────
// TRANSITIONS & ANIMATIONS — SMOOTH, PURPOSEFUL
// ─────────────────────────────────────────────────────────────

export const TRANSITIONS = {
  micro: '100ms',
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
}

export const EASING = {
  easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
}

export const ANIMATIONS = {
  fadeIn: `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`,
  slideInUp: `@keyframes slideInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`,
  slideInDown: `@keyframes slideInDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`,
  scaleIn: `@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`,
  pulse: `@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`,
}

// ─────────────────────────────────────────────────────────────
// Z-INDEX HIERARCHY
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
// COMPONENT TOKENS — THEME-AWARE
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
        shadow: SHADOWS.md,
        hoverShadow: SHADOWS.lg,
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
      shadow: SHADOWS.md,
      hoverShadow: SHADOWS.lg,
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
      border: colors.primary[300],
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

  // Color variables
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

// Get contrasting text color for a background
export const getTextColorForBg = (bgColor, theme = 'light') => {
  const colors = getThemeColors(theme)
  if (bgColor === colors.primary[500]) return colors.bg.primary
  if (bgColor === colors.accent[500]) return colors.bg.primary
  return colors.text.primary
}

// ─────────────────────────────────────────────────────────────
// ICON SIZING — PHOSPHOR ICONS
// ─────────────────────────────────────────────────────────────

export const ICON_SIZES = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
}

// ─────────────────────────────────────────────────────────────
// SVG ILLUSTRATIONS — BESPOKE, CUSTOM-TAILORED (Function-based)
// ─────────────────────────────────────────────────────────────

const createSVG = (viewBox, content) =>
  `<svg viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">${content}</svg>`

export const getIllustration = {
  booking: (colors) =>
    createSVG(
      '0 0 200 200',
      `<rect x="20" y="20" width="160" height="160" rx="16" fill="${colors.bg?.secondary}" stroke="${colors.border?.default}" stroke-width="2"/>
       <g opacity="0.1"><circle cx="60" cy="60" r="20" fill="${colors.primary?.[500]}"/><circle cx="140" cy="140" r="20" fill="${colors.accent?.[500]}"/></g>
       <path d="M 40 60 L 80 80 L 100 70 L 120 85 L 160 60" stroke="${colors.primary?.[500]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       <rect x="40" y="100" width="120" height="50" rx="8" fill="${colors.primary?.[50]}" stroke="${colors.primary?.[300]}" stroke-width="1.5"/>
       <text x="100" y="125" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="14" fill="${colors.text?.primary}" font-weight="600">Schedule Time</text>`
    ),

  routines: (colors) =>
    createSVG(
      '0 0 200 200',
      `<rect x="20" y="20" width="160" height="160" rx="16" fill="${colors.bg?.secondary}" stroke="${colors.border?.default}" stroke-width="2"/>
       <circle cx="100" cy="100" r="60" fill="none" stroke="${colors.primary?.[500]}" stroke-width="2" opacity="0.2"/>
       <circle cx="100" cy="100" r="40" fill="none" stroke="${colors.accent?.[500]}" stroke-width="2.5"/>
       <circle cx="100" cy="55" r="6" fill="${colors.primary?.[500]}"/><circle cx="140" cy="100" r="6" fill="${colors.accent?.[500]}"/>
       <circle cx="100" cy="145" r="6" fill="${colors.primary?.[500]}"/><circle cx="60" cy="100" r="6" fill="${colors.accent?.[500]}"/>
       <text x="100" y="175" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="12" fill="${colors.text?.secondary}" font-weight="500">Daily Routines</text>`
    ),

  calendar: (colors) =>
    createSVG(
      '0 0 200 200',
      `<rect x="20" y="20" width="160" height="160" rx="16" fill="${colors.bg?.secondary}" stroke="${colors.border?.default}" stroke-width="2"/>
       <rect x="40" y="40" width="120" height="110" rx="8" fill="${colors.primary?.[50]}" stroke="${colors.primary?.[200]}" stroke-width="1.5"/>
       <line x1="50" y1="70" x2="150" y2="70" stroke="${colors.primary?.[300]}" stroke-width="1"/>
       <line x1="50" y1="90" x2="150" y2="90" stroke="${colors.primary?.[300]}" stroke-width="1"/>
       <circle cx="70" cy="105" r="4" fill="${colors.accent?.[500]}"/><circle cx="100" cy="105" r="4" fill="${colors.accent?.[500]}"/><circle cx="130" cy="105" r="4" fill="${colors.accent?.[500]}"/>
       <rect x="50" y="130" width="100" height="8" rx="4" fill="${colors.primary?.[500]}" opacity="0.3"/>`
    ),

  success: (colors) =>
    createSVG(
      '0 0 200 200',
      `<circle cx="100" cy="100" r="80" fill="${colors.accent?.[50]}" stroke="${colors.accent?.[300]}" stroke-width="2"/>
       <path d="M 70 100 L 90 120 L 135 75" stroke="${colors.accent?.[500]}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
    ),

  empty: (colors) =>
    createSVG(
      '0 0 200 200',
      `<rect x="20" y="20" width="160" height="160" rx="16" fill="${colors.bg?.secondary}" stroke="${colors.border?.default}" stroke-width="2" stroke-dasharray="5,5" opacity="0.5"/>
       <circle cx="100" cy="80" r="30" fill="${colors.primary?.[100]}" opacity="0.3"/>
       <path d="M 90 70 Q 100 75 110 70" stroke="${colors.text?.secondary}" stroke-width="2" fill="none" stroke-linecap="round"/>
       <line x1="95" y1="85" x2="105" y2="85" stroke="${colors.text?.secondary}" stroke-width="1.5"/>`
    ),
}
