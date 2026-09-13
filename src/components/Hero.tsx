import { motion, useReducedMotion } from 'motion/react';

export default function Hero() {
  const photo = `${import.meta.env.BASE_URL}data/foto/s.jpg`;
  const reduceMotion = useReducedMotion();
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--color-canvas)] px-5 pt-28 sm:px-6 md:px-8 lg:px-12" aria-labelledby="hero-title">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 py-12 md:grid-cols-[1fr_.72fr] md:gap-14 lg:py-20">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .45 }}>
          <p className="eyebrow">Personal space · JRHs</p>
          <h1 id="hero-title" className="mt-4 max-w-4xl font-[var(--font-perfectly-nineties-regular)] text-[clamp(3.4rem,15vw,7rem)] font-normal leading-[.84] tracking-tight text-[var(--color-ink)]">JRHs</h1>
          <p className="mt-7 max-w-2xl text-[clamp(1.05rem,2vw,1.35rem)] leading-7 text-[var(--color-text)]">Economics, markets, technology, and the way people think.</p>
          <p className="mt-4 max-w-xl border-l-2 border-[var(--color-accent)] pl-4 text-sm leading-6 text-[var(--color-muted)]">Understanding how someone thinks and operates is far more important than simply knowing what they did.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#rekam-jejak" className="portal-pill bg-[var(--color-ink)] px-5 font-semibold text-[var(--color-canvas)] shadow-[var(--shadow-soft)] transition active:scale-[.97] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">Explore Journey</a>
            <a href="#web-tools" className="portal-pill border border-[var(--color-line)] bg-[var(--color-paper)] px-5 font-medium text-[var(--color-ink)] shadow-[var(--shadow-soft)] transition active:scale-[.97] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">Web Tools ↗</a>
          </div>
        </motion.div>
        <motion.div initial={reduceMotion ? false : { opacity: 0, scale: .97 }} animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }} transition={{ duration: .55, delay: .06 }} className="justify-self-center md:justify-self-end">
          <div className="ios-tile overflow-hidden p-2">
            <div className="h-[min(78vw,21rem)] w-[min(78vw,21rem)] overflow-hidden rounded-[19px] sm:h-[22rem] sm:w-[22rem] lg:h-[410px] lg:w-[410px]"><img src={photo} alt="Potret JRHs" className="h-full w-full object-cover" fetchPriority="high" decoding="async" /></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
