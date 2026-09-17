export type Project = {
  number: string
  title: string
  category: string
  description: string
  tags: string[]
  url: string
}

export type EcosystemItem = {
  name: string
  handle?: string
  url: string
}

export const siteConfig = {
  name: 'Jefri Rahman Hakim',
  shortName: 'JRH',
  title: 'JRH — Economics, Markets & Digital Systems',
  description: 'Jefri Rahman Hakim — economics, financial markets and software development.',
  email: 'jefrirhyt2@gmail.com',
  location: 'Yogyakarta · Brebes, Jawa Tengah',
  instagram: 'https://instagram.com/jefrirh_',
  github: 'https://github.com/LionerHakim',
  telegram: 'https://t.me/jefri_rh',
  linkedin: '',
  portfolio: 'https://jrhsee.my.id/',
  profileImage: '/assets/images/profile.webp',
  // Leave src empty to use the built-in Web Audio ambient loop. Add a licensed MP3 later if desired.
  music: { title: 'JRH Ambient', src: '' },
  hero: {
    eyebrow: 'ECONOMICS · MARKETS · SOFTWARE',
    titleLine1: 'Think deeply.',
    titleLine2: 'Build with purpose.',
    description: 'An economics student and independent digital maker exploring macroeconomics, financial markets, financial literacy, AI and the web — connecting analytical thinking with things people can actually use.',
  },
  about: {
    label: '01 / PROFILE',
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
    experience: '5+ tahun pengalaman empiris',
    focus: 'Pasar modal & instrumen derivatif',
    philosophy: 'Risk First, Return Follows',
    methods: ['Position sizing', 'Fractional Kelly', 'Drawdown asymmetry', 'Liquidity & market structure', 'Interest-rate transmission'],
    description: 'Mempelajari pasar melalui kombinasi risk management, probabilitas, struktur mikro likuiditas dan transmisi kebijakan moneter — dengan prioritas pada survival dan pengendalian downside sebelum mengejar return.',
  },
  digitalEcosystem: {
    title: 'JRH Digital Ecosystem',
    description: 'Satu pintu untuk kanal digital, konten, distribusi dan monetisasi JRH.',
    pinterest: [
      { name: 'Pinterest · JRH Art', url: 'https://pin.it/u90jfYk6p' },
      { name: 'Pinterest · JRH', url: 'https://pin.it/6k7sezYIK' },
    ] satisfies EcosystemItem[],
    youtube: [
      { name: 'JRHs 369', handle: '@jrhs369', url: 'https://youtube.com/@jrhs369' },
      { name: 'GOVshorts', handle: '@govshortss', url: 'https://youtube.com/@govshortss' },
    ] satisfies EcosystemItem[],
    monetization: [
      { name: 'Collshp', handle: '23369', url: 'https://collshp.com/23369' },
      { name: 'Lynk.id — Nusantara', handle: 'nusantara9', url: 'https://lynk.id/nusantara9' },
    ] satisfies EcosystemItem[],
    tiktok: [
      { name: 'TikTok', handle: '@jokowi.gov', url: 'https://www.tiktok.com/@jokowi.gov' },
    ] satisfies EcosystemItem[],
  },
  projects: [
    { number: '01', title: 'JRH Portfolio', category: 'Personal digital system', description: 'A living portfolio and personal digital laboratory for economics, markets, technology and independent experiments.', tags: ['React', 'Vite', 'TypeScript'], url: 'https://github.com/LionerHakim/JRHs' },
    { number: '02', title: 'KitaBisa.com', category: 'Web experiment', description: 'A focused interface study exploring familiar product patterns, interaction and digital presentation.', tags: ['Web', 'UI', 'Experiment'], url: 'https://github.com/LionerHakim/KITABISA.COM' },
    { number: '03', title: 'Ultah', category: 'Creative web', description: 'A playful interactive web experience built around storytelling, visual interaction and motion.', tags: ['Creative', 'Web', 'Motion'], url: 'https://github.com/LionerHakim/Ultah' },
  ] satisfies Project[],
  currently: [
    ['Research', 'Economics & financial literacy'],
    ['Markets', 'Macro, investing & risk'],
    ['Building', 'Web, AI & digital products'],
  ],
  publications: [
    { title: 'Riset Literasi Keuangan & Kesiapan Investasi', status: 'Academic research', detail: 'Riset kuantitatif mengenai edukasi keuangan digital, literasi keuangan dan kesiapan investasi.' },
    { title: 'Digital Economy & Financial Markets', status: 'Research direction', detail: 'Eksplorasi ekonomi digital, perilaku investor, pasar finansial dan teknologi.' },
  ],
  quote: '“Berpikir dari dasar. Mengukur risiko. Membangun sesuatu yang berarti.”',
  contact: {
    titleLine1: 'Have an idea?',
    titleLine2: 'Let’s build.',
    description: 'Open to thoughtful collaborations, research, digital experiments and conversations around economics, markets and technology.',
  },
} as const
