# JRHs project guidance

Keep the portfolio specific, restrained, and content-led.

For UI work:
- Follow the current white, editorial portfolio implementation.
- Keep the palette minimal: white, black, graphite, muted gray, and signal blue.
- Do not invent portfolio facts, projects, testimonials, dates, or claims.
- Keep interactions functional and keyboard accessible.
- Respect `prefers-reduced-motion`.
- Avoid gradients, decorative sci-fi effects, generic SaaS patterns, and unnecessary animation.
- Keep the React + TypeScript + Vite stack unless a concrete compatibility issue requires otherwise.

Current structure:
- About
- Education
- Projects
- Contact
- Contact is email-only via `contact@jrhsee.my.id`.
- Footer contains only the JRH wordmark.
- No command palette, project modal, social contact list, or music player.

Before release:
- Run `npm run typecheck`.
- Run `npm run build`.
- Check mobile, tablet, and desktop layouts.
- Check keyboard navigation and reduced-motion behavior.
- Verify metadata and active asset paths.

Note: `design.md` is not present in the current repository, so there is no legacy design document available to reconcile against.
