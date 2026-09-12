import { motion, useReducedMotion } from 'motion/react';

export default function Hero() {
  const photo = `${import.meta.env.BASE_URL}data/foto/s.jpg`;
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 md:px-8 lg:px-12" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-20 bg-[var(--gradient-dusk-gradient)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[22%] bg-[linear-gradient(180deg,transparent,rgba(12,11,18,.78))]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[15%] bg-[radial-gradient(ellipse_at_bottom,rgba(15,14,20,.75),transparent_72%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 py-14 md:grid-cols-[1.05fr_.82fr] md:gap-16 lg:py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
        >
          <p className="mb-5 font-[var(--font-inter)] text-[12px] font-medium uppercase tracking-[.18em] text-white/85">Ruang Personal Editorial</p>
          <h1 id="hero-title" className="max-w-3xl font-[var(--font-perfectly-nineties-regular)] text-[clamp(3.25rem,9vw,6rem)] font-normal leading-[.92] text-white">JRHs</h1>
          <p className="mt-7 max-w-2xl font-[var(--font-inter)] text-[15px] leading-7 text-white/90 md:text-base">Understanding how someone thinks and operates is far more important than simply knowing what they did.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="portal-pill min-h-11 bg-[var(--color-paper-white)] px-5 font-[var(--font-inter)] text-sm font-semibold text-[var(--color-ink-black)] transition active:scale-[.97] hover:bg-[var(--color-ash-mist)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white">Jelajahi Proyek</a>
            <a href="#about" className="portal-pill min-h-11 border-[1.5px] border-[var(--color-ink-black)] bg-transparent px-5 font-[var(--font-inter)] text-sm font-medium text-[var(--color-ink-black)] transition active:scale-[.97] hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">Tentang JRHs</a>
          </div>
        </motion.div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: .97 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: .65, delay: .08 }}
          className="justify-self-center md:justify-self-end"
        >
          <div className="rounded-[30px] border border-white/60 bg-white/20 p-2 shadow-[0_0_0_5px_rgba(255,255,255,.14)] backdrop-blur-[2px]">
            <div className="h-72 w-72 overflow-hidden rounded-[24px] sm:h-80 sm:w-80 lg:h-[410px] lg:w-[410px]">
              <img src={photo} alt="Potret JRHs" className="h-full w-full object-cover" fetchPriority="high" decoding="async" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
