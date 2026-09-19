import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { siteConfig } from './config/site'
import './index.css'

const sectionItems = [
  ['identity', 'About'],
  ['education', 'Education'],
  ['media', 'Media'],
  ['projects', 'Projects'],
  ['testimonials', 'Quotes'],
  ['links', 'Contact'],
] as const

const sectionIds = sectionItems.map(([id]) => id)

const testimonialInitials = (name: string) =>
  name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()

function TestimonialCard({
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
  const testimonials = siteConfig.testimonials

  return (
    <section id="testimonials" className="section testimonials-section" aria-labelledby="testimonials-title">
      <div className="section-head">
        <p className="section-kicker">QUOTES</p>
        <h2 id="testimonials-title">Quotes</h2>
      </div>
      <p className="testimonials-subtitle">
        16 gagasan dari tokoh lintas bidang tentang karya, pembelajaran, teknologi, ekonomi, dan kehidupan.
      </p>
      <div className="testimonials-toolbar">
        <span className="testimonial-counter">16 PERSPEKTIF</span>
        <span className="testimonial-swipe-hint" aria-hidden="true">GESER ↔</span>
      </div>
      <div className="testimonials-viewport" aria-label="Koleksi quotes yang dapat digeser">
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

export default function App() {
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>('identity')
  const [menuOpen, setMenuOpen] = useState(false)
  const [musicOpen, setMusicOpen] = useState(false)
  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')
  const [message, setMessage] = useState('')
  const [privacy, setPrivacy] = useState(false)
  const [contactStatus, setContactStatus] = useState<string | null>(null)
  const [contactError, setContactError] = useState<string | null>(null)
  const [touched, setTouched] = useState({ name: false, message: false, privacy: false })
  const navActionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen && !musicOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setMusicOpen(false)
      }
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Node && !navActionsRef.current?.contains(target)) {
        setMenuOpen(false)
        setMusicOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [menuOpen, musicOpen])

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
    setTouched({ name: true, message: true, privacy: true })

    if (!name.trim()) return setContactError('Nama belum diisi.')

    if (!message.trim()) return setContactError('Pesan belum diisi.')
    if (!privacy) return setContactError('Persetujuan penggunaan data diperlukan.')

    const subject = encodeURIComponent(`[Portfolio Contact] ${purpose || 'Pesan dari website'}`)
    const body = encodeURIComponent(`Halo JRH,

Saya ingin menghubungi terkait:

Nama:
${name.trim()}

Topik:
${purpose || 'Tidak ditentukan'}

Pesan:
${message.trim()}

--------------------------------
Dikirim melalui JRH
https://jrhsee.my.id
--------------------------------

Terima kasih,
${name.trim()}`)

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`
    setContactStatus('Email sudah disiapkan. Pilih aplikasi email di perangkat Anda, lalu kirim.')
  }

  return (
    <div className={`site-shell${menuOpen ? " menu-open" : ""}${musicOpen ? " music-open" : ""}`}>
      <a className="skip-link" href="#identity">Lewati ke konten utama</a>
      <header className="nav">
        <a className="wordmark" href="#identity" aria-label="JRH home">
          <span className="brand-mark" aria-hidden="true">J</span>
          <span>JRH</span>
        </a>

        <div className="nav-actions" ref={navActionsRef}>
          <button
            className={`music-toggle${musicOpen ? ' is-open' : ''}`}
            type="button"
            aria-expanded={musicOpen}
            aria-controls="music-panel"
            aria-label={musicOpen ? 'Tutup music player' : 'Buka music player'}
            onClick={() => { setMusicOpen((open) => !open); setMenuOpen(false) }}
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
            onClick={() => { setMenuOpen((open) => !open); setMusicOpen(false) }}
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
                aria-current={activeSection === id ? 'location' : undefined}
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
              <span>JRH</span>
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
              <a className="hero-pill" href="#media">Explore media</a>
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

        <section id="media" className="section media-section" aria-labelledby="media-title">
          <div className="section-head">
            <p className="section-kicker">MEDIA</p>
            <h2 id="media-title">Media</h2>
          </div>

          <p className="media-subtitle">
            Kanal, platform, dan ruang digital JRH.
          </p>

          <div className="media-list">
            {siteConfig.media.map((item) => (
              <article className="media-card" key={item.number}>
                <div className="media-card-top">
                  <span className="media-number">{item.number}</span>
                  <span className="media-status">{item.platform}</span>
                </div>
                <div className="media-card-body">
                  <span className="media-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <div className="media-links">
                    {item.links.map((link) => (
                      <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">
                        <span>{link.label}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section projects-section" aria-labelledby="projects-title">
          <div className="section-head">
            <p className="section-kicker">PROJECTS</p>
            <h2 id="projects-title">Projects</h2>
          </div>

          <p className="projects-subtitle">
            Web app dan digital product yang sedang dibuat. Nanti tinggal ganti template ini dengan hasil jadi.
          </p>

          <div className="projects-list">
            {siteConfig.projects.map((item) => (
              <article className="project-card" key={item.number}>
                <div className="project-card-top">
                  <span className="project-number">{item.number}</span>
                  <span className="project-status">{item.status}</span>
                </div>
                <div className="project-card-body">
                  <span className="project-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                {item.url ? (
                  <a className="project-link" href={item.url} target="_blank" rel="noopener noreferrer">
                    <span>Open web app</span><span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="project-link is-disabled">
                    <span>Coming soon</span><span aria-hidden="true">→</span>
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        <aside className="thinking-quotes" aria-label="Prinsip berpikir JRH">
          <article className="thinking-quote-card">
            <span className="thinking-quote-kicker">01 / SYSTEMS THINKING</span>
            <strong>BERPIKIR SEPERTI MESIN EKONOMI</strong>
            <p>lihat dunia sebagai sistem. segala peristiwa saling berkaitan dan berulang. pahami pola, bukan hanya kejadian sesaat.</p>
          </article>
          <article className="thinking-quote-card">
            <span className="thinking-quote-kicker">02 / DECISION MAKING</span>
            <strong>GABUNGKAN DATA DAN INTUISI</strong>
            <p>gunakan data dan sistem algoritma, tapi jangan buang intuisi manusia. gabungkan keduanya untuk pengambilan keputusan terbaik.</p>
          </article>
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
                <label className="contact-field contact-topic">
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
                  <span>Saya menyetujui penggunaan data yang saya berikan untuk keperluan membalas pesan ini.</span>
                </label>
                <button type="submit">✈ <span>Buka Email Saya</span> <span aria-hidden="true">→</span></button>
              </div>

              <div className="contact-benefits" aria-label="Contact benefits">
                <span aria-label="Cepat" title="Cepat">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4.5 13h6l-.5 9L19.5 11h-6L13 2Z" /></svg>
                </span>
                <span aria-label="Aman" title="Aman">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
                </span>
                <span aria-label="Langsung ke email" title="Langsung ke email">
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
            <span className="footer-kicker">JRH / 2026</span>
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
