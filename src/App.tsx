import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import RekamJejak from './components/Education';
import Projects from './components/MegaProjects';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] font-[var(--font-inter)] text-[var(--color-ink)] antialiased selection:bg-[var(--color-accent-soft)]">
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[120] focus:rounded-full focus:bg-[var(--color-ink)] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--color-paper)]">Lewati ke konten utama</a>
      <ScrollProgress />
      <Navbar />
      <main id="content">
        <Hero />
        <Profile />
        <RekamJejak />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-[var(--color-line)] bg-[var(--color-canvas)] px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <a href="#hero" className="font-[var(--font-perfectly-nineties-regular)] text-sm text-[var(--color-ink)] transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">JRHs</a>
          <div className="flex items-center gap-3">
            <span>© 2026 JRHs. Hak cipta dilindungi.</span>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
}
