import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import MusicPlayer from './MusicPlayer';

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
      if (event.key === 'Escape') { event.preventDefault(); closeMenu(); return; }
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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-canvas)]/95 backdrop-blur-md" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <nav className="mx-auto flex min-h-14 max-w-7xl items-center gap-2 px-3 sm:px-5 lg:px-6" aria-label="Navigasi utama">
          <button ref={openerRef} type="button" onClick={() => setOpen(true)} className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-[var(--color-line)] bg-[var(--color-control)] text-[var(--color-text)] transition-colors hover:border-[#8b949e] hover:text-[var(--color-ink)] active:scale-[.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]" aria-label="Buka menu" aria-expanded={open}>
            <Menu size={20} aria-hidden="true" />
          </button>

          <a href="#hero" className="group flex min-h-10 items-center gap-2 rounded-md px-2 text-base font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]" aria-label="JRHs beranda">
            JRHs <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
          </a>

          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return <a key={link.href} href={link.href} className={`min-h-10 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-[var(--color-ash-mist)] text-[var(--color-ink)]' : 'text-[var(--color-muted)] hover:bg-[var(--color-ash-mist)] hover:text-[var(--color-ink)]'}`} aria-current={isActive ? 'location' : undefined}>{link.name}</a>;
            })}
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <MusicPlayer />
            <a href="#contact" className="hidden min-h-10 items-center rounded-md border border-[var(--color-line)] bg-[var(--color-control)] px-3 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)] sm:inline-flex">Contact</a>
          </div>
        </nav>
      </header>

      {open && <div ref={menuRef} className="fixed inset-0 z-[60] bg-[var(--color-canvas)]/90 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Navigasi seluler">
        <button type="button" className="absolute inset-0 h-full w-full cursor-default" onClick={closeMenu} aria-label="Tutup menu" />
        <aside className="absolute left-3 top-3 flex max-h-[calc(100svh-1.5rem)] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-y-auto rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] p-3 shadow-[var(--shadow-raised)]" style={{ paddingTop: 'max(.75rem, env(safe-area-inset-top))' }}>
          <div className="flex items-center justify-between border-b border-[var(--color-line)] px-2 pb-3"><a href="#hero" onClick={closeMenu} className="flex min-h-10 items-center text-base font-semibold text-[var(--color-ink)]">JRHs</a><button ref={closeRef} type="button" onClick={closeMenu} className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-[var(--color-line)] bg-[var(--color-control)] text-[var(--color-text)] transition-colors hover:border-[#8b949e] hover:text-[var(--color-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]" aria-label="Tutup menu"><X size={18} aria-hidden="true" /></button></div>
          <nav className="mt-3 rounded-md border border-[var(--color-line)] bg-[var(--color-canvas)] p-1" aria-label="Navigasi utama seluler">{navLinks.map((link) => { const isActive = active === link.href.slice(1); return <a key={link.href} href={link.href} onClick={closeMenu} className={`flex min-h-12 items-center justify-between rounded-md px-3 text-sm font-semibold transition-colors ${isActive ? 'bg-[var(--color-control)] text-[var(--color-ink)]' : 'text-[var(--color-muted)] hover:bg-[var(--color-control)] hover:text-[var(--color-ink)]'}`} aria-current={isActive ? 'page' : undefined}><span>{link.name}</span><span className="font-mono text-[10px] text-[var(--color-muted)]">→</span></a>; })}</nav>
        </aside>
      </div>}
    </>
  );
}
