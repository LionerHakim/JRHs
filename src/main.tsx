import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { siteConfig } from './config/site'
import { TermsCheckbox } from './components/contact/TermsCheckbox'
import { TestimonialsSection } from './components/testimonials/TestimonialsSection'
import { useTheme } from './hooks/useTheme'
import { useMusicPlayer } from './hooks/useMusicPlayer'

import './index.css'
import './styles/portal-2100.css'

import { sectionItems, sectionIds, musicTracks, contactTopics } from './config/ui'

export default function App() {
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>('identity')
  const scrollProgressRef = useRef<HTMLSpanElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [musicOpen, setMusicOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  useTheme()
  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')
  const [message, setMessage] = useState('')
  const [privacy, setPrivacy] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [topicOpen, setTopicOpen] = useState(false)
  const [contactStatus, setContactStatus] = useState<string | null>(null)
  const [contactHoneypot, setContactHoneypot] = useState('')
  const [contactError, setContactError] = useState<string | null>(null)
  const [touched, setTouched] = useState({ name: false, message: false, privacy: false })
  const navActionsRef = useRef<HTMLDivElement>(null)
  const contactPrivacyRef = useRef<HTMLDivElement>(null)
  const privacyInputRef = useRef<HTMLInputElement>(null)
  const contactTopicRef = useRef<HTMLDivElement>(null)
  const contactStartedAtRef = useRef(Date.now())



  const {
    musicAudioRef,
    musicIndex,
    musicPlaying,
    musicProgress,
    musicDuration,
    musicStatus,
    loadAndPlayMusic,
    toggleMusicPlayback,
    changeMusicTrack,
  } = useMusicPlayer({ musicOpen })



  useEffect(() => {
    let frame = 0

    const updateScrollState = () => {
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        frame = 0

        const { scrollY } = window
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const progress = maxScroll > 0
          ? Math.min(100, Math.max(0, (scrollY / maxScroll) * 100))
          : 0

        const progressBar = scrollProgressRef.current
        if (progressBar) {
          progressBar.style.transform = `scaleX(${progress / 100})`
        }

        setShowBackToTop((visible) => {
          const nextVisible = scrollY > Math.max(480, window.innerHeight * 0.65)
          return visible === nextVisible ? visible : nextVisible
        })
      })
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const shouldLockScroll = menuOpen || musicOpen
    document.documentElement.dataset.overlayOpen = shouldLockScroll ? 'true' : 'false'
    document.body.style.overflow = shouldLockScroll ? 'hidden' : ''

    if (!menuOpen && !musicOpen && !termsOpen && !topicOpen) {
      return () => {
        document.documentElement.dataset.overlayOpen = 'false'
        document.body.style.overflow = ''
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setMusicOpen(false)
        setTermsOpen(false)
        setTopicOpen(false)
      }
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Node) {
        if (!navActionsRef.current?.contains(target)) {
          setMenuOpen(false)
          setMusicOpen(false)
        }
        if (!contactPrivacyRef.current?.contains(target)) {
          setTermsOpen(false)
        }
        if (!contactTopicRef.current?.contains(target)) {
          setTopicOpen(false)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.documentElement.dataset.overlayOpen = 'false'
      document.body.style.overflow = ''
    }
  }, [menuOpen, musicOpen, termsOpen, topicOpen])

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('main > .section, .thinking-quote-card, .contact-card'))
    if (!targets.length || !('IntersectionObserver' in window)) return

    targets.forEach((target) => target.classList.add('jrh-reveal'))

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

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

    const elapsed = Date.now() - contactStartedAtRef.current
    if (contactHoneypot.trim() || elapsed < 1500) {
      setContactError('Permintaan tidak dapat diproses. Silakan coba lagi secara normal.')
      return
    }
    setContactStatus(null)
    setTouched({ name: true, message: true, privacy: true })

    if (!name.trim()) return setContactError('Nama belum diisi.')
    if (!purpose) {
      setTopicOpen(true)
      return setContactError('Silakan pilih topik terlebih dahulu.')
    }

    if (!message.trim()) return setContactError('Pesan belum diisi.')
    if (!privacy) {
      setContactError('Centang persetujuan S&K untuk melanjutkan.')
      privacyInputRef.current?.focus()
      return
    }

    const subject = encodeURIComponent(`[JRH] ${purpose || 'Pesan dari website'}`)
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
    setPrivacy(false)
    setContactHoneypot('')
    contactStartedAtRef.current = Date.now()
    setTermsOpen(false)
    setTouched((current) => ({ ...current, privacy: false }))
  }

  return (
    <div className={`site-shell${menuOpen ? " menu-open" : ""}${musicOpen ? " music-open" : ""}`}>
      <div className="scroll-progress" aria-hidden="true"><span ref={scrollProgressRef} /></div>
      <a className="skip-link" href="#identity">Lewati ke konten utama</a>
      <header className="nav">
        <a className="wordmark" href="#identity" aria-label="JRH home">
          <img className="wordmark-logo" src="/assets/images/logo.png" alt="JRH" decoding="async" />
        </a>
        <div className="nav-actions" ref={navActionsRef}>
          <button
            className={`nav-action music-toggle${musicOpen ? ' is-open' : ''}${musicPlaying ? ' is-playing' : ''}`}
            type="button"
            aria-expanded={musicOpen}
            aria-controls="music-panel"
            aria-label={musicPlaying ? 'Music sedang diputar' : (musicOpen ? 'Tutup music player' : 'Buka music player')}
            onClick={() => { setMusicOpen((open) => !open); setMenuOpen(false) }}
          >
            <span className="nav-action-glyph music-toggle-icon" aria-hidden="true">{musicPlaying ? <i className="music-icon-bars"><b /><b /><b /></i> : '♪'}</span>
            <span className="nav-action-label">Music</span>
            
          </button>

          <button
            className={`nav-action menu-toggle${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={() => { setMenuOpen((open) => !open); setMusicOpen(false) }}
          >
            <span className="nav-menu-lines" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span className="nav-action-label">Menu</span>
            <span className="nav-action-meta" aria-hidden="true">{menuOpen ? 'CLOSE' : 'OPEN'}</span>
          </button>

          <nav id="primary-navigation" className={menuOpen ? 'is-open' : undefined} aria-label="Primary navigation" aria-hidden={!menuOpen}>
            <div className="menu-panel-head">
              <div>
                <span>JRH / NAVIGATION</span>
                <strong>{sectionItems.find(([id]) => id === activeSection)?.[1] ?? 'Explore JRH'}</strong>
              </div>
              <span className="menu-panel-count">{String(sectionItems.length).padStart(2, '0')} SECTIONS</span>
            </div>
            <div className="menu-panel-grid">
              {sectionItems.map(([id, label], index) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? 'location' : undefined}
                tabIndex={menuOpen ? 0 : -1}
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
              <span>Currently viewing · {activeSection.toUpperCase()}</span>
            </div>
          </nav>

          <aside id="music-panel" className={musicOpen ? 'music-panel is-open' : 'music-panel'} aria-label="Music player" aria-hidden={!musicOpen}>
            <div className="music-panel-head">
              <div>
                <span className="music-eyebrow">JRH / SOUND</span>
                <strong>Music Player</strong>
              </div>
              <span className="music-status" aria-live="polite" aria-atomic="true">{musicStatus}</span>
            </div>
            <div className="music-track">
              <div className="music-track-art" aria-hidden="true">♪</div>
              <div className="music-track-copy">
                <strong>{musicTracks[musicIndex].title}</strong>
                <span>{musicTracks[musicIndex].artist}</span>
              </div>
            </div>
            <div
              className="music-progress"
              role="progressbar"
              aria-label="Track progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={musicDuration ? Math.min(100, (musicProgress / musicDuration) * 100) : 0}
            >
              <span style={{ width: musicDuration ? `${Math.min(100, (musicProgress / musicDuration) * 100)}%` : '0%' }} />
            </div>
            <div className="music-controls" aria-label="Music controls">
              <button type="button" tabIndex={musicOpen ? 0 : -1} aria-label="Previous track" onClick={() => changeMusicTrack(-1)}>‹‹</button>
              <button
                className="music-play"
                type="button"
                tabIndex={musicOpen ? 0 : -1}
                aria-label={musicPlaying ? 'Pause' : 'Play'}
                aria-pressed={musicPlaying}
                onClick={toggleMusicPlayback}
              >
                {musicPlaying ? 'Ⅱ' : '▶'}
              </button>
              <button type="button" tabIndex={musicOpen ? 0 : -1} aria-label="Next track" onClick={() => changeMusicTrack(1)}>››</button>
            </div>

            <div className="music-playlist" aria-label="Playlist">
              <div className="music-playlist-head">
                <span>PLAYLIST</span>
                <strong>9 TRACKS · 3 VISIBLE</strong>
              </div>
              <div className="music-playlist-list">
                {musicTracks.map((track, index) => (
                  <button
                    key={track.file}
                    type="button"
                    tabIndex={musicOpen ? 0 : -1}
                    className={`music-playlist-item${musicIndex === index ? ' is-active' : ''}`}
                    aria-current={musicIndex === index ? 'true' : undefined}
                    onClick={() => loadAndPlayMusic(index)}
                  >
                    <span className="music-playlist-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="music-playlist-copy">
                      <strong>{track.title}</strong>
                      <span>{track.artist}</span>
                    </span>
                    <span className="music-playlist-state" aria-hidden="true">
                      {musicIndex === index && musicPlaying ? '♪' : '▶'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <audio ref={musicAudioRef} preload="none" aria-hidden="true" />
          </aside>
        </div>
      </header>

      <main>
        <section id="identity" className="hero" data-experience="anchor" aria-labelledby="identity-title">
          <div className="hero-copy">
            <h1 id="identity-title">{siteConfig.identity.headline}</h1>
            <p className="hero-description">{siteConfig.identity.description}</p>
            <div className="hero-actions">
              <a className="hero-pill" href="#media">Explore media</a>
              <a className="ghost-pill" href="#links">Contact</a>
            </div>
            <div className="hero-meta" aria-label="JRH availability">
              <span className="availability-dot" aria-hidden="true"></span>
              <span>{siteConfig.identity.statusLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{siteConfig.identity.locationLabel}</span>
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
                decoding="async"
              />
            </div>
          </figure>

        </section>

        <section id="education" className="section experience-section" data-section="education" aria-labelledby="education-title">
          <div className="section-head">
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

        <section id="media" className="section media-section experience-section" data-section="media" aria-labelledby="media-title">
          <div className="section-head">
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

        <section id="projects" className="section projects-section experience-section" data-section="projects" aria-labelledby="projects-title">
          <div className="section-head">
            <h2 id="projects-title">Projects</h2>
          </div>

          <p className="projects-subtitle">
Web app dan digital product yang sedang dibangun untuk memecahkan masalah nyata.
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
                {'url' in item && item.url ? (
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

        <section id="links" className="section contact-section experience-section" data-section="contact" aria-labelledby="links-title">
          <div className="section-head">
            <h2 id="links-title">Contact</h2>
          </div>

          <div className="contact-card">
            <div className="contact-intro">
              <p className="contact-question">Punya sesuatu yang ingin diwujudkan?</p>
              <p className="contact-answer">Ide baru? Project menarik? Mau kolaborasi? Atau cuma mau ngobrol?</p>
              <p className="contact-note">Terbuka untuk ide, kolaborasi, dan percakapan baru.</p>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="contact-honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={contactHoneypot}
                  onChange={(event) => setContactHoneypot(event.target.value)}
                />
              </div>

              <div className="contact-fields">
                <label className="contact-field">
                  <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.25" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></svg></span>
                  <input aria-label="Nama kamu" required maxLength={120} value={name} onChange={(event) => setName(event.target.value)} onBlur={() => setTouched((current) => ({ ...current, name: true }))} aria-invalid={touched.name && !name.trim()} placeholder="Nama kamu" autoComplete="name" />
                </label>
                <div className="contact-field contact-topic" ref={contactTopicRef}>
                  <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 7h14M5 12h14M5 17h9" /></svg></span>
                  <button
                    className={`contact-topic-trigger${topicOpen ? ' is-open' : ''}`}
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={topicOpen}
                    aria-controls="contact-topic-options"
                    aria-label="Topik email (wajib)"
                    onClick={() => setTopicOpen((open) => !open)}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault()
                        setTopicOpen(true)
                        requestAnimationFrame(() => {
                          contactTopicRef.current
                            ?.querySelector<HTMLButtonElement>('[role="option"]')
                            ?.focus()
                        })
                      } else if (event.key === 'Escape' && topicOpen) {
                        event.preventDefault()
                        setTopicOpen(false)
                      }
                    }}
                  >
                    <span>{purpose || 'Pilih topik'}</span>
                    <span className="contact-topic-chevron" aria-hidden="true">⌄</span>
                  </button>
                  {topicOpen ? (
                    <div id="contact-topic-options" className="contact-topic-menu" role="listbox" aria-label="Pilih topik email">
                      {contactTopics.map((item) => (
                        <button
                          key={item}
                          type="button"
                          role="option"
                          aria-selected={purpose === item}
                          className={purpose === item ? 'is-selected' : undefined}
                          onClick={() => { setPurpose(item); setTopicOpen(false) }}
                          onKeyDown={(event) => {
                            const options = Array.from(
                              event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? [],
                            )
                            const currentIndex = options.indexOf(event.currentTarget)
                            const focusOption = (nextIndex: number) => {
                              options[(nextIndex + options.length) % options.length]?.focus()
                            }

                            if (event.key === 'ArrowDown') {
                              event.preventDefault()
                              focusOption(currentIndex + 1)
                            } else if (event.key === 'ArrowUp') {
                              event.preventDefault()
                              focusOption(currentIndex - 1)
                            } else if (event.key === 'Home') {
                              event.preventDefault()
                              focusOption(0)
                            } else if (event.key === 'End') {
                              event.preventDefault()
                              focusOption(options.length - 1)
                            } else if (event.key === 'Escape') {
                              event.preventDefault()
                              setTopicOpen(false)
                              contactTopicRef.current?.querySelector<HTMLButtonElement>('.contact-topic-trigger')?.focus()
                            } else if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              setPurpose(item)
                              setTopicOpen(false)
                              contactTopicRef.current?.querySelector<HTMLButtonElement>('.contact-topic-trigger')?.focus()
                            }
                          }}
                        >
                          <span>{item}</span>
                          <span aria-hidden="true">{purpose === item ? '✓' : ''}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
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
                <div className="contact-privacy" ref={contactPrivacyRef}>
                  <TermsCheckbox
                    checked={privacy}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPrivacy(event.target.checked)}
                    onBlur={() => setTouched((current) => ({ ...current, privacy: true }))}
                    invalid={touched.privacy && !privacy}
                    required
                    termsOpen={termsOpen}
                    onTermsToggle={() => setTermsOpen((open) => !open)}
                    inputRef={privacyInputRef}
                  />
                </div>
                <button type="submit">✈ <span>Buka Email Saya</span> <span aria-hidden="true">→</span></button>
              </div>

              <div className="contact-benefits" aria-label="Contact benefits">
                <span aria-label="Cepat" title="Cepat">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4.5 13h6l-.5 9L19.5 11h-6L13 2Z" /></svg>
                </span>
                <span aria-label="Privat" title="Privat">
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

      <div className="floating-utilities" aria-label="Pengaturan tampilan">
        <a
          className={`back-to-top${showBackToTop ? ' is-visible' : ''}`}
          href="#identity"
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
          tabIndex={showBackToTop ? 0 : -1}
          aria-hidden={!showBackToTop}
          onClick={(event) => {
            event.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span aria-hidden="true">↑</span><span>TOP</span>
        </a>
      </div>

      <footer className="site-footer" id="site-footer">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <a className="site-footer-logo-link" href="#identity" aria-label="Kembali ke JRH home">
              <img className="site-footer-logo" src="/assets/images/logo.png" alt="JRH" decoding="async" />
            </a>
            <strong>JRH</strong>
            <a className="site-footer-email" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          </div>

          <nav className="site-footer-nav" aria-label="Footer navigation">
            {sectionItems.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? 'location' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="site-footer-bottom">
          <span>© 2026 JRH</span>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            aria-label={`Kirim email ke ${siteConfig.contactEmail}`}
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('JRH root element not found')
createRoot(rootElement).render(<App />)
