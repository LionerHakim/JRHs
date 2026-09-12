import { Instagram, MessageCircle, Mail, ArrowUpRight } from 'lucide-react';

const links = [
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com/jefrirh_', external: true },
  { label: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/6284916088?text=Halo%20Jefri,%20saya%20mengunjungi%20website%20CV%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20lebih%20lanjut%20mengenai%20peluang%20kolaborasi.', external: true },
  { label: 'Email', icon: Mail, href: 'mailto:jefri.tegal12@gmail.com', external: false },
];

export default function Contact() {
  return (
    <section id="contact" className="section-shell pb-20" aria-labelledby="contact-title">
      <div className="mx-auto max-w-6xl border-t border-[#E5E5E5] pt-16 md:pt-20">
        <p className="eyebrow">04 / Contact</p>
        <div className="mt-5 grid gap-8 md:grid-cols-[1fr_.7fr] md:items-end md:gap-16">
          <div>
            <h2 id="contact-title" className="max-w-3xl font-serif text-[clamp(2.6rem,7vw,4.5rem)] font-normal leading-[.96] text-black">Mari terhubung.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#3E3E3E]">Saya terbuka untuk percakapan yang bermakna, diskusi ide, dan peluang kolaborasi.</p>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#636363]">Gunakan kanal yang paling nyaman untuk memulai percakapan.</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {links.map(({ label, icon: Icon, href, external }, index) => (
            <a
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className={`inline-flex min-h-11 items-center gap-3 rounded-full px-5 text-sm transition active:scale-[.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] ${index === 0 ? 'bg-black font-semibold text-white hover:opacity-85' : 'border border-[#DCDCDC] bg-white font-medium text-black hover:border-[#BEBEBE]'}`}
            >
              <Icon size={16} aria-hidden="true" />
              {label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
