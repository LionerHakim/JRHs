import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Projects from './components/Projects';
import RekamJejak from './components/RekamJejak';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';
import ScrollProgress from './components/ScrollProgress';

const footerLinks = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
] as const;

export default function App() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const updatePointer = (event: PointerEvent) => {
      if (reducedMotion || event.pointerType === 'touch') return;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        root.style.setProperty('--pointer-x', `${event.clientX}px`);
        root.style.setProperty('--pointer-y', `${event.clientY}px`);
      });
    };

    const onPointerLeave = () => {
      root.style.setProperty('--pointer-x', '50vw');
      root.style.setProperty('--pointer-y', '50vh');
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });

    const sections = Array.from(document.querySelectorAll<HTMLElement>('.section-shell'));
    if (reducedMotion || !sections.length) {
      sections.forEach((section) => section.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      sections.forEach((section) => observer.observe(section));
      return () => {
        observer.disconnect();
        window.removeEventListener('pointermove', updatePointer);
        window.removeEventListener('pointerleave', onPointerLeave);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }

    return () => {
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerleave', onPointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="page-shell">
      <div className="pointer-aura" aria-hidden="true" />
      <ScrollProgress />
      <a href="#content" className="skip-link">Lewati ke konten utama</a>
      <Navbar />
      <main id="content">
        <Hero />
        <Profile />
        <Projects />
        <RekamJejak />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-main">
            <div>
              <p className="eyebrow">Endnote</p>
              <a href="#hero" className="footer-brand" aria-label="JRH beranda">JRH</a>
              <p className="footer-copy">Ekonomi · Markets · Technology · Human Behavior.</p>
            </div>
            <nav className="footer-nav" aria-label="Navigasi footer">
              {footerLinks.map(([label, href]) => <a key={href} href={href}>{label} <span aria-hidden="true">↗</span></a>)}
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© 2026 JRH</span>
            <a href="https://instagram.com/jefrirh_" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
          </div>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
