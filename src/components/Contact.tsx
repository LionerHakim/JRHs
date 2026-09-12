import { ArrowUpRight, Instagram, Mail, MessageCircle } from 'lucide-react';

const contactLinks = [
  { label: 'Instagram', href: 'https://instagram.com/jefrirh_', icon: Instagram, external: true },
  { label: 'WhatsApp', href: 'https://wa.me/6284916088?text=Halo%20Jefri,%20saya%20mengunjungi%20website%20CV%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20lebih%20lanjut%20mengenai%20peluang%20kolaborasi.', icon: MessageCircle, external: true },
  { label: 'Surel', href: 'mailto:jefri.tegal12@gmail.com', icon: Mail, external: false },
];

export default function Contact() {
  return (
    <section id="contact" className="section-shell pb-20" aria-labelledby="contact-title">
      <div className="mx-auto max-w-7xl border-t border-[#E5E5E5] pt-16 md:pt-20">
        <div className="grid gap-8 md:grid-cols-[.85fr_1.15fr] md:items-end md:gap-20">
          <div>
            <p className="eyebrow">04 / Contact</p>
            <h2 id="contact-title" className="mt-3 max-w-3xl font-[var(--font-perfectly-nineties-regular)] text-[clamp(2.6rem,7vw,5.5rem)] font-normal leading-[.92] text-[var(--color-ink-black)]">Mari terhubung.</h2>
          </div>
          <div className="max-w-xl">
            <p className="font-[var(--font-inter)] text-base leading-7 text-[var(--color-graphite)]">Saya terbuka untuk percakapan yang bermakna, diskusi ide, maupun peluang kolaborasi.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {contactLinks.map(({ label, href, icon: Icon, external }) => (
                <a key={href} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`portal-link min-h-11 px-5 font-[var(--font-inter)] text-sm font-semibold transition active:scale-[.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-blue)] ${label === 'Instagram' ? 'bg-[var(--color-ink-black)] text-[var(--color-paper-white)] hover:opacity-85' : 'border border-[#DCDCDC] bg-[var(--color-paper-white)] text-[var(--color-ink-black)] hover:border-[#BEBEBE]'}`}>
                  <Icon size={16} aria-hidden="true" />{label}<ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
