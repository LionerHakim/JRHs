# JRH — REDLINE / Visual System

## Direction
Premium, editorial, high-contrast digital portfolio. The visual language is built around four colors only: red, yellow, black, white. Black and white form the structural base; red is the primary interaction accent; yellow is a controlled signal color. The system should feel futuristic through composition, typography, motion, and precision—not through decorative effects.

## Color contract
- Red: #b00020 — primary accent, CTA, active/hover states, progress and key highlights.
- Yellow: #ffc400 — secondary accent, labels, signal markers, selected editorial details.
- Black: #080808 — dominant dark surface, primary text, project cards, structural lines.
- White: #ffffff — dominant light surface, negative space, text on dark surfaces.
- Allowed shades/tints of the four colors may be used where needed for accessibility or hierarchy.
- No blue, green, purple, orange, gray palette, gradients, or chromatic effects outside this contract.

## Typography
- Display/headlines: a condensed, high-impact display face via system fallback (Impact / Arial Narrow family). Uppercase, heavy, tight tracking.
- Body/UI: Inter/system sans, clean and highly legible.
- Metadata/statistics: monospace.
- Hierarchy comes from scale, weight, case, and spacing rather than decorative effects.

## Layout
- Max width: 1280px with responsive gutters.
- Avoid a generic centered hero → cards → footer template.
- Hero is a black command-center composition with asymmetric columns, oversized typography, portrait frame, signal row, and a precise red rail.
- Projects use an offset editorial grid so cards do not form a perfectly uniform catalog.
- Sections use large whitespace and 2px structural rules.
- Yellow is reserved for signal moments, not large repeated surfaces except the statement section.

## Components
### Navigation
Fixed white navigation with black structure; when scrolled it inverts to black with red border. Pill navigation items use red for active/hover. Music remains a functional local control.

### Primary button
Red filled pill with white text. On hover, yellow with black text. Minimum 48px high.

### Secondary button
White/transparent with a 2px black or white border depending on surface. Hover may invert.

### Project card
Black surface, white content, yellow metadata, red interaction state. Large radius, strong border, restrained lift on hover.

### Statement
Yellow editorial interruption with black typography. Used once to create a deliberate color punctuation.

### Footer
Black terminal surface with red top rule. White content and yellow secondary metadata.

## Motion
- Primary easing: cubic-bezier(.83, 0, .17, 1).
- Duration: ~300ms.
- Use reveal, hover lift, color transitions, and scroll progress only.
- Respect prefers-reduced-motion.
- No parallax, heavy WebGL, or animation that blocks interaction.

## Depth and texture
No gradients, shadows, or heavy glass effects. Depth is created with black/white inversion, borders, oversized typography, offsets, and controlled color accents. This is intentionally more timeless than trend-heavy glass/neon treatments.

## Accessibility
- Yellow text is never used as body copy on white where contrast would be insufficient; it is used as a signal or on black.
- Red CTA uses white text; hover switches to yellow with black text.
- Focus rings use yellow for visibility.
- Images require alt text.
- Keyboard navigation and modal focus behavior must remain intact.
- Touch targets remain comfortably sized on mobile.

## Imagery
Keep the existing user-provided portrait and local media. Do not invent photography, illustrations, or 3D assets. The portrait is presented in a high-contrast editorial frame.

## Content protection
All portfolio copy, projects, links, education, music paths, and personal information remain sourced from src/config/site.ts. Do not invent replacement data. Missing content must be marked TODO.

## Responsive behavior
- Desktop: asymmetric hero and offset two-column project grid.
- Tablet: compressed two-column layouts with simplified navigation.
- Mobile: single-column flow, full-width controls, readable display type, touch-safe controls.
- Decorative rails and cursor effects are removed where they would hurt usability.

## QA contract
Run:
- npm run typecheck
- npm run quality
- npm run audit:links
- npm run build

Manual verification remains required for visual QA, browser console, real touch interaction, and final Cloudflare deployment.

## Design principle
**RED IS ACTION. YELLOW IS SIGNAL. BLACK IS STRUCTURE. WHITE IS SPACE.**
