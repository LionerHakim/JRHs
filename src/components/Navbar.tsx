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
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Insights', href: '#insights' },
    { name: 'Knowledge', href: '#knowledge' },
    { name: 'Skills', href: '#skills' },
    { name: 'Hobbies', href: '#hobbies' },
    { name: 'Reflection', href: '#reflection' },
    { name: 'Vision', href: '#megaprojects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-500">
      <div className={`max-w-7xl mx-auto px-6 py-6 transition-all duration-500 ${scrolled ? 'py-3' : ''}`}>
        <motion.div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'bg-black/40 border border-white/10 backdrop-blur-xl rounded-full px-8 py-3 shadow-lg'
              : 'bg-transparent'
          }`}
          animate={scrolled ? { y: 0 } : { y: 0 }}
        >
          <a href="#" className="text-2xl font-bold font-heading text-white tracking-tight group relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">JRH</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500 group-hover:w-full"></span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-6">
            <div className={scrolled ? 'block' : 'block'}>
              <MusicPlayer />
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="lg:hidden fixed inset-0 w-full h-screen bg-black/95 backdrop-blur-xl z-40 flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
          >
            <motion.button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-6 w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              <X size={20} />
            </motion.button>

            <div className="space-y-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="block text-2xl font-semibold text-white hover:text-gray-300 transition-colors"
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
