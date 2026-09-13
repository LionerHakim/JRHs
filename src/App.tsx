import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import RekamJejak from './components/Education';
import WebTools from './components/WebTools';
import Projects from './components/MegaProjects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] font-[var(--font-inter)] text-[var(--color-ink)] antialiased selection:bg-[var(--color-accent-soft)]">
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[120] focus:rounded-full focus:bg-[var(--color-ink)] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--color-paper)]">Lewati ke konten utama</a>
      <Navbar />
      <main id="content">
        <Hero />
        <Profile />
        <RekamJejak />
        <WebTools />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <footer className="border-t border-[var(--color-line)] bg-[var(--color-canvas)] px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-12 md:px-8 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[1.3fr_.7fr] md:items-end">
            <div>
              <a href="#hero" className="inline-flex min-h-11 items-center font-[var(--font-perfectly-nineties-regular)] text-3xl text-[var(--color-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">JRHs</a>
              <p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-muted)]">Economics · Markets · Technology · Human Behavior</p>
            </div>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--color-muted)]" aria-label="Navigasi footer">
              <a href="#about" className="inline-flex min-h-10 items-center hover:text-[var(--color-ink)]">About</a>
              <a href="#rekam-jejak" className="inline-flex min-h-10 items-center hover:text-[var(--color-ink)]">Rekam Jejak</a>
              <a href="#web-tools" className="inline-flex min-h-10 items-center hover:text-[var(--color-ink)]">Web Tools</a>
              <a href="#future" className="inline-flex min-h-10 items-center hover:text-[var(--color-ink)]">Future</a>
              <a href="#contact" className="inline-flex min-h-10 items-center hover:text-[var(--color-ink)]">Contact</a>
            </nav>
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-[var(--color-line)] pt-5 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 JRHs</span>
            <div className="flex items-center gap-4"><a href="https://instagram.com/jefrirh_" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-[var(--color-ink)]">Instagram ↗</a><span>Built with curiosity & intent.</span></div>
          </div>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
