export type ProjectLink = {
  name: string
  handle?: string
  url: string
}

export type Project = {
  number: string
  title: string
  category: string
  description: string
  tags: readonly string[]
  url: string
  links?: readonly ProjectLink[]
}

export const siteConfig = {
  name: 'Jefri Rahman Hakim',
  shortName: 'JRH',
  title: 'JRH — Digital Portfolio',
  description: 'Jefri Rahman Hakim — digital portfolio, projects, publishing, and independent work.',
  instagram: 'https://instagram.com/jefrirh_',
  github: 'https://github.com/LionerHakim',
  telegram: 'https://t.me/jefri_rh',
  linkedin: '',
  portfolio: 'https://jrhsee.my.id/',
  profileImage: '/assets/images/s.jpg',
  music: {
    title: 'JRH Music',
    tracks: [
      { title: 'Budi Doremi', src: '/assets/audio/Budi-Doremi.mp3' },
      { title: 'Tak Ada Ujungnya', src: '/assets/audio/Tak-AdaUjungnya.mp3' },
    ],
  },
  hero: {
    eyebrow: 'JRH / DIGITAL PORTFOLIO',
    titleLine1: 'Think deeply.',
    titleLine2: 'Build with purpose.',
    description: 'A personal workspace for ideas, digital experiments, publishing, and things worth building.',
  },
  about: {
    titleLine1: 'Ideas become',
    titleLine2: 'systems.',
    lead: 'A simple rule: make the thinking clear, then make the output useful.',
    body: 'I work from first principles: understand the problem, structure the work, simplify the experience, then iterate until it feels right.',
  },
  facts: [
    ['2021', 'Universitas Islam Indonesia'],
    ['04', 'Current projects & channels'],
    ['JRH', 'Independent digital workspace'],
  ],
  education: [
    { period: '2021 — 2026', institution: 'Universitas Islam Indonesia', program: 'Undergraduate study', detail: 'Research, writing, and project work' },
    { period: '2018 — 2021', institution: 'SMA Negeri', program: 'Student leadership', detail: 'Organization and administration' },
    { period: '2015 — 2018', institution: 'SMP Negeri', program: 'Student activities', detail: 'Discipline and organization' },
  ],
  workPrinciples: [
    'Start from the real problem.',
    'Keep the interface calm and readable.',
    'Ship useful iterations, not decoration.',
  ],
  projects: [
    {
      number: '01',
      title: 'Pinterest',
      category: 'Digital channel',
      description: 'JRH visual publishing channels for art, inspiration, discovery, and digital distribution.',
      tags: ['Pinterest', 'Content', 'Visual'],
      url: 'https://pin.it/u90jfYk6p',
      links: [
        { name: 'JRH Art', url: 'https://pin.it/u90jfYk6p' },
        { name: 'JRH', url: 'https://pin.it/6k7sezYIK' },
      ],
    },
    {
      number: '02',
      title: 'YouTube',
      category: 'Content platform',
      description: 'Video publishing channels for JRH and GOVshorts content.',
      tags: ['YouTube', 'Shorts', 'Content'],
      url: 'https://youtube.com/@jrhs369',
      links: [
        { name: 'JRHs 369', handle: '@jrhs369', url: 'https://youtube.com/@jrhs369' },
        { name: 'GOVshorts', handle: '@govshortss', url: 'https://youtube.com/@govshortss' },
      ],
    },
    {
      number: '03',
      title: 'Monetization',
      category: 'Digital distribution',
      description: 'JRH distribution and monetization points for products, recommendations, and digital activity.',
      tags: ['Collshp', 'Lynk.id', 'Monetization'],
      url: 'https://collshp.com/23369',
      links: [
        { name: 'Collshp', handle: '23369', url: 'https://collshp.com/23369' },
        { name: 'Lynk.id — Nusantara', handle: 'nusantara9', url: 'https://lynk.id/nusantara9' },
      ],
    },
    {
      number: '04',
      title: 'TikTok',
      category: 'Digital channel',
      description: 'Short-form video channel included in the JRH digital portfolio and distribution system.',
      tags: ['TikTok', 'Short-form', 'Content'],
      url: 'https://www.tiktok.com/@jokowi.gov',
      links: [
        { name: 'TikTok', handle: '@jokowi.gov', url: 'https://www.tiktok.com/@jokowi.gov' },
      ],
    },
  ],
  quote: 'Berpikir dari dasar. Menyederhanakan yang rumit. Membangun sesuatu yang berguna.',
  contact: {
    titleLine1: 'Have an idea?',
    titleLine2: "Let's build.",
    description: 'Open to collaborations, digital experiments, creative projects, and conversations.',
  },
} as const
