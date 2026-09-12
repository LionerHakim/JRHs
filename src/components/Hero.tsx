import { motion } from 'motion/react';

export default function Hero() {
  const photo = `${import.meta.env.BASE_URL}data/foto/s.jpg`;

  return (
    <section id="hero" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#050505] px-5 pt-28 md:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_22%,rgba(0,122,255,.12),transparent_32%),linear-gradient(180deg,#0B0B0B_0%,#050505_70%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#007AFF]/[0.035] to-transparent" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 py-16 md:grid-cols-[1.04fr_.74fr] md:gap-20 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
          <p className="mb-5 text-[12px] font-medium uppercase tracking-[.18em] text-[#A0A0A0]">Personal Editorial Space</p>
          <h1 className="max-w-3xl font-serif text-[clamp(3.25rem,9vw,5.75rem)] font-normal leading-[.94] tracking-normal text-[#F5F5F5]">JRHs</h1>
          <p className="mt-7 max-w-2xl text-[15px] leading-7 text-[#A0A0A0] md:text-base">Understanding how someone thinks and operates is far more important than simply knowing what they did.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#about" className="inline-flex min-h-11 items-center rounded-full bg-[#F5F5F5] px-5 text-sm font-semibold text-[#050505] transition active:scale-[.97] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]">Explore profile</a>
            <a href="#projects" className="inline-flex min-h-11 items-center rounded-full border border-[#666] px-5 text-sm font-medium text-[#F5F5F5] transition active:scale-[.97] hover:border-[#F5F5F5] hover:bg-[#101010] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]">View projects</a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65, delay: .08 }} className="justify-self-center md:justify-self-end">
          <div className="rounded-[30px] border border-[#1D1D1D] bg-[#0A0A0A] p-2 shadow-[0_0_0_5px_#101010]">
            <div className="h-72 w-72 overflow-hidden rounded-[24px] sm:h-80 sm:w-80 lg:h-[390px] lg:w-[390px]">
              <img src={photo} alt="JRHs" className="h-full w-full object-cover" fetchPriority="high" decoding="async" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
