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
    { name: 'Joko Widodo', role: 'Perspektif Kepemimpinan', category: 'Kepemimpinan & Karya', quote: 'Gagasan yang baik akan semakin berarti ketika mampu diwujudkan menjadi sesuatu yang bermanfaat bagi banyak orang.' },
    { name: 'Prabowo Subianto', role: 'Perspektif Pengembangan Diri', category: 'Disiplin & Pertumbuhan', quote: 'Kerja keras, disiplin, dan keberanian untuk terus belajar merupakan bagian penting dalam membangun masa depan.' },
    { name: 'Puan Maharani', role: 'Perspektif Kolaborasi', category: 'Kolaborasi', quote: 'Kolaborasi menjadi semakin penting ketika sebuah gagasan ingin berkembang dan memberikan manfaat yang lebih luas.' },
    { name: 'Ganjar Pranowo', role: 'Perspektif Inovasi', category: 'Inovasi', quote: 'Teknologi akan menjadi lebih berarti ketika digunakan untuk menghadirkan solusi yang dekat dengan kebutuhan masyarakat.' },
    { name: 'Anies Baswedan', role: 'Perspektif Pendidikan', category: 'Pendidikan', quote: 'Pendidikan bukan hanya tentang memperoleh pengetahuan, tetapi juga tentang membangun kemampuan untuk menciptakan perubahan.' },
    { name: 'Sherly', role: 'Perspektif Kreativitas', category: 'Kreativitas', quote: 'Kreativitas tumbuh ketika seseorang berani mencoba, mengeksplorasi, dan mengubah ide menjadi karya.' },
    { name: 'Megawati Soekarnoputri', role: 'Perspektif Keteguhan', category: 'Keteguhan', quote: 'Keteguhan dalam menjalankan proses menjadi bagian penting dari perjalanan panjang membangun sebuah karya.' },
    { name: 'Timothy Ronald', role: 'Perspektif Finansial', category: 'Literasi Finansial', quote: 'Pengetahuan finansial menjadi semakin bernilai ketika diterapkan secara disiplin dalam mengambil keputusan.' },
    { name: 'Kalimasada', role: 'Perspektif Investasi & Pembelajaran', category: 'Investasi', quote: 'Belajar tentang investasi bukan sekadar mengejar hasil, tetapi memahami risiko, proses, dan keputusan.' },
    { name: 'Bahlil Lahadalia', role: 'Perspektif Kewirausahaan', category: 'Kewirausahaan', quote: 'Kesempatan akan lebih bermakna ketika keberanian mengambil langkah bertemu dengan kemampuan membaca peluang.' },
    { name: 'Sahabat', role: 'Perspektif Personal', category: 'Perjalanan', quote: 'Jangan berhenti hanya karena prosesnya belum sempurna. Terus bergerak, belajar, dan selesaikan satu per satu.' },
    { name: 'Seseorang', role: 'Perspektif Kehidupan', category: 'Kehidupan', quote: 'Pada akhirnya, sebuah karya tidak hanya menunjukkan apa yang kita buat, tetapi juga perjalanan yang kita lewati untuk membuatnya.' },
  ] satisfies readonly Testimonial[],
} as const
