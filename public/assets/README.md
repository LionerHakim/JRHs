# JRHs Assets

Editable media lives under this folder.

```text
assets/
├── images/
│   └── s.jpg
└── audio/
    ├── Budi-Doremi.mp3
    └── Tak-AdaUjungnya.mp3
```

### Profile photo

The portfolio currently uses `images/s.jpg`. Keep the path synchronized with `profileImage` in `src/config/site.ts`.

### Music

The navbar player reads the nine local tracks from `audio/` through the Music Player in `src/main.tsx`. Playback uses one HTML audio element with on-demand loading; tracks are not preloaded on initial page load. Use only audio you own or are licensed to publish.

### Add media

Use descriptive filenames such as `project-01.webp`, `project-02.webp`, or `research-cover.webp`. Keep media in `public/assets/` rather than inside `src/`.
