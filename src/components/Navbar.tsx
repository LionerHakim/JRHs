import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import MusicPlayer from './MusicPlayer';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Rekam Jejak', href: '#rekam-jejak' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('about');
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] },
    );
    navLinks.forEach(({ href }) => {
      const element = document.getElementById(href.slice(1));
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-[22px] border border-black/5 bg-white px-3 py-2 shadow-[0_0_0_5px_#f7f7f7] md:px-4" aria-label="Primary">
          <a href="#hero" className="flex min-h-11 items-center gap-2 px-2 text-[18px] font-semibold tracking-tight text-black" aria-label="JRHs home">
            <span>JRHs</span><span className="h-1.5 w-1.5 rounded-full bg-[#007AFF]" aria-hidden="true" />
          </a>
          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return <a key={link.href} href={link.href} className={`min-h-11 rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'text-black' : 'text-[#636363] hover:text-black'}`} aria-current={isActive ? 'page' : undefined}>{link.name}</a>;
            })}
          </div>
          <div className="flex items-center gap-1.5">
            <MusicPlayer />
            <button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-black lg:hidden" aria-label="Open menu" aria-expanded={open}><Menu size={18} /></button>
          </div>
        </nav>
      </header>
      {open && (
        <div className="fixed inset-0 z-[60] bg-[#F7F7F7] p-5 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <a href="#hero" onClick={() => setOpen(false)} className="flex min-h-11 items-center text-[18px] font-semibold tracking-tight text-black">JRHs</a>
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-black" aria-label="Close menu"><X size={18} /></button>
          </div>
          <div className="mx-auto flex max-w-6xl flex-col pt-16">
            {navLinks.map((link, index) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-[#E5E5E5] py-5 text-3xl font-normal text-black transition-opacity hover:opacity-60" style={{ transitionDelay: `${index * 20}ms` }}>{link.name}</a>)}
          </div>
        </div>
      )}
    </>
  );
}
