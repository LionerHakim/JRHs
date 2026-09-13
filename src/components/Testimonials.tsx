import { ArrowLeftRight, Quote, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const testimonials = [
  { name: 'Pak Jokowi', role: 'Pengusaha', text: 'Insight dari Mas Jefri sangat membantu saya memahami arah pasar dengan lebih jernih. Sangat direkomendasikan untuk diskusi mendalam!' },
  { name: 'Pak Ganjar', role: 'Investor Pemula', text: 'Advice yang diberikan selalu objektif dan berdasarkan data. Terima kasih atas pandangannya yang luar biasa dan mudah dipahami.' },
  { name: 'Bu Mega', role: 'Profesional', text: 'Sangat menginspirasi! Cara pandangnya terhadap ekonomi makro mengubah cara saya mengelola keuangan dan berinvestasi.' },
  { name: 'Pak Prabowo', role: 'Mahasiswa Ekonomi', text: 'Diskusi yang sangat berbobot. Banyak insight baru yang saya dapatkan tentang psikologi pasar dan perilaku manusia.' },
];

export default function Testimonials() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const interactingRef = useRef(false);
  const pointerRef = useRef({ active: false, x: 0, scroll: 0 });
  const resumeTimerRef = useRef<number | null>(null);
  const [interacting, setInteracting] = useState(false);
  const loop = [...testimonials, ...testimonials];

  const setInteraction = (value: boolean) => {
    interactingRef.current = value;
    setInteracting(value);
  };

  const centerNearest = () => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>('.testimonial-card'));
    const center = viewport.scrollLeft + viewport.clientWidth / 2;
    const nearest = cards.reduce<HTMLElement | null>((best, card) => {
      if (!best) return card;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const bestCenter = best.offsetLeft + best.offsetWidth / 2;
      return Math.abs(cardCenter - center) < Math.abs(bestCenter - center) ? card : best;
    }, null);
    if (!nearest) return 0;
    const target = nearest.offsetLeft - (viewport.clientWidth - nearest.offsetWidth) / 2;
    viewport.scrollTo({ left: target, behavior: 'smooth' });
    return 700;
  };

  const pauseThenResume = (delay = 1500) => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setInteraction(false), delay);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let frame = 0;
    let last = performance.now();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const tick = (now: number) => {
      const delta = Math.min(now - last, 40);
      last = now;
      if (!interactingRef.current && !reduced.matches) {
        viewport.scrollLeft += delta * 0.0125;
        const loopWidth = viewport.scrollWidth / 2;
        if (loopWidth > 0 && viewport.scrollLeft >= loopWidth) viewport.scrollLeft -= loopWidth;
      }
      frame = requestAnimationFrame(tick);
    };

    const pauseOnTouch = () => {
      setInteraction(true);
      pauseThenResume(1800);
    };

    viewport.addEventListener('touchstart', pauseOnTouch, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener('touchstart', pauseOnTouch);
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    pointerRef.current = { active: true, x: event.clientX, scroll: viewport.scrollLeft };
    viewport.setPointerCapture(event.pointerId);
    setInteraction(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !pointerRef.current.active) return;
    viewport.scrollLeft = pointerRef.current.scroll - (event.clientX - pointerRef.current.x);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    pointerRef.current.active = false;
    if (viewport?.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    setInteraction(true);
    const settleTime = centerNearest();
    pauseThenResume(settleTime + 1200);
  };

  const handleWheel = () => {
    setInteraction(true);
    pauseThenResume(1500);
  };

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
      <div
        ref={viewportRef}
        className={`testimonial-viewport ${interacting ? 'is-interacting' : ''}`}
        aria-label="Testimonial carousel"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        tabIndex={0}
      >
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
      <div className="testimonial-swipe-hint" aria-hidden="true">
        <span className="testimonial-swipe-line"><ArrowLeftRight size={12} strokeWidth={1.8} /></span>
        <span>Geser untuk menjelajah</span><span className="testimonial-swipe-dot" /><span>Auto</span>
      </div>
    </section>
  );
}
