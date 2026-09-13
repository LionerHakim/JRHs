export default function Hero() {
  const photo = `${import.meta.env.BASE_URL}data/foto/s.jpg`;

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--color-canvas)] px-4 pt-24 sm:px-6 md:px-8 lg:px-12" aria-labelledby="hero-title">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 py-10 md:grid-cols-[1fr_.62fr] md:gap-16 lg:py-16">
        <div>
          <p className="eyebrow">JRH · Personal space</p>
          <h1 id="hero-title" className="mt-3 max-w-4xl font-[var(--font-perfectly-nineties-regular)] text-[clamp(3.2rem,12vw,6rem)] font-normal leading-[.92] tracking-[-.035em] text-[var(--color-ink)]">JRH</h1>
          <p className="mt-5 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-7 text-[var(--color-text)]">Economics, markets, technology, and the way people think.</p>
          <p className="mt-4 max-w-xl border-l border-[var(--color-accent)] pl-4 text-sm leading-6 text-[var(--color-muted)]">Understanding how someone thinks and operates is far more important than simply knowing what they did.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            <a href="#rekam-jejak" className="portal-pill border border-[var(--color-accent)] bg-[var(--color-accent-soft)] px-4 font-semibold text-[var(--color-accent)] transition hover:bg-[rgba(0,122,255,.2)] active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">Explore Journey</a>
            <a href="#projects" className="portal-pill border border-[var(--color-line)] bg-[var(--color-control)] px-4 font-medium text-[var(--color-text)] transition hover:border-[#404040] hover:text-[var(--color-ink)] active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">View Projects</a>
          </div>
        </div>
        <div className="justify-self-center md:justify-self-end">
          <div className="ios-tile overflow-hidden p-1.5">
            <div className="h-[min(76vw,20rem)] w-[min(76vw,20rem)] overflow-hidden rounded-[5px] sm:h-[21rem] sm:w-[21rem] lg:h-[380px] lg:w-[380px]"><img src={photo} alt="Potret JRH" className="h-full w-full object-cover" fetchPriority="high" decoding="async" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
