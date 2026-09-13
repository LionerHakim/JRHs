import { Quote } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const items = [
  { title: 'A real voice will go here.', body: 'Testimonials are intentionally waiting for real people and real words.', meta: 'Coming Soon' },
  { title: 'No invented social proof.', body: 'When a genuine testimonial is ready, it can slide into this rail without changing the layout.', meta: 'Coming Soon' },
  { title: 'Built on what is real.', body: 'The experience stays honest while the space remains ready for future feedback.', meta: 'Coming Soon' },
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  const loop = [...items, ...items];
  return (
    <section id="testimonials" className="section-shell overflow-hidden" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">06 / Voices</p>
            <h2 id="testimonials-title" className="display-title">What people say.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[var(--color-muted)]">Ruang untuk perspektif nyata—bukan testimonial yang dibuat-buat.</p>
        </div>
      </div>

      <div className="relative mt-9 -mx-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]" aria-label="Testimonial carousel">
        <motion.div className="flex w-max gap-4 pr-4" animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }} transition={reduceMotion ? undefined : { duration: 32, ease: 'linear', repeat: Infinity }}>
          {loop.map((item, index) => (
            <article key={`${item.title}-${index}`} className="ios-tile w-[min(82vw,25rem)] shrink-0 p-5 sm:w-[25rem]">
              <Quote size={20} className="text-[var(--color-accent)]" aria-hidden="true" />
              <p className="mt-5 text-base font-semibold leading-6 text-[var(--color-ink)]">“{item.title}”</p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text)]">{item.body}</p>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.14em] text-[var(--color-muted)]">{item.meta}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
