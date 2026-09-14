# JRH — Flowmapp Visual System
> White blueprint desk with one blue signal

## Direction

JRH uses a bright, airy, almost lab-notebook visual language: white canvas, oversized bold black Inter typography, rounded controls, thin gray borders, and one vivid blue signal. The blue is reserved for actions, active states, progress, and tiny moments of emphasis. No dark mode, no gradients, no colored page bands, and no decorative color noise.

The portfolio hero is a centered stack, not a split layout. Keep the visual order explicit: **Portfolio heading → personal photo → positioning → description → CTA buttons**. The photo is the primary human proof point and must never be pushed beside the heading on desktop.

## Color Tokens

```css
:root {
  --color-signal-blue: #0080ff;
  --color-voltage-violet: #0050ff;
  --color-sky-wash: #c5e0fb;
  --color-pencil-gray: #8c9baa;
  --color-graphite: #636f7b;
  --color-ink: #000000;
  --color-carbon: #222222;
  --color-paper: #ffffff;
}
```

Signal Blue is the only saturated UI signal. Voltage Violet is limited to pressed/deeper blue moments. Sky Wash is used for focus and soft hero glow. Pencil Gray handles borders and metadata. Graphite is secondary copy. Ink is the main voice. Carbon is dense navigation/UI text. Paper is the page and card surface.

## Typography

Font family: Inter with system sans fallbacks. Use 700 for display and headings, 600 for CTAs and strong labels, 500 for UI, 400 for body copy.

- Display XL: 118px / 0.94 / -0.06em
- Display: 72px / 1 / -0.053em
- Heading LG: 48px / 1.09 / -0.036em
- Heading: 36px / 1.14 / -0.03em
- Heading SM: 24px / 1.30 / -0.02em
- Subheading: 18px / 1.40
- Body: 16px / 1.50
- Body SM: 14px / 1.43
- Caption: 12px / 1.40

Keep long copy at 14–16px. Never use heavy display text as body copy.

## Layout

- Page max-width: 1200px
- Section gap: 96px
- Base spacing unit: 8px
- Card padding: 24px
- Standard element gap: 8px
- Desktop horizontal breathing room: 48px
- Mobile horizontal breathing room: 16px

Responsive behavior:
- Mobile <768px: one-column sections, full-width CTAs, compact music player, bottom-sheet music panel.
- Tablet 768–1024px: two-up project grid where space permits.
- Desktop >1024px: centered contained layout with wide editorial breathing room.

## Shape Tokens

- Nav: 6px
- Cards: 20px
- Images: 24px
- Inputs: 12px
- Buttons/tags: full pill, 1600px
- Feature cards: 32px
- Icon badges: full circle/pill

## Elevation

Content cards rely primarily on 1px Pencil Gray borders. The only standard elevation is:

`rgba(0,0,0,.06) 0 0 18px 0`

Use it for floating media, modals, music panels, and hero photo framing. Avoid large shadows.

## Navigation

Sticky/fixed top navigation with a white background and thin Pencil Gray divider. Keep the JRH logo once on the left, section links in the center/right, Music Player as a feature, and a compact mobile menu below 768px. No theme toggle.

## Hero

Centered headline stack on white. The required visual sequence is:

1. `Portfolio`
2. User portrait
3. Positioning line
4. Supporting description
5. One primary blue CTA + one secondary black pill CTA
6. Small scroll hint

Primary CTA uses Signal Blue with white text, full-pill geometry, and a subtle Sky Wash glow. The primary CTA may use a small organic/wavy tail; never repeat this treatment on secondary buttons.

## Projects

Projects are white rounded cards with 1px Pencil Gray borders. Use a small blue signal bar as the main accent. The featured Portfolio project may span the grid. Every project action is a black or Signal Blue pill.

Current public projects:
- Portfolio — `https://github.com/LionerHakim/JRHs`
- KitaBisa.com — `https://github.com/LionerHakim/KITABISA.COM`
- Ultah — `https://github.com/LionerHakim/Ultah`
- Pinterest — `https://id.pinterest.com/galuhpurba/`

The Pinterest entry is treated as a public visual reference, not as a claimed software project. Label it clearly as a visual reference.

## About

Keep the section typographic and spacious. Oversized heading, narrow reading measure, 16px body. Use Signal Blue only for a small divider or accent line.

## Experience

Use a simple vertical timeline: thin Pencil Gray connector, small circular nodes, bold black institution headings, secondary gray metadata, and pill activity tags with a blue dot marker. Do not turn the timeline into a dense dashboard.

## Contact

Use one dark Ink feature card with large white headline and a Signal Blue primary contact action. Keep the card rounded at the Feature Card radius and avoid unnecessary ornament.

## Music Player

Music Player is a functional UI element, not decoration. Use white pill chrome, black play control, Pencil Gray border, Signal Blue progress. The track picker must remain usable on Android and iOS. On mobile, the detailed playlist panel becomes a bottom sheet with safe-area spacing.

## Footer

Minimal white footer with a single visible `JRH` brand mark, short portfolio descriptor, section links, year, and verified Instagram link. Never repeat JRH as decorative copy throughout the footer.

## Accessibility + Interaction

- Minimum interactive target: 48×48px for primary controls.
- Maintain visible keyboard focus using Sky Wash or Signal Blue.
- Preserve reduced-motion support.
- Keep contrast high: black/white for primary hierarchy, blue for actions.
- Never depend on hover for essential information.

## Do

Use white space as the main visual material. Let huge black type and the one blue signal create hierarchy. Use rounded cards, pills, and small floating proof elements sparingly. Keep the hero photo below `Portfolio` on every breakpoint.

## Don't

Do not introduce a second saturated UI color. Do not use gradient backgrounds, dark page themes, sharp card corners, giant shadows, split hero layouts, or decorative color bands. Do not make the page look like a dashboard product; this is a personal portfolio using a product-marketing visual grammar.
