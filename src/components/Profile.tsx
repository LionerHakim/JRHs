export default function Profile() {
  return (
    <section id="about" className="section-shell about-section" aria-labelledby="about-title">
      <div className="about-v5-grid">
        <header className="about-v5-heading">
          <span className="eyebrow">Tentang saya</span>
          <h2 id="about-title" className="display-title">Yang sedang dicari.</h2>
        </header>

        <div className="about-v5-reading">
          <p className="about-v5-lead">Berada di persimpangan ekonomi, pasar keuangan, teknologi, dan perilaku manusia.</p>
          <div className="about-v5-rule" aria-hidden="true" />
          <p className="about-v5-body">Ketertarikannya bukan hanya pada cara sistem bekerja, tetapi juga pada cara manusia mengambil keputusan di dalamnya.</p>
          <blockquote className="about-v5-quote">
            <span className="about-v5-quote-mark" aria-hidden="true">“</span>
            <p>Perjalanan trading dan investing dimulai pada 9 Maret 2019 - titik awal untuk memahami pasar melampaui angka, melalui psikologi, disiplin, dan perilaku.</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
