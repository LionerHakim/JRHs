import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import RekamJejak from './components/Education';
import Projects from './components/MegaProjects';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-ash-mist)] font-[var(--font-inter)] text-[var(--color-ink-black)] antialiased selection:bg-[var(--color-signal-blue)]/15">
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[120] focus:rounded-full focus:bg-[var(--color-ink-black)] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--color-paper-white)]">Lewati ke konten utama</a>
      <ScrollProgress />
      <Navbar />
      <main id="content">
        <Hero />
        <Profile />
        <Projects />
        <RekamJejak />
        <Contact />
      </main>
      <footer className="border-t border-[#E5E5E5] bg-[var(--color-ash-mist)] px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-[var(--color-smoke)] sm:flex-row sm:items-center sm:justify-between">
          <a href="#hero" className="font-[var(--font-perfectly-nineties-regular)] text-sm text-[var(--color-ink-black)] transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-blue)]">JRHs</a>
          <span>© 2026 JRHs. Hak cipta dilindungi.</span>
        </div>
      </footer>
    </div>
  );
}
