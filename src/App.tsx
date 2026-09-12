import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import RekamJejak from './components/Education';
import Projects from './components/MegaProjects';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] font-sans text-[#F5F5F5] antialiased selection:bg-[#007AFF]/25">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Profile />
        <RekamJejak />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-[#1D1D1D] bg-[#050505] px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-xs text-[#666] sm:flex-row sm:items-center sm:justify-between">
          <a href="#hero" className="font-serif text-sm text-[#F5F5F5] transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]">JRHs</a>
          <span>© 2026 JRHs. Hak cipta dilindungi.</span>
        </div>
      </footer>
    </div>
  );
}
