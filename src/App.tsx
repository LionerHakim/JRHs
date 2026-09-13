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
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.section-shell'));
    if (!sections.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    sections.forEach((section) => {
      section.style.opacity = '0';
      section.style.transform = 'translate3d(0, 24px, 0)';
      section.style.transition = 'opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const section = entry.target as HTMLElement;
        section.style.opacity = '1';
        section.style.transform = 'translate3d(0, 0, 0)';
        observer.unobserve(section);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] font-[var(--font-inter)] text-[var(--color-ink)] antialiased">
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
