# JRH V100 Design System

## Identity
JRH is a personal digital space and editorial portfolio. The visible brand is JRH; never use the full personal name as the Hero headline. The experience should feel future-facing, quiet, premium, precise, intelligent, human, tactile, minimal, confident, and timeless — never like a SaaS dashboard, generic portfolio, CV template, or AI-generated landing page.

## Core rule
DESIGNED, NOT ASSEMBLED. Every visual or interactive element must improve comprehension, navigation, hierarchy, identity, interaction, accessibility, performance, or resilience. Otherwise remove it.

## Visual language
Dark is the default editorial environment, with an optional light mode. Use contrast, typography, spacing, border, scale, and restrained motion as the primary visual language. No sunset/twilight gradient, random gradients, rainbow colors, neon glow, heavy blur, excessive shadows, glassmorphism, or decorative noise.

## Structure
The public page contains exactly: HERO, ABOUT, REKAM JEJAK, PROJECTS, CONTACT, FOOTER.

Do not restore Vision, Hobbies, Skills, Reflection, Knowledge, Motivation, testimonials, strategic filler, duplicate project groups, fake stats, or redundant legacy sections.

## Hero
Visible identity: JRH. Preserve the existing hero sentence and photo asset. No full-name Hero headline, fake badges, fake metrics, giant marketing copy, or decorative clutter.

## Navigation
Desktop: JRH on the left; About, Rekam Jejak, Projects, Contact, theme toggle, Music, and Menu grouped on the right. Mobile: JRH on the left; theme toggle, Music, and Menu on the right. Mobile menu contains only About, Rekam Jejak, Projects, Contact. Use a compact floating capsule, active-section tracking, safe-area awareness, and 44px+ touch targets.

## Theme
Provide a functional dark/light toggle. Dark is the default. Persist the user's choice locally and update the document color scheme. Both modes must retain readable contrast and the JRH visual hierarchy.

## Music
Preserve all existing tracks and audio paths. Compact capsule near the right-side controls. No autoplay. Support idle, playing, paused, loading, and error states with graceful failure.

## Projects
Projects are the primary proof of work. The project index supports three entries and gives every entry a dedicated `url` field for a direct link. Existing real links remain intact. Unfilled links must not become fake URLs or dead anchors. Project detail uses the existing drawer/sheet interaction.

## Project detail UX
Desktop: right-side drawer. Mobile: full-screen sheet. Support smooth open/close, outside click, Escape, keyboard navigation, focus containment, focus restoration, preserved background scroll, correct dialog semantics, and no page reload. External links use rel="noopener noreferrer".

## Rekam Jejak
Editorial journey, not a resume template. Preserve existing education, roles, organizations, periods, and activities. Never invent factual credentials.

## Contact
Use only verified contact destinations currently present in the repository.

## Brand
Minimal JRH wordmark/monogram. Single-color system. Must work at favicon, navbar, footer, mobile, desktop, and small sizes. Avoid complex or multi-color marks.

## Motion
Micro interaction 120–180ms; UI transition 180–240ms; drawer/sheet 220–280ms. No bounce, particles, cursor trails, infinite decorative animation, excessive parallax, or scroll hijacking. Respect prefers-reduced-motion.

## Scroll
Native browser scrolling. Hide visible scrollbar without disabling scrolling. Use a subtle 1–2px top-edge progress indicator.

## Accessibility
Semantic HTML, one H1, ordered H2/H3 hierarchy, meaningful alt text, visible focus, keyboard activation, Escape handling, focus management, 44px+ touch targets, adequate contrast, reduced-motion support, and no inaccessible custom controls.

## Performance & resilience
Preserve existing assets, keep JavaScript light, clean up listeners/observers, lazy-load non-critical media, and fail gracefully when optional capabilities such as audio or external links are unavailable.

## SEO and links
Preserve title, meta description, single H1, H2/H3 hierarchy, Open Graph, favicon, social preview, semantic HTML, and alt text. Audit navbar, anchor, project, social, contact, and external links. No invented URLs.

## Architecture
Keep components understandable and single-purpose. Remove dead components and duplicate logic safely. Keep future extensibility for additional real projects without placeholder content.

## Anti-slop gate
Reject generic AI/SaaS filler, fake badges, fake statistics, fake testimonials, fake projects, fake social accounts, fake URLs, duplicate CTAs, decorative clutter, emoji UI, and excessive animation. Data exists: design it beautifully. Data does not exist: do not invent it.

## Quality gate
Review the experience as an art director, UX designer, frontend engineer, mobile user, accessibility reviewer, performance engineer, and ordinary visitor. Simplify anything that does not earn its place.
