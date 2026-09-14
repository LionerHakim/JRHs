import { ArrowUpRight, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section-shell contact-section" aria-labelledby="contact-title">
      <div className="contact-wrap">
        <div className="contact-kicker"><span aria-hidden="true">Ada yang mau dibahas?</span></div>
        <h2 id="contact-title" className="contact-title">Kirim pesan aja.</h2>
        <p className="contact-copy">Punya ide, project, atau sekadar mau ngobrol soal ekonomi, teknologi, dan hal-hal yang lagi kamu pikirin? Tulis pesan lewat Instagram. Nggak perlu bikin pembuka yang formal—langsung ke intinya juga boleh.</p>
        <div className="contact-actions">
          <a href="https://instagram.com/jefrirh_" target="_blank" rel="noopener noreferrer" className="hero-button hero-button-primary contact-cta"><Instagram size={17} aria-hidden="true" />Kirim pesan di Instagram<ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
