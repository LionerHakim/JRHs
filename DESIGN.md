# JRHs Design Direction

## Identity
JRHs is a personal portfolio for Jefri Rahman Hakim. It should feel personal, thoughtful, editorial, quiet, and premium rather than like a SaaS landing page.

## Personality
- Calm
- Intelligent
- Human
- Observational
- Minimal but not sterile
- Confident without being loud

## Visual language
Dark editorial portfolio with strong typography, disciplined spacing, restrained interaction, and real personal content. White/near-black surfaces create focus; blue is a single functional accent.

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
- Accent: #007AFF

Do not introduce new accent families or decorative gradients without an explicit reason.

## Typography
- Display: Perfectly Nineties when available; fallback to Playfair Display, DM Serif Display, or Recoleta-style serif.
- Body/UI: Inter or the existing sans-serif system fallback.
- Serif is reserved for H1/H2 and editorial emphasis.
- H1/H2 target roughly 36–48px with tight line-height.
- Body target 14–16px.
- Metadata target 14px.
- Small UI target 12px.

## Structure
The public page has only these primary sections:
1. HERO
2. ABOUT
3. REKAM JEJAK
4. PROJECTS
5. CONTACT
6. FOOTER

Do not restore Vision, Hobbies, Skills, Reflection, Knowledge, Motivation, testimonials, strategic-insight filler, or other redundant sections unless explicitly requested.

## Hero
Keep the real JRHs hero content and existing photo. Quiet editorial composition. No sunset/twilight gradient, fake badges, fake statistics, giant marketing paragraph, or unnecessary CTA.

## Navigation
Desktop: JRHs + About + Rekam Jejak + Projects + Contact + Music + Menu.
Mobile: JRHs + Music + Menu.
Mobile menu contains only About, Rekam Jejak, Projects, Contact.

## Music
Preserve the existing tracks and artwork. Compact capsule player. No autoplay. Support idle, playing, paused, loading, and error states.

## Projects
Keep real project content and URLs. Compact editorial cards. Detail opens as a right drawer on desktop and full-screen sheet on mobile. Direct real URLs only.

## Rekam Jejak
Editorial timeline/journey, not a generic CV template. Use existing education, roles, organizations, periods, and activities.

## Contact
Minimal closing CTA using only existing contact data.

## Footer
Minimal. Required copyright:
`© 2026 JRHs. Hak cipta dilindungi.`

## Motion
- Micro interaction: 120–180ms
- UI transition: 180–240ms
- Drawer/sheet: 220–280ms
- No bounce, particles, cursor trails, infinite decorative animation, or scroll hijacking.
- Respect prefers-reduced-motion.

## Responsive
Design intentionally for 320, 360, 390, 430, tablet, desktop, large desktop, and ultrawide. Never rely on desktop shrinking down to mobile.

## Accessibility
Semantic HTML, one H1, ordered H2/H3 hierarchy, meaningful alt text, aria labels where needed, visible keyboard focus, Enter/Space activation, Escape to close overlays, touch targets >=44px, adequate contrast, and reduced-motion support.

## Quality bar
Every visual technique must have a content, hierarchy, identity, readability, or interaction purpose. The design should remain recognizably JRHs if the logo is removed.
