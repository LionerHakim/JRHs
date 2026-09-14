import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Projects from './components/Projects';
import RekamJejak from './components/RekamJejak';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import './components/Footer.css';

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
            <div className="footer-identity">
              <div className="footer-brand" aria-label="JRH">JRH</div>
              <p className="footer-tagline">Personal portfolio.</p>
              <p className="footer-focus">
                Ekonomi · Markets · Technology · Human Behavior
              </p>
            </div>

            <nav className="footer-nav" aria-label="Navigasi footer">
              <span className="footer-nav-label">Explore</span>
              {footerLinks.map(([label, href]) => (
                <a key={href} href={href}>
                  {label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-bottom">
            <span>Built with intention.</span>
            <div className="footer-meta">
              <span>© 2026 JRH</span>
              <a
                href="https://instagram.com/jefrirh_"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
              <span>Indonesia</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
