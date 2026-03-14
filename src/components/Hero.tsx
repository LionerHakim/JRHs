import { motion } from "motion/react";
import { Sparkles, User, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section
  id="hero"
  className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-24 text-center"
>
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent-blue/10 blur-[160px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center"
      >
        {/* FOTO */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="group relative mb-8 w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 overflow-hidden rounded-full border border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.15)]"
        >
          <img
            src="/data/foto/s.jpg"
            alt="Foto Profil"
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </motion.div>

        {/* NAMA */}
        <motion.h1
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white capitalize mb-4"
        >
          Jefri Rahman Hakim
        </motion.h1>

        {/* ROLE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="flex items-center gap-2 mb-6"
        <        </motion.div>

        {/* DESKRIPSI */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duraton: 1, delay: 0.6 }}
          className="max-w-xl text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-10"
        >
          Understanding how someone thinks and operates is far more important than simply knowing what they did. 
        </motion.p>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            href="#about"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <User size={18} />
            Jelajahi Profil
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
          >
            <MessageCircle size={18} />
            Hubungi Saya
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
