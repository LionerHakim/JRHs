# JRHs — Personal Digital Portfolio

A modern personal portfolio for **Jefri Rahman Hakim (JRH)** — combining economics, markets, technology, AI, and independent digital experiments in one focused experience.

> **Think deeply. Build boldly.**

## ✦ Overview

JRHs is designed as a living digital profile rather than a conventional CV. The interface presents personal identity, selected work, current interests, and contact information through a clean, futuristic visual system inspired by contemporary Apple-style interfaces.

The current visual direction is called **iOS 3070**: a futuristic design concept built around liquid-glass surfaces, spatial depth, restrained motion, responsive layouts, and light/dark themes.

## ✦ Highlights

- Responsive portfolio for desktop, tablet, Android, and iPhone
- Futuristic liquid-glass navigation
- Light / dark mode with persistent preference
- Personal profile photo
- Smooth section navigation
- Selected projects and external GitHub links
- Journal / currently exploring section
- Built-in ambient audio interaction
- Mobile-first touch interactions
- Safe-area support for modern iOS devices
- Accessibility-friendly focus states
- Reduced-motion support
- Copy, selection, context-menu, and drag interaction restrictions
- Minimal dependency footprint

## 🧩 Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **CSS3**
- **Lucide React**
- **GitHub** for source control
- **Vercel** for deployment

## 📁 Project Structure

```text
JRHs/
├── public/
│   └── profile.webp.b64
├── src/
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── AUDIT.md
└── remix_-jrh-biography.zip
```

## 🚀 Local Development

Clone the repository:

```bash
gh repo clone LionerHakim/JRHs
cd JRHs
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Type-check the project:

```bash
npm run lint
```

## 🎨 Design Principles

### Spatial
Large typography, intentional whitespace, clear hierarchy, and comfortable touch targets create a calm visual rhythm.

### Liquid Glass
Navigation and interactive controls use translucent surfaces, blur, subtle borders, and layered shadows to create depth without visual noise.

### Responsive
The layout adapts from large desktop displays to compact mobile screens while preserving the same hierarchy and interaction model.

### Motion
Motion is subtle and functional. Users who prefer reduced motion are automatically given a static experience.

### Personal
The portfolio keeps the identity of JRH at the center: economics, markets, technology, ideas, and experimentation.

## 📱 Mobile

The interface is optimized for modern mobile browsers with:

- Safe-area insets
- Large touch targets
- Mobile navigation drawer
- Horizontal interest ticker
- Responsive typography
- Touch-friendly controls
- iOS-style glass surfaces

## 🔒 Interaction Protection

The portfolio intentionally restricts casual copying, text selection, image dragging, and context-menu interactions. These controls are only a deterrent and **cannot provide real protection against browser developer tools, screenshots, or determined extraction**.

## 🗂️ Recovery & Legacy Data

The repository retains `remix_-jrh-biography.zip` as a legacy source/archive. It should not be removed during future redesigns or refactors unless its contents have been independently backed up.

See [`AUDIT.md`](./AUDIT.md) for the current recovery notes.

## 👤 Author

**Jefri Rahman Hakim (JRH)**

Personal portfolio · Indonesia

- GitHub: [@LionerHakim](https://github.com/LionerHakim)
- Portfolio: [jrhsee.my.id](https://jrhsee.my.id/)

## 📄 License

This repository is a personal portfolio project. Unless otherwise stated, the original content, personal assets, and branding belong to JRH.
