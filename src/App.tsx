import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import RekamJejak from './components/RekamJejak';
import Projects from './components/Projects';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';
import ScrollProgress from './components/ScrollProgress';

const footerLinks = [
  ['About', '#about'], ['Rekam Jejak', '#rekam-jejak'], ['Projects', '#projects'], ['Contact', '#contact'],
] as const;

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] font-[var(--font-inter)] text-[var(--color-ink)] antialiased selection:bg-[var(--color-accent-soft)]">
      <ScrollProgress />
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[120] focus:rounded-full focus:bg-[var(--color-ink)] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--color-paper)]">Lewati ke konten utama</a>
      <Navbar />
      <main id="content">
        <Hero />
        <Profile />
        <RekamJejak />
        <Projects />
        <Contact />
      </main>
      <footer className="jrhs-footer border-t border-[var(--color-line)] bg-[var(--color-canvas)] px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-14 md:px-8 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="jrhs-footer-hero rounded-[30px] border border-[var(--color-line)] bg-[var(--color-surface-raised)] p-6 shadow-[var(--shadow-soft)] md:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
              <div>
                <span className="eyebrow">06 / Endnote</span>
                <a href="#hero" className="mt-4 inline-flex min-h-12 items-center gap-3 font-[var(--font-perfectly-nineties-regular)] text-4xl text-[var(--color-ink)] transition-transform hover:-translate-y-0.5 active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">JRHs <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" aria-hidden="true" /></a>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-muted)]">Economics · Markets · Technology · Human Behavior. Ruang personal untuk ide, perjalanan, eksperimen, dan hal-hal yang sedang dibangun.</p>
              </div>
              <nav className="rounded-[22px] border border-[var(--color-line)] bg-[var(--color-canvas)] p-4" aria-label="Navigasi footer">
                <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[var(--color-muted)]">Explore</p>
                <div className="mt-3 grid grid-cols-2 gap-1">
                  {footerLinks.map(([label, href]) => <a key={href} href={href} className="group flex min-h-11 items-center justify-between rounded-xl px-3 text-sm font-medium text-[var(--color-text)] transition-all hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] hover:shadow-[var(--shadow-soft)] active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"><span>{label}</span><span className="text-[var(--color-muted)] transition-transform group-hover:translate-x-0.5" aria-hidden="true">↗</span></a>)}
                </div>
              </nav>
            </div>
            <div className="mt-8 grid gap-4 border-t border-[var(--color-line)] pt-5 text-xs text-[var(--color-muted)] sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2"><span>© 2026 JRHs</span><span className="h-1 w-1 rounded-full bg-[var(--color-line)]" aria-hidden="true" /><span>Built with curiosity & intent.</span></div>
              <a href="https://instagram.com/jefrirh_" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-4 font-semibold text-[var(--color-text)] shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:scale-[.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">Instagram ↗</a>
            </div>
          </div>
          <div className="flex flex-col gap-2 px-1 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[.15em] text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between"><span>JRHs · Personal Digital Space</span><span>Stay curious.</span></div>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
