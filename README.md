# JRHs — Personal Digital Portfolio

A modern personal portfolio for **Jefri Rahman Hakim (JRH)**, combining economics, markets, technology, AI, and independent digital experiments.

> **Think deeply. Build boldly.**

## ✦ Design

**iOS 3070** — a futuristic Apple-inspired visual concept using liquid-glass surfaces, spatial depth, restrained motion, responsive layouts, and light/dark themes.

## 🧩 Stack

- React + TypeScript
- Vite
- CSS3
- Lucide React
- GitHub
- Vercel

## 📁 Clean Project Structure

```text
JRHs/
├── public/
│   └── assets/
│       ├── images/
│       │   ├── profile.webp          # EDIT PHOTO HERE
│       │   └── README.md
│       ├── audio/
│       │   ├── ambient.mp3           # EDIT MUSIC HERE
│       │   └── README.md
│       └── README.md
├── src/
│   ├── config/
│   │   └── site.ts                   # EDIT CONTENT + LINKS HERE
│   ├── main.tsx                      # UI / logic
│   └── index.css                     # DESIGN SYSTEM / styling
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## ✏️ Easy Maintenance

### 1. Change your photo

Replace:

```text
public/assets/images/profile.webp
```

Keep the filename `profile.webp` and the website will use the new image automatically.

Recommended: square WebP, around 768–1200px.

### 2. Change music

Replace:

```text
public/assets/audio/ambient.mp3
```

Keep the filename `ambient.mp3`. The navbar music button will automatically use the new track.

Use music that you own or are licensed to publish.

### 3. Change project links

Open:

```text
src/config/site.ts
```

Find:

```ts
projects: [
  {
    title: 'JRH Portfolio',
    url: 'https://github.com/LionerHakim/JRHs'
  }
]
```

Change `url`, `title`, `description`, `category`, or `tags` there. **Do not edit `main.tsx` just to change portfolio content.**

### 4. Change Instagram / GitHub / portfolio

At the top of `src/config/site.ts`:

```ts
instagram: 'https://instagram.com/jefrirh_',
github: 'https://github.com/LionerHakim',
portfolio: 'https://jrhsee.my.id/',
```

Change the value and every connected UI location can use the central configuration.

### 5. Change hero text

Still in `src/config/site.ts`, edit:

```ts
hero: {
  eyebrow: '...',
  titleLine1: '...',
  titleLine2: '...',
  description: '...'
}
```

The same principle applies to About, facts, interests, currently, quote, and Contact.

## 🚀 Development

```bash
gh repo clone LionerHakim/JRHs
cd JRHs
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Type-check:

```bash
npm run lint
```

## 📱 Responsive

Built for desktop, tablet, Android, and iPhone with safe-area support, touch-friendly controls, responsive typography, mobile navigation, and reduced-motion support.

## 🔒 Interaction Protection

The portfolio discourages casual text selection, copying, image dragging, and context-menu use. These are only deterrents; browser developer tools, screenshots, and determined extraction cannot be prevented by a frontend application.

## 🧠 Architecture Rules

1. **Content belongs in `src/config/site.ts`.**
2. **Media belongs in `public/assets/`.**
3. **UI logic belongs in `src/main.tsx`.**
4. **Visual styling belongs in `src/index.css`.**
5. Do not hard-code project URLs throughout React components.
6. Do not put personal media inside `src/`.
7. Keep asset filenames stable when possible so content changes do not require code changes.
8. Run `npm run build` before deploying.

## 👤 Author

**Jefri Rahman Hakim (JRH)**

Personal portfolio · Indonesia

- GitHub: [@LionerHakim](https://github.com/LionerHakim)
- Portfolio: [jrhsee.my.id](https://jrhsee.my.id/)

## 📄 License

Personal portfolio project. Unless otherwise stated, original content, personal assets, and branding belong to JRH.
