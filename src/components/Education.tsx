import { motion } from 'motion/react';
import { Calendar, Award } from 'lucide-react';

const educationData = [
  { institution: 'Universitas Islam Indonesia', degree: 'Ilmu Ekonomi', year: '2021 – sekarang', activities: ['Kelompok Studi Pasar Modal (KSPM)'] },
  { institution: 'SMA Negeri 300 Brebes', degree: '', year: '2018 – 2021', activities: ['Ketua OSIS', 'Bendahara Paskibra'] },
  { institution: 'SMP Negeri 200 Brebes', degree: '', year: '2015 – 2018', activities: ['Paskibra'] },
  { institution: 'SD Negeri 100 Brebes', degree: '', year: '2009 – 2015', activities: [] },
];

export default function RekamJejak() {
  return <section id="rekam-jejak" className="section-shell"><div className="max-w-6xl mx-auto"><div className="section-heading"><p className="eyebrow">02 / Rekam Jejak</p><h2 className="display-title">Perjalanan.</h2></div><div className="timeline">{educationData.map((item, index) => <motion.article key={item.institution} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .35, delay: index * .05 }} className="timeline-item"><span className="timeline-dot" aria-hidden="true" /><div className="timeline-main"><div><h3>{item.institution}</h3>{item.degree && <p className="timeline-degree">{item.degree}</p>}</div><span className="timeline-date"><Calendar size={13} />{item.year}</span></div>{item.activities.length > 0 && <div className="timeline-activity"><span><Award size={13} />Aktivitas</span>{item.activities.map((activity) => <p key={activity}>{activity}</p>)}</div>}</article>)}</div></div></section>;
}
