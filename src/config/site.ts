export type Link = { name: string; url: string }
export type Education = { period: string; institution: string; program: string; activities?: readonly string[] }
export type Project = {
  number: string
  title: string
  links?: readonly Link[]
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
        { name: 'JRHs 369', url: 'https://youtube.com/@jrhs369' },
        { name: 'GOVshorts', url: 'https://youtube.com/@govshortss' },
      ],
    },
    {
      number: '03',
      title: 'Collshp',
      links: [
        { name: 'Collshp', url: 'https://collshp.com/23369' },
        { name: 'Lynk.id', url: 'https://lynk.id/nusantara9' },
      ],
    },
    {
      number: '04',
      title: 'TikTok',
      links: [
        { name: 'TikTok', url: 'https://www.tiktok.com/@jokowi.gov' },
      ],
    },
  ] satisfies readonly Project[],
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
