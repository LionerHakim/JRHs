export default function Hero() {
  return (
    <section id="hero" className="hero-clean" aria-labelledby="hero-title">
      <div className="hero-clean-inner">
        <p className="eyebrow">Personal editorial portfolio</p>
        <h1 id="hero-title">JRH</h1>
        <p className="hero-positioning">Ekonomi, markets, technology, dan cara manusia berpikir.</p>
        <p className="hero-description">Ruang personal untuk memahami sistem, menguji ide, dan membangun sesuatu dengan sengaja.</p>
        <div className="hero-actions">
          <a href="#projects" className="hero-button hero-button-primary">Lihat Projects <span aria-hidden="true">↗</span></a>
          <a href="#about" className="hero-button hero-button-secondary">Tentang JRH</a>
        </div>
      </div>
    </section>
  );
}
