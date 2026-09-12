import { motion } from 'motion/react';

export default function Profile() {
  return (
    <section id="about" className="section-shell">
      <div className="section-grid">
        <div>
          <p className="eyebrow">01 / About</p>
          <h2 className="display-title">Tentang.</h2>
        </div>
        <motion.div className="prose-jrhs" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .35 }}>
          <p>Saya memiliki ketertarikan mendalam pada bagaimana ekonomi, pasar keuangan, teknologi, dan perilaku manusia saling terhubung dalam ekosistem modern.</p>
          <p className="editorial-quote">Perjalanan saya dalam trading dan investing dimulai pada 9 Maret 2019 — sebuah titik yang menandai proses memahami pasar melalui sudut pandang analitis sekaligus psikologis.</p>
        </motion.div>
      </div>
    </section>
  );
}
