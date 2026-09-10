import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100svh] flex items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Refined background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[180px] bg-gradient-to-b from-blue-500/20 via-purple-500/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-10 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-xs md:text-sm font-semibold text-gray-300 uppercase tracking-widest">Personal Portfolio & Vision</span>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="relative mb-12"
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
            {/* Placeholder gradient until image loads */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent"></div>
            <img
              src="/data/foto/s.jpg"
              alt="Jefri Rahman Hakim"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/0 via-purple-500/10 to-white/5 pointer-events-none"></div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-heading tracking-tight leading-tight">
            Jefri Rahman
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Hakim</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-2xl mb-12 text-lg md:text-xl text-gray-300 font-light leading-relaxed"
        >
          Understanding how someone thinks and operates is far more important than simply knowing what they did.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.a
            href="#about"
            whileHover={{ y: -2, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-lg bg-white text-black font-semibold text-base transition-all duration-300 flex items-center gap-3 hover:shadow-xl"
          >
            Explore Profile
            <ArrowRight size={18} />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-lg border border-white/20 text-white font-semibold text-base transition-all duration-300 hover:border-white/40"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border border-white/20 rounded-full flex justify-center"
          >
            <motion.div className="w-1 h-2 bg-white/40 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
