import { motion } from 'motion/react';

export default function Hero() {
  return <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-24 md:px-8 lg:px-12">
    <div className="mx-auto grid w-full max-w-6xl items-center gap-12 py-16 md:grid-cols-[1.05fr_.75fr] md:gap-16 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
        <p className="mb-5 text-xs font-medium uppercase tracking-[.24em] text-[#666]">JRHs</p>
        <h1 className="max-w-3xl font-serif text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[.98] tracking-[-.035em] text-[#F5F5F5]">Jefri Rahman Hakim</h1>
        <p className="mt-7 max-w-2xl text-sm leading-7 text-[#A0A0A0] md:text-base">Understanding how someone thinks and operates is far more important than simply knowing what they did.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#about" className="inline-flex min-h-11 items-center rounded-full bg-[#F5F5F5] px-5 text-sm font-medium text-[#050505] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#007AFF]">Explore profile</a>
          <a href="#projects" className="inline-flex min-h-11 items-center rounded-full border border-[#1D1D1D] px-5 text-sm font-medium text-[#F5F5F5] transition hover:border-[#666] focus:outline-none focus:ring-2 focus:ring-[#007AFF]">View projects</a>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .1 }} className="justify-self-center md:justify-self-end">
        <div className="relative h-64 w-64 overflow-hidden rounded-[28px] border border-[#1D1D1D] bg-[#0A0A0A] sm:h-80 sm:w-80 lg:h-[380px] lg:w-[380px]">
          <img src="/data/foto/s.jpg" alt="Jefri Rahman Hakim" className="h-full w-full object-cover" fetchPriority="high" />
        </div>
      </motion.div>
    </div>
  </section>;
}
