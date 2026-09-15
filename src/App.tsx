import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Projects from './components/Projects';
import RekamJejak from './components/RekamJejak';
import Contact from './components/Contact';

export default function App() {
  useEffect(() => {
    const block = (event: Event) => event.preventDefault();

    const blockCopyKeys = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable = target?.matches('input, textarea, [contenteditable="true"]');

      if (!isEditable && (event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'x')) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', block);
    document.addEventListener('copy', block);
    document.addEventListener('cut', block);
    document.addEventListener('selectstart', block);
    document.addEventListener('dragstart', block);
    document.addEventListener('gesturestart', block);
    document.addEventListener('keydown', blockCopyKeys);

    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('copy', block);
      document.removeEventListener('cut', block);
      document.removeEventListener('selectstart', block);
      document.removeEventListener('dragstart', block);
      document.removeEventListener('gesturestart', block);
      document.removeEventListener('keydown', blockCopyKeys);
    };
  }, []);

  return (
    <div className="page-shell">
      <a href="#content" className="skip-link">Lewati ke konten utama</a>
      <Navbar />
      <main id="content">
        <Hero />
        <Profile />
        <RekamJejak />
        <Projects />
        <Contact />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-main">
            <div className="footer-identity">
              <a className="footer-brand" href="#hero" aria-label="Kembali ke beranda">JRH</a>
              <p className="footer-tagline">Berpikir, membangun, dan terus mengeksplorasi.</p>
              <p className="footer-focus">Personal portfolio tentang ekonomi, pasar, teknologi, project, dan rasa ingin tahu yang belum selesai.</p>
            </div>
            <nav className="footer-nav" aria-label="Navigasi footer">
              <span className="footer-nav-label">Explore</span>
              <a href="#about">About <span aria-hidden="true">↗</span></a>
              <a href="#experience">Experience <span aria-hidden="true">↗</span></a>
              <a href="#projects">Projects <span aria-hidden="true">↗</span></a>
              <a href="#contact">Contact <span aria-hidden="true">↗</span></a>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© 2026 JRH - Personal portfolio</span>
            <div className="footer-meta">
              <span>Indonesia</span>
              <a href="https://instagram.com/jefrirh_" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
