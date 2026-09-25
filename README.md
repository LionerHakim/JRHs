# JRHs — Saya Sibuk Bekerja, Ini yang Baru.

Ruang personal JRH untuk karya, project, media, dan jejak yang sedang dibangun.

## Stack
- React 19
- TypeScript
- Vite
- CSS
- Node.js 22+

## Structure
- About
- Projects
- Experience
- Media
- Thoughts
- Contact
- Music Player sebagai utility navigation
- Contact email: `contact@jrhsee.my.id`

## Design
The current UI is a restrained **3009 / post-digital editorial** system. The single CSS entrypoint is `src/index.css`, which loads the synchronized visual system in `src/styles/portal-2100.css`.

## Development
`npm install`
`npm run dev`

## Verification
`npm run typecheck`
`npm run build`
`npm run verify`

The verification pipeline checks the production `dist/` output, required public assets, navigation anchors, contact destination, light-theme metadata, and obsolete-path regressions.

## Deployment
Framework: Vite
Build command: `npm run build`
Output: `dist`
Root: repository root
Node.js: 22
Cloudflare Pages config: `wrangler.toml`

Production domain: https://jrhsee.my.id/
