# JRHs project guidance

Keep JRHs specific, restrained, and content-led. The core identity is: “Saya sibuk bekerja, ini yang baru.”

For UI work:
- Follow the current white, editorial portfolio implementation.
- Keep the palette minimal: white, black, graphite, muted gray, and signal blue.
- Do not invent portfolio facts, projects, testimonials, dates, or claims.
- Keep interactions functional and keyboard accessible.
- Respect `prefers-reduced-motion`.
- Do not introduce decorative sci-fi effects, generic SaaS patterns, or unnecessary animation. Preserve the restrained editorial language.
- Keep the React + TypeScript + Vite stack unless a concrete compatibility issue requires otherwise.

Current structure:
- About
- Education
- Media
- Projects
- Quotes
- Contact
- Contact is email-only via `contact@jrhsee.my.id`.
- Music Player is an optional utility in the navigation.
- Footer contains the JRH wordmark plus section navigation.
- No command palette, project modal, or separate social-contact section.

Before release:
- Run `npm run typecheck`.
- Run `npm run build`.
- Check mobile, tablet, and desktop layouts.
- Check keyboard navigation and reduced-motion behavior.
- Verify metadata and active asset paths.

Note: `design.md` is not present in the current repository, so there is no legacy design document available to reconcile against.
