# JRHs V99 Design System

## Identity
JRHs is a personal digital space and editorial portfolio. The visible brand is JRHs; never use the full personal name as the Hero headline. The experience should feel future-facing, quiet, premium, precise, intelligent, human, tactile, minimal, confident, and timeless — never like a SaaS dashboard, generic portfolio, CV template, or AI-generated landing page.

## Core rule
DESIGNED, NOT ASSEMBLED. Every visual or interactive element must improve comprehension, navigation, hierarchy, identity, interaction, accessibility, performance, or resilience. Otherwise remove it.

## Visual language
Dark-only editorial environment. Use contrast, typography, spacing, border, scale, and restrained motion as the primary visual language. No sunset/twilight gradient in the current V99 implementation, no random gradients, rainbow colors, neon glow, heavy blur, excessive shadows, glassmorphism, or decorative noise.

## Palette
- Page: #050505
- Section: #050505 / #080808
- Surface: #0A0A0A
- Card: #101010
- Elevated: #141414
- Border: #1D1D1D
- Primary text: #F5F5F5
- Secondary text: #A0A0A0
- Muted text: #666666
- Functional accent: #007AFF

Accent is restrained and functional only.

## Typography
- Display: Perfectly Nineties when available; fallback Playfair Display, DM Serif Display, or Recoleta-style serif.
- Body/UI: Inter or system sans fallback.
- Serif is reserved for H1/H2 and editorial emphasis.
- H1/H2 target 36–48px, approximately 1 line-height.
- Body 14–16px; metadata 14px; micro UI 12px.
- Use fluid sizing where useful and preserve readability from 320px through ultrawide.

## Structure
The public page contains exactly:
1. HERO
2. ABOUT
3. REKAM JEJAK
4. PROJECTS
5. CONTACT
6. FOOTER

Do not restore Vision, Hobbies, Skills, Reflection, Knowledge, Motivation, testimonials, strategic filler, duplicate project groups, fake stats, or other redundant legacy sections.

## Hero
Visible identity: JRHs. Preserve the existing hero sentence and existing photo asset. No full-name Hero headline, fake badges, fake metrics, giant marketing copy, or decorative clutter. Use negative space and typography for hierarchy. Hero remains useful with motion disabled.

## Navigation
Desktop: JRHs + About + Rekam Jejak + Projects + Contact + Music + Menu. Mobile: JRHs + Music + Menu. Mobile menu contains only About, Rekam Jejak, Projects, Contact. Use a compact floating dark capsule with subtle border/elevation, active-section tracking, safe-area awareness, and 44px+ touch targets. Never obscure content.

## Music
Preserve all existing tracks and audio paths. Compact capsule near Menu. No autoplay. Support idle, playing, paused, loading, and error states. Keyboard/touch controls, graceful failure, no uncaught audio errors, and lightweight state logic only.

## Projects
Projects are the primary proof of work. Preserve existing project content and use only real existing URLs. Present as a compact editorial index with project name, short description, metadata, and Info Detail. Use Visit Website only when a real URL exists. Avoid giant cards and empty media areas.

## Project detail UX
Desktop: right-side drawer. Mobile: full-screen sheet. Support smooth open/close, outside click, Escape, keyboard navigation, focus containment, focus restoration, preserved background scroll, correct dialog semantics, and no page reload. External links use rel="noopener noreferrer".

## Rekam Jejak
Editorial journey, not a resume template. Preserve existing education, roles, organizations, periods, and activities. Desktop structured chronology; mobile single-column chronology. Never invent experience, metrics, or progression.

## Contact
Minimal closing CTA using only the contact destinations currently verified in the repository. The current implementation exposes Instagram only; do not add WhatsApp, Email, booking flows, or other accounts until their real destinations are present and verified.

## Brand
Minimal JRHs wordmark/monogram. Single-color system. Must work at favicon, navbar, footer, mobile, desktop, and small sizes. Avoid complex or multi-color marks.

## Motion
- Micro interaction: 120–180ms
- UI transition: 180–240ms
- Drawer/sheet: 220–280ms
- Pressed states may use subtle ~0.97 scale where appropriate.
- No bounce, particles, cursor trails, infinite decorative animation, excessive parallax, or scroll hijacking.
- Respect prefers-reduced-motion.

## Scroll
Native browser scrolling. Hide visible scrollbar without disabling scrolling. Use a subtle 1–2px top-edge progress indicator. Do not introduce forced snapping or scroll hijacking.

## Accessibility
Semantic HTML, one H1, ordered H2/H3 hierarchy, meaningful alt text, ARIA only where needed, visible focus, keyboard activation, Escape handling, focus management, 44px+ touch targets, adequate contrast, reduced-motion support, and no inaccessible custom controls.

## Performance
Treat performance as design. Preserve existing assets, lazy-load non-critical media, use responsive media sizing, minimize JS, avoid unnecessary dependencies and listeners, clean up observers/effects, and avoid heavy animation or over-engineering.

## Resilience
Images, audio, optional data, and external capabilities must fail gracefully. No blank catastrophic state and no uncaught runtime errors.

## SEO and links
Preserve SEO intent. Ensure title, meta description, single H1, H2/H3 hierarchy, Open Graph, favicon, social preview, semantic HTML, and alt text. Audit every navbar, anchor, project, social, contact, and external link. No placeholder hrefs or invented URLs.

## Architecture
Keep components understandable and single-purpose. Remove dead components, imports, styles, and duplicate logic safely. Keep future extensibility for additional real projects, timeline entries, media, and music without adding placeholder content or unnecessary abstractions.

## Anti-slop gate
Reject generic AI/SaaS filler: random gradients, giant cards, giant buttons, excessive glassmorphism, neon glow, fake badges, fake statistics, fake testimonials, fake projects, fake social accounts, fake URLs, duplicate CTAs, decorative clutter, random icons, emoji UI, excessive rounded containers, heavy shadows, and excessive animation. Data exists: design it beautifully. Data does not exist: do not invent it.

## Quality gate
Review the experience as an art director, UX designer, frontend engineer, mobile user, accessibility reviewer, performance engineer, and ordinary visitor. Simplify anything that does not earn its place.
