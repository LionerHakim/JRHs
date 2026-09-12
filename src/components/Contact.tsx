import { ArrowUpRight, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section-shell pb-20" aria-labelledby="contact-title">
      <div className="mx-auto max-w-7xl border-t border-[var(--color-line)] pt-16 md:pt-20">
        <div className="grid gap-8 md:grid-cols-[.85fr_1.15fr] md:items-end md:gap-20">
          <div>
            <p className="eyebrow">05 / Contact</p>
            <h2 id="contact-title" className="mt-3 max-w-3xl font-[var(--font-perfectly-nineties-regular)] text-[clamp(2.6rem,7vw,5.5rem)] font-normal leading-[.92] text-[var(--color-ink)]">Mari terhubung.</h2>
          </div>
          <div className="max-w-xl">
            <p className="font-[var(--font-inter)] text-base leading-7 text-[var(--color-text)]">Terbuka untuk percakapan yang bermakna, diskusi ide, dan peluang kolaborasi.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://instagram.com/jefrirh_" target="_blank" rel="noopener noreferrer" className="portal-link bg-[var(--color-ink)] px-5 font-[var(--font-inter)] text-sm font-semibold text-[var(--color-paper)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] active:scale-[.97]">
                <Instagram size={16} aria-hidden="true" /> Instagram <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
