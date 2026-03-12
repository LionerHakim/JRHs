import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import MusicPlayer from './MusicPlayer';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#' },
    { name: 'Tentang', href: '#about' },
    { name: 'Pendidikan', href: '#education' },
    { name: 'Wawasan', href: '#insights' },
    { name: 'Pengetahuan', href: '#knowledge' },
    { name: 'Keahlian', href: '#skills' },
    { name: 'Hobi', href: '#hobbies' },
    { name: 'Refleksi', href: '#reflection' },
    { name: 'Visi', href: '#megaprojects' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${
          scrolled ? 'md:px-8' : ''
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-700 ${
            scrolled
              ? 'glass-panel rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10'
              : ''
          }`}
        >
          <a
            href="#"
            className="text-2xl font-bold tracking-widest uppercase shrink-0 font-heading relative group z-50"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:from-accent-blue group-hover:to-accent-purple transition-all duration-500">
              JRH
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-500 group-hover:w-full"></span>
          </a>

          <div className="flex items-center gap-4 sm:gap-6 z-50">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs xl:text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full shadow-[0_0_8px_rgba(10,132,255,0.5)]"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 border-l border-white/10 pl-4 sm:pl-6 ml-2 sm:ml-4">
              <MusicPlayer />

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:text-accent-blue transition-all duration-300 focus:outline-none"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="lg:hidden fixed inset-0 w-full h-screen bg-black/95 backdrop-blur-3xl z-40 flex flex-col px-6 pt-32 pb-8 overflow-y-auto"
          >
            {/* Close Button */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-20 right-6 text-sm font-semibold text-[#ff2a2a] hover:text-white transition-colors duration-300 focus:outline-none z-50"
            >
              Close
            </motion.button>

            <div className="flex flex-col gap-4 mt-12 items-end">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 + 0.1, ease: [0.25, 1, 0.5, 1] }}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-right text-2xl sm:text-3xl font-semibold text-white hover:text-white/80 transition-all duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}      <div className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-700 ${scrolled ? 'md:px-8' : ''}`}>
        <div className={`flex items-center justify-between transition-all duration-700 ${scrolled ? 'glass-panel rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10' : ''}`}>
          <a href="#" className="text-2xl font-bold tracking-widest uppercase shrink-0 font-heading relative group z-50">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:from-accent-blue group-hover:to-accent-purple transition-all duration-500">JRH</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-500 group-hover:w-full"></span>
          </a>

          <div className="flex items-center gap-4 sm:gap-6 z-50">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs xl:text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full shadow-[0_0_8px_rgba(10,132,255,0.5)]"></span>
                </a>
              ))}
            </div>

            <div
              className={`flex items-center gap-4 border-l border-white/10 pl-4 sm:pl-6 ml-2 sm:ml-4 ${
                isOpen ? 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto' : ''
              }`}
            >
              {!isOpen && <MusicPlayer />}

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:text-accent-blue transition-all duration-300 focus:outline-none"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="lg:hidden fixed inset-0 w-full h-screen bg-black/95 backdrop-blur-3xl z-40 flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
          >
            {/* Close Button */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-6 text-sm font-semibold text-[#ff2a2a] hover:text-white transition-colors duration-300 focus:outline-none z-50"
            >
              Close
            </motion.button>

            <div className="flex flex-col gap-4 mt-10 items-end">
              {navLinks.map((link, index) => (
                <motion.a
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 + 0.1, ease: [0.25, 1, 0.5, 1] }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-right text-2xl sm:text-3xl font-semibold text-white hover:text-white/80 transition-all duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
