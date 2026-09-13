import { ArrowUpRight, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section-shell contact-section" aria-labelledby="contact-title">
      <div className="contact-wrap">
        <p className="eyebrow">04 / Contact</p>
        <h2 id="contact-title" className="contact-title">Ada sesuatu yang ingin dibangun?</h2>
        <p className="contact-copy">Untuk diskusi, kolaborasi, atau bertukar perspektif tentang ekonomi, markets, technology, dan ide yang sedang dibangun.</p>
        <div className="contact-actions">
          <a href="https://instagram.com/jefrirh_" target="_blank" rel="noopener noreferrer" className="hero-button hero-button-primary"><Instagram size={16} aria-hidden="true" /> Instagram <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
