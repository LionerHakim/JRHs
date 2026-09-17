export type Project = {
  number: string
  title: string
  category: string
  description: string
  tags: readonly string[]
  url: string
  links?: readonly { name: string; handle?: string; url: string }[]
}

export const siteConfig = {
  name: 'Jefri Rahman Hakim',
  shortName: 'JRH',
  title: 'JRH - Personal Digital Portfolio',
  description: 'Jefri Rahman Hakim personal digital portfolio.',
  location: '',
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
    eyebrow: '',
    titleLine1: 'Think deeply.',
    titleLine2: 'Build with purpose.',
    description: 'Research, experiments, and digital products built with clarity and purpose.',
  },
  about: {
    label: 'ABOUT',
    titleLine1: 'Ideas become',
    titleLine2: 'systems.',
    lead: '',
    body: 'I work from first principles: understand the problem, structure the evidence, manage risk, then build.',
  },
  facts: [
    ['2021', 'Universitas Islam Indonesia'],
    ['2019', 'Financial markets journey'],
  ],
  interests: [],
  education: [
    { period: '2021 - Now', institution: 'Universitas Islam Indonesia', program: 'S1 Ekonomi Pembangunan', detail: 'Makroekonomi, Moneter, Ekonometrika Terapan, Pasar Modal', location: '' },
    { period: '2018 - 2021', institution: 'SMA Negeri', program: 'Ketua OSIS, Bendahara Paskibra', detail: 'Organisasi, Kepemimpinan, Administrasi', location: '' },
    { period: '2015 - 2018', institution: 'SMP Negeri', program: 'Anggota Aktif, Bendahara Paskibra', detail: 'Organisasi, Disiplin, Administrasi', location: '' },
  ],
  marketProfile: {
    start: '',
    experience: '',
    focus: '',
    philosophy: '',
    methods: [],
    description: '',
  },
  projects: [
    { number: '04', title: 'Pinterest', category: 'Digital channel', description: 'JRH visual publishing channels for art, inspiration, discovery, and digital distribution.', tags: ['Pinterest', 'Content', 'Visual'], url: 'https://pin.it/u90jfYk6p', links: [
      { name: 'JRH Art', url: 'https://pin.it/u90jfYk6p' },
      { name: 'JRH', url: 'https://pin.it/6k7sezYIK' },
    ] },
    { number: '05', title: 'YouTube', category: 'Content platform', description: 'Video publishing channels for JRH and GOVshorts content.', tags: ['YouTube', 'Shorts', 'Content'], url: 'https://youtube.com/@jrhs369', links: [
      { name: 'JRHs 369', handle: '@jrhs369', url: 'https://youtube.com/@jrhs369' },
      { name: 'GOVshorts', handle: '@govshortss', url: 'https://youtube.com/@govshortss' },
    ] },
    { number: '06', title: 'Monetization', category: 'Digital distribution', description: 'JRH distribution and monetization points for products, recommendations, and digital activity.', tags: ['Collshp', 'Lynk.id', 'Monetization'], url: 'https://collshp.com/23369', links: [
      { name: 'Collshp', handle: '23369', url: 'https://collshp.com/23369' },
      { name: 'Lynk.id - Nusantara', handle: 'nusantara9', url: 'https://lynk.id/nusantara9' },
    ] },
    { number: '07', title: 'TikTok', category: 'Digital channel', description: 'Short-form video channel included in the JRH digital portfolio and distribution system.', tags: ['TikTok', 'Short-form', 'Content'], url: 'https://www.tiktok.com/@jokowi.gov', links: [
      { name: 'TikTok', handle: '@jokowi.gov', url: 'https://www.tiktok.com/@jokowi.gov', },
    ] },
  ],
  quote: 'Berpikir dari dasar. Mengukur risiko. Membangun sesuatu yang berarti.',
  contact: {
    titleLine1: 'Have an idea?',
    titleLine2: "Let's build.",
    description: 'Open to collaborations, research, digital experiments, and conversations.',
  },
} as const
