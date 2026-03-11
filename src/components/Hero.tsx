import { motion } from 'motion/react';
import { ArrowDown, Sparkles, User, MessageCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        className="z-10 flex flex-col items-center max-w-5xl w-full"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden mb-12 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:border-accent-blue/50 hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] group cursor-pointer transition-all duration-700"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/20 to-accent-purple/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700"></div>
          <img
            src="https://picsum.photos/seed/jefri/400/400"
            alt="Jefri Rahman Hakim"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter text-white uppercase font-heading leading-none text-glow"
          >
            JEFRI RAHMAN HAKIM
          </motion.h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-8">
            <div className="flex items-center gap-2 sm:gap-4">
              <Sparkles className="text-accent-yellow w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              <p className="text-lg sm:text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink font-semibold tracking-wide text-center text-glow-accent">
                Economic Thinker
              </p>
            </div>
            <span className="hidden sm:inline text-white/30 mx-1 sm:mx-3 font-light">|</span>
            <div className="flex items-center gap-2 sm:gap-4">
              <p className="text-lg sm:text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink font-semibold tracking-wide text-center text-glow-accent">
                Trader & Investor
              </p>
              <Sparkles className="text-accent-yellow w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
          </div>

          <p className="text-base sm:text-lg md:text-2xl text-gray-300/90 leading-relaxed mb-10 sm:mb-14 font-light max-w-3xl text-center mx-auto">
            Memahami ekonomi, pasar keuangan, teknologi, dan perilaku manusia untuk melihat arah perkembangan dunia.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center">
            <motion.a
              href="#about"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="group relative px-10 py-4 rounded-full bg-white text-black font-semibold shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <User size={20} className="relative z-10 group-hover:text-accent-blue transition-colors duration-300" />
              <span className="relative z-10">Jelajahi Profil</span>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="group relative px-10 py-4 rounded-full glass-panel text-white font-semibold hover:bg-white/10 hover:border-white/30 transition-all duration-500 ease-out flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <MessageCircle size={20} className="relative z-10 group-hover:text-emerald-400 transition-colors duration-300" />
              <span className="relative z-10">Hubungi Saya</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
