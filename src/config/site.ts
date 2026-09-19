export type Link = { name: string; url: string }
export type Education = { period: string; institution: string; program: string; activities?: readonly string[] }
export type MediaLink = { label: string; url: string }
export type MediaItem = {
  number: string
  title: string
  category: string
  platform: string
  links: readonly MediaLink[]
}
export type MediaProject = {
  number: string
  title: string
  category: string
  description: string
  status: string
  url?: string
}
export type Testimonial = {
  quote: string
  name: string
  role: string
  category: string
}

export const siteConfig = {
  identity: {
    name: 'Jefri Rahman Hakim',
    description: 'Projects, publishing, and independent work.',
    profileImage: '/assets/images/s.jpg',
  },
  contactEmail: 'contact@jrhsee.my.id',
  education: [
    { period: '2021 — 2026', institution: 'Universitas Islam Indonesia', program: 'S1 Ekonomi Pembangunan', activities: ['KSPM FBEUII (Event Organizer)'] },
    { period: '2018 — 2021', institution: 'SMA Negeri 300 Brebes', program: 'SMA', activities: ['Bendahara Paskibra', 'Ketua OSIS 19/20'] },
    { period: '2015 — 2018', institution: 'SMP Negeri 200 Brebes', program: 'SMP', activities: ['Ketua Kelas'] },
  ] satisfies readonly Education[],
  media: [
    { number: '01', title: 'PINTEREST', category: 'Inspiration', platform: 'PINTEREST', links: [
      { label: 'Board 01', url: 'https://pin.it/u90jfYk6p' },
      { label: 'Board 02', url: 'https://pin.it/6k7sezYIK' },
    ] },
    { number: '02', title: 'YOUTUBE', category: 'Video', platform: 'YOUTUBE', links: [
      { label: 'IKNshorts', url: 'https://youtube.com/@jrhs369' },
      { label: 'GOVshorts', url: 'https://youtube.com/@govshortss' },
    ] },
    { number: '03', title: 'SHOPEE', category: 'Monetization', platform: 'SHOPEE', links: [
      { label: 'Shop', url: 'https://collshp.com/23369' },
    ] },
    { number: '04', title: 'LYNK.ID', category: 'Monetization', platform: 'LYNK.ID', links: [
      { label: 'Nusantara', url: 'https://lynk.id/nusantara9' },
    ] },
    { number: '05', title: 'TIKTOK', category: 'Short Video', platform: 'TIKTOK', links: [
      { label: 'allshorts369', url: 'https://www.tiktok.com/@allshorts369' },
    ] },
  ] satisfies readonly MediaItem[],
  projects: [
    { number: '01', title: 'JRH PUSAT', category: 'Utility Web App', description: 'Kumpulan tools praktis untuk membuat, menghitung, mengubah, merapikan, mencetak, dan kebutuhan developer.', status: 'Coming soon' },
    { number: '02', title: 'JRH CV', category: 'Career Web App', description: 'Platform untuk membangun identitas profesional, CV online, portfolio, dan halaman karier yang siap dibagikan.', status: 'Coming soon' },
    { number: '03', title: 'INTEL TIKTOK', category: 'Media Web App', description: 'Eksperimen web untuk menjelajah, mengolah, dan mengakses konten TikTok secara praktis dalam satu pengalaman.', status: 'Coming soon' },
  ] satisfies readonly MediaProject[],
  testimonials: [
    { name: 'Steve Jobs', role: 'Apple co-founder', category: 'Innovation', quote: 'Your time is limited, so don’t waste it living someone else’s life.' },
    { name: 'Nelson Mandela', role: 'Former President of South Africa', category: 'Education', quote: 'Education is the most powerful weapon which you can use to change the world.' },
    { name: 'Maya Angelou', role: 'Writer & Poet', category: 'Life', quote: 'When you learn, teach. When you get, give.' },
    { name: 'Martin Luther King Jr.', role: 'Civil Rights Leader', category: 'Courage', quote: 'Faith is taking the first step even when you don’t see the whole staircase.' },
    { name: 'Albert Einstein', role: 'Physicist', category: 'Curiosity', quote: 'The important thing is not to stop questioning. Curiosity has its own reason for existing.' },
    { name: 'Warren Buffett', role: 'Investor', category: 'Investing', quote: 'Price is what you pay. Value is what you get.' },
    { name: 'Charlie Munger', role: 'Investor & Thinker', category: 'Thinking', quote: 'The best thing a human being can do is to help another human being know more.' },
    { name: 'Peter Drucker', role: 'Management Thinker', category: 'Management', quote: 'There is nothing so useless as doing efficiently that which should not be done at all.' },
    { name: 'Daniel Kahneman', role: 'Psychologist & Economist', category: 'Behavioral Economics', quote: 'Nothing in life is as important as you think it is, while you are thinking about it.' },
    { name: 'Jeff Bezos', role: 'Amazon founder', category: 'Long-Term Thinking', quote: 'We are stubborn on vision. We are flexible on details.' },
    { name: 'Bill Gates', role: 'Microsoft co-founder', category: 'Learning', quote: 'Success is a lousy teacher. It seduces smart people into thinking they can’t lose.' },
    { name: 'James Clear', role: 'Author', category: 'Habits', quote: 'You do not rise to the level of your goals. You fall to the level of your systems.' },
    { name: 'Ray Dalio', role: 'Investor & Author', category: 'Principles', quote: 'Pain + Reflection = Progress.' },
    { name: 'Leonardo da Vinci', role: 'Artist & Inventor', category: 'Curiosity', quote: 'Learning never exhausts the mind.' },
    { name: 'Khalil Gibran', role: 'Writer & Poet', category: 'Life', quote: 'Work is love made visible.' },
    { name: 'Barack Obama', role: '44th President of the United States', category: 'Action', quote: 'Change will not come if we wait for some other person or some other time.' },
  ]
} as const
