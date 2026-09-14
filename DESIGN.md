# JRH — Arcade Visual System
> Electric blue ripple on white paper.

## Direction

JRH uses a light Arcade visual language: a quiet `#f9fafb` paper canvas, white content surfaces, Inter typography, thin neutral borders, restrained shadows, and one saturated electric blue signal (`#2142e7`). The hero is the signature full-bleed flowing blue gradient; elsewhere color is deliberately rationed.

The portfolio hero remains a centered stack with this fixed visual order: **Portfolio heading → personal photo → positioning → description → CTA buttons**. The photo must remain below the heading on every breakpoint.

## Color Tokens

```css
--color-voltage-blue: #2142e7;
--color-deep-voltage: #182fa5;
--color-midnight-ink: #111827;
--color-slate-600: #4b5563;
--color-slate-700: #374151;
--color-slate-500: #70747d;
--color-graphite: #414652;
--color-paper-white: #ffffff;
--color-fog-50: #f9fafb;
--color-fog-100: #f3f4f6;
--color-mist-200: #e5e7eb;
--color-smoke-300: #d9dadc;
```

Voltage Blue is the primary interactive signal. Deep Voltage is reserved for hover/pressed states and inset rings. All other colors are neutral roles. No secondary saturated accent is introduced.

## Typography

Inter is the sole typeface, with system fallbacks. Use 700 for display/hero headings, 600 for section titles and CTAs, 500 for UI metadata, and 400 for body copy. Display tracking tightens from roughly `-0.020em` to `-0.025em`.

- Caption: 12px / 1.5
- Body SM: 14px / 1.5
- Body: 16px / 1.56
- Subheading: 18px / 1.5
- Heading SM: 20px / 1.4
- Heading: 24px / 1.33
- Heading LG: 30px / 1.29
- Display: 48px / 1.14
- Display LG: 64px / 1.06

Balig Script remains available as a token only; it is not loaded or used without a real font asset.

## Layout

- Page max-width: 1200px
- Section gap: 64px
- Card padding: 32px
- Element gap: 8px
- Desktop horizontal breathing room: 48px
- Mobile horizontal breathing room: 16px

Responsive behavior:
- `<768px`: one-column sections, full-width CTAs, compact music pill, bottom-sheet music panel.
- `768–899px`: compact navigation with mobile menu.
- `>=900px`: full navigation links.

## Shape Tokens

- Tabs: 12px
- Buttons: 12px
- Cards: 16px
- Inputs: 16px
- Pills/tags: 9999px
- Hero/media frame: 24px

## Elevation

Use the supplied cool-tinted shadow stacks. Content cards primarily rely on the `#e5e7eb` hairline border; the stronger six-layer stack is reserved for primary CTAs, floating cards, media frames, and overlays. Avoid generic hard drop shadows.

## Navigation

64px persistent top navigation, white background, 1px `#e5e7eb` bottom border, centered 1200px container. Keep the logo left, About/Projects/Experience/Contact links on desktop, Music Player as a utility feature, and an accessible mobile menu below 900px. No theme toggle.

## Hero

The hero is a full-bleed flowing blue gradient field, approximately 600px tall, with a centered editorial stack. The implementation keeps the required portfolio-specific content sequence:

1. `Portfolio`
2. Personal portrait
3. Positioning line
4. Supporting description
5. Primary Voltage Blue CTA + secondary ghost CTA
6. Small scroll hint

The hero gradient is the only large-scale color field. It must not spill into navigation, project cards, or ordinary content sections.

## Projects

Projects use white surfaces, 1px `#e5e7eb` borders, 16px radius, 32px padding, restrained hover elevation, and no pastel accent bands. The featured Portfolio project may span the grid. Actions use the Arcade button system.

Current public projects:
- Portfolio — `https://github.com/LionerHakim/JRHs`
- KitaBisa.com — `https://github.com/LionerHakim/KITABISA.COM`
- Ultah — `https://github.com/LionerHakim/Ultah`
- Pinterest — `https://id.pinterest.com/galuhpurba/`

Pinterest is a public visual reference, not a claimed software project, and remains labeled accordingly.

## About

Use a centered/contained editorial reading layout with neutral text, 16px body copy, and small blue accents only where hierarchy needs them. No decorative color blocks.

## Experience

Use a simple vertical timeline with hairline separators, small neutral circular nodes, bold institution headings, secondary metadata, and compact pill activity tags. Keep it editorial rather than dashboard-like.

## Contact

Use one dark Ink feature card with the documented 92–102deg dark surface gradient, white heading/copy, and one primary Voltage Blue action. Keep the surface rounded and visually quiet.

## Music Player

Music Player is functional UI. Desktop uses a white pill with neutral border, dark play control, and blue progress. Mobile uses a bottom sheet for detailed playback/playlist controls with safe-area spacing. No autoplay is introduced.

## Footer

Minimal `#f9fafb` footer with a single visible brand mark, short descriptor, section links, year, and verified Instagram link.

## Accessibility + Interaction

- Keep primary controls at least 44px, with 48px preferred for menu/mobile controls.
- Maintain clear keyboard focus using Voltage Blue.
- Preserve reduced-motion support.
- Never depend on hover for essential information.
- Keep semantic headings, meaningful alt text, and safe external-link attributes.

## Do

Use the white paper canvas, Inter, one electric-blue signal, 12/16px radii, 64px section rhythm, and cool-tinted shadows. Let typography and the hero gradient establish hierarchy without visual noise.

## Don't

Do not add a second saturated color, pastel project bands, gradients outside the hero and documented dark surfaces, pill-shaped buttons above the 12px button radius, giant decorative shadows, dark page themes, split hero layouts, or dashboard clutter.
