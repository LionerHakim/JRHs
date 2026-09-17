# JRHs — Personal Digital Portfolio

Modern personal portfolio for **Jefri Rahman Hakim (JRH)**, combining economics, financial markets, technology, AI, research, and independent digital experiments.

> **Think deeply. Build with purpose.**

## ✦ Experience

Apple-inspired liquid glass, spatial depth, responsive typography, subtle motion, light/dark themes, mobile navigation, project detail modals, a digital ecosystem section, and touch-friendly controls for Android and iPhone.

## 🧩 Stack

- React + TypeScript
- Vite
- CSS3
- Lucide React
- GitHub
- Cloudflare Pages

## 📁 Project Structure

```text
JRHs/
├── public/
│   ├── _headers                      # production security headers
│   └── assets/
│       ├── images/
│       │   └── profile.webp           # replace photo here
│       └── audio/
│           └── README.md              # optional licensed music notes
├── src/
│   ├── config/
│   │   └── site.ts                   # EDIT CONTENT + LINKS HERE
│   ├── ecosystem.css                 # profile / ecosystem styling
│   ├── index.css                     # core design system
│   ├── level5.css                    # premium interaction layer
│   ├── main.tsx                      # UI + interaction logic
│   └── vite-env.d.ts                 # Vite type declarations
├── .github/workflows/quality.yml     # typecheck + production build
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## ✏️ Easy Maintenance

### Change profile photo

Replace:

```text
public/assets/images/profile.webp
```

Keep the filename and use a square WebP image for the cleanest result on the hero.

### Change music

The default navbar player uses a built-in Web Audio ambient loop, so the site does not depend on a missing MP3 asset. To use a real track, set `music.src` in `src/config/site.ts` to a licensed file under `public/assets/audio/`.

Only publish music you own or are licensed to publish.

### Change portfolio content

Edit only:

```text
src/config/site.ts
```

Projects, social links, hero copy, education, market profile, ecosystem links, currently, publications, quote, and contact details are centralized there. Avoid scattering URLs or personal data through components.

## 🚀 Local Development

```bash
npm install
npm run dev
```

Checks:

```bash
npm run typecheck
npm run build
```

## ☁️ Cloudflare Pages

Use the GitHub repository as the source and deploy the `main` branch.

```text
Framework preset : Vite
Build command    : npm run build
Build output     : dist
Node.js          : 22
Root directory   : /
```

Every push to `main` is intended to trigger the Cloudflare Pages deployment when the repository is connected to the Pages project. The GitHub Actions quality workflow also runs type-checking and a production build on pushes and pull requests.

## 📱 Responsive

Designed for desktop, tablet, Android, and iPhone with safe-area support, touch targets, responsive typography, mobile navigation, and reduced-motion support.

## 🔒 Interaction Protection

The frontend discourages casual text selection, copy shortcuts, image dragging, and context-menu use. These are deterrents only; screenshots, developer tools, and determined extraction cannot be prevented by a browser application.

## 🧠 Architecture Rules

1. **Content and links:** `src/config/site.ts`
2. **Personal media:** `public/assets/`
3. **UI and interaction:** `src/main.tsx`
4. **Core styling:** `src/index.css`
5. **Premium/mobile styling:** `src/level5.css`, `src/ecosystem.css`
6. Keep filenames stable when possible.
7. Run both `npm run typecheck` and `npm run build` before release.

## 👤 Author

**Jefri Rahman Hakim (JRH)**

Personal portfolio · Indonesia

- GitHub: [@LionerHakim](https://github.com/LionerHakim)
- Portfolio: [jrhsee.my.id](https://jrhsee.my.id/)

## 📄 License

Personal portfolio project. Unless otherwise stated, original content, personal assets, and branding belong to JRH.
