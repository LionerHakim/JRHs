# JRHs project guidance

JRHs is a personal editorial portfolio: “Saya sibuk bekerja, ini yang baru.”

## Source of truth
- `4e5b0be` defines the protected content and page structure.
- Visual redesign belongs in `src/styles/portal-2100.css`, loaded through the single CSS entrypoint `src/index.css`.
- Do not invent, remove, reorder, or rewrite portfolio facts unless explicitly requested.
- Keep the React + TypeScript + Vite stack.
- Keep the existing section flow: About, Projects, Experience, Media, Thoughts, Contact.
- Music Player remains an optional navigation utility.
- Contact remains email-only via `contact@jrhsee.my.id`.

## UI
- Current visual direction: premium 3009 / post-digital editorial.
- Prefer controlled contrast, refined surfaces, restrained spectral accents, and strong typography.
- Avoid generic SaaS styling, excessive glow, noisy decoration, and layout changes disguised as CSS polish.
- Preserve the responsive geometry already defined by the baseline stylesheet.
- Keep keyboard accessibility and `prefers-reduced-motion`.

## Release audit
- Run `npm run typecheck`.
- Run `npm run build`.
- Check desktop, tablet, and Android/mobile.
- Check keyboard navigation, reduced motion, light-theme consistency, music player, contact form, and perspective carousel.
- Verify metadata and asset paths.