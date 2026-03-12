import { motion } from "motion/react";
import { Sparkles, User, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-6 text-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
        className="flex flex-col items-center max-w-4xl w-full"
      >
        {/* NAME */}
        <motion.h1
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[0.95] mb-10"
        >
          Jefri Rahman Hakim
        </motion.h1>

        {/* TAGLINE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="flex items-center gap-3 mb-12"
        >
          <Sparkles className="text-accent-yellow w-5 h-5" />

          <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink">
            Trader & Investor
          </p>

          <Sparkles className="text-accent-yellow w-5 h-5" />
        </motion.div>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            href="#about"
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300"
          >
            <User size={18} />
            Jelajahi Profil
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white backdrop-blur-md hover:bg-white/10 transition-all duration-300"
          >
            <MessageCircle size={18} />
            Hubungi Saya
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
