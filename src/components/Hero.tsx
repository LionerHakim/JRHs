export default function Hero() {
  return (
    <section id="hero" className="hero-clean" aria-labelledby="hero-title">
      <div className="hero-clean-inner">
        <div className="hero-kicker">
          <span className="hero-kicker-dot" aria-hidden="true" />
          Personal portfolio
        </div>
        <p className="eyebrow">JRH / 2026</p>
        <h1 id="hero-title">JRH</h1>
        <p className="hero-positioning">Ekonomi, markets, technology, dan cara manusia berpikir.</p>
        <p className="hero-description">Ruang personal untuk memahami sistem, menguji ide, dan membangun sesuatu dengan sengaja.</p>
        <div className="hero-actions">
          <a href="#projects" className="hero-button hero-button-primary">Lihat projects <span aria-hidden="true">↗</span></a>
          <a href="#contact" className="hero-button hero-button-secondary">Hubungi JRH</a>
        </div>
        <a className="hero-scroll-hint" href="#about" aria-label="Lanjut ke About">
          <span>Scroll untuk mengenal JRH</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
