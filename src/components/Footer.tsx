import { motion } from 'motion/react';
import { Star, Instagram, MessageCircle, Github, Linkedin, Mail, ChevronRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/jefrirh_', color: 'hover:text-pink-400' },
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/6284916088', color: 'hover:text-emerald-400' },
    { icon: Mail, label: 'Email', href: 'mailto:jefri.tegal12@gmail.com', color: 'hover:text-blue-400' },
  ];

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative py-20 md:py-28 lg:py-32 px-6 border-t border-white/10 bg-gradient-to-t from-black/50 to-transparent overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[160px] bg-gradient-to-t from-blue-500/10 via-purple-500/5 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mb-16 md:mb-20">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start gap-4"
          >
            <a href="#" className="text-2xl font-bold font-heading text-white tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">JRH</span>
            </a>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm">
              Building the future through understanding economics, technology, and human values.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Est. 2019</span>
            </div>
          </motion.div>

          {/* Navigation links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-3 flex flex-col">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-light group inline-flex items-center gap-2"
                  >
                    {link.name}
                    <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 ${social.color}`}
                    title={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8 md:mb-12"></div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs md:text-sm"
        >
          <div className="text-center md:text-left">
            <p className="text-gray-500 font-light">
              © {currentYear} Jefri Rahman Hakim. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 font-light">Privacy</a>
            <div className="w-px h-4 bg-white/10"></div>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 font-light">Terms</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
