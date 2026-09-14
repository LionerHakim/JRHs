# JRH — Tedy Visual System
> Marshmallow world with a raspberry pulse — pastel surface washes on white, one hot pink doing all the urgent work.

## Direction

JRH uses a light Tedy visual language: pure white canvas, soft pastel surface bands, generous rounded geometry, and one saturated action color — Raspberry Pulse `#fd1774`. Photography remains the emotional layer; typography and restrained UI provide structure.

The portfolio hero keeps the established JRH content order: **Portfolio heading → personal photo → positioning → description → CTA buttons**. The photo stays below the heading at every breakpoint.

## Color Tokens

```css
--color-raspberry-pulse: #fd1774;
--color-ink-black: #030712;
--color-lavender-mist: #e5d6ff;
--gradient-lavender-mist: linear-gradient(to top, rgb(231, 214, 255) 0%, oklab(0.902604 0.0325668 -0.0481643 / 0.85) 50%, rgba(0, 0, 0, 0) 100%);
--color-mint-cream: #e3f7d6;
--color-butter-cream: #fff1cd;
--color-sky-wash: #ddf5fb;
--color-sand-wash: #f4efe9;
--color-carbon: #171717;
--color-steel: #6b7280;
--color-silver: #e5e7eb;
--color-pure-white: #ffffff;
--color-lime-zest: #64d71e;
--color-teal-current: #4bb7cf;
```

Raspberry Pulse is reserved for urgent actions, active states, and the primary CTA shadow. Pastels create hierarchy through surfaces rather than saturated UI chrome.

## Typography

Montreal Neue is the intended interface face with Inter as the practical fallback. Use weight 500 for navigation, buttons, labels, and display emphasis; weight 400 for body copy. Display typography is intentionally poster-tight.

- Caption: 14px / 1.45 / -0.07px
- Body SM: 16px / 1.5 / -0.08px
- Subheading: 23px / 1.38 / -0.12px
- Heading SM: 28px / 1.05 / -0.56px
- Heading: 56px / 0.98 / -1.4px
- Heading LG: 64px / 0.96 / -2.56px
- Display: 80px / 0.92 / -4px
- Display XL: 104px / 0.90 / -6.76px

Georgia is decorative-only and must never become body text.

## Layout

- Page max-width: 1200px
- Section gap: 80px
- Card padding: 24px
- Element gap: 16px
- Base spacing unit: 4px
- Mobile horizontal breathing room: 16px

The visual rhythm is **white → pastel wash → white**, with sections separated by generous space instead of hard rules.

## Shape Tokens

- Cards: 32px
- Badges: 32px
- Images: 24px
- Buttons: 999px
- Navigation pills: 999px
- Small cards: 16px
- Feature cards: 20px

## Elevation

```css
--shadow-xl: rgba(17, 24, 39, 0.16) 0px 28px 52px 0px;
--shadow-subtle: rgb(255, 241, 205) 0px 0px 0px 1px;
--shadow-xl-2: rgba(253, 23, 116, 0.6) 0px 14px 35px -18px;
--shadow-subtle-2: rgba(255, 255, 255, 0.08) 0px 1px 0px 0px inset, rgba(255, 255, 255, 0.03) 0px -1px 0px 0px inset, rgba(0, 0, 0, 0.35) 0px 30px 80px 0px;
```

The raspberry shadow is reserved for primary CTA actions. Generic cards use the neutral elevation; pastel feature cards can rely entirely on surface contrast.

## Navigation

White top bar, 1200px centered content, pill-shaped utility treatment, Montreal Neue 16px weight 500. Keep JRH's current information architecture: About, Projects, Experience, Contact, with Music Player as a utility feature. Avoid adding unrelated utility controls.

## Hero

Use a white structural canvas with a soft lavender atmospheric wash and optional radial pastel glow. The JRH portrait remains directly beneath `Portfolio` rather than becoming a separate photo collage. Primary CTA uses Raspberry Pulse with the signature pink shadow; secondary action is a white ghost pill.

## Sections

About can use Lavender Mist. Projects use pastel feature surfaces: Lavender, Mint, Butter, and Sky. Experience uses a calm pastel band with white content. Contact may use the intentional Carbon dark surface as a contained panel on a pastel background.

Cards use contrast between white content and pastel surroundings rather than decorative borders wherever possible.

## Projects

Preserve current public projects and descriptions. Pinterest stays labeled as a visual reference rather than a software project. Featured Portfolio may span the grid. Primary project action uses the raspberry pill CTA; secondary project actions use white ghost pills.

## Experience

Keep the factual experience data unchanged. Use generous spacing, rounded activity badges, and simple editorial structure rather than a dashboard.

## Contact

Use one dark Carbon feature card on the Butter/Sand family of surfaces. White heading/copy; one Raspberry Pulse primary action. Do not introduce additional saturated CTA colors.

## Music Player

Music Player remains a functional utility. Its compact desktop control can stay pill-shaped; detailed controls can use the same Tedy rounded geometry. Raspberry Pulse is limited to play/progress/active affordances.

## Footer

Use a white footer with generous spacing. Structure: JRH identity → concise focus line → Explore navigation → lower metadata row with year, verified Instagram, and location label. Navigation links can use restrained pastel hover surfaces.

## Do

- Use white canvas and pastel washes for structural hierarchy.
- Use Raspberry Pulse as the sole saturated action hue.
- Use tight 56–104px display typography with line-height below 1.0.
- Use 32px cards and 999px action pills.
- Let imagery carry emotional weight.
- Prefer surface contrast over unnecessary borders.

## Don't

- Do not bring back the Arcade electric-blue system.
- Do not introduce a second saturated action color.
- Do not use sharp card corners.
- Do not use raspberry shadows on ordinary cards or decorative elements.
- Do not make every element a pill; reserve pills for buttons, nav controls, and badges.
- Do not use Montreal/Georgia assets that are unavailable without a practical fallback.
