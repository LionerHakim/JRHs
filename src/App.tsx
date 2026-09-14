import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Projects from './components/Projects';
import RekamJejak from './components/RekamJejak';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';

const footerLinks = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
] as const;

export default function App() {
  return (
    <div className="page-shell">
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
            <p className="footer-copy">Personal portfolio.</p>
            <nav className="footer-nav" aria-label="Navigasi footer">
              {footerLinks.map(([label, href]) => <a key={href} href={href}>{label} <span aria-hidden="true">↗</span></a>)}
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© 2026</span>
            <a href="https://instagram.com/jefrirh_" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
