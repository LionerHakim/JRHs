# antislop

Applied to JRH as a quality filter for UI, copy, accessibility, responsive layout, and code comments.

## Usage mode
DURING: apply these rules while building or modifying the project, not only after the work is finished.

## JRH contract
- `DESIGN.md` is the visual direction for JRH.
- Preserve real JRH content, assets, URLs, audio, images, and project data unless the user explicitly asks for a content change.
- Reject generic AI-generated UI patterns unless a specific, documented purpose justifies them.
- Every interactive element must work or be removed.
- Never invent testimonials, statistics, badges, people, project claims, URLs, or other realistic-looking content.
- Keep composition content-driven: no filler sections.
- Test responsive behavior, keyboard access, focus states, loading/error states, theme switching, and reduced-motion behavior.
- Prefer purposeful typography, hierarchy, whitespace, and one restrained accent over decorative effects.

## Purpose gate
Before introducing a visual technique, be able to answer what it serves. If the only reason is that it looks modern, premium, trendy, or AI-generated, remove it or redesign it.

## Anti-slop defaults
Avoid generic gradients, excessive glassmorphism, glow everywhere, rainbow palettes, giant rounded cards, fake terminal windows, bento grids without purpose, repetitive feature-card grids, template-like hero/CTA/FAQ sequences, unnecessary badges, fake metrics, testimonial placeholders, excessive animation, scroll hijacking, and mobile layouts that merely shrink desktop.

## Liveliness
JRH uses deliberate editorial character rather than decoration. ENERGY: 2 — restrained editorial presence. RHYTHM: 2 — consistent structure with intentional breaks. MOTION: 2 — subtle transitions only where useful.

## Delivery gate
Before considering UI work complete, verify:
1. Build passes.
2. No broken imports, routes, assets, or links.
3. Desktop and mobile layouts work at narrow and wide widths.
4. Keyboard navigation and visible focus work.
5. Interactive states work: idle, hover/focus, loading, error, open/close, and theme switching where applicable.
6. Reduced motion is respected.
7. No fabricated content was introduced.
8. Existing JRH content/assets were preserved unless explicitly changed.
9. The result still follows `DESIGN.md`.
