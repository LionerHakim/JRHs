import { ArrowUpRight, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section-shell contact-section" aria-labelledby="contact-title">
      <div className="contact-wrap">
        <div className="contact-kicker">
          <span aria-hidden="true">Ada ide? Jangan dipendem.</span>
        </div>
        <h2 id="contact-title" className="contact-title">Yuk, bikin sesuatu.</h2>
        <p className="contact-copy">
          Mau ngobrol soal ekonomi, pasar, teknologi, bikin project, atau cuma punya ide iseng yang pengin diwujudin? Sini. Kita bahas dulu. Nggak harus formal, nggak perlu ribet.
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
