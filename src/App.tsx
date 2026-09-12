import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import RekamJejak from './components/Education';
import Projects from './components/MegaProjects';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-[#007AFF]/30"><ScrollProgress /><CustomCursor /><Navbar /><main><Hero /><Profile /><RekamJejak /><Projects /><Contact /></main><footer className="border-t border-[#1D1D1D] px-5 py-8 md:px-8"><div className="mx-auto flex max-w-6xl flex-col gap-3 text-xs text-[#666] sm:flex-row sm:items-center sm:justify-between"><span className="font-serif text-sm text-[#A0A0A0]">JRHs</span><span>© 2026 JRHs. Hak cipta dilindungi.</span></div></footer></div>;
}
