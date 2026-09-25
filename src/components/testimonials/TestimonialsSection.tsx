import { TestimonialCard } from './TestimonialCard'
import { siteConfig } from '../../config/site'

export function TestimonialsSection() {
  const testimonials = siteConfig.testimonials

  return (
    <section id="testimonials" className="section testimonials-section" aria-labelledby="testimonials-title">
      <div className="section-head">
        <h2 id="testimonials-title">Thoughts</h2>
      </div>

      <p className="testimonials-subtitle">
        16 gagasan dari tokoh lintas bidang tentang karya, pembelajaran, teknologi, ekonomi, dan kehidupan.
      </p>

      <div className="testimonials-toolbar" aria-hidden="true">
        <span className="testimonial-counter">
          {String(testimonials.length).padStart(2, '0')} PERSPEKTIF
        </span>
        <span className="testimonial-swipe-hint">KOLEKSI PEMIKIRAN</span>
      </div>

      <div className="testimonials-viewport" role="region" aria-label="Koleksi perspektif">
        <div className="testimonials-list">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name + testimonial.role}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
