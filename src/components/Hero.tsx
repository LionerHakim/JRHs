import { motion } from "motion/react";
import { Sparkles, User, MessageCircle } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const smoothTransition = {
  duration: 1,
  ease: [0.25, 1, 0.5, 1],
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center"
    >
      <motion.div
        {...fadeUp}
        transition={smoothTransition}
        className="z-10 flex w-full max-w-5xl flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...smoothTransition, duration: 1.2, delay: 0.2 }}
          className="group relative mb-12 h-36 w-36 overflow-hidden rounded-full border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-700 hover:border-accent-blue/50 hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] md:h-48 md:w-48"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-tr from-accent-blue/20 to-accent-purple/20 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-0" />
          <img
            src="data/foto/s.jpg"
            alt="Foto Profil Jefri Rahman Hakim"
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </motion.div>

        <div className="mb-6 overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ ...smoothTransition, delay: 0.3 }}
            className="font-heading text-4xl font-bold uppercase leading-none tracking-tighter text-white text-glow sm:text-5xl md:text-7xl lg:text-[7rem]"
          >
            Jefri Rahman Hakim
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothTransition, delay: 0.6 }}
          className="w-full"
        >
          <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Sparkles className="h-4 w-4 animate-pulse text-accent-yellow sm:h-5 sm:w-5" />
              <p className="text-center text-lg font-semibold tracking-wide text-transparent text-glow-accent bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text sm:text-xl md:text-3xl">
                Economic Thinker
              </p>
            </div>

            <span className="mx-2 hidden font-light text-white/30 sm:inline">|</span>

            <div className="flex items-center gap-2 sm:gap-3">
              <p className="text-center text-lg font-semibold tracking-wide text-transparent text-glow-accent bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text sm:text-xl md:text-3xl">
                Trader & Investor
              </p>
              <Sparkles className="h-4 w-4 animate-pulse text-accent-yellow sm:h-5 sm:w-5" />
            </div>
          </div>

          <p className="mx-auto mb-10 max-w-3xl text-center text-base font-light leading-relaxed text-gray-300/90 sm:mb-14 sm:text-lg md:text-2xl">
            Memahami ekonomi, pasar keuangan, teknologi, dan perilaku manusia
            untuk melihat arah perkembangan dunia.
          </p>

          <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
            <motion.a
              href="#about"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-10 py-4 font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500 ease-out hover:shadow-[0_0_50px_rgba(255,255,255,0.8)]"
            >
              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <User
                size={20}
                className="relative z-10 transition-colors duration-300 group-hover:text-accent-blue"
              />
              <span className="relative z-10">Jelajahi Profil</span>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="glass-panel group relative flex items-center justify-center gap-3 overflow-hidden rounded-full px-10 py-4 font-semibold text-white transition-all duration-500 ease-out hover:border-white/30 hover:bg-white/10"
            >
              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-emerald-500/20 to-teal-400/20 transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <MessageCircle
                size={20}
                className="relative z-10 transition-colors duration-300 group-hover:text-emerald-400"
              />
              <span className="relative z-10">Hubungi Saya</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
