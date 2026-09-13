export default function Hero() {
  const photo = `${import.meta.env.BASE_URL}data/foto/s.jpg`;

  return (
    <section id="hero" className="hero-portal" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy-card">
          <p className="eyebrow">Personal editorial portfolio</p>
          <h1 id="hero-title">JRH</h1>
          <p className="hero-positioning">Ekonomi, markets, technology, dan cara manusia berpikir.</p>
          <p className="hero-description">Ruang personal untuk memahami sistem, menguji ide, dan membangun sesuatu dengan sengaja.</p>
          <div className="hero-actions">
            <a href="#projects" className="hero-button hero-button-primary">Lihat Projects <span aria-hidden="true">↗</span></a>
            <a href="#about" className="hero-button hero-button-secondary">Tentang JRH</a>
          </div>
        </div>

        <figure className="hero-image-card">
          <div className="hero-portrait-frame">
            <img src={photo} alt="Potret JRH" fetchPriority="high" decoding="async" />
          </div>
          <figcaption>
            <span>JRH</span>
            <span>Personal space</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
