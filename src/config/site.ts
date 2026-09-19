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
      { label: 'JRH 369', url: 'https://youtube.com/@jrhs369' },
      { label: 'GOVshorts', url: 'https://youtube.com/@govshortss' },
    ] },
    { number: '03', title: 'SHOPEE', category: 'Monetization', platform: 'SHOPEE', links: [
      { label: 'Shop', url: 'https://collshp.com/23369' },
    ] },
    { number: '04', title: 'LYNK.ID', category: 'Monetization', platform: 'LYNK.ID', links: [
      { label: 'Nusantara', url: 'https://lynk.id/nusantara9' },
    ] },
    { number: '05', title: 'TIKTOK', category: 'Short Video', platform: 'TIKTOK', links: [
      { label: '@allshorts369', url: 'https://www.tiktok.com/@allshorts369' },
    ] },
  ] satisfies readonly MediaItem[],
  projects: [
    { number: '01', title: 'JRH PUSAT', category: 'Utility Web App', description: 'Kumpulan tools praktis untuk membuat, menghitung, mengubah, merapikan, mencetak, dan kebutuhan developer.', status: 'Coming soon' },
    { number: '02', title: 'JRH CV', category: 'Career Web App', description: 'Platform untuk membangun identitas profesional, CV online, portfolio, dan halaman karier yang siap dibagikan.', status: 'Coming soon' },
    { number: '03', title: 'INTEL TIKTOK', category: 'Media Web App', description: 'Eksperimen web untuk menjelajah, mengolah, dan mengakses konten TikTok secara praktis dalam satu pengalaman.', status: 'Coming soon' },
  ] satisfies readonly MediaProject[],
  testimonials: [
    { name: 'Steve Jobs', role: 'Inovasi & Karya', category: 'Innovation', quote: 'Kerja yang besar lahir ketika rasa ingin tahu, keberanian mencoba, dan kecintaan pada proses bertemu dalam satu karya.' },
    { name: 'Warren Buffett', role: 'Investasi & Nilai', category: 'Investing', quote: 'Harga hanyalah angka; nilai lahir dari pemahaman, kesabaran, dan kemampuan melihat jauh melampaui pergerakan sesaat.' },
    { name: 'Charlie Munger', role: 'Mental Models', category: 'Thinking', quote: 'Belajar lintas bidang dan membangun kerangka berpikir yang baik membantu kita mengambil keputusan dengan lebih jernih.' },
    { name: 'Peter Drucker', role: 'Manajemen & Efektivitas', category: 'Management', quote: 'Waktu adalah sumber daya yang terbatas; pekerjaan yang baik dimulai dengan memilih hal yang benar untuk dikerjakan.' },
    { name: 'Benjamin Graham', role: 'Value Investing', category: 'Finance', quote: 'Investor perlu memahami bahwa musuh terbesar dalam keputusan investasi sering kali bukan pasar, melainkan perilaku dirinya sendiri.' },
    { name: 'Daniel Kahneman', role: 'Ekonomi Perilaku', category: 'Behavioral Economics', quote: 'Keputusan manusia dipengaruhi cara pikiran bekerja; memahami bias membantu kita membaca pilihan dengan lebih hati-hati.' },
    { name: 'Ray Dalio', role: 'Prinsip & Pengambilan Keputusan', category: 'Principles', quote: 'Kesalahan dapat menjadi bahan bakar pertumbuhan ketika pengalaman diubah menjadi refleksi, prinsip, dan perbaikan.' },
    { name: 'Jeff Bezos', role: 'Kewirausahaan & Produk', category: 'Entrepreneurship', quote: 'Karya yang benar-benar memberi nilai dimulai dengan memahami kebutuhan orang yang ingin dilayani.' },
    { name: 'Bill Gates', role: 'Teknologi & Pembelajaran', category: 'Technology', quote: 'Kemajuan datang ketika pengetahuan, teknologi, dan kemampuan belajar terus digunakan untuk memecahkan masalah nyata.' },
    { name: 'Elon Musk', role: 'Teknologi & Eksperimen', category: 'Technology', quote: 'Masalah besar sering membutuhkan keberanian untuk bereksperimen, menguji asumsi, dan memperbaiki sesuatu berulang kali.' },
    { name: 'Naval Ravikant', role: 'Leverage & Personal Growth', category: 'Growth', quote: 'Bangun kemampuan yang unik, manfaatkan teknologi sebagai pengungkit, dan biarkan waktu bekerja bersama kualitas keputusan.' },
    { name: 'Leonardo da Vinci', role: 'Rasa Ingin Tahu', category: 'Curiosity', quote: 'Rasa ingin tahu membuka hubungan antara seni, ilmu, pengamatan, dan penciptaan sesuatu yang baru.' },
    { name: 'Albert Einstein', role: 'Sains & Cara Berpikir', category: 'Perspective', quote: 'Kemampuan melihat persoalan dari sudut pandang berbeda sering kali membuka jalan menuju pemahaman yang lebih dalam.' },
    { name: 'Nelson Mandela', role: 'Keteguhan & Perjalanan', category: 'Resilience', quote: 'Perjalanan panjang dibangun dari keberanian menghadapi kesulitan, belajar dari pengalaman, dan terus melangkah.' },
    { name: 'Khalil Gibran', role: 'Karya & Kehidupan', category: 'Life & Work', quote: 'Karya menjadi bermakna ketika apa yang kita lakukan terhubung dengan nilai, kehidupan, dan sesuatu yang ingin kita tinggalkan.' },
    { name: 'James Clear', role: 'Kebiasaan & Sistem', category: 'Habits', quote: 'Perubahan besar dapat dibangun dari sistem kecil yang dilakukan secara konsisten hingga menjadi bagian dari kehidupan.' },
  ] satisfies readonly Testimonial[]
} as const
