import { motion } from 'motion/react';
import { Sparkles, User, MessageCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        className="z-10 flex w-full max-w-4xl flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="group relative mb-8 h-44 w-44 overflow-hidden rounded-full border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-700 hover:border-accent-blue/50 hover:shadow-[0_0_60px_rgba(59,130,246,0.35)] md:h-56 md:w-56 lg:h-64 lg:w-64"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-tr from-accent-blue/20 to-accent-purple/20 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-0" />

          <img
            src="/data/foto/s.jpg"
            alt="Foto Profil Jefri Rahman Hakim"
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </motion.div>

        <div className="mb-4 overflow-hidden">
          <motion.h2
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
            className="font-heading text-3xl font-bold uppercase leading-[0.95] tracking-tight text-white text-glow sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Jefri Rahman Hakim
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.25, 1, 0.5, 1] }}
          className="mb-6 w-full"
        >
          <div className="flex w-full items-center justify-center gap-2.5">
            <Sparkles className="h-4 w-4 animate-pulse text-accent-yellow sm:h-5 sm:w-5" />

            <p className="text-center text-lg font-semibold tracking-wide text-transparent bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text sm:text-xl md:text-2xl lg:text-3xl">
              Trader & Investor
            </p>

            <Sparkles className="h-4 w-4 animate-pulse text-accent-yellow sm:h-5 sm:w-5" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-gray-300/90 sm:text-lg md:text-xl"
        >
          Memahami ekonomi, pasar keuangan, teknologi, dan perilaku manusia
          untuk melihat arah perkembangan dunia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.25, 1, 0.5, 1] }}
          className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5"
        >
          <motion.a
            href="#about"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 py-3.5 font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.28)] transition-all duration-500 ease-out hover:shadow-[0_0_45px_rgba(255,255,255,0.45)]"
          >
            <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <User
              size={18}
              className="relative z-10 transition-colors duration-300 group-hover:text-accent-blue"
            />
            <span className="relative z-10">Jelajahi Profil</span>
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="glass-panel group relative flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-3.5 font-semibold text-white transition-all duration-500 ease-out hover:border-white/30 hover:bg-white/10"
          >
            <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-emerald-500/20 to-teal-400/20 transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <MessageCircle
              size={18}
              className="relative z-10 transition-colors duration-300 group-hover:text-emerald-400"
            />
            <span className="relative z-10">Hubungi Saya</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
