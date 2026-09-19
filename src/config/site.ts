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
  sourceUrl?: string
  sourceStatus?: 'verified' | 'attributed'
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
  ] as readonly MediaProject[],
  testimonials: [
    { name: 'Steve Jobs', role: 'Apple co-founder', category: 'Innovation', quote: 'Your time is limited, so don’t waste it living someone else’s life.', sourceUrl: 'https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says', sourceStatus: 'verified' },
    { name: 'Nelson Mandela', role: 'Former President of South Africa', category: 'Education', quote: 'Education is the most powerful weapon which you can use to change the world.', sourceUrl: 'https://www.nelsonmandela.org/nm100-education', sourceStatus: 'verified' },
    { name: 'Maya Angelou', role: 'Writer & Poet', category: 'Life', quote: 'When you learn, teach. When you get, give.', sourceUrl: 'https://www.elonnewsnetwork.com/article/2012/09/qa-maya-angelou-on-teaching-and-giving', sourceStatus: 'verified' },
    { name: 'Martin Luther King Jr.', role: 'Civil Rights Leader', category: 'Courage', quote: 'Faith is taking the first step even when you don’t see the whole staircase.', sourceUrl: 'https://quotle.info/who-said/faith-is-taking-the-first-step-even-when-you-dont-see-the/', sourceStatus: 'attributed' },
    { name: 'Albert Einstein', role: 'Physicist', category: 'Curiosity', quote: 'The important thing is not to stop questioning. Curiosity has its own reason for existing.', sourceUrl: 'https://www.pbs.org/wgbh/nova/einstein/wisd-nf.html', sourceStatus: 'verified' },
    { name: 'Warren Buffett', role: 'Investor', category: 'Investing', quote: 'Price is what you pay. Value is what you get.', sourceUrl: 'https://www.livemint.com/news/us-news/quote-of-the-day-by-warren-buffett-price-is-what-you-pay-value-is-what-you-get-heres-what-it-means-for-investors-11773816629881.html', sourceStatus: 'verified' },
    { name: 'Charlie Munger', role: 'Investor & Thinker', category: 'Thinking', quote: 'The best thing a human being can do is to help another human being know more.', sourceUrl: 'https://mungerarchive.com/q/learning-help-know-more/', sourceStatus: 'attributed' },
    { name: 'Peter Drucker', role: 'Management Thinker', category: 'Management', quote: 'There is nothing so useless as doing efficiently that which should not be done at all.', sourceUrl: 'https://publications.iadb.org/publications/english/document/Citizen-Experience-Design-for-Digital-Transformation.pdf', sourceStatus: 'verified' },
    { name: 'Daniel Kahneman', role: 'Psychologist & Economist', category: 'Behavioral Economics', quote: 'Nothing in life is as important as you think it is, while you are thinking about it.', sourceUrl: 'https://en.wikiquote.org/wiki/Daniel_Kahneman', sourceStatus: 'verified' },
    { name: 'Jeff Bezos', role: 'Amazon founder', category: 'Long-Term Thinking', quote: 'We are stubborn on vision. We are flexible on details.', sourceUrl: 'https://www.forbes.com/sites/johngreathouse/2013/04/30/5-time-tested-success-tips-from-amazon-founder-jeff-bezos/', sourceStatus: 'verified' },
    { name: 'Bill Gates', role: 'Microsoft co-founder', category: 'Learning', quote: 'Success is a lousy teacher. It seduces smart people into thinking they can’t lose.', sourceUrl: 'https://www.governing.com/archive/Success-is-a-Lousy.html', sourceStatus: 'verified' },
    { name: 'James Clear', role: 'Author', category: 'Habits', quote: 'You do not rise to the level of your goals. You fall to the level of your systems.', sourceUrl: 'https://jamesclear.com/quotes/you-do-not-rise-to-the-level-of-your-goals-you-fall-to-the-level-of-your-systems', sourceStatus: 'verified' },
    { name: 'Ray Dalio', role: 'Investor & Author', category: 'Principles', quote: 'Pain + Reflection = Progress.', sourceUrl: 'https://www.youtube.com/watch?v=s1Hbty1NI6c', sourceStatus: 'verified' },
    { name: 'Leonardo da Vinci', role: 'Artist & Inventor', category: 'Curiosity', quote: 'Learning never exhausts the mind.', sourceStatus: 'attributed' },
    { name: 'Khalil Gibran', role: 'Writer & Poet', category: 'Life', quote: 'Work is love made visible.', sourceUrl: 'https://poets.org/poem/work-4', sourceStatus: 'verified' },
    { name: 'Barack Obama', role: '44th President of the United States', category: 'Action', quote: 'Change will not come if we wait for some other person or some other time.', sourceStatus: 'attributed' },
  ]
} as const
