export default function Profile() {
  return (
    <section id="about" className="section-shell about-section" aria-labelledby="about-title">
      <div className="section-orbit-mark" aria-hidden="true" />
      <div className="editorial-grid about-grid">
        <div className="section-intro-sticky">
          <p className="eyebrow">01 / About</p>
          <h2 id="about-title" className="display-title">Tentang JRH.</h2>
          <span className="section-rule" aria-hidden="true" />
        </div>
        <div className="about-reading about-panel">
          <p className="about-lead">JRH berada di persimpangan ekonomi, pasar keuangan, teknologi, dan perilaku manusia.</p>
          <p>Ketertarikannya bukan hanya pada cara sistem bekerja, tetapi juga pada cara manusia mengambil keputusan di dalamnya.</p>
          <p className="editorial-quote">Perjalanan trading dan investing dimulai pada 9 Maret 2019 — titik awal untuk memahami pasar melampaui angka, melalui psikologi, disiplin, dan perilaku.</p>
          <div className="about-footnote" aria-hidden="true"><span>JRH</span><span className="about-footnote-line" /><span>01</span></div>
        </div>
      </div>
    </section>
  );
}
