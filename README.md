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
- Education
- Media
- Projects
- Thoughts
- Contact
- Music Player sebagai utility navigation
- Contact email: `contact@jrhsee.my.id`

## Design
The current UI is a restrained **3009 / post-digital editorial** system. Content and page geometry remain anchored to the `4e5b0be` baseline; the structural layer lives in `src/styles/foundation.css`, with the synchronized visual system in `src/styles/portal-2100.css` loaded afterward.

## Development
`npm install`
`npm run dev`

## Verification
`npm run typecheck`
`npm run build`
`npm run verify`

The verification pipeline also checks that the production `dist/` output contains the generated HTML/CSS/JS bundle and required public assets.

## Deployment
Framework: Vite
Build command: `npm run build`
Output: `dist`
Root: repository root
Node.js: 22
Cloudflare Pages config: `wrangler.toml`

Production domain: https://jrhsee.my.id/
