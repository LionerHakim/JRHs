# JRHs

Personal digital space and editorial portfolio for JRHs.

🌐 Live: https://jrhsee.my.id

## JRHs Portfolio Overhaul — V99 Design Direction

JRHs is being transformed into a **production-grade, mobile-first, project-first editorial portfolio**. The goal is not to decorate the existing site, but to create a cohesive digital experience that feels deliberately designed, fast, tactile, memorable, and premium.

### Core Principles

- Less sections, more quality
- Project-first storytelling
- Editorial hierarchy
- Tactile interaction
- Mobile-first responsive design
- Fast and lightweight experience
- Accessible by default
- Production-ready implementation
- Existing facts and content preserved
- No invented projects, statistics, testimonials, URLs, social accounts, or personal information

### Final Information Architecture

1. **Hero** — identity, positioning, short description, primary/secondary CTA
2. **About** — concise editorial profile and context
3. **Projects / MegaProjects** — primary proof of work and visual centerpiece
4. **Experience** — clean editorial timeline/list
5. **Contact** — simple closing CTA using real available contact/social data
6. **Footer** — minimal identity, links, and copyright

The following legacy sections are intentionally removed from the final experience:

- Hobbies
- Skills
- Reflection
- Vision
- Knowledge

### Visual Language — Portal / Twilight Serif Editorial

The visual direction combines:

**premium indie magazine + native iOS aesthetic + modern product portfolio**

Canvas:
`#F7F7F7`

Paper:
`#FFFFFF`

Primary:
`#000000`

Graphite:
`#3E3E3E`

Smoke:
`#636363`

Functional accent:
`#007AFF`

No second accent color, excessive shadows, heavy glassmorphism, neon effects, or generic SaaS/dashboard styling.

### Hero Art Direction

The hero is the primary atmospheric visual moment.

Gradient:

```css
linear-gradient(
  180deg,
  #4A7FF2 0%,
  #7B7ED8 30%,
  #C98AB5 65%,
  #E8A87C 100%
)
```

Atmospheric dark landscape/tree silhouettes may occupy the lower 15–20% when suitable assets/visuals are available.

The gradient is limited to the hero/atmospheric moment and is never used as the entire site background.

### Typography

Display:

- Perfectly Nineties when available
- Playfair Display / DM Serif Display / Recoleta as quality fallbacks

Serif is reserved for H1, H2, and editorial display moments.

UI/body:

- Inter 400 / 500 / 600

Approximate scale:

- H1/H2: 36–48px, weight 400, ~1.0 line-height
- Body: 14–16px
- Metadata: 14px
- Small UI: 12px

### Navigation

Floating navigation capsule with a clean, compact presentation.

Desktop:

`JRHs · About · Projects · Experience · Contact`

Mobile remains compact and touch-friendly.

Requirements:

- sticky/floating
- subtle active-section indication
- smooth navigation
- keyboard accessible
- no scroll hijacking
- minimum 44px touch targets

### Projects

Projects are the **center of gravity** of JRHs.

The hierarchy is:

`Flagship / MegaProject → Other Projects`

The flagship project receives stronger visual weight while other projects remain compact and consistent.

Project cards use a physical/product-object feeling:

- white surface
- subtle border
- 16–30px radius
- 20px internal padding
- restrained depth
- no heavy shadows

Real existing project URLs must be preserved. `Visit Website ↗` opens the actual URL directly. No fake URLs or unnecessary intermediate pages.

### Interaction

Interaction states are designed consistently:

`Idle → Hover → Focus → Pressed → Disabled → Loading → Success/Error`

Pressed feedback may use approximately `scale(0.97)`.

Motion should be fast, subtle, and purposeful:

- micro: 120–180ms
- UI: 180–240ms

Respect `prefers-reduced-motion`.

No excessive parallax, infinite decorative animation, particles, cursor trails, or scroll hijacking.

### Responsive / Accessibility / Performance

The experience is designed and reviewed for:

`320px · 360px · 390px · 430px · tablet · desktop · large desktop`

Requirements:

- no horizontal overflow
- mobile is first-class, not a shrunken desktop
- semantic HTML
- correct heading hierarchy
- visible keyboard focus
- accessible controls and links
- descriptive image alt text
- 44px+ touch targets
- reduced-motion support
- optimized and lazy-loaded non-critical media
- minimal unnecessary JavaScript/dependencies
- no avoidable memory leaks or expensive rendering
- no console/runtime errors

### Content Integrity

Repository data is the source of truth.

Existing content, media, project information, audio, contacts, social links, and valid URLs are preserved. Missing information is not fabricated merely to make the design look fuller.

### Engineering / Deployment

The overhaul must preserve the existing deployment architecture and remain compatible with the repository's current Vite/React/TypeScript setup and deployment assumptions.

Before completion:

`Audit → Implement → Build → Test → Inspect → Fix → Test Again → Final QA`

The final result should be clean, maintainable, responsive, accessible, performant, and production-ready.

## Brand Statement

> **MAKE JRHs FEEL DESIGNED, NOT ASSEMBLED.**
>
> **MAKE THE PROJECTS THE REASON PEOPLE STAY.**

## Copyright

© 2026 JRHs. Hak cipta dilindungi.
