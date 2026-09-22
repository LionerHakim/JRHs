import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { siteConfig } from './config/site'
import './index.css'

const navItems = [
  ['about', 'About'],
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
] as const

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('jrhs-theme') === 'dark')
  const [soundOpen, setSoundOpen] = useState(false)
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    localStorage.setItem('jrhs-theme', dark ? 'dark' : 'light')
  }, [dark])

  const go = (id: string) => {
    setMenuOpen(false)
    setSoundOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setStatus('')
    if (!name.trim()) return setError('Nama belum diisi.')
    if (!topic) return setError('Pilih topik terlebih dahulu.')
    if (!message.trim()) return setError('Pesan belum diisi.')
    if (!agreed) return setError('Centang persetujuan sebelum mengirim.')

    const subject = encodeURIComponent('[JRH] ' + topic)
    const body = encodeURIComponent(
      'Halo JRH,\n\nNama: ' + name.trim() +
      '\nTopik: ' + topic +
      '\n\nPesan:\n' + message.trim() +
      '\n\nDikirim melalui https://jrhsee.my.id'
    )
    window.location.href = 'mailto:' + siteConfig.contactEmail + '?subject=' + subject + '&body=' + body
    setStatus('Draft email sudah disiapkan. Tinggal klik Kirim di aplikasi email Anda.')
  }

  return (
    <div className="site">
      <header className="navbar">
        <button className="brand" onClick={() => go('about')} aria-label="JRH home">
          <img src="/assets/images/logo.png" alt="JRH" />
          <span>JRH<span className="brand-dot">.</span></span>
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {navItems.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>

        <div className="nav-tools">
          <button className="tool-button" onClick={() => setSoundOpen(v => !v)} aria-expanded={soundOpen}>♫ <span>Sound</span></button>
          <button className="tool-button" onClick={() => setDark(v => !v)} aria-label="Toggle theme">{dark ? '☀' : '◐'}</button>
          <button className="menu-button" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            <span /><span />
          </button>
        </div>

        {soundOpen && (
          <div className="sound-popover">
            <span className="eyebrow">JRH / SOUND</span>
            <strong>Sound is optional.</strong>
            <p>Website tetap fokus pada karya dan informasi. Audio player dapat ditambahkan saat track final sudah siap.</p>
          </div>
        )}
      </header>

      <main>
        <section id="about" className="hero section-wrap">
          <div className="hero-copy">
            <span className="eyebrow">JEFri RAHMAN HAKIM · 2026</span>
            <h1>Ideas into<br /><i>things.</i></h1>
            <p className="hero-lead">
              Ruang digital untuk eksperimen, karya, media, dan project yang sedang saya bangun.
              Saya menggabungkan ekonomi, teknologi, investasi, dan kreativitas ke dalam satu proses.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => go('projects')}>View projects <span>↗</span></button>
              <button className="text-button" onClick={() => go('contact')}>Get in touch <span>→</span></button>
            </div>
            <div className="hero-meta">
              <span><b>01</b> Economics</span>
              <span><b>02</b> Digital projects</span>
              <span><b>03</b> Media & research</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-card">
              <img src={siteConfig.identity.profileImage} alt={siteConfig.identity.name} />
              <div className="portrait-caption">
                <span>JRH / PROFILE</span>
                <strong>Independent builder</strong>
              </div>
            </div>
            <div className="visual-note">BUILD<br />QUIETLY.</div>
          </div>
        </section>

        <section className="intro section-wrap">
          <span className="eyebrow">ABOUT</span>
          <div className="intro-grid">
            <h2>A personal<br /><i>working space.</i></h2>
            <div>
              <p>JRH adalah ruang untuk mendokumentasikan proses: apa yang dipelajari, apa yang dibuat, dan apa yang sedang diuji.</p>
              <div className="link-row">
                <a href="https://github.com/LionerHakim" target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href="mailto:contact@jrhsee.my.id">Email ↗</a>
                <a href="https://jrhsee.my.id" target="_blank" rel="noreferrer">jrhsee.my.id ↗</a>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section-wrap section-block">
          <div className="section-heading">
            <div><span className="eyebrow">01 / PROJECTS</span><h2>What I'm<br /><i>building.</i></h2></div>
            <p>Beberapa produk dan eksperimen digital yang sedang dikembangkan.</p>
          </div>
          <div className="project-grid">
            {siteConfig.projects.map((project) => (
              <article className="project" key={project.number}>
                <div className="project-index">{project.number}</div>
                <div className="project-body">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <small>{project.status}</small>
                </div>
                <span className="project-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section-wrap section-block">
          <div className="section-heading">
            <div><span className="eyebrow">02 / EXPERIENCE</span><h2>Where it<br /><i>started.</i></h2></div>
            <p>Fondasi akademik, organisasi, dan kanal digital yang membentuk perjalanan JRH.</p>
          </div>

          <div className="timeline">
            {siteConfig.education.map((item) => (
              <article className="timeline-item" key={item.period + item.institution}>
                <time>{item.period}</time>
                <div>
                  <h3>{item.institution}</h3>
                  <strong>{item.program}</strong>
                  {item.activities?.length ? <ul>{item.activities.map(activity => <li key={activity}>{activity}</li>)}</ul> : null}
                </div>
              </article>
            ))}
          </div>

          <div className="media-strip">
            <div className="media-strip-head"><span className="eyebrow">MEDIA</span><span>05 CHANNELS</span></div>
            <div className="media-grid">
              {siteConfig.media.map(item => (
                <article key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <small>{item.category}</small>
                  <div>{item.links.map(link => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="principles section-wrap">
          <div><span className="eyebrow">WORKING PRINCIPLES</span><h2>Think clearly.<br /><i>Make simply.</i></h2></div>
          <p>Data helps me understand the system. Design helps me communicate it. Building turns an idea into something people can actually use.</p>
        </section>

        <section id="contact" className="section-wrap contact-section">
          <div className="contact-copy">
            <span className="eyebrow">03 / CONTACT</span>
            <h2>Have something<br /><i>in mind?</i></h2>
            <p>Untuk pertanyaan, kolaborasi, project, bisnis, akademik, atau sekadar ingin terhubung.</p>
            <a href="mailto:contact@jrhsee.my.id">contact@jrhsee.my.id ↗</a>
          </div>
          <form className="contact-form" onSubmit={submit}>
            <label>Name<input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" /></label>
            <label>Topic<select value={topic} onChange={e => setTopic(e.target.value)}><option value="">Choose a topic</option><option>Kolaborasi</option><option>Project</option><option>Bisnis</option><option>Akademik</option><option>Pertanyaan umum</option><option>Feedback</option></select></label>
            <label>Message<textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell me a little about it..." rows={5} /></label>
            <label className="check"><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} /><span>Saya setuju data ini digunakan untuk menyiapkan balasan email.</span></label>
            {error && <p className="form-message error">{error}</p>}
            {status && <p className="form-message success">{status}</p>}
            <button className="primary-button submit" type="submit">Prepare email <span>↗</span></button>
          </form>
        </section>
      </main>

      <footer className="footer section-wrap">
        <div><strong>JRH<span className="brand-dot">.</span></strong><span>Independent digital portfolio</span></div>
        <nav>{navItems.map(([id, label]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav>
        <small>© 2026 Jefri Rahman Hakim</small>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
