import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { siteConfig } from './config/site'
import './index.css'

const menu = [
  ['about', 'About'],
  ['work', 'Work'],
  ['record', 'Record'],
  ['contact', 'Contact'],
] as const

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('jrhs-theme') === 'dark')
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [agree, setAgree] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    localStorage.setItem('jrhs-theme', dark ? 'dark' : 'light')
  }, [dark])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice('')
    setError('')
    if (!name.trim()) return setError('Nama belum diisi.')
    if (!topic) return setError('Pilih topik.')
    if (!message.trim()) return setError('Pesan belum diisi.')
    if (!agree) return setError('Centang persetujuan terlebih dahulu.')

    const subject = encodeURIComponent('[JRH] ' + topic)
    const body = encodeURIComponent(
      'Halo JRH,\n\nNama: ' + name.trim() +
      '\nTopik: ' + topic +
      '\n\nPesan:\n' + message.trim() +
      '\n\nDikirim melalui https://jrhsee.my.id'
    )
    window.location.href = 'mailto:' + siteConfig.contactEmail + '?subject=' + subject + '&body=' + body
    setNotice('Draft email sudah disiapkan di aplikasi email Anda.')
  }

  return (
    <div className="jrhs-app">
      <header className="topbar">
        <button className="brand" onClick={() => scrollTo('about')} aria-label="JRH home">
          <img src="/assets/images/logo.png" alt="JRH" />
          <span>JRH<em>/</em>SEE</span>
        </button>

        <div className="topbar-center">PERSONAL PORTFOLIO / 2026</div>

        <div className="topbar-actions">
          <button className="theme" onClick={() => setDark(v => !v)} aria-label="Ganti tema">{dark ? 'LIGHT' : 'DARK'}</button>
          <button className="menu-trigger" onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen}>
            <span>{menuOpen ? 'CLOSE' : 'MENU'}</span><i><b /><b /></i>
          </button>
        </div>

        {menuOpen && (
          <nav className="menu-drawer" aria-label="Navigation">
            {menu.map(([id, label], index) => (
              <button key={id} onClick={() => scrollTo(id)}>
                <small>0{index + 1}</small><strong>{label}</strong><span>↗</span>
              </button>
            ))}
          </nav>
        )}
      </header>

      <aside className="side-rail" aria-hidden="true">
        <span>JRH / 2026</span><i /><span>INDONESIA</span>
      </aside>

      <main>
        <section id="about" className="hero">
          <div className="hero-index">00 — INTRODUCTION</div>
          <div className="hero-main">
            <p className="overline">JEFri RAHMAN HAKIM · ECONOMICS · DIGITAL WORK</p>
            <h1>Making<br /><span>ideas</span><br />visible<span className="mark">.</span></h1>
            <div className="hero-bottom">
              <p>{siteConfig.identity.description} Sebuah ruang personal untuk karya, eksperimen digital, media, pembelajaran, dan project yang sedang dibangun.</p>
              <div className="hero-links">
                <button onClick={() => scrollTo('work')}>Explore work <span>↓</span></button>
                <a href="mailto:contact@jrhsee.my.id">contact@jrhsee.my.id ↗</a>
              </div>
            </div>
          </div>
          <div className="hero-photo">
            <div className="photo-frame"><img src={siteConfig.identity.profileImage} alt={siteConfig.identity.name} /></div>
            <div className="photo-label"><span>JRH — PROFILE</span><b>BUILD / LEARN / REPEAT</b></div>
          </div>
          <div className="hero-scroll">SCROLL TO EXPLORE ↓</div>
        </section>

        <section className="statement section" aria-label="About JRH">
          <div className="section-no">01</div>
          <div className="statement-content">
            <p className="overline">A LITTLE CONTEXT</p>
            <h2>Not a finished story.<br /><i>A work in progress.</i></h2>
            <div className="statement-copy">
              <p>JRH menggabungkan latar ekonomi dengan ketertarikan pada teknologi, investasi, media, dan produk digital. Website ini berfungsi sebagai arsip hidup—tempat proses lebih penting daripada sekadar hasil akhir.</p>
              <div className="mini-facts">
                <div><strong>ECONOMICS</strong><span>Academic foundation</span></div>
                <div><strong>PRODUCT</strong><span>Digital experiments</span></div>
                <div><strong>MEDIA</strong><span>Publishing & channels</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="work section">
          <div className="section-no">02</div>
          <div className="work-content">
            <div className="section-title">
              <div><p className="overline">SELECTED WORK</p><h2>Things<br /><i>in motion.</i></h2></div>
              <p>Produk yang lahir dari kebutuhan sederhana: membuat sesuatu lebih berguna, lebih mudah, atau lebih jelas.</p>
            </div>
            <div className="work-list">
              {siteConfig.projects.map((project, index) => (
                <article className="work-item" key={project.number}>
                  <div className="work-number">0{index + 1}</div>
                  <div className="work-info">
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <div className="work-status">{project.status}<b>↗</b></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="record" className="record section">
          <div className="section-no">03</div>
          <div className="record-content">
            <div className="section-title">
              <div><p className="overline">RECORD / EDUCATION</p><h2>Where the<br /><i>work began.</i></h2></div>
              <p>Perjalanan akademik dan organisasi yang menjadi fondasi cara berpikir dan cara bekerja.</p>
            </div>
            <div className="record-list">
              {siteConfig.education.map((item) => (
                <article key={item.period + item.institution}>
                  <time>{item.period}</time>
                  <div><h3>{item.institution}</h3><strong>{item.program}</strong>{item.activities?.map(activity => <span key={activity}>{activity}</span>)}</div>
                  <b>↗</b>
                </article>
              ))}
            </div>

            <div className="channels">
              <div className="channels-head"><p className="overline">04 / CHANNELS</p><span>PUBLIC PRESENCE</span></div>
              <div className="channel-list">
                {siteConfig.media.map(item => (
                  <article key={item.number}>
                    <small>{item.number}</small>
                    <div><h3>{item.title}</h3><span>{item.category}</span></div>
                    <div className="channel-links">{item.links.map(link => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-mark">“</div>
          <p>Build things that make the next step easier.</p>
          <span>JRH / WORKING NOTE</span>
        </section>

        <section id="contact" className="contact section">
          <div className="section-no">05</div>
          <div className="contact-grid">
            <div>
              <p className="overline">LET'S TALK</p>
              <h2>Have an idea?<br /><i>Let's make it real.</i></h2>
              <p className="contact-text">Terbuka untuk kolaborasi, project, bisnis, akademik, feedback, atau percakapan yang relevan.</p>
              <a className="email-link" href="mailto:contact@jrhsee.my.id">contact@jrhsee.my.id ↗</a>
            </div>
            <form onSubmit={submit}>
              <label><span>01 / NAME</span><input value={name} onChange={e => setName(e.target.value)} placeholder="Nama kamu" /></label>
              <label><span>02 / TOPIC</span><select value={topic} onChange={e => setTopic(e.target.value)}><option value="">Pilih topik</option><option>Kolaborasi</option><option>Project</option><option>Bisnis</option><option>Akademik</option><option>Pertanyaan umum</option><option>Feedback</option></select></label>
              <label><span>03 / MESSAGE</span><textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Ceritakan sedikit..." rows={5} /></label>
              <label className="consent"><input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} /><span>Saya setuju data ini digunakan untuk menyiapkan balasan email.</span></label>
              {error && <p className="form-alert error">{error}</p>}
              {notice && <p className="form-alert success">{notice}</p>}
              <button className="send" type="submit">PREPARE EMAIL <span>↗</span></button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div><strong>JRH<span>.</span></strong><small>PERSONAL DIGITAL ARCHIVE</small></div>
        <div className="footer-links">
          <a href="https://github.com/LionerHakim" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="mailto:contact@jrhsee.my.id">Email ↗</a>
          <a href="https://jrhsee.my.id" target="_blank" rel="noreferrer">Website ↗</a>
        </div>
        <small>© 2026 Jefri Rahman Hakim</small>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
