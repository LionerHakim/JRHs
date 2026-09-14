export default function Hero() {
  return (
    <section id="hero" className="hero-clean" aria-labelledby="hero-title">
      <div className="hero-clean-inner">
        <div className="hero-copy">
          <div className="hero-panel">
            <p className="eyebrow">2026 / Personal archive</p>
            <h1 id="hero-title">Portfolio</h1>
            <p className="hero-positioning">Ekonomi, markets, technology, dan cara manusia berpikir.</p>
            <p className="hero-description">Ruang personal untuk memahami sistem, menguji ide, dan membangun sesuatu dengan sengaja.</p>

            <div className="hero-actions">
              <a href="#projects" className="hero-button hero-button-primary">
                Lihat projects <span aria-hidden="true">↗</span>
              </a>
              <a href="#contact" className="hero-button hero-button-secondary">Hubungi</a>
            </div>

            <a className="hero-scroll-hint" href="#about" aria-label="Lanjut ke About">
              <span>Lanjut ke About</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <figure className="hero-portrait">
            <div className="hero-portrait-frame">
              <img
                src={`${import.meta.env.BASE_URL}data/foto/s.jpg`}
                alt="Portrait"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <figcaption>Personal archive</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
