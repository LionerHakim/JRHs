import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import MusicPlayer from './MusicPlayer';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Rekam Jejak', href: '#rekam-jejak' },
  { name: 'Web Tools', href: '#web-tools' },
  { name: 'Future', href: '#future' },
  { name: 'Contact', href: '#contact' },
];

type FocusableElement = HTMLElement & { focus: () => void };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('about');
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] });
    navLinks.forEach(({ href }) => { const element = document.getElementById(href.slice(1)); if (element) observer.observe(element); });
    return () => observer.disconnect();
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
      <header className="fixed inset-x-0 top-0 z-50 px-4 md:px-6" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-[22px] border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper)_94%,transparent)] px-2.5 py-2 shadow-[var(--shadow-soft)] backdrop-blur-xl" aria-label="Navigasi utama">
          <a href="#hero" className="flex min-h-11 items-center gap-2 px-2 text-[18px] font-semibold tracking-tight text-[var(--color-ink)]" aria-label="JRHs beranda"><span>JRHs</span><span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" /></a>
          <div className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => { const isActive = active === link.href.slice(1); return <a key={link.href} href={link.href} className={`min-h-11 rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-[var(--color-accent-soft)] text-[var(--color-ink)]' : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}`} aria-current={isActive ? 'location' : undefined}>{link.name}</a>; })}
          </div>
          <div className="flex items-center gap-1.5">
            <MusicPlayer />
            <ThemeToggle />
            <button ref={openerRef} type="button" onClick={() => setOpen(true)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)] shadow-[var(--shadow-soft)] transition active:scale-[.97] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] xl:hidden" aria-label="Buka menu" aria-expanded={open}><Menu size={18} aria-hidden="true" /></button>
          </div>
        </nav>
      </header>

      {open && <div ref={menuRef} className="fixed inset-0 z-[60] overflow-y-auto bg-[var(--color-canvas)] px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] xl:hidden" role="dialog" aria-modal="true" aria-label="Navigasi seluler">
        <div className="mx-auto flex max-w-6xl items-center justify-between"><a href="#hero" onClick={closeMenu} className="flex min-h-11 items-center text-[18px] font-semibold tracking-tight text-[var(--color-ink)]">JRHs</a><div className="flex items-center gap-2"><ThemeToggle /><button ref={closeRef} type="button" onClick={closeMenu} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)] shadow-[var(--shadow-soft)] transition active:scale-[.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]" aria-label="Tutup menu"><X size={18} aria-hidden="true" /></button></div></div>
        <div className="mx-auto flex max-w-6xl flex-col pt-12" role="navigation" aria-label="Navigasi utama seluler">{navLinks.map((link) => <a key={link.href} href={link.href} onClick={closeMenu} className="border-b border-[var(--color-line)] py-5 font-[var(--font-perfectly-nineties-regular)] text-[clamp(1.8rem,8vw,2.5rem)] font-normal text-[var(--color-ink)] transition-opacity hover:opacity-60">{link.name}</a>)}</div>
      </div>}
    </>
  );
}
