import { Instagram, MessageCircle, Mail, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section-shell pb-16">
      <div className="mx-auto max-w-6xl border-t border-[#E5E5E5] pt-16">
        <p className="eyebrow">04 / Contact</p>
        <div className="mt-5 grid gap-8 md:grid-cols-[1fr_.7fr] md:items-end md:gap-16">
          <h2 className="max-w-3xl font-serif text-4xl font-normal leading-none text-black md:text-6xl">Mari terhubung.</h2>
          <p className="max-w-md text-sm leading-6 text-[#3E3E3E]">Saya terbuka untuk percakapan yang bermakna, diskusi ide inovatif, maupun peluang kolaborasi strategis.</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="https://instagram.com/jefrirh_" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 rounded-full border border-black bg-black px-5 text-sm font-semibold text-white transition active:scale-[.97] hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]"><Instagram size={16} aria-hidden="true" />Instagram<ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href="https://wa.me/6284916088?text=Halo%20Jefri,%20saya%20mengunjungi%20website%20CV%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20lebih%20lanjut%20mengenai%20peluang%20kolaborasi." target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 rounded-full border border-[#DCDCDC] bg-white px-5 text-sm font-medium text-black transition active:scale-[.97] hover:border-[#BEBEBE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]"><MessageCircle size={16} aria-hidden="true" />WhatsApp<ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href="mailto:jefri.tegal12@gmail.com" className="inline-flex min-h-11 items-center gap-3 rounded-full border border-[#DCDCDC] bg-white px-5 text-sm font-medium text-black transition active:scale-[.97] hover:border-[#BEBEBE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]"><Mail size={16} aria-hidden="true" />Email<ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
