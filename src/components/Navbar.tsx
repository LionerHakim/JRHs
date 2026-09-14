import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import MusicPlayer from './MusicPlayer';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

type FocusableElement = HTMLElement & { focus: () => void };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => { setOpen(false); openerRef.current?.focus(); };

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

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
      if (event.key === 'Escape') { event.preventDefault(); closeMenu(); return; }
      if (event.key !== 'Tab' || !menuRef.current) return;
      const focusable = Array.from(menuRef.current.querySelectorAll('a[href], button:not([disabled])')) as FocusableElement[];
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'; closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; };
  }, [open]);

  return (
    <>
      <header className={`jrh-nav-shell${scrolled ? ' is-scrolled' : ''}`} aria-label="Navigasi situs">
        <nav className="jrh-nav-inner" aria-label="Navigasi utama">
          <a href="#hero" className="jrh-wordmark" aria-label="Beranda">
            <svg className="jrh-logo" viewBox="0 0 116 36" role="img" aria-labelledby="jrh-logo-title" xmlns="http://www.w3.org/2000/svg">
              <title id="jrh-logo-title">JRH</title>
              <path d="M4 5v18c0 5 3 8 8 8s8-3 8-8V5h-6v17c0 2-.6 3-2 3s-2-1-2-3V5H4Z" fill="currentColor"/>
              <path d="M30 31V5h10c7 0 11 4 11 10 0 4-2 7-5 8l7 8h-8l-6-7h-3v7h-6Zm6-13h3c4 0 6-1 6-3s-2-4-6-4h-3v7Z" fill="currentColor"/>
              <path d="M61 5h6v10h11V5h6v26h-6V21H67v10h-6V5Z" fill="currentColor"/>
              <path d="M91 5h21v5h-15v5h12v5h-12v6h15v5H91V5Z" fill="currentColor"/>
            </svg>
          </a>
          <div className="jrh-nav-right">
            <div className="jrh-nav-links">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return <a key={link.href} href={link.href} className={`jrh-nav-link ${isActive ? 'is-active' : ''}`} aria-current={isActive ? 'location' : undefined}>{link.name}</a>;
              })}
            </div>
            <MusicPlayer />
            <button ref={openerRef} type="button" onClick={() => setOpen(true)} className="jrh-menu-button" aria-label="Buka menu" aria-expanded={open}><Menu size={18} aria-hidden="true" /></button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="jrh-menu-backdrop" role="presentation">
          <button type="button" className="jrh-menu-scrim" onClick={closeMenu} aria-label="Tutup menu" />
          <aside ref={menuRef} className="jrh-mobile-menu" role="dialog" aria-modal="true" aria-label="Navigasi seluler">
            <div className="jrh-mobile-menu-head"><span className="jrh-mobile-menu-label">Menu</span><button ref={closeRef} type="button" onClick={closeMenu} className="jrh-menu-button" aria-label="Tutup menu"><X size={18} aria-hidden="true" /></button></div>
            <nav className="jrh-mobile-links" aria-label="Navigasi utama seluler">
              {navLinks.map((link) => <a key={link.href} href={link.href} onClick={closeMenu} className={`jrh-mobile-link ${active === link.href.slice(1) ? 'is-active' : ''}`}><span>{link.name}</span><span aria-hidden="true">↗</span></a>)}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
