import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import MusicPlayer from './MusicPlayer';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#rekam-jejak' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('about');
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
    const previousOverflow = document.body.style.overflow;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); return; }
      if (event.key !== 'Tab' || !menuRef.current) return;
      const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-[22px] border border-[#E5E5E5] bg-white/95 px-3 py-2 shadow-[0_0_0_4px_rgba(247,247,247,.78),0_8px_26px_rgba(0,0,0,.06)] backdrop-blur-sm md:px-4" aria-label="Navigasi utama">
          <a href="#hero" className="flex min-h-11 items-center gap-2 px-2 text-[18px] font-semibold tracking-tight text-[var(--color-ink-black)]" aria-label="JRHs beranda">
            <span>JRHs</span><span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal-blue)]" aria-hidden="true" />
          </a>
          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return <a key={link.href} href={link.href} className={`min-h-11 rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-[var(--color-ash-mist)] text-[var(--color-ink-black)]' : 'text-[var(--color-smoke)] hover:text-[var(--color-ink-black)]'}`} aria-current={isActive ? 'location' : undefined}>{link.name}</a>;
            })}
          </div>
          <div className="flex items-center gap-1.5">
            <MusicPlayer />
            <button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#E5E5E5] bg-[var(--color-paper-white)] text-[var(--color-ink-black)] transition active:scale-[.97] hover:bg-[var(--color-ash-mist)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-blue)]" aria-label="Buka menu" aria-expanded={open}>
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div ref={menuRef} className="fixed inset-0 z-[60] bg-[var(--color-ash-mist)] px-5 pb-8 pt-5 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigasi seluler">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <a href="#hero" onClick={() => setOpen(false)} className="flex min-h-11 items-center text-[18px] font-semibold tracking-tight text-[var(--color-ink-black)]">JRHs</a>
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#E5E5E5] bg-[var(--color-paper-white)] text-[var(--color-ink-black)] transition active:scale-[.97] hover:bg-[var(--color-paper-white)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-blue)]" aria-label="Tutup menu"><X size={18} /></button>
          </div>
          <div className="mx-auto flex max-w-6xl flex-col pt-14" role="navigation" aria-label="Navigasi utama seluler">
            {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-[#E5E5E5] py-5 font-[var(--font-perfectly-nineties-regular)] text-[clamp(1.7rem,8vw,2.35rem)] font-normal text-[var(--color-ink-black)] transition-opacity hover:opacity-60">{link.name}</a>)}
          </div>
        </div>
      )}
    </>
  );
}
