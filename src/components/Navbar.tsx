import { useEffect, useState } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('about');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map(({ href }) => href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] },
    );
    ids.forEach((id) => document.getElementById(id) && observer.observe(document.getElementById(id)!));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
        <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-[20px] border px-4 py-2.5 transition-all duration-200 md:px-5 ${scrolled ? 'border-[#1D1D1D] bg-[#0A0A0A]/95 shadow-[0_10px_35px_rgba(0,0,0,0.3)]' : 'border-white/10 bg-[#050505]/85'} backdrop-blur-md`} aria-label="Primary">
          <a href="#hero" className="flex min-h-11 items-center gap-2 text-sm font-semibold tracking-[0.18em] text-white" aria-label="JRHs home">
            <span className="font-serif text-lg tracking-tight">JRH</span><span className="h-1 w-1 rounded-full bg-[#007AFF]" aria-hidden="true" />
          </a>
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return <a key={link.href} href={link.href} className={`min-h-11 rounded-full px-3.5 py-2.5 text-xs font-medium transition-colors ${isActive ? 'text-white' : 'text-[#A0A0A0] hover:text-white'} `} aria-current={isActive ? 'page' : undefined}>{link.name}</a>;
            })}
          </div>
          <div className="flex items-center gap-2">
            <MusicPlayer />
            <button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#1D1D1D] bg-[#101010] text-white lg:hidden" aria-label="Open menu" aria-expanded={open}><Menu size={18} /></button>
          </div>
        </nav>
      </header>
      {open && (
        <div className="fixed inset-0 z-[60] bg-[#050505] p-5 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <a href="#hero" onClick={() => setOpen(false)} className="flex min-h-11 items-center text-sm font-semibold tracking-[0.18em] text-white"><span className="font-serif text-lg tracking-tight">JRH</span><span className="ml-2 h-1 w-1 rounded-full bg-[#007AFF]" aria-hidden="true" /></a>
            <button type="button" onClick={() => setOpen(false)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#1D1D1D] bg-[#101010] text-white" aria-label="Close menu"><X size={18} /></button>
          </div>
          <div className="mx-auto flex max-w-6xl flex-col pt-20">
            {navLinks.map((link, index) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-[#1D1D1D] py-5 text-2xl font-medium text-[#A0A0A0] transition-colors hover:text-white" style={{ transitionDelay: `${index * 20}ms` }}>{link.name}</a>)}
          </div>
        </div>
      )}
    </>
  );
}
