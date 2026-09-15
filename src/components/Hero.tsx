export default function Hero() {
  return (
    <section id="hero" className="hero-clean" aria-labelledby="hero-title">
      <div className="hero-clean-inner">
        <div className="hero-copy">
          <div className="hero-panel">
            <h1 id="hero-title">Portfolio</h1>
            <p className="hero-positioning">Ekonomi, markets, technology, dan cara manusia berpikir.</p>
            <p className="hero-description">Ruang personal untuk memahami sistem, menguji ide, dan membangun sesuatu dengan sengaja.</p>
            <div className="hero-actions">
              <a href="#projects" className="hero-button hero-button-primary">Lihat projects <span aria-hidden="true">↗</span></a>
              <a href="#contact" className="hero-button hero-button-secondary">Hubungi</a>
            </div>
          </div>

          <figure className="hero-portrait hero-portrait-inline">
            <div className="hero-portrait-frame">
              <img src={`${import.meta.env.BASE_URL}data/foto/s.jpg`} alt="Foto JRH" loading="eager" decoding="async" fetchPriority="high" />
              <span className="hero-portrait-glow" aria-hidden="true" />
              <span className="hero-portrait-sheen" aria-hidden="true" />
            </div>
            <figcaption className="hero-portrait-caption">JRH · personal portfolio</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
