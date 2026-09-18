# JRHs — Personal Digital Portfolio

Personal portfolio for **Jefri Rahman Hakim (JRH)**.

## Stack

- React
- TypeScript
- Vite
- CSS
- GitHub
- Cloudflare Pages

## Structure

```text
JRHs/
├── public/
│   └── assets/
│       └── images/
│           └── s.jpg
├── src/
│   ├── config/
│   │   └── site.ts
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── AGENTS.md
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Development

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run typecheck
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

## Content

Portfolio content and external links are centralized in `src/config/site.ts`.

The current interface follows the SIGNAL direction: dark void, signal red/amber accents, restrained panel geometry, functional command palette, project detail dialogs, keyboard-first interaction, reduced-motion fallback, and responsive layouts.

## Assets

The active profile image is:

```text
public/assets/images/s.jpg
```

Unused legacy audio assets should not be reintroduced unless a real licensed use case is added.

## Deployment note

GitHub repository: `LionerHakim/JRHs`

Production site: `https://jrhsee.my.id/`
