import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
      className={`fixed top-0 z-50 w-full transition-all duration-700 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-all duration-700 sm:px-6 ${
          scrolled ? 'md:px-8' : ''
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-700 ${
            scrolled
              ? 'glass-panel rounded-full border border-white/10 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
              : ''
          }`}
        >
          <a
            href="#"
            className="group relative z-50 shrink-0 font-heading text-2xl font-bold uppercase tracking-widest"
          >
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent transition-all duration-500 group-hover:from-accent-blue group-hover:to-accent-purple">
              JRH
            </span>
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-500 group-hover:w-full" />
          </a>

          <div className="z-50 flex items-center gap-4 sm:gap-6">
            {/* Desktop Menu */}
            <div className="hidden items-center gap-4 lg:flex xl:gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative py-2 text-xs font-medium text-gray-400 transition-all duration-300 hover:text-white xl:text-sm"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
                </a>
              ))}
            </div>

            <div className="ml-2 flex items-center gap-4 border-l border-white/10 pl-4 sm:ml-4 sm:pl-6">
              {/* Music player hilang saat mobile menu dibuka */}
              {!isOpen && <MusicPlayer />}

              {/* Mobile Toggle */}
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-accent-blue focus:outline-none lg:hidden"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
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
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-40 flex h-screen w-full flex-col overflow-y-auto bg-black px-6 pt-24 pb-10 lg:hidden"
          >
            <motion.button
              type="button"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-7 text-sm font-semibold text-[#ff2a2a] transition-colors duration-300 hover:text-white focus:outline-none"
            >
              Close
            </motion.button>

            <div className="mt-8 flex flex-1 flex-col items-end justify-start gap-4 sm:gap-5">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.05 + 0.1,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-right text-2xl font-semibold text-white transition-all duration-300 hover:-translate-x-1 hover:text-white/80 sm:text-3xl"
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
