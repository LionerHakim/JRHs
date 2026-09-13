export default function Hero() {
  const photo = `${import.meta.env.BASE_URL}data/foto/s.jpg`;

  return (
    <section id="hero" className="hero-portal hero-2050" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-silhouette hero-silhouette-left" />
        <div className="hero-silhouette hero-silhouette-right" />
        <div className="hero-ground" />
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="hero-grid-glow" />
      </div>

      <div className="hero-telemetry" aria-hidden="true">
        <span>JRH / 2050 INTERFACE</span>
        <span>PERSONAL SYSTEM</span>
        <span>001 — ONLINE</span>
      </div>

      <div className="hero-inner hero-2050-inner">
        <div className="hero-copy-card hero-2050-copy">
          <div className="hero-live-line"><span className="hero-live-dot" /> SYSTEM ONLINE <span>LOCAL / PERSONAL</span></div>
          <p className="eyebrow">Personal editorial portfolio</p>
          <h1 id="hero-title">JRH</h1>
          <p className="hero-positioning">Ekonomi, markets, technology, dan cara manusia berpikir.</p>
          <p className="hero-description">Ruang personal untuk memahami sistem, menguji ide, dan membangun sesuatu dengan sengaja.</p>
          <div className="hero-actions">
            <a href="#projects" className="hero-button hero-button-primary">Lihat Projects <span aria-hidden="true">↗</span></a>
            <a href="#about" className="hero-button hero-button-secondary">Tentang JRH</a>
          </div>
        </div>

        <figure className="hero-image-card hero-2050-portrait">
          <div className="hero-portrait-frame">
            <img src={photo} alt="Potret JRH" fetchPriority="high" decoding="async" />
            <span className="hero-scan-line" aria-hidden="true" />
            <span className="hero-corner hero-corner-tl" aria-hidden="true" />
            <span className="hero-corner hero-corner-br" aria-hidden="true" />
          </div>
          <figcaption>
            <span>JRH / Personal space</span>
            <span className="hero-coordinate">03.2026 · ACTIVE</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
