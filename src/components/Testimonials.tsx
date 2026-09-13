import { Quote, Star } from 'lucide-react';

const testimonials = [
  { name: 'Pak Jokowi', role: 'Pengusaha', text: 'Insight dari Mas Jefri sangat membantu saya memahami arah pasar dengan lebih jernih. Sangat direkomendasikan untuk diskusi mendalam!' },
  { name: 'Pak Ganjar', role: 'Investor Pemula', text: 'Advice yang diberikan selalu objektif dan berdasarkan data. Terima kasih atas pandangannya yang luar biasa dan mudah dipahami.' },
  { name: 'Bu Mega', role: 'Profesional', text: 'Sangat menginspirasi! Cara pandangnya terhadap ekonomi makro mengubah cara saya mengelola keuangan dan berinvestasi.' },
  { name: 'Pak Prabowo', role: 'Mahasiswa Ekonomi', text: 'Diskusi yang sangat berbobot. Banyak insight baru yang saya dapatkan tentang psikologi pasar dan perilaku manusia.' },
];

export default function Testimonials() {
  const loop = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="section-shell overflow-hidden" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">05 / Voices</p>
            <h2 id="testimonials-title" className="display-title">Dampak & insight.</h2>
          </div>
          <div className="max-w-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[.12em] text-[var(--color-muted)] shadow-[var(--shadow-soft)]">
              <Star size={12} className="text-[var(--color-accent-warm)]" aria-hidden="true" /> Percakapan & perspektif
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">Perspektif yang pernah hadir dari berbagai percakapan dan sudut pandang.</p>
          </div>
        </div>
      </div>
      <div className="testimonial-viewport" aria-label="Testimonial carousel">
        <div className="testimonial-track">
          {loop.map((item, index) => (
            <article key={`${item.name}-${index}`} className="testimonial-card ios-tile">
              <div className="flex items-start justify-between gap-4"><span className="testimonial-avatar" aria-hidden="true">{item.name.charAt(0)}</span><Quote size={24} className="text-[var(--color-accent)]" aria-hidden="true" /></div>
              <p className="mt-7 flex-1 text-[15px] leading-7 text-[var(--color-text)]">“{item.text}”</p>
              <div className="mt-7 border-t border-[var(--color-line)] pt-4"><p className="font-semibold text-[var(--color-ink)]">{item.name}</p><p className="mt-1 text-xs text-[var(--color-muted)]">{item.role}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
