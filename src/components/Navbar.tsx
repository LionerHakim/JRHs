import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Rekam Jejak', href: '#rekam-jejak' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

type FocusableElement = HTMLElement & { focus: () => void };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] });
    navLinks.forEach(({ href }) => { const element = document.getElementById(href.slice(1)); if (element) observer.observe(element); });
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); openerRef.current?.focus(); return; }
      if (event.key !== 'Tab' || !menuRef.current) return;
      const focusable = Array.from(menuRef.current.querySelectorAll('a[href], button:not([disabled])')) as FocusableElement[];
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; };
  }, [open]);

  const closeMenu = () => { setOpen(false); openerRef.current?.focus(); };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-300 sm:px-4 ${scrolled ? 'pt-3' : 'pt-4'}`} style={{ paddingTop: 'max(.75rem, env(safe-area-inset-top))' }}>
        <nav className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-[22px] px-2 py-1.5 transition-all duration-300 ${scrolled ? 'border border-[var(--color-line)] bg-[var(--color-paper)]/92 shadow-[var(--shadow-soft)]' : 'bg-transparent'}`} aria-label="Navigasi utama">
          <a href="#hero" className="group flex min-h-11 items-center gap-2 rounded-full px-2 text-[18px] font-semibold tracking-tight text-[var(--color-ink)] transition-transform hover:-translate-y-px active:scale-[.97]" aria-label="JRHs beranda"><span>JRHs</span><span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" /></a>
          <div className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => { const isActive = active === link.href.slice(1); return <a key={link.href} href={link.href} className={`group relative min-h-10 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-[.97] ${isActive ? 'bg-[var(--color-ash-mist)] text-[var(--color-ink)]' : 'text-[var(--color-muted)] hover:bg-[var(--color-ash-mist)] hover:text-[var(--color-ink)]'}`} aria-current={isActive ? 'location' : undefined}>{link.name}<span className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-[var(--color-accent)] transition-all duration-200 ${isActive ? 'w-3 opacity-100' : 'w-0 opacity-0 group-hover:w-2 group-hover:opacity-60'}`} /></a>; })}
          </div>
          <div className="flex items-center gap-1">
            <div className="hidden xl:block"><MusicTrigger /></div>
            <button ref={openerRef} type="button" onClick={() => setOpen(true)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-control)] text-[var(--color-ink)] shadow-[var(--shadow-soft)] transition-all hover:-translate-y-px hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:scale-[.94] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] xl:hidden" aria-label="Buka menu" aria-expanded={open}><Menu size={18} aria-hidden="true" /></button>
          </div>
        </nav>
      </header>

      {open && <div ref={menuRef} className="fixed inset-0 z-[60] bg-[var(--color-canvas)]/94 xl:hidden" role="dialog" aria-modal="true" aria-label="Navigasi seluler">
        <button type="button" className="absolute inset-0 h-full w-full cursor-default" onClick={closeMenu} aria-label="Tutup menu" />
        <aside className="absolute right-3 top-3 flex max-h-[calc(100svh-1.5rem)] w-[min(23rem,calc(100vw-1.5rem))] flex-col overflow-y-auto rounded-[28px] border border-[var(--color-line)] bg-[var(--color-paper)] p-3 shadow-[var(--shadow-raised)]" style={{ paddingTop: 'max(.75rem, env(safe-area-inset-top))' }}>
          <div className="flex items-center justify-between px-2 pb-3"><a href="#hero" onClick={closeMenu} className="flex min-h-11 items-center text-[18px] font-semibold tracking-tight text-[var(--color-ink)]">JRHs</a><button ref={closeRef} type="button" onClick={closeMenu} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-control)] text-[var(--color-ink)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:scale-[.94] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]" aria-label="Tutup menu"><X size={18} aria-hidden="true" /></button></div>
          <div className="rounded-[22px] border border-[var(--color-line)] bg-[var(--color-canvas)] p-1.5" role="navigation" aria-label="Navigasi utama seluler">{navLinks.map((link, index) => { const isActive = active === link.href.slice(1); return <a key={link.href} href={link.href} onClick={closeMenu} className={`group flex min-h-14 items-center justify-between rounded-[17px] px-4 text-[15px] font-semibold transition-all duration-200 active:scale-[.985] ${isActive ? 'bg-[var(--color-paper)] text-[var(--color-ink)] shadow-[var(--shadow-soft)]' : 'text-[var(--color-muted)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]'}`}><span className="flex items-center gap-3"><span className="font-mono text-[10px] tracking-widest text-[var(--color-accent)]">0{index + 1}</span>{link.name}</span><span className={`h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] transition-transform ${isActive ? 'scale-100' : 'scale-0 group-hover:scale-75'}`} /></a>; })}</div>
        </aside>
      </div>}
    </>
  );
}

function MusicTrigger() {
  return <span className="inline-flex min-h-10 items-center rounded-full border border-[var(--color-line)] bg-[var(--color-control)] px-3 text-xs text-[var(--color-muted)]">Music near Menu</span>;
}
