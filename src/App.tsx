import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Projects from './components/Projects';
import RekamJejak from './components/RekamJejak';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import './components/Footer.css';

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
          <div className="footer-minimal" aria-label="Hak cipta">
            <span>© 2026 JRH</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
