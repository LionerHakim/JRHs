import { motion } from 'motion/react';

export default function Hero() {
  const photo = `${import.meta.env.BASE_URL}data/foto/s.jpg`;

  return (
    <section id="hero" className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 md:px-8 lg:px-12" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#4A7FF2_0%,#7B7ED8_30%,#C98AB5_65%,#E8A87C_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[20%] bg-[linear-gradient(180deg,transparent,rgba(17,16,21,.72))]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-16 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.16))]" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 py-14 md:grid-cols-[1.12fr_.72fr] md:gap-16 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
          <p className="mb-5 text-[12px] font-medium uppercase tracking-[.18em] text-white/85">Ruang Personal Editorial</p>
          <h1 id="hero-title" className="max-w-3xl font-serif text-[clamp(3.25rem,9vw,5.75rem)] font-normal leading-[.94] text-white">JRHs</h1>
          <p className="mt-7 max-w-2xl text-[15px] leading-7 text-white/90 md:text-base">Understanding how someone thinks and operates is far more important than simply knowing what they did.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-black transition active:scale-[.97] hover:bg-[#F7F7F7] focus:outline-none focus-visible:ring-2 focus-visible:ring-white">Jelajahi Proyek</a>
            <a href="#about" className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-black/70 bg-transparent px-5 text-sm font-medium text-black transition active:scale-[.97] hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">Tentang JRHs</a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65, delay: .08 }} className="justify-self-center md:justify-self-end">
          <div className="rounded-[30px] border border-white/60 bg-white/20 p-2 shadow-[0_0_0_5px_rgba(255,255,255,.12)] backdrop-blur-[2px]">
            <div className="h-72 w-72 overflow-hidden rounded-[24px] sm:h-80 sm:w-80 lg:h-[390px] lg:w-[390px]">
              <img src={photo} alt="Potret JRHs" className="h-full w-full object-cover" fetchPriority="high" decoding="async" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
