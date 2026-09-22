export function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof siteConfig.testimonials)[number]
  index: number
}) {
  return (
    <article className="testimonial">
      <div className="testimonial-topline" aria-hidden="true">
        <span>QUOTE</span>
        <strong>{String(index + 1).padStart(2, '0')}</strong>
      </div>
      <header className="testimonial-head">
        <div className="testimonial-avatar" aria-hidden="true">{testimonialInitials(testimonial.name)}</div>
        <div className="testimonial-meta">
          <strong>{testimonial.name}</strong>
          <span>{testimonial.role}</span>
        </div>
      </header>
      <div className="testimonial-source-row">
        <span className="testimonial-disclaimer">GAGASAN TERINSPIRASI</span>
        {testimonial.sourceUrl ? (
          <a
            className="testimonial-source-link"
            href={testimonial.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {testimonial.sourceStatus === 'verified' ? 'SUMBER TERVERIFIKASI ↗' : 'SUMBER TERATRIBUSI ↗'}
          </a>
        ) : (
          <span className="testimonial-source-link is-attributed">SUMBER TERATRIBUSI</span>
        )}
      </div>
      <blockquote>“{testimonial.quote}”</blockquote>
      <footer className="testimonial-footer">
        <span>Perspektif</span>
        <strong>{testimonial.category}</strong>
      </footer>
    </article>
  )
}


