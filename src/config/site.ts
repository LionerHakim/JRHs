export type Link = { name: string; url: string; handle?: string }
export type Education = { period: string; institution: string; program: string; detail?: string }
export type Project = { number: string; title: string; category: string; description: string; tags: readonly string[]; url: string; links?: readonly Link[] }

export const siteConfig = {
  identity: {
    name: 'Jefri Rahman Hakim',
    shortName: 'JRH',
    title: 'JRH — Digital Portfolio',
    description: 'Jefri Rahman Hakim — digital portfolio, projects, publishing, and independent work.',
    profileImage: '/assets/images/s.jpg',
  },
  social: {
    instagram: 'https://instagram.com/jefrirh_',
    github: 'https://github.com/LionerHakim',
    telegram: 'https://t.me/jefri_rh',
    linkedin: '',
    portfolio: 'https://jrhsee.my.id/',
  },
  education: [
    {
      period: '2021 — 2026',
      institution: 'Universitas Islam Indonesia',
      program: 'S1 Ekonomi Pembangunan',
    },
    {
      period: '2018 — 2021',
      institution: 'SMA Negeri 300 Brebes',
      program: 'Pendidikan Menengah',
    },
    {
      period: '2015 — 2018',
      institution: 'SMP Negeri 200 Brebes',
      program: 'Pendidikan Menengah Pertama',
    },
  ] satisfies readonly Education[],
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
  ] satisfies readonly Project[],
} as const
