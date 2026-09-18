export type Link = { name: string; url: string; handle?: string }
export type Education = { period: string; institution: string; program: string }
export type Project = {
  number: string
  title: string
  links?: readonly Link[]
}

export const siteConfig = {
  identity: {
    name: 'Jefri Rahman Hakim',
    description: 'Digital portfolio, projects, publishing, and independent work.',
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
    { period: '2021 — 2026', institution: 'Universitas Islam Indonesia', program: 'S1 Ekonomi Pembangunan' },
    { period: '2018 — 2021', institution: 'SMA Negeri 300 Brebes', program: 'SMA' },
    { period: '2015 — 2018', institution: 'SMP Negeri 200 Brebes', program: 'SMP' },
  ] satisfies readonly Education[],
  projects: [
    {
      number: '01',
      title: 'Pinterest',
      links: [
        { name: 'JRH Art', url: 'https://pin.it/u90jfYk6p' },
        { name: 'JRH', url: 'https://pin.it/6k7sezYIK' },
      ],
    },
    {
      number: '02',
      title: 'YouTube',
      links: [
        { name: 'JRHs 369', handle: '@jrhs369', url: 'https://youtube.com/@jrhs369' },
        { name: 'GOVshorts', handle: '@govshortss', url: 'https://youtube.com/@govshortss' },
      ],
    },
    {
      number: '03',
      title: 'Collshp',
      links: [
        { name: 'Collshp', handle: '23369', url: 'https://collshp.com/23369' },
        { name: 'Lynk.id', handle: 'nusantara9', url: 'https://lynk.id/nusantara9' },
      ],
    },
    {
      number: '04',
      title: 'TikTok',
      links: [
        { name: 'TikTok', handle: '@jokowi.gov', url: 'https://www.tiktok.com/@jokowi.gov' },
      ],
    },
  ] satisfies readonly Project[],
} as const
