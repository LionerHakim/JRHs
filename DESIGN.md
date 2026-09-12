# JRHs Design Direction

## Identity
JRHs is a personal editorial portfolio. The visible brand is JRHs; do not display the full personal name in the Hero. The experience should feel thoughtful, human, observational, minimal, premium, and distinctly personal rather than like a SaaS landing page or a generic AI portfolio template.

## Visual language
Twilight serif editorial: one dramatic twilight atmosphere in the Hero, followed by a paper-white editorial canvas. Use Perfectly Nineties (or the documented serif fallback) for display headings and Inter for body/UI. Keep one vivid functional accent, #007AFF.

## Palette
- Hero: linear-gradient(180deg, #4A7FF2 0%, #7B7ED8 30%, #C98AB5 65%, #E8A87C 100%)
- Canvas: #F7F7F7
- Surface: #FFFFFF
- Ink: #000000
- Graphite: #3E3E3E
- Smoke: #636363
- Accent: #007AFF
- Border: #E5E5E5 / #F7F7F7

Do not add a second chromatic accent. Do not move the twilight gradient into ordinary content sections.

## Typography
- Display: Perfectly Nineties when available; fallback Playfair Display, DM Serif Display, or Recoleta-style serif.
- Body/UI: Inter or system sans fallback.
- Serif is display-only for H1/H2 and editorial emphasis.
- H1/H2 target 36–48px with ~1 line-height.
- Body 14–16px; metadata 12px.

## Structure
The public page has only these primary sections:
1. HERO
2. ABOUT
3. REKAM JEJAK
4. PROJECTS
5. CONTACT
6. FOOTER

Do not restore Vision, Hobbies, Skills, Reflection, Knowledge, Motivation, testimonials, strategic filler, redundant stats, or template-style sections unless explicitly requested.

## Hero
Use JRHs as the visible identity and preserve the existing hero sentence and existing photo asset. No full-name headline, fake badges, fake statistics, heavy effects, or oversized marketing copy. CTA count should stay restrained. Hero must remain effective with motion disabled and mobile must have an intentional composition.

## Navigation
Desktop: JRHs + About + Rekam Jejak + Projects + Contact + Music + Menu.
Mobile: JRHs + Music + Menu.
Mobile menu contains only About, Rekam Jejak, Projects, Contact. Use a floating white capsule with subtle 5px #F7F7F7 glow ring. Keep active-section tracking and accessible 44px touch targets.

## Music
Preserve the existing tracks and artwork. Compact capsule player, no autoplay. Support idle, playing, paused, loading, and error states. Controls must work with keyboard and touch. Accent blue is functional only.

## Projects
Preserve existing project content and only use real existing URLs. Present projects as a compact editorial index, not a SaaS card grid. Detail opens as a right drawer on desktop and a full-screen sheet on mobile with ESC, outside-click, focus management, focus return, preserved scroll, and reduced-motion support.

## Rekam Jejak
Editorial journey/timeline, not a generic CV. Preserve existing education, roles, organizations, periods, and activities. Do not invent experience or metrics.

## Contact
Minimal closing statement using only existing contact data. Keep Instagram, WhatsApp, and Email links accurate. Avoid unsupported CTAs.

## Footer
Minimal. Required copyright:
`© 2026 JRHs. Hak cipta dilindungi.`

## Layout
Max-width ~1200px. Reading column 640–720px. Section spacing 80–120px. Cards/images 22–30px radius; images may reach 30–40px. Buttons are 50px pills. Use hairline rules and whitespace as structure. Avoid unnecessary card grids, asymmetry should be intentional.

## Motion
- Micro interaction: 120–180ms
- UI transition: 180–240ms
- Drawer/sheet: 220–280ms
- No bounce, particles, cursor trails, infinite decorative animation, excessive parallax, or scroll hijacking.
- Respect prefers-reduced-motion.

## Responsive
Design intentionally for 320, 360, 390, 430, tablet, desktop, large desktop, and ultrawide. No horizontal overflow. Do not treat mobile as a shrunken desktop layout.

## Accessibility
Semantic HTML, one H1, ordered H2/H3 hierarchy, meaningful alt text, aria labels where needed, visible keyboard focus, Enter/Space activation, Escape to close overlays, touch targets >=44px, adequate contrast, and reduced-motion support.

## Anti-slop gate
Remove anything that looks like generic AI portfolio/SaaS filler: meaningless badges, decorative gradients, fake metrics, generic startup jargon, excessive cards, duplicated CTAs, decorative icons without purpose, and effects that do not improve content, hierarchy, identity, readability, or interaction.
