import { FormEvent, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { siteConfig } from './config/site'
import './index.css'

const sectionItems = [
  ['identity', 'About'],
  ['education', 'Education'],
  ['projects', 'Projects'],
  ['testimonials', 'Quotes World'],
  ['links', 'Contact'],
] as const

const sectionIds = sectionItems.map(([id]) => id)

const testimonialInitials = (name: string) =>
  name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()

function TestimonialCard({
  testimonial,
  index,
  isActive,
}: {
  testimonial: (typeof siteConfig.testimonials)[number]
  index: number
  isActive: boolean
}) {
  return (
    <article className={`testimonial${isActive ? ' is-active' : ''}`}>
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

      <span className="testimonial-disclaimer">GAGASAN TERINSPIRASI</span>

      <blockquote>“{testimonial.quote}”</blockquote>

      <footer className="testimonial-footer">
        <span>Perspektif</span>
        <strong>{testimonial.category}</strong>
      </footer>
    </article>
  )
}

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const testimonials = siteConfig.testimonials
  const activeTestimonial = testimonials[activeIndex]

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current
    const endX = event.changedTouches[0]?.clientX
    touchStartX.current = null

    if (startX === null || endX === undefined) return

    const distance = endX - startX
    if (Math.abs(distance) < 45) return

    if (distance < 0) {
      setActiveIndex((current) => Math.min(current + 1, testimonials.length - 1))
    } else {
      setActiveIndex((current) => Math.max(current - 1, 0))
    }
  }

  return (
    <section id="testimonials" className="section testimonials-section" aria-labelledby="testimonials-title">
      <div className="section-head">
        <p className="section-kicker">QUOTES WORLD</p>
        <h2 id="testimonials-title">Quotes World</h2>
      </div>

      <p className="testimonials-subtitle">
        16 gagasan dari tokoh lintas bidang tentang karya, pembelajaran, teknologi, ekonomi, dan kehidupan.
      </p>

      <div className="testimonials-toolbar">
        <span className="testimonial-counter" aria-live="polite">
          QUOTE {String(activeIndex + 1).padStart(2, '0')} <span aria-hidden="true">/</span> {String(testimonials.length).padStart(2, '0')}
        </span>
        <span className="testimonial-swipe-hint" aria-hidden="true">SWIPE →</span>
      </div>

      <div
        className="testimonials-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          touchStartX.current = null
        }}
      >
        <div className="testimonials-list">
          <TestimonialCard
            key={activeTestimonial.name + activeTestimonial.role}
            testimonial={activeTestimonial}
            index={activeIndex}
            isActive
          />
        </div>
      </div>
    </section>
  )
}
export default function App() {
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>('identity')
  const [menuOpen, setMenuOpen] = useState(false)
  const [musicOpen, setMusicOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [purpose, setPurpose] = useState('')
  const [message, setMessage] = useState('')
  const [privacy, setPrivacy] = useState(false)
  const [contactStatus, setContactStatus] = useState<string | null>(null)
  const [contactError, setContactError] = useState<string | null>(null)
  const [touched, setTouched] = useState({ name: false, email: false, message: false, privacy: false })

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id as (typeof sectionIds)[number])
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.1, 0.35, 0.6],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setContactError(null)
    setContactStatus(null)
    setTouched({ name: true, email: true, message: true, privacy: true })

    if (!name.trim()) return setContactError('Nama belum diisi.')

    const normalizedEmail = email.trim().toLowerCase()
    const trustedEmailDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'live.com', 'yahoo.com', 'icloud.com', 'proton.me', 'protonmail.com']
    const emailPattern = /^[^\s@]+@([^\s@]+)$/
    const emailMatch = normalizedEmail.match(emailPattern)

    if (!emailMatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return setContactError('Gunakan email yang valid.')
    }

    if (!trustedEmailDomains.includes(emailMatch[1])) {
      return setContactError('Gunakan email dari Gmail, Outlook, Hotmail, Yahoo, iCloud, atau Proton.')
    }

    if (!message.trim()) return setContactError('Pesan belum diisi.')
    if (!privacy) return setContactError('Centang persetujuan privasi dulu.')

    const subject = encodeURIComponent(`[JRHs Contact] ${purpose || 'Pesan dari website'}`)
    const body = encodeURIComponent(`Halo JRHs,

Saya ingin menghubungi terkait:

Nama:
${name.trim()}

Email:
${email.trim()}

Topik:
${purpose || 'Tidak ditentukan'}

Pesan:
${message.trim()}

--------------------------------
Dikirim melalui JRHs
https://jrhsee.my.id
--------------------------------

Terima kasih,
${name.trim()}`)

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`
    setContactStatus('Email sudah disiapkan ✨')
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#identity">Lewati ke konten utama</a>
      <header className="nav">
        <a className="wordmark" href="#identity" aria-label="JRH home">
          <span className="brand-mark" aria-hidden="true">J</span>
          <span>JRH</span>
        </a>

        <div className="nav-actions">
          <button
            className={`music-toggle${musicOpen ? ' is-open' : ''}`}
            type="button"
            aria-expanded={musicOpen}
            aria-controls="music-panel"
            aria-label={musicOpen ? 'Tutup music player' : 'Buka music player'}
            onClick={() => setMusicOpen((open) => !open)}
          >
            <span className="music-toggle-icon" aria-hidden="true">♪</span>
            <span>MUSIC</span>
          </button>

          <button
            className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>

          <nav id="primary-navigation" className={menuOpen ? 'is-open' : undefined} aria-label="Primary navigation">
            <div className="menu-panel-head">
              <span>JRH / NAVIGATION</span>
              <strong>Explore</strong>
            </div>
            <div className="menu-panel-grid">
              {sectionItems.map(([id, label], index) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? 'page' : undefined}
                className={activeSection === id ? 'is-active' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <span className="menu-item-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="menu-item-label">{label}</span>
                <span className="menu-item-arrow" aria-hidden="true">↗</span>
              </a>
              ))}
            </div>
            <div className="menu-panel-foot">
              <span>JRHs</span>
              <span>Navigate your way ↗</span>
            </div>
          </nav>

          <aside id="music-panel" className={musicOpen ? 'music-panel is-open' : 'music-panel'} aria-label="Music player">
            <div className="music-panel-head">
              <div>
                <span className="music-eyebrow">JRH / SOUND</span>
                <strong>Music Player</strong>
              </div>
              <span className="music-status">READY</span>
            </div>
            <div className="music-track">
              <div className="music-track-art" aria-hidden="true">♪</div>
              <div className="music-track-copy">
                <strong>Select a track</strong>
                <span>Music for the journey.</span>
              </div>
            </div>
            <div className="music-progress" aria-hidden="true"><span /></div>
            <div className="music-controls" aria-label="Music controls">
              <button type="button" disabled aria-label="Previous track">‹‹</button>
              <button className="music-play" type="button" disabled aria-label="Play">▶</button>
              <button type="button" disabled aria-label="Next track">››</button>
            </div>
          </aside>
        </div>
      </header>

      <main>
        <section id="identity" className="hero" aria-labelledby="identity-title">
          <div className="hero-copy">
            <h1 id="identity-title">PORTFOLIO</h1>
            <p className="hero-description">{siteConfig.identity.description}</p>
            <div className="hero-actions">
              <a className="hero-pill" href="#projects">Explore projects</a>
              <a className="ghost-pill" href="#links">Contact</a>
            </div>
          </div>

          <figure className="hero-portrait">
            <div className="portrait-frame">
              <img
                src={siteConfig.identity.profileImage}
                alt={siteConfig.identity.name}
                width="640"
                height="800"
                fetchPriority="high"
              />
            </div>
          </figure>

          <aside className="portrait-quote" aria-label="Economic thinking principle">
            <strong>BERPIKIR SEPERTI MESIN EKONOMI</strong>
            <p>lihat dunia sebagai sistem. segala peristiwa saling berkaitan dan berulang. pahami pola, bukan hanya kejadian sesaat.</p>
          </aside>
        </section>

        <section id="education" className="section" aria-labelledby="education-title">
          <div className="section-head">
            <p className="section-kicker">EDUCATION</p>
            <h2 id="education-title">Education</h2>
          </div>

          <div className="records">
            {siteConfig.education.map((item) => (
              <article className="record" key={item.period + item.institution}>
                <time>{item.period}</time>
                <div>
                  <h3>{item.institution}</h3>
                  {item.program !== 'SMA' && item.program !== 'SMP' || item.activities?.length ? (
                    <ul className="record-activities" aria-label="Activities and roles">
                      {item.program !== 'SMA' && item.program !== 'SMP' ? <li key={item.program}>{item.program}</li> : null}
                      {item.activities?.map((activity) => (
                        <li key={activity}>{activity}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-title">
          <div className="section-head">
            <p className="section-kicker">WORK</p>
            <h2 id="projects-title">Projects</h2>
          </div>

          <div className="project-list">
            {siteConfig.projects.map((project) => (
              <article className="project" key={project.title}>
                <span className="project-number">{project.number}</span>
                <div className="project-content">
                  <h3 className="project-name">{project.title}</h3>
                  <div className="project-links">
                    {(project.links ?? []).map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                        <span>{link.name}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="project-quote" aria-label="Decision-making principle">
          <strong>GABUNGKAN DATA DAN INTUISI</strong>
          <p>gunakan data dan sistem algoritma, tapi jangan buang intuisi manusia. gabungkan keduanya untuk pengambilan keputusan terbaik.</p>
        </aside>

        <TestimonialsSection />

        <section id="links" className="section contact-section" aria-labelledby="links-title">
          <div className="section-head">
            <p className="section-kicker">CONTACT</p>
            <h2 id="links-title">Contact</h2>
          </div>

          <div className="contact-card">
            <div className="contact-intro">
              <p className="contact-question">Ada yang mau dibahas?</p>
              <p className="contact-answer">Punya pertanyaan, ide, project, peluang kolaborasi, atau sekadar mau ngobrol?</p>
              <p className="contact-note">Tulis aja. Saya siapkan emailnya. Kamu tinggal cek dan klik Kirim.</p>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="contact-fields">
                <label className="contact-field">
                  <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.25" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg></span>
                  <input aria-label="Nama kamu" required value={name} onChange={(event) => setName(event.target.value)} onBlur={() => setTouched((current) => ({ ...current, name: true }))} aria-invalid={touched.name && !name.trim()} placeholder="Nama kamu" autoComplete="name" />
                </label>
                <label className="contact-field">
                  <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4.5 7 7.5 6 7.5-6" /></svg></span>
                  <input aria-label="Email kamu" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} onBlur={() => setTouched((current) => ({ ...current, email: true }))} aria-invalid={touched.email && !!email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())} placeholder="email kamu" autoComplete="email" inputMode="email" />
                </label>
                <label className="contact-field">
                  <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 7h14M5 12h14M5 17h9" /></svg></span>
                  <select aria-label="Topik email (opsional)" value={purpose} onChange={(event) => setPurpose(event.target.value)}>
                    <option value="" disabled>Pilih topik</option>
                    {['Pertanyaan umum', 'Kolaborasi', 'Project', 'Bisnis', 'Investasi', 'Akademik', 'Feedback', 'Relationships', 'Tambah teman'].map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </label>
                <label className="contact-field contact-message">
                  <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 6.5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H11l-5 3v-3.5a2 2 0 0 1-2-2v-6.5a2 2 0 0 1 2-2Z" /></svg></span>
                  <textarea aria-label="Pesan kamu" required value={message} onChange={(event) => {
                    const words = event.target.value.trim().split(/\s+/).filter(Boolean)
                    setMessage(words.length > 169 ? words.slice(0, 169).join(' ') : event.target.value)
                  }} onBlur={() => setTouched((current) => ({ ...current, message: true }))} aria-invalid={touched.message && !message.trim()} placeholder="Tulis pesan kamu di sini... (maksimal 169 kata)" rows={5} />
                  <span className="contact-counter">{message.trim() ? message.trim().split(/\s+/).length : 0}/169 kata</span>
                </label>
              </div>

              {contactError ? <p className="contact-feedback is-error" role="alert">{contactError}</p> : null}
              {contactStatus ? <p className="contact-feedback is-success" role="status">{contactStatus}<span>Aplikasi email kamu akan terbuka. Tinggal cek pesannya, lalu klik Kirim.</span></p> : null}

              <div className="contact-submit">
                <label className="contact-privacy">
                  <input type="checkbox" required checked={privacy} onChange={(event) => setPrivacy(event.target.checked)} onBlur={() => setTouched((current) => ({ ...current, privacy: true }))} aria-invalid={touched.privacy && !privacy} />
                  <span>Aku setuju dengan kebijakan privasi</span>
                </label>
                <button type="submit">✈ <span>Buka Email Saya</span> <span aria-hidden="true">→</span></button>
              </div>

              <div className="contact-benefits" aria-label="Contact benefits">
                <span aria-label="Cepat">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4.5 13h6l-.5 9L19.5 11h-6L13 2Z" /></svg>
                </span>
                <span aria-label="Aman">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
                </span>
                <span aria-label="Langsung ke email">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4.5 7 7.5 6 7.5-6" /></svg>
                </span>
              </div>

              <div className="contact-closing">
                <p>Terima kasih sudah berkunjung.</p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <strong>JRH</strong>
            <p>still learning.<br />still building.<br />still curious.<br /><span className="footer-mindfulness">stay present.</span></p>
          </div>

          <nav className="site-footer-nav" aria-label="Footer navigation">
            {sectionItems.map(([id, label]) => (
              <a key={id} href={`#${id}`}>{label.toUpperCase()}</a>
            ))}
          </nav>
        </div>

        <div className="site-footer-bottom">
          <span>© 2026 JRH</span>
          <a href="#identity" aria-label="Back to top">↗</a>
        </div>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('JRH root element not found')
createRoot(rootElement).render(<App />)
