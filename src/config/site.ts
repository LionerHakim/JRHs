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
  title: 'JRH — Economics, Markets & Digital Systems',
  description: 'Jefri Rahman Hakim — economics, financial markets and software development.',
  location: 'Yogyakarta · Brebes, Jawa Tengah',
  instagram: 'https://instagram.com/jefrirh_',
  github: 'https://github.com/LionerHakim',
  telegram: 'https://t.me/jefri_rh',
  linkedin: '',
  portfolio: 'https://jrhsee.my.id/',
  music: {
    title: 'JRH Music',
    tracks: [
      { title: 'Budi Doremi', src: '/assets/audio/Budi-Doremi.mp3' },
      { title: 'Tak Ada Ujungnya', src: '/assets/audio/Tak-AdaUjungnya.mp3' },
    ],
  },
  hero: {
    eyebrow: 'ECONOMICS · MARKETS · SOFTWARE',
    titleLine1: 'Think deeply.',
    titleLine2: 'Build with purpose.',
    description: 'An economics student and independent digital maker exploring macroeconomics, financial markets, financial literacy, AI and the web — connecting analytical thinking with things people can actually use.',
  },
  about: {
    label: '01 / ABOUT',
    titleLine1: 'Ideas become',
    titleLine2: 'systems.',
    lead: 'JRH is a personal laboratory where economics, markets, technology and curiosity meet.',
    body: 'My academic foundation is Development Economics at Universitas Islam Indonesia, with interests spanning macroeconomics, monetary economics, econometrics, capital markets, investing, financial literacy, AI, Web3 and digital products. I approach projects from first principles: understand the problem, structure the evidence, manage the risk, then build.',
  },
  facts: [
    ['2021 — NOW', 'Universitas Islam Indonesia'],
    ['ECON', 'Development Economics'],
    ['2019 — NOW', 'Financial markets journey'],
  ],
  interests: ['MACROECONOMICS', 'FINANCIAL MARKETS', 'INVESTING', 'AI & WEB3', 'SOFTWARE', 'BEHAVIOR'],
  education: [
    { period: '2021 — Now', institution: 'Universitas Islam Indonesia', program: 'S1 Ekonomi Pembangunan', detail: 'Makroekonomi · Moneter · Ekonometrika Terapan · Pasar Modal', location: 'Sleman, D.I. Yogyakarta' },
    { period: '2018 — 2021', institution: 'SMA Negeri Brebes', program: 'Ketua OSIS · Bendahara Paskibra', detail: 'Organisasi · Kepemimpinan · Administrasi', location: 'Brebes, Jawa Tengah' },
    { period: '2015 — 2018', institution: 'SMP Negeri Brebes', program: 'Anggota Aktif · Bendahara Paskibra', detail: 'Organisasi · Disiplin · Administrasi', location: 'Brebes, Jawa Tengah' },
    { period: '2009 — 2015', institution: 'SD Negeri Brebes', program: 'Pendidikan Dasar', detail: 'Fondasi numerik · Logika aritmetika', location: 'Brebes, Jawa Tengah' },
  ],
  marketProfile: {
    start: '9 Maret 2019',
    experience: '7+ tahun pengalaman empiris',
    focus: 'Pasar modal & instrumen derivatif',
    philosophy: 'Risk First, Return Follows',
    methods: ['Position sizing', 'Fractional Kelly', 'Drawdown asymmetry', 'Liquidity & market structure', 'Interest-rate transmission'],
    description: 'Mempelajari pasar melalui kombinasi risk management, probabilitas, struktur mikro likuiditas dan transmisi kebijakan moneter — dengan prioritas pada survival dan pengendalian downside sebelum mengejar return.',
  },
  projects: [
    { number: '01', title: 'JRH Portfolio', category: 'Personal digital system', description: 'A living portfolio and personal digital laboratory for economics, markets, technology and independent experiments.', tags: ['React', 'Vite', 'TypeScript'], url: 'https://github.com/LionerHakim/JRHs' },
    { number: '02', title: 'KitaBisa.com', category: 'Web experiment', description: 'A focused interface study exploring familiar product patterns, interaction and digital presentation.', tags: ['Web', 'UI', 'Experiment'], url: 'https://github.com/LionerHakim/KITABISA.COM' },
    { number: '03', title: 'Ultah', category: 'Creative web', description: 'A playful interactive web experience built around storytelling, visual interaction and motion.', tags: ['Creative', 'Web', 'Motion'], url: 'https://github.com/LionerHakim/Ultah' },
    { number: '04', title: 'Pinterest', category: 'Digital channel', description: 'JRH visual publishing channels for art, inspiration, discovery and digital distribution.', tags: ['Pinterest', 'Content', 'Visual'], url: 'https://pin.it/u90jfYk6p', links: [
      { name: 'JRH Art', url: 'https://pin.it/u90jfYk6p' },
      { name: 'JRH', url: 'https://pin.it/6k7sezYIK' },
    ] },
    { number: '05', title: 'YouTube', category: 'Content platform', description: 'Video publishing channels for JRH and GOVshorts content.', tags: ['YouTube', 'Shorts', 'Content'], url: 'https://youtube.com/@jrhs369', links: [
      { name: 'JRHs 369', handle: '@jrhs369', url: 'https://youtube.com/@jrhs369' },
      { name: 'GOVshorts', handle: '@govshortss', url: 'https://youtube.com/@govshortss' },
    ] },
    { number: '06', title: 'Monetization', category: 'Digital distribution', description: 'JRH distribution and monetization points for products, recommendations and digital activity.', tags: ['Collshp', 'Lynk.id', 'Monetization'], url: 'https://collshp.com/23369', links: [
      { name: 'Collshp', handle: '23369', url: 'https://collshp.com/23369' },
      { name: 'Lynk.id — Nusantara', handle: 'nusantara9', url: 'https://lynk.id/nusantara9' },
    ] },
    { number: '07', title: 'TikTok', category: 'Digital channel', description: 'Short-form video channel included in the JRH digital portfolio and distribution system.', tags: ['TikTok', 'Short-form', 'Content'], url: 'https://www.tiktok.com/@jokowi.gov', links: [
      { name: 'TikTok', handle: '@jokowi.gov', url: 'https://www.tiktok.com/@jokowi.gov' },
    ] },
  ],
  quote: '“Berpikir dari dasar. Mengukur risiko. Membangun sesuatu yang berarti.”',
  contact: {
    titleLine1: 'Have an idea?',
    titleLine2: 'Let’s build.',
    description: 'Open to thoughtful collaborations, research, digital experiments and conversations around economics, markets and technology.',
  },
} as const
