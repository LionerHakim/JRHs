import { FormEvent, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { siteConfig } from './config/site'
import './index.css'

const sectionItems = [
  ['identity', 'About'],
  ['education', 'Education'],
  ['projects', 'Projects'],
  ['links', 'Contact'],
] as const

const sectionIds = sectionItems.map(([id]) => id)

export default function App() {
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>('identity')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [purpose, setPurpose] = useState('')
  const [message, setMessage] = useState('')
  const [privacy, setPrivacy] = useState(false)
  const [contactStatus, setContactStatus] = useState<string | null>(null)
  const [contactError, setContactError] = useState<string | null>(null)

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

    if (!name.trim()) return setContactError('Nama belum diisi.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setContactError('Emailnya belum valid.')
    if (!purpose) return setContactError('Silakan pilih topik dulu.')
    if (!message.trim()) return setContactError('Pesannya masih kosong.')
    if (!privacy) return setContactError('Centang persetujuan privasi dulu.')

    const subject = encodeURIComponent(`[JRHs Contact] ${purpose}`)
    const body = encodeURIComponent(`Halo JRHs,

Saya ingin menghubungi terkait:

Nama:
${name.trim()}

Email:
${email.trim()}

Topik:
${purpose}

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
      <header className="nav">
        <a className="wordmark" href="#identity" aria-label="JRH home">
          <span className="brand-mark" aria-hidden="true">J</span>
          <span>JRH</span>
        </a>

        <nav aria-label="Primary navigation">
          {sectionItems.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? 'page' : undefined}
              className={activeSection === id ? 'is-active' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="identity" className="hero" aria-labelledby="identity-title">
          <div className="hero-copy">
            <p className="section-kicker">PORTFOLIO</p>
            <h1 id="identity-title">{siteConfig.identity.name}</h1>
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
            <figcaption className="portrait-quote">
              <strong>BERPIKIR SEPERTI MESIN EKONOMI</strong>
              <p>lihat dunia sebagai sistem. segala peristiwa saling berkaitan dan berulang. pahami pola, bukan hanya kejadian sesaat.</p>
            </figcaption>
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
                  {item.program !== 'SMA' && item.program !== 'SMP' ? <p>— {item.program}</p> : null}
                  {item.activities?.length ? (
                    <ul className="record-activities" aria-label="Activities and roles">
                      {item.activities.map((activity) => (
                        <li key={activity}>— {activity}</li>
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

        <section id="links" className="section contact-section" aria-labelledby="links-title">
          <div className="section-head">
            <p className="section-kicker">CONTACT</p>
            <h2 id="links-title">Contact</h2>
          </div>

          <div className="contact-card">
            <div className="contact-intro">
              <p className="contact-question">Ada yang mau dibahas?</p>
              <p className="contact-answer">Punya pertanyaan, ide, project, peluang kolaborasi, atau sekadar mau ngobrol?</p>
              <p className="contact-note">Tulis aja. Saya siapkan emailnya. Anda tinggal cek dan klik Kirim.</p>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="contact-fields">
                <label className="contact-field">
                  <span className="contact-icon" aria-hidden="true">♙</span>
                  <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nama lengkap" autoComplete="name" />
                </label>
                <label className="contact-field">
                  <span className="contact-icon" aria-hidden="true">✉</span>
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="email@saya.com" autoComplete="email" />
                </label>
                <label className="contact-field">
                  <span className="contact-icon" aria-hidden="true">☰</span>
                  <select value={purpose} onChange={(event) => setPurpose(event.target.value)}>
                    <option value="">Pilih topik</option>
                    {['Pertanyaan umum', 'Kolaborasi', 'Project', 'Bisnis', 'Investasi', 'Akademik', 'Feedback', 'Lainnya'].map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </label>
                <label className="contact-field contact-message">
                  <span className="contact-icon" aria-hidden="true">💬</span>
                  <textarea value={message} onChange={(event) => setMessage(event.target.value.slice(0, 1000))} placeholder="Tulis pesan Anda di sini..." maxLength={1000} rows={5} />
                  <span className="contact-counter">{message.length}/1000</span>
                </label>
              </div>

              {contactError ? <p className="contact-feedback is-error" role="alert">{contactError}</p> : null}
              {contactStatus ? <p className="contact-feedback is-success" role="status">{contactStatus}<span>Aplikasi email Anda akan terbuka. Tinggal cek pesannya, lalu klik Kirim.</span></p> : null}

              <div className="contact-submit">
                <label className="contact-privacy">
                  <input type="checkbox" checked={privacy} onChange={(event) => setPrivacy(event.target.checked)} />
                  <span>Saya setuju dengan kebijakan privasi</span>
                </label>
                <button type="submit">✈ <span>Buka Email Saya</span> <span aria-hidden="true">→</span></button>
              </div>

              <div className="contact-benefits" aria-label="Contact benefits">
                <span>⚡ <strong>Cepat</strong> <small>Langsung ke email</small></span>
                <span>🔒 <strong>Privasi</strong> <small>Data tetap aman</small></span>
                <span>♡ <strong>Mudah</strong> <small>Tinggal isi &amp; kirim</small></span>
              </div>

              <div className="contact-email-info">
                <span className="contact-email-icon" aria-hidden="true">✉</span>
                <div>
                  <strong>Email akan terbuka dengan format yang sudah disiapkan.</strong>
                  <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <strong>JRH</strong>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('JRH root element not found')
createRoot(rootElement).render(<App />)
