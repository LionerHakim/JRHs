import { ChevronRight, Quote, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

const testimonials = [
  { name: 'Pak Jokowi', role: 'Pengusaha', text: 'Insight dari Mas Jefri sangat membantu saya memahami arah pasar dengan lebih jernih. Sangat direkomendasikan untuk diskusi mendalam!' },
  { name: 'Pak Ganjar', role: 'Investor Pemula', text: 'Advice yang diberikan selalu objektif dan berdasarkan data. Terima kasih atas pandangannya yang luar biasa dan mudah dipahami.' },
  { name: 'Bu Mega', role: 'Profesional', text: 'Sangat menginspirasi! Cara pandangnya terhadap ekonomi makro mengubah cara saya mengelola keuangan dan berinvestasi.' },
  { name: 'Pak Prabowo', role: 'Mahasiswa Ekonomi', text: 'Diskusi yang sangat berbobot. Banyak insight baru yang saya dapatkan tentang psikologi pasar dan perilaku manusia.' },
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const loop = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="section-shell overflow-hidden" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">06 / Voices</p>
            <h2 id="testimonials-title" className="display-title">Dampak & insight.</h2>
          </div>
          <div className="max-w-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[.12em] text-[var(--color-muted)] shadow-[var(--shadow-soft)]">
              <Star size={12} className="text-amber-500" aria-hidden="true" /> 5+ Tahun Pengalaman & Kepercayaan Publik
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">Perspektif yang pernah hadir dari berbagai percakapan dan sudut pandang.</p>
          </div>
        </div>
      </div>

      <div
        className="relative mt-9 -mx-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
        aria-label="Testimonial carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <motion.div
          className="flex w-max gap-4 pr-4"
          animate={reduceMotion || paused ? undefined : { x: ['0%', '-50%'] }}
          transition={reduceMotion || paused ? undefined : { duration: 36, ease: 'linear', repeat: Infinity }}
        >
          {loop.map((item, index) => (
            <article key={`${item.name}-${index}`} className="testimonial-card ios-tile">
              <div className="flex items-start justify-between gap-4">
                <span className="testimonial-avatar" aria-hidden="true">{item.name.charAt(0)}</span>
                <Quote size={24} className="text-[var(--color-accent)]" aria-hidden="true" />
              </div>
              <p className="mt-7 flex-1 text-[15px] leading-7 text-[var(--color-text)]">“{item.text}”</p>
              <div className="mt-7 border-t border-[var(--color-line)] pt-4">
                <p className="font-semibold text-[var(--color-ink)]">{item.name}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{item.role}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-5 flex max-w-7xl items-center justify-between px-1 text-[11px] font-medium text-[var(--color-muted)]">
        <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" /> Geser untuk eksplorasi</span>
        <ChevronRight size={15} aria-hidden="true" />
      </div>
    </section>
  );
}
