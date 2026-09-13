# JRH Future iOS Design System

## Identity
JRH is a personal digital space and editorial portfolio. The visible brand is JRH. The experience is future-facing, quiet, premium, precise, intelligent, human, tactile, minimal, confident, and timeless — never a SaaS dashboard, CV template, or generic AI landing page.

## Core rule
DESIGNED, NOT ASSEMBLED. Every visual or interactive element must improve comprehension, navigation, identity, interaction, accessibility, performance, or resilience. Otherwise remove it.

## Visual language
Light is the default environment. Use iOS-inspired spatial UI, floating capsules, soft borders, restrained blur, editorial typography, generous spacing, tactile controls, and subtle motion. Canvas `#F7F7F7`, paper `#FFFFFF`, ink `#000000`, graphite `#3E3E3E`, smoke `#636363`, functional accent `#007AFF`. The Twilight gradient is reserved for the Hero atmosphere.

## Structure
The public page contains exactly: HERO, ABOUT, PROJECTS, EXPERIENCE, CONTACT, FOOTER.

Do not restore removed legacy sections, duplicate project groups, fake stats, fake testimonials, strategic filler, or redundant navigation.

## Hero
Visible identity: JRH. Preserve the real photo asset and existing factual content. The Hero uses the Twilight atmosphere, dark lower landscape silhouette, a readable white editorial content surface, clear primary/secondary CTAs, and responsive composition. Never place black text directly on the gradient.

## Navigation
Desktop: JRH on the left; About, Projects, Experience, and Contact on the right, with theme and Music controls. Mobile: compact JRH mark with theme, Music, and Menu controls. Mobile menu contains only About, Projects, Experience, Contact. Use a floating capsule, active-section tracking, safe-area awareness, keyboard support, focus containment, and 44px+ touch targets.

## Theme
Light is the default. Dark mode is optional and persistent. Initialize the saved theme before the application renders to avoid a flash, then keep `color-scheme` and browser theme color synchronized.

## Music
Preserve all existing tracks and paths. No autoplay. Support idle, playing, paused, loading, and error states. Keep the control compact on mobile and expose the full player panel on demand.

## Projects
Projects are the primary proof of work. Featured/flagship work receives the strongest visual hierarchy. Every project uses its real URL, opens directly, and uses `rel="noopener noreferrer"`. Never fabricate URLs or placeholder projects.

## Experience
Use an editorial timeline/list rather than a CV card grid. Preserve only verified education, roles, organizations, periods, and activities.

## Contact
Use only verified contact destinations currently present in the repository.

## Brand
Minimal JRH wordmark/monogram. Keep it legible from favicon to large display. Avoid unnecessary decorative marks.

## Motion
Use fast, purposeful micro-interactions with an iOS-style easing curve. Hover is subtle; press feedback is tactile. No bounce, particles, cursor trails, infinite decorative animation, excessive parallax, or scroll hijacking. Respect `prefers-reduced-motion`.

## Scroll
Use native browser scrolling. The visible scrollbar may be hidden without disabling scrolling. Keep a lightweight 1–2px top progress indicator driven with `requestAnimationFrame`.

## Accessibility
Semantic HTML, one H1, ordered H2/H3 hierarchy, meaningful alt text, visible focus, keyboard activation, Escape handling, focus management, 44px+ touch targets, adequate contrast, reduced-motion support, and no inaccessible custom controls.

## Performance & resilience
Keep JavaScript light, avoid unnecessary state updates, use passive listeners where appropriate, clean up observers/listeners, load non-critical media lazily, and fail gracefully for optional audio/external capabilities.

## SEO and links
Preserve title, meta description, one H1, H2/H3 hierarchy, Open Graph, favicon, canonical URL, social preview, semantic HTML, and alt text. Audit all navigation, project, social, contact, and external links. No invented URLs.

## Architecture
Keep components understandable and single-purpose. Remove dead components and duplicate logic safely. Keep the design system extensible without placeholder content.

## Anti-slop gate
Reject generic AI/SaaS filler, fake badges, fake statistics, fake testimonials, fake projects, fake social accounts, fake URLs, duplicate CTAs, emoji UI, decorative clutter, and excessive animation. Data exists: design it beautifully. Data does not exist: do not invent it.

## Quality gate
Review the experience as art direction, UX, frontend, mobile, accessibility, performance, and ordinary visitor. Test 320px through large desktop, light/dark themes, keyboard navigation, reduced motion, project links, music states, and production build before declaring the release ready.
