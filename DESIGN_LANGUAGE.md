# Calendus Design Language & System

**Version:** 1.0  
**Last Updated:** May 2026  
**Maintained by:** Calendus Team

---

## 📖 Overview

Calendus is a personal scheduling app with a focus on clarity, accessibility, and delight. Our design system ensures consistency, scalability, and cohesion across all digital products and experiences.

**Core Design Values:**
- **Clarity** — Information architecture is logical and intuitive
- **Accessibility** — WCAG AA compliant, inclusive for all users
- **Efficiency** — Users accomplish tasks with minimal friction
- **Delight** — Thoughtful micro-interactions and attention to detail
- **Consistency** — Unified experience across all platforms

---

## 🎨 Color System

### Primary Palette (Purple)
Brand color for primary actions, navigation, and key elements.

- **Primary 500** `#6F3BA8` — Main brand color
- **Primary 600** `#5A2E8A` — Hover state
- **Primary 700** `#45226B` — Active state
- **Primary 400** `#8856C4` — Light interactive states

### Secondary Palette (Blue)
Supporting color for complementary actions and data visualization.

- **Secondary 500** `#6496D7` — Secondary actions
- **Secondary 600** `#4581CF` — Hover state

### Accent Palette (Orange)
High-visibility color for call-to-action, warnings, and highlights.

- **Accent 500** `#FF8C1A` — Primary accent
- **Accent 600** `#E67A00` — Hover state

### Semantic Colors
- **Success** `#10B981` — Confirmations, positive actions
- **Warning** `#F59E0B` — Warnings, alerts
- **Error** `#EF4444` — Errors, destructive actions
- **Info** `#3B82F6` — Information messages

### Neutral Palette
All text, borders, and backgrounds use the neutral palette for hierarchy.

- **Neutral 900** `#111827` — Primary text
- **Neutral 700** `#374151` — Secondary text
- **Neutral 500** `#6B7280` — Tertiary text
- **Neutral 300** `#D1D5DB` — Borders
- **Neutral 100** `#F3F4F6` — Backgrounds
- **Neutral 50** `#F9FAFB` — Subtle backgrounds

### Gradients
- **Primary Gradient** — Purple to Blue (main brand)
- **Accent Gradient** — Orange (energy & action)
- **Subtle Gradient** — Light (backgrounds)

---

## 🔤 Typography

### Font Stack
- **Sans Serif** — Inter (primary, default)
- **Serif** — Playfair Display (display, headings)
- **Monospace** — Fira Code (code, data)

### Type Scale
| Scale | Size  | Weight | Use Case |
|-------|-------|--------|----------|
| Display Large | 48px | 700 | Page titles |
| Display Medium | 36px | 700 | Section titles |
| Heading XL | 24px | 700 | Card titles |
| Heading LG | 20px | 700 | Subsection titles |
| Heading MD | 18px | 600 | Labels, form titles |
| Body Large | 16px | 400 | Primary text |
| Body Medium | 14px | 400 | Default text |
| Body Small | 13px | 400 | Secondary text |
| Caption | 12px | 500 | Metadata, hints |

### Line Height
- Display: 1.2
- Heading: 1.3–1.4
- Body: 1.5–1.6
- Caption: 1.3–1.4

---

## 📏 Spacing & Sizing

### Spacing Scale (4px base)
- **4px** (1) — Minimal gaps, fine-tuning
- **8px** (2) — Small gaps, padding
- **12px** (3) — Standard gaps
- **16px** (4) — Standard padding (default)
- **24px** (6) — Section spacing
- **32px** (8) — Major spacing
- **48px** (12) — Large spacing
- **64px** (16) — Page-level spacing

### Component Sizing
- **Button heights:** 32px (small), 40px (medium), 48px (large)
- **Input heights:** 32px (small), 40px (medium), 48px (large)
- **Icon sizes:** 16px, 20px, 24px, 32px, 48px

### Border Radius
- **None** — 0px (sharp)
- **Extra Small** — 2px (subtle)
- **Small** — 4px (inputs, small components)
- **Medium** — 8px (default buttons, cards)
- **Large** — 12px (modals, large components)
- **Extra Large** — 16px (large dialogs)
- **Full** — 9999px (pills, circles)

---

## 🎭 Shadows

Used to create depth and hierarchy. Shadows follow an elevation model.

| Level | Shadow |
|-------|--------|
| None | No shadow |
| Small | `0 1px 3px rgba(0,0,0,0.1)` |
| Medium | `0 4px 6px rgba(0,0,0,0.1)` |
| Large | `0 10px 15px rgba(0,0,0,0.1)` |
| Extra Large | `0 20px 25px rgba(0,0,0,0.1)` |
| 2XL | `0 25px 50px rgba(0,0,0,0.25)` |

**Elevation Guidelines:**
- Cards: Medium shadow
- Modals: Large shadow
- Dropdowns: Medium shadow
- Floating buttons: Large shadow

---

## ⚡ Motion & Transitions

### Duration
- **Fast** — 150ms (micro-interactions)
- **Base** — 200ms (standard transitions)
- **Slow** — 300ms (attention-grabbing)
- **Slower** — 500ms (background animations)

### Easing
- **ease-out** — Opening, entering states
- **ease-in-out** — General transitions
- **ease-in** — Closing, exiting states

### Common Animations
- **Fade In** — Entrance animation
- **Slide In (Up/Down)** — Content entrance
- **Scale In** — Modals, popovers
- **Pulse** — Attention indicators

---

## 🧩 Components

### Buttons

**Primary Button**
- Background: Primary 500
- Text: White
- Hover: Primary 600
- Padding: 8px 16px (medium)
- Border Radius: 8px

**Secondary Button**
- Background: Neutral 100
- Text: Neutral 900
- Border: Neutral 300
- Hover: Neutral 200

**Outline Button**
- Background: Transparent
- Border: Primary 500
- Text: Primary 500
- Hover: Primary 50 background

**States:**
- Hover: Darker shade
- Active: Even darker
- Disabled: Neutral 300 background, Neutral 500 text
- Loading: Show spinner, disable interactions

### Input Fields

- Height: 40px (medium)
- Border: 1px Neutral 300
- Border Radius: 8px
- Padding: 8px 12px
- Focus: Border changes to Primary 500, add ring `0 0 0 3px Primary 50`
- Placeholder: Neutral 500, opacity 0.6

### Cards

- Background: White
- Border: 1px Neutral 200
- Border Radius: 12px
- Padding: 16px–24px
- Shadow: Medium

### Modals

- Background: White
- Border Radius: 16px
- Shadow: 2XL
- Backdrop: Overlay (rgba 0,0,0,0.5)

---

## ♿ Accessibility

### Color Contrast
- **Normal text** — Minimum 4.5:1 (WCAG AA)
- **Large text** — Minimum 3:1 (WCAG AA)
- **Interactive elements** — Minimum 3:1 for focus indicators

### Focus States
- All interactive elements have visible focus rings
- Focus ring color: Primary 500
- Focus ring offset: 2–4px

### Semantic HTML
- Use proper heading hierarchy (h1 → h6)
- Use native form elements when possible
- Use ARIA labels for custom components
- Ensure buttons have descriptive text or aria-labels

---

## 📱 Responsive Design

### Breakpoints
- **xs** — 320px (mobile)
- **sm** — 640px (tablet portrait)
- **md** — 768px (tablet landscape)
- **lg** — 1024px (desktop)
- **xl** — 1280px (wide desktop)
- **2xl** — 1536px (ultra-wide)

### Mobile-First Approach
Design for mobile first, enhance for larger screens.

---

## 🔄 Usage Across the App

### Pages Implementing This System

#### 1. **Auth Page** (Login/Signup)
- Uses Primary & Secondary gradients
- Serif typography for branding
- Focus on clarity and trust

#### 2. **Dashboard**
- Card-based layout
- Consistent spacing and shadows
- Clear hierarchy with typography

#### 3. **Public Booking Page**
- Minimal, clean design
- Focus on call-to-action (Accent color)
- Responsive mobile-first

#### 4. **Settings Page**
- Form-heavy, uses Input component tokens
- Secondary actions for confirmation

---

## 🚀 Implementation Checklist

- [ ] All colors use COLORS from `src/lib/design-system.js`
- [ ] All typography uses TEXT_STYLES from `src/lib/design-system.js`
- [ ] All spacing uses SPACING constants
- [ ] All components follow COMPONENT_TOKENS
- [ ] Focus states are visible on all interactive elements
- [ ] Transitions use TRANSITIONS and EASING
- [ ] Shadows follow the elevation model
- [ ] Color contrast meets WCAG AA standards

---

## 📚 Resources

- **Design System File:** `src/lib/design-system.js`
- **Previous Theme:** `src/lib/theme.js` (deprecated, use design-system.js)
- **Figma File:** [Calendus Design System](#) (coming soon)

---

## 🤝 Contributing

When adding new colors, sizes, or components:
1. Update `src/lib/design-system.js`
2. Update this document
3. Ensure accessibility compliance
4. Sync to Figma (quarterly)

---

**Last Reviewed:** May 2026
