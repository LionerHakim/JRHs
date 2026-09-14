import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import MusicPlayer from './MusicPlayer';

const base = import.meta.env.BASE_URL;
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
  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.assign(base);
  };

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
          <a href={base} onClick={goHome} className="jrh-wordmark" aria-label="Kembali ke halaman utama">
            <svg className="jrh-logo" viewBox="0 0 86 36" role="img" aria-labelledby="jrh-logo-title" xmlns="http://www.w3.org/2000/svg">
              <title id="jrh-logo-title">JRH</title>
              <path d="M3 5h7v19c0 2.2 1 3.2 3 3.2s3-1 3-3.2V5h7v19.2c0 6.4-3.6 9.8-10 9.8S3 30.6 3 24.2V5Z" fill="#2563EB"/>
              <path d="M28 31V5h11.4C46.6 5 51 8.8 51 15c0 4.2-2 7.2-5.5 8.5L52 31h-8.3l-5.5-6.7H35V31h-7Zm7-12h3.8c3.5 0 5.2-1.3 5.2-4s-1.7-4-5.2-4H35v8Z" fill="#7C3AED"/>
              <path d="M57 5h7v10h10V5h7v26h-7V21H64v10h-7V5Z" fill="#14B8A6"/>
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
