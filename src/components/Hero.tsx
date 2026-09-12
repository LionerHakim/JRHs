import { motion } from 'motion/react';

export default function Hero() {
  const photo = `${import.meta.env.BASE_URL}data/foto/s.jpg`;
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[linear-gradient(180deg,#4a7ff2_0%,#7b7ed8_30%,#c98ab5_65%,#e8a87c_100%)] px-5 pt-28 md:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(180deg,transparent_0%,rgba(18,18,18,.04)_30%,rgba(18,18,18,.16)_100%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 py-16 md:grid-cols-[1.08fr_.72fr] md:gap-16 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[.18em] text-white/80">Personal Editorial Portfolio</p>
          <h1 className="max-w-3xl font-serif text-[clamp(3.1rem,8vw,5.5rem)] font-normal leading-none tracking-normal text-white">JRHs</h1>
          <p className="mt-7 max-w-2xl text-sm leading-6 text-white/90 md:text-base md:leading-7">Understanding how someone thinks and operates is far more important than simply knowing what they did.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#about" className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-black transition-opacity hover:opacity-90">Explore profile</a>
            <a href="#projects" className="inline-flex min-h-11 items-center rounded-full border border-white/80 px-5 text-sm font-medium text-white transition hover:bg-white hover:text-black">View projects</a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65, delay: .08 }} className="justify-self-center md:justify-self-end">
          <div className="rounded-[34px] bg-white p-1.5 shadow-[0_0_0_5px_#f7f7f7]">
            <div className="h-72 w-72 overflow-hidden rounded-[28px] sm:h-80 sm:w-80 lg:h-[390px] lg:w-[390px]">
              <img src={photo} alt="JRHs" className="h-full w-full object-cover" fetchPriority="high" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
