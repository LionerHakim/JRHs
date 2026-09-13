# JRHs

Ruang digital personal dan portofolio editorial JRHs.

## Struktur

Halaman publik sengaja ringkas dan berisi tepat enam bagian utama:

1. **Hero** — identitas JRHs, pernyataan utama, dan akses cepat ke perjalanan serta proyek
2. **About** — konteks personal, fokus, dan titik awal perjalanan trading/investing
3. **Rekam Jejak** — kronologi pendidikan, organisasi, dan aktivitas yang benar-benar tercatat
4. **Projects** — bukti kerja yang nyata, dengan detail dibuka tanpa meninggalkan alur halaman
5. **Contact** — kanal komunikasi yang benar-benar tersedia
6. **Footer** — identitas dan navigasi sekunder

Bagian legacy seperti Vision, Hobbies, Skills, Reflection, Knowledge, Motivation, Web Tools, dan Testimonials tidak menjadi bagian dari pengalaman akhir.

## Bahasa visual

Arah visual V99: **dark editorial** — quiet, premium, precise, intelligent, human, tactile, minimal, confident, dan timeless.

- Kanvas: `#050505`
- Surface/Card: `#0A0A0A` / `#101010`
- Border: `#1D1D1D`
- Teks utama: `#F5F5F5`
- Teks sekunder: `#A0A0A0`
- Teks muted: `#666666`
- Aksen fungsional: `#007AFF`
- Serif untuk heading/editorial emphasis
- Inter/system sans untuk body, navigasi, dan metadata
- Tanpa sunset/twilight gradient, neon glow, glassmorphism, decorative noise, atau filler visual

## Interaksi utama

### Navigasi

Desktop menampilkan JRHs, About, Rekam Jejak, Projects, Contact, Music, dan Menu. Mobile mempertahankan JRHs, Music, dan Menu. Menu seluler hanya memuat empat anchor konten utama dan mendukung Escape, focus containment, pemulihan fokus, serta safe-area spacing.

### Music

Playlist yang sudah tersedia dipertahankan tanpa autoplay. Player mendukung idle, playing, paused, loading, dan error; seek, volume, mute, previous/next, playlist, keyboard focus, dan graceful failure.

### Projects

Setiap proyek menampilkan nama, deskripsi singkat, metadata, dan **Info Detail**. Detail menggunakan drawer di desktop dan sheet di mobile, dengan Escape, klik luar, focus containment, focus restoration, preserved background scroll, semantic dialog, serta external links memakai `rel="noopener noreferrer"`.

## Aksesibilitas

Implementasi mempertahankan semantic HTML, satu H1, hierarchy heading yang jelas, focus state yang terlihat, target sentuh minimal 44px, keyboard activation, dialog semantics, Escape handling, dan dukungan `prefers-reduced-motion`.

## Performa & ketahanan

Media yang ada dipertahankan, JavaScript dijaga ringan, event listener dibersihkan, native scrolling digunakan, scrollbar visual disembunyikan tanpa mematikan scroll, dan kegagalan optional capability seperti audio tidak boleh merusak halaman utama.

## Integritas konten

Repositori adalah sumber kebenaran. Tidak ada testimonial, statistik, klien, jabatan, teknologi, progres, atau URL yang dibuat hanya untuk mengisi layout. Proyek hanya menggunakan URL nyata yang sudah tersedia.

## Pengembangan

Stack: Vite, React, TypeScript, Tailwind CSS, dan Lucide React.

Alur kerja yang ditargetkan:

`Audit → Implementasi → Build → Pengujian → Inspeksi → Perbaikan → QA akhir`

## Prinsip

> **BUAT JRHs TERASA DIRANCANG, BUKAN DIRAKIT.**
>
> **JADIKAN PROYEK ALASAN ORANG BERTAHAN.**

© 2026 JRHs. Hak cipta dilindungi.
