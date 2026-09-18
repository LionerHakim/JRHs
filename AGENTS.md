# JRHs project guidance

Keep the portfolio specific, restrained, and content-led.

For UI work:
- Use the SIGNAL design direction defined by the current implementation.
- Keep the palette limited to Void, Panel, Signal Red, Signal Amber, Primary White, and Muted.
- Do not invent portfolio facts, projects, testimonials, dates, or claims.
- Keep interactions functional and keyboard accessible.
- Respect `prefers-reduced-motion`.
- Avoid decorative sci-fi clichés, gradients, generic SaaS cards, and unnecessary animation.
- Keep the React + TypeScript + Vite stack unless a concrete compatibility issue requires otherwise.

Before release:
- Run `npm run typecheck`.
- Run `npm run build`.
- Check mobile, tablet, and desktop layouts.
- Check keyboard navigation, dialogs, command palette, and reduced-motion behavior.
- Verify metadata and active asset paths.

Note: `design.md` is not present in the current repository, so there is no legacy design document available to reconcile against.