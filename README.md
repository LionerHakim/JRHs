# JRHs - Personal Digital Portfolio

Personal portfolio for **Jefri Rahman Hakim (JRH)**, combining Development Economics, financial markets, technology, AI, research, and independent digital work.

> **Think deeply. Build with purpose.**

## Experience

The interface uses an iOS-inspired material language without cloning Apple's UI: strong typography, high-contrast hierarchy, restrained iOS-blue accents, a floating navigation layer, responsive spacing, subtle interaction feedback, project detail modals, light-only rendering, and local music controls.

The visual system is also filtered through the open-source **antislop** project so decorative techniques stay purposeful and the content remains specific. See `DESIGN.md` and `AGENTS.md` for the project direction and working rules.

## Stack

- React + TypeScript
- Vite
- CSS3
- Lucide React
- GitHub
- Cloudflare Pages

## Project Structure

```text
JRHs/
├── public/
│   ├── _headers
│   ├── 404.html
│   ├── anti-slop.css
│   └── assets/
│       ├── images/
│       │   └── s.jpg
│       └── audio/
│           ├── Budi-Doremi.mp3
│           ├── Tak-AdaUjungnya.mp3
│           └── README.md
├── scripts/
│   └── quality.mjs                 # deterministic visual/SEO/config audit
├── src/
│   ├── config/
│   │   └── site.ts                 # content + links
│   ├── index.css                   # global foundation
│   ├── future.css                  # final light-only visual system
│   ├── main.tsx                    # UI + interaction logic
│   └── vite-env.d.ts
├── .github/workflows/quality.yml   # quality audit + typecheck + production build
├── AGENTS.md
├── DESIGN.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Maintenance

### Profile photo

The hero reads:

```text
public/assets/images/s.jpg
```

Keep the path in sync with `profileImage` inside `src/config/site.ts`.

### Music

The navbar player reads local audio paths from `src/config/site.ts`:

```text
public/assets/audio/Budi-Doremi.mp3
public/assets/audio/Tak-AdaUjungnya.mp3
```

Only publish music you own or are licensed to publish.

### Portfolio content

Edit:

```text
src/config/site.ts
```

This centralizes the portfolio copy, social links, education, projects, media paths, and contact details.

## Local Development

```bash
npm install
npm run dev
```

Checks:

```bash
npm run typecheck
npm run quality
npm run build
```

## Cloudflare Pages

```text
Framework preset : Vite
Build command    : npm run build
Build output     : dist
Node.js          : 22
Root directory   : /
```

Connect the `main` branch to the Cloudflare Pages project for automatic deployments. GitHub Actions runs the deterministic quality audit, TypeScript check, production build, and deploy-artifact verification on pushes and pull requests.

## Responsive + Accessibility

The UI is designed for desktop, tablet, Android, and iPhone with safe-area-aware mobile sizing, touch-friendly controls, keyboard focus, escape-to-close behavior, modal focus trapping, visible interaction states, responsive typography, and reduced-motion support.

## Interaction Protection

Images are not forcibly blocked from dragging because browser controls should remain predictable and accessible. The portfolio does not claim to prevent screenshots, developer tools, or determined copying.

## Design Rules

1. Read `DESIGN.md` before changing visual direction.
2. Keep content and links in `src/config/site.ts`.
3. Keep personal media under `public/assets/`.
4. Keep UI and interaction in `src/main.tsx`.
5. Keep the global foundation in `src/index.css` and the final visual system in `src/future.css`.
6. Keep the iOS reference as a material and interaction reference, not a clone.
7. Keep glass limited to functional navigation surfaces.
8. Keep all page backgrounds pure white.
9. Keep dark-theme and page-gradient code out of the source.
10. Run `npm run typecheck`, `npm run quality`, and `npm run build` before release.

## Author

**Jefri Rahman Hakim (JRH)**

Personal portfolio - Indonesia

- GitHub: [@LionerHakim](https://github.com/LionerHakim)
- Portfolio: [jrhsee.my.id](https://jrhsee.my.id/)

## License

Personal portfolio project. Unless otherwise stated, original content, personal assets, and branding belong to JRH.
