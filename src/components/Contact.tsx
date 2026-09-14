import { ArrowUpRight, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section-shell contact-section" aria-labelledby="contact-title">
      <div className="contact-wrap">
        <div className="contact-kicker">
          <span aria-hidden="true">Punya ide? Jangan dipendem.</span>
        </div>
        <h2 id="contact-title" className="contact-title">Yuk, ngobrol.</h2>
        <p className="contact-copy">
          Mau bahas ekonomi, pasar, teknologi, bikin project, atau sekadar tukar pikiran sampai lupa waktu? Gas aja. Santai, nggak harus formal.
        </p>
        <div className="contact-actions">
          <a href="https://instagram.com/jefrirh_" target="_blank" rel="noopener noreferrer" className="hero-button hero-button-primary">
            <Instagram size={17} aria-hidden="true" />
            Ajak ngobrol
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
