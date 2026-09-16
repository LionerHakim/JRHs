export type Project = {
  number: string
  title: string
  category: string
  description: string
  tags: string[]
  url: string
}

/**
 * SINGLE SOURCE OF TRUTH
 *
 * Most portfolio content you will want to edit lives in this file.
 * Images/audio live in /public/assets.
 */
export const siteConfig = {
  name: 'Jefri Rahman Hakim',
  shortName: 'JRH',
  title: 'JRH — Personal Portfolio',
  description: 'JRH — personal portfolio of Jefri Rahman Hakim.',
  instagram: 'https://instagram.com/jefrirh_',
  github: 'https://github.com/LionerHakim',
  portfolio: 'https://jrhsee.my.id/',
  profileImage: '/assets/images/profile.webp',
  music: {
    title: 'JRH Ambient',
    src: '/assets/audio/ambient.mp3',
  },
  hero: {
    eyebrow: 'AVAILABLE FOR SELECTED PROJECTS',
    titleLine1: 'Think deeply.',
    titleLine2: 'Build boldly.',
    description: 'Economics student, market observer and digital maker exploring the space between ideas, technology and people.',
  },
  about: {
    label: '01 / ABOUT',
    titleLine1: 'Curiosity is',
    titleLine2: 'the common thread.',
    lead: 'I like turning questions into things people can see, use, test and understand.',
    body: 'My work sits across development economics, financial literacy, investing, AI and the web. This portfolio is the small digital laboratory where those interests meet.',
  },
  facts: [
    ['2021', 'Started at UII'],
    ['ECON', 'Development Economics'],
    ['JRH', 'Independent projects'],
  ],
  interests: ['ECONOMICS', 'MARKETS', 'TECHNOLOGY', 'EXPERIMENTS', 'IDEAS'],
  projects: [
    { number: '01', title: 'JRH Portfolio', category: 'Personal brand', description: 'A living portfolio for economics, technology, markets and experiments.', tags: ['React', 'Vite', 'TypeScript'], url: 'https://github.com/LionerHakim/JRHs' },
    { number: '02', title: 'KitaBisa.com', category: 'Web experiment', description: 'A focused interface study exploring familiar product patterns and interaction.', tags: ['Web', 'UI', 'Experiment'], url: 'https://github.com/LionerHakim/KITABISA.COM' },
    { number: '03', title: 'Ultah', category: 'Creative web', description: 'A playful interactive web experience built around storytelling and motion.', tags: ['Creative', 'Web', 'Motion'], url: 'https://github.com/LionerHakim/Ultah' },
  ] satisfies Project[],
  currently: [
    ['Reading', 'Books & research'],
    ['Markets', 'Macro & investing'],
    ['Building', 'Web & AI'],
  ],
  quote: '“Berpikir, membangun, dan terus mengeksplorasi.”',
  contact: {
    titleLine1: 'Have an idea?',
    titleLine2: 'Let’s talk.',
    description: 'Open to thoughtful collaborations, experiments and conversations.',
  },
} as const
