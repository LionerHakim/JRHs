import { ArrowUpRight, Instagram, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section-shell pb-16 md:pb-20" aria-labelledby="contact-title">
      <div className="mx-auto max-w-6xl">
        <div className="contact-panel">
          <div className="max-w-2xl">
            <p className="eyebrow">06 / Contact</p>
            <h2 id="contact-title" className="mt-3 font-[var(--font-perfectly-nineties-regular)] text-[clamp(2.7rem,8vw,5.5rem)] font-normal leading-[.92] text-[var(--color-ink)]">Ada ide? Mari ngobrol.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-text)]">Untuk diskusi, kolaborasi, atau sekadar bertukar perspektif tentang ekonomi, pasar, teknologi, dan ide yang sedang dibangun.</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="https://instagram.com/jefrirh_" target="_blank" rel="noopener noreferrer" className="portal-link bg-[var(--color-ink)] px-5 font-[var(--font-inter)] text-sm font-semibold text-[var(--color-paper)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] active:scale-[.97]"><Instagram size={16} aria-hidden="true" /> Instagram <ArrowUpRight size={14} aria-hidden="true" /></a>
            <span className="inline-flex min-h-11 items-center gap-2 px-1 text-xs font-medium text-[var(--color-muted)]"><MessageCircle size={14} aria-hidden="true" /> Respons terbaik untuk percakapan yang jelas dan langsung.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
