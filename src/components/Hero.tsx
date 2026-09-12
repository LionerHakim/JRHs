import { motion, useReducedMotion } from 'motion/react';

export default function Hero() {
  const photo = `${import.meta.env.BASE_URL}data/foto/s.jpg`;
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 sm:px-6 md:px-8 lg:px-12" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-[var(--gradient-dusk-gradient)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,.24),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,.14),transparent_34%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-9 py-12 md:grid-cols-[1fr_.78fr] md:gap-14 lg:py-20">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .45 }}>
          <div className="ios-tile inline-flex border-white/45 bg-white/16 px-3 py-2 text-[11px] font-semibold uppercase tracking-[.16em] text-white shadow-[0_10px_30px_rgba(0,0,0,.10)] backdrop-blur-md">Ruang personal JRHs</div>
          <h1 id="hero-title" className="mt-5 max-w-4xl font-[var(--font-perfectly-nineties-regular)] text-[clamp(3.35rem,15vw,6.5rem)] font-normal leading-[.88] tracking-tight text-white">JRHs</h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/92 md:text-base">Understanding how someone thinks and operates is far more important than simply knowing what they did.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#rekam-jejak" className="portal-pill bg-white px-5 font-semibold text-[var(--color-ink)] shadow-[0_12px_26px_rgba(0,0,0,.12)] transition active:scale-[.97] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">Lihat rekam jejak</a>
            <a href="#projects" className="portal-pill border border-white/75 bg-white/10 px-5 font-medium text-white backdrop-blur-sm transition active:scale-[.97] hover:bg-white/18 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">Lihat proyek</a>
          </div>
        </motion.div>
        <motion.div initial={reduceMotion ? false : { opacity: 0, scale: .97 }} animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }} transition={{ duration: .55, delay: .06 }} className="justify-self-center md:justify-self-end">
          <div className="ios-tile overflow-hidden border-white/60 bg-white/20 p-2 shadow-[0_22px_60px_rgba(0,0,0,.16)] backdrop-blur-md">
            <div className="h-[min(78vw,21rem)] w-[min(78vw,21rem)] overflow-hidden rounded-[19px] sm:h-[22rem] sm:w-[22rem] lg:h-[410px] lg:w-[410px]">
              <img src={photo} alt="Potret JRHs" className="h-full w-full object-cover" fetchPriority="high" decoding="async" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
