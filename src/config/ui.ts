export const sectionItems = [
  ['identity', 'About'],
  ['education', 'Education'],
  ['media', 'Media'],
  ['projects', 'Projects'],
  ['testimonials', 'Quotes'],
  ['contact', 'Contact'],
] as const

export const sectionIds = sectionItems.map(([id]) => id)

export const musicTracks = [
  { title: '123456', artist: 'Budi Doremi', file: '123456 Budi Doremi.mp3' },
  { title: 'Akad', artist: 'Payung Teduh', file: 'Akad.mp3' },
  { title: 'Bahtera Mahligai Cinta', artist: 'Ajeng Febria, Gerry Mahesa', file: 'Bahtera Mahligai Cinta.mp3' },
  { title: 'Ngertenono Ati', artist: 'NDX A.K.A.', file: 'Ngertenono Ati.mp3' },
  { title: 'PICA PICA', artist: 'Juan Reza', file: 'PICA PICA.mp3' },
  { title: 'Tak Ada Ujungnya', artist: 'Rony Parulian', file: 'Tak Ada Ujungnya.mp3' },
  { title: 'Tewas Tertimbun Masa Lalu', artist: 'NDX A.K.A.', file: 'Tewas Tertimbun Masa Lalu.mp3' },
  { title: 'Tresno Tekan Mati', artist: 'NDX A.K.A.', file: 'Tresno Tekan Mati.mp3' },
  { title: 'Who Knows', artist: 'Daniel Caesar', file: 'Who Knows.mp3' },
].map((track) => ({
  ...track,
  src: '/assets/music/' + encodeURIComponent(track.file),
}))

export const contactTopics = [
  'Pertanyaan umum',
  'Kolaborasi',
  'Project',
  'Bisnis',
  'Investasi',
  'Akademik',
  'Feedback',
  'Relationships',
  'Tambah teman',
] as const
