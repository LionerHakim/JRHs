import { ArrowUpRight, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section-shell contact-section" aria-labelledby="contact-title">
      <div className="contact-wrap">
        <div className="contact-kicker"><span aria-hidden="true">Ada yang mau dibahas?</span></div>
        <h2 id="contact-title" className="contact-title">Ngobrol aja, nggak usah sungkan.</h2>
        <p className="contact-copy">Ada ide, project, atau hal yang lagi kamu pikirin? Kirim pesan lewat Instagram. Mau mulai dari “halo” juga boleh. Yang penting ngobrolnya jalan.</p>
        <div className="contact-actions">
          <a href="https://instagram.com/jefrirh_" target="_blank" rel="noopener noreferrer" className="hero-button hero-button-primary contact-cta"><Instagram size={17} aria-hidden="true" />Chat di Instagram<ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
