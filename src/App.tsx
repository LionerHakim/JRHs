import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import RekamJejak from './components/Education';
import Projects from './components/MegaProjects';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] font-sans text-[#000] antialiased selection:bg-[#007AFF]/15">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Profile />
        <Projects />
        <RekamJejak />
        <Contact />
      </main>
      <footer className="border-t border-[#E5E5E5] bg-[#F7F7F7] px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-xs text-[#636363] sm:flex-row sm:items-center sm:justify-between">
          <a href="#hero" className="font-serif text-sm text-[#000] transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]">JRHs</a>
          <span>© 2026 JRHs. Hak cipta dilindungi.</span>
        </div>
      </footer>
    </div>
  );
}
