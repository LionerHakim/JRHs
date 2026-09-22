import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FocusEvent, FormEvent, RefObject } from 'react'
import { createRoot } from 'react-dom/client'
import { siteConfig } from './config/site'

type TermsCheckboxProps = {
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  termsOpen: boolean
  onTermsToggle: () => void
  id?: string
  inputRef?: RefObject<HTMLInputElement | null>
}

function TermsCheckbox({
  checked,
  onChange,
  onBlur,
  invalid = false,
  required = false,
  disabled = false,
  termsOpen,
  onTermsToggle,
  id = 'terms-checkbox',
  inputRef,
}: TermsCheckboxProps) {
  const popoverId = id + '-details'

  return (
    <div className={"terms-checkbox" + (disabled ? ' is-disabled' : '')}>
      <label className="terms-checkbox-label" htmlFor={id}>
        <input
          id={id}
          ref={inputRef}
          className="terms-checkbox-input"
          type="checkbox"
          required={required}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={invalid}
          aria-describedby={termsOpen ? popoverId : undefined}
        />
        <span className="terms-checkbox-box" aria-hidden="true">
          <svg viewBox="0 0 20 20">
            <path d="m4.5 10.2 3.4 3.4 7.6-7.6" />
          </svg>
        </span>
        <span className="terms-checkbox-text">Saya setuju dan memahami S&K.</span>
      </label>

      <button
        className="terms-checkbox-info"
        type="button"
        aria-label="Lihat syarat dan ketentuan"
        aria-expanded={termsOpen}
        aria-controls={popoverId}
        disabled={disabled}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onTermsToggle()
        }}
      >
        i
      </button>

      {termsOpen ? (
        <div id={popoverId} className="terms-checkbox-popover" role="dialog" aria-label="Syarat dan ketentuan">
          <div className="terms-checkbox-popover-head">
            <strong>Syarat & Ketentuan</strong>
            <button className="terms-checkbox-close" type="button" aria-label="Tutup syarat dan ketentuan" onClick={onTermsToggle}>×</button>
          </div>
          <p>Dengan mencentang kotak ini, Anda menyetujui penggunaan data yang diberikan untuk keperluan menyiapkan dan membalas pesan melalui email. Jangan mengirim data sensitif, rahasia, atau informasi yang tidak diperlukan.</p>
          <p>Website hanya menyiapkan draft email pada aplikasi email perangkat Anda. Pengiriman pesan tetap dilakukan oleh Anda.</p>
        </div>
      ) : null}
    </div>
  )
}

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

const contactTopics = ['Pertanyaan umum', 'Kolaborasi', 'Project', 'Bisnis', 'Investasi', 'Akademik', 'Feedback', 'Relationships', 'Tambah teman'] as const

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
  const viewportRef = useRef<HTMLDivElement>(null)
  const resumeTimerRef = useRef<number | null>(null)
  const userInteractingRef = useRef(false)
  const activeInViewRef = useRef(false)
  const autoSlideTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || testimonials.length < 2) return

    const getStep = () => {
      const firstCard = viewport.querySelector<HTMLElement>('.testimonial')
      if (!firstCard) return viewport.clientWidth
      const gap = Number.parseFloat(window.getComputedStyle(firstCard.parentElement as Element).gap) || 0
      return firstCard.getBoundingClientRect().width + gap
    }

    const clearAutoSlide = () => {
      if (autoSlideTimerRef.current) {
        window.clearTimeout(autoSlideTimerRef.current)
        autoSlideTimerRef.current = null
      }
    }

    const scheduleAutoSlide = () => {
      clearAutoSlide()
      if (!activeInViewRef.current || userInteractingRef.current || document.hidden) return
      autoSlideTimerRef.current = window.setTimeout(() => {
        autoSlideTimerRef.current = null
        if (!activeInViewRef.current || userInteractingRef.current || document.hidden) return

        const maxScroll = viewport.scrollWidth - viewport.clientWidth
        if (maxScroll <= 0) return
        const next = Math.min(viewport.scrollLeft + getStep(), maxScroll)
        viewport.scrollTo({ left: next >= maxScroll - 4 ? 0 : next, behavior: 'smooth' })
        scheduleAutoSlide()
      }, 1500)
    }

    const pauseForUser = () => {
      userInteractingRef.current = true
      clearAutoSlide()
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = window.setTimeout(() => {
        userInteractingRef.current = false
        scheduleAutoSlide()
      }, 1500)
    }

    const handlePointerDown = () => pauseForUser()
    const handleWheel = () => pauseForUser()
    const handleTouchStart = () => pauseForUser()

    const observer = new IntersectionObserver(([entry]) => {
      activeInViewRef.current = entry.isIntersecting
      if (entry.isIntersecting) scheduleAutoSlide()
      else clearAutoSlide()
    }, { threshold: 0.25 })

    observer.observe(viewport)
    viewport.addEventListener('pointerdown', handlePointerDown, { passive: true })
    viewport.addEventListener('wheel', handleWheel, { passive: true })
    viewport.addEventListener('touchstart', handleTouchStart, { passive: true })

    return () => {
      clearAutoSlide()
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
      observer.disconnect()
      viewport.removeEventListener('pointerdown', handlePointerDown)
      viewport.removeEventListener('wheel', handleWheel)
      viewport.removeEventListener('touchstart', handleTouchStart)
    }
  }, [testimonials.length])

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
      <div ref={viewportRef} className="testimonials-viewport" aria-label="Koleksi quotes yang dapat digeser">
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
  const [darkMode, setDarkMode] = useState(() => window.sessionStorage.getItem('jrhs-theme') === 'dark')
  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')
  const [message, setMessage] = useState('')
  const [privacy, setPrivacy] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [topicOpen, setTopicOpen] = useState(false)
  const [contactStatus, setContactStatus] = useState<string | null>(null)
  const [contactError, setContactError] = useState<string | null>(null)
  const privacyInputRef = useRef<HTMLInputElement>(null)
  const contactPrivacyRef = useRef<HTMLDivElement>(null)
  const contactTopicRef = useRef<HTMLDivElement>(null)
  const navActionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
    window.sessionStorage.setItem('jrhs-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id as (typeof sectionIds)[number])
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0.1, 0.35, 0.6] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); setMusicOpen(false); setTermsOpen(false); setTopicOpen(false) }
    }
    const onPointer = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (!navActionsRef.current?.contains(target)) { setMenuOpen(false); setMusicOpen(false) }
      if (!contactPrivacyRef.current?.contains(target)) setTermsOpen(false)
      if (!contactTopicRef.current?.contains(target)) setTopicOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer) }
  }, [])

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setContactError(null); setContactStatus(null)
    if (!name.trim()) return setContactError('Nama belum diisi.')
    if (!purpose) { setTopicOpen(true); return setContactError('Silakan pilih topik terlebih dahulu.') }
    if (!message.trim()) return setContactError('Pesan belum diisi.')
    if (!privacy) { setContactError('Centang persetujuan S&K untuk melanjutkan.'); privacyInputRef.current?.focus(); return }
    const subject = encodeURIComponent('[JRH] ' + purpose)
    const body = encodeURIComponent('Halo JRH,\n\nNama: ' + name.trim() + '\n\nTopik: ' + purpose + '\n\nPesan:\n' + message.trim() + '\n\nDikirim melalui https://jrhsee.my.id\n\nTerima kasih,\n' + name.trim())
    window.location.href = 'mailto:' + siteConfig.contactEmail + '?subject=' + subject + '&body=' + body
    setContactStatus('Draft email sudah disiapkan. Tinggal klik Kirim di aplikasi email Anda.')
  }

  return (
    <div className={'site-shell' + (menuOpen ? ' menu-open' : '') + (musicOpen ? ' music-open' : '')}>
      <div className='jrh-ambient' aria-hidden='true' />
      <a className='skip-link' href='#identity'>Lewati ke konten utama</a>
      <header className='nav'>
        <a className='wordmark' href='#identity' aria-label='JRH home'>
          <img className='wordmark-logo' src='/assets/images/logo.png' alt='JRH' />
          <span className='wordmark-copy'><strong>JRH</strong><small>PORTFOLIO</small></span>
        </a>
        <div className='nav-actions' ref={navActionsRef}>
          <button className={'nav-action music-toggle' + (musicOpen ? ' is-open' : '')} type='button' aria-expanded={musicOpen} onClick={() => { setMusicOpen((v) => !v); setMenuOpen(false) }}>
            <span className='nav-action-glyph'>♪</span><span className='nav-action-label'>Sound</span><span className='nav-action-meta'>PLAY</span>
          </button>
          <button className={'nav-action menu-toggle' + (menuOpen ? ' is-open' : '')} type='button' aria-expanded={menuOpen} onClick={() => { setMenuOpen((v) => !v); setMusicOpen(false) }}>
            <span className='nav-menu-lines'><span /><span /><span /></span><span className='nav-action-label'>Explore</span><span className='nav-action-meta'>{menuOpen ? 'CLOSE' : 'MENU'}</span>
          </button>
          <nav id='primary-navigation' className={menuOpen ? 'is-open' : undefined} aria-label='Primary navigation'>
            <div className='menu-panel-head'><div><span>JRH / EXPLORE</span><strong>{sectionItems.find(([id]) => id === activeSection)?.[1] ?? 'About'}</strong></div><span className='menu-panel-count'>{String(sectionItems.length).padStart(2, '0')} AREAS</span></div>
            <div className='menu-panel-grid'>
              {sectionItems.map(([id, label], index) => <a key={id} href={'#' + id} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}><span className='menu-item-index'>{String(index + 1).padStart(2, '0')}</span><span className='menu-item-label'>{label}</span><span className='menu-item-arrow'>↗</span></a>)}
            </div>
            <div className='menu-panel-foot'><span>JRH</span><span>Build quietly. Ship boldly.</span></div>
          </nav>
          <aside id='music-panel' className={musicOpen ? 'music-panel is-open' : 'music-panel'} aria-label='Music player'>
            <div className='music-panel-head'><div><span className='music-eyebrow'>JRH / SOUND</span><strong>Soundtrack</strong></div><span className='music-status'>READY</span></div>
            <div className='music-track'><div className='music-track-art'>♪</div><div className='music-track-copy'><strong>JRH playlist</strong><span>Use the current player experience.</span></div></div>
          </aside>
        </div>
      </header>

      <main data-ui-level='hydra'>
        <section id='identity' className='hero hydra-hero' aria-labelledby='identity-title'>
          <div className='hero-copy'>
            <p className='hero-eyebrow'>EXPLORE · LEARN · BUILD · REPEAT</p>
            <h1 id='identity-title'>BUILD.<br /><span>THINK.</span><br />CREATE.</h1>
            <p className='hero-description'>{siteConfig.identity.description} Saya menggabungkan ekonomi, teknologi, investasi, media, dan eksperimen digital ke dalam satu ruang.</p>
            <div className='hero-actions'><a className='hero-pill' href='#projects'>Explore projects <span>→</span></a><a className='ghost-pill' href='#links'>Contact <span>↗</span></a></div>
            <div className='hero-stats'><span><b>05</b><small>MEDIA CHANNELS</small></span><span><b>03</b><small>PRODUCTS IN BUILD</small></span><span><b>∞</b><small>IDEAS IN MOTION</small></span></div>
          </div>
          <figure className='hero-portrait'><div className='portrait-orbit' /><div className='portrait-frame'><img src={siteConfig.identity.profileImage} alt={siteConfig.identity.name} width='640' height='800' fetchPriority='high' /></div><figcaption><span>JRH / 2026</span><strong>Independent digital builder</strong></figcaption></figure>
        </section>

        <section id='education' className='section hydra-section' aria-labelledby='education-title'>
          <div className='section-head'><p className='section-kicker'>01 / FOUNDATION</p><h2 id='education-title'>Education<br /><em>&amp; experience</em></h2><p>Fondasi akademik dan organisasi yang membentuk cara kerja JRH.</p></div>
          <div className='records hydra-records'>{siteConfig.education.map((item) => <article className='record' key={item.period + item.institution}><time>{item.period}</time><div><h3>{item.institution}</h3><ul className='record-activities'>{item.program !== 'SMA' && item.program !== 'SMP' ? <li>{item.program}</li> : null}{item.activities?.map((activity) => <li key={activity}>{activity}</li>)}</ul></div><span className='record-arrow'>↗</span></article>)}</div>
        </section>

        <section id='media' className='section hydra-section media-section' aria-labelledby='media-title'>
          <div className='section-head split-head'><div><p className='section-kicker'>02 / PRESENCE</p><h2 id='media-title'>Media<br /><em>in motion.</em></h2></div><p>Kanal digital tempat ide, visual, video, dan eksperimen JRH berjalan.</p></div>
          <div className='media-list hydra-media'>{siteConfig.media.map((item) => <article className='media-card' key={item.number}><div className='media-card-top'><span className='media-number'>{item.number}</span><span className='media-status'>{item.platform}</span></div><div className='media-card-body'><span className='media-category'>{item.category}</span><h3>{item.title}</h3><div className='media-links'>{item.links.map((link) => <a key={link.label} href={link.url} target='_blank' rel='noopener noreferrer'><span>{link.label}</span><span>↗</span></a>)}</div></div></article>)}</div>
        </section>

        <section id='projects' className='section hydra-section projects-section' aria-labelledby='projects-title'>
          <div className='section-head split-head'><div><p className='section-kicker'>03 / PRODUCTS</p><h2 id='projects-title'>Things<br /><em>being built.</em></h2></div><p>Produk digital yang dikembangkan dari masalah nyata menjadi pengalaman yang sederhana.</p></div>
          <div className='projects-list hydra-projects'>{siteConfig.projects.map((item) => <article className='project-card' key={item.number}><div className='project-visual'><span>{item.number}</span><i /></div><div className='project-card-body'><span className='project-category'>{item.category}</span><h3>{item.title}</h3><p>{item.description}</p><span className='project-status'>{item.status}</span></div><span className='project-link'>↗</span></article>)}</div>
        </section>

        <aside className='thinking-quotes hydra-thinking' aria-label='Prinsip berpikir JRH'><article className='thinking-quote-card'><span className='thinking-quote-kicker'>SYSTEMS THINKING</span><strong>SEE THE SYSTEM,<br />NOT JUST THE EVENT.</strong><p>Gunakan data, pola, dan konteks untuk memahami apa yang sebenarnya bergerak di balik sebuah keputusan.</p></article><article className='thinking-quote-card'><span className='thinking-quote-kicker'>DECISION MAKING</span><strong>DATA FIRST.<br />HUMAN ALWAYS.</strong><p>Algoritma membantu membaca sinyal. Manusia tetap menentukan makna, arah, dan konsekuensinya.</p></article></aside>
        <TestimonialsSection />

        <section id='links' className='section hydra-section contact-section' aria-labelledby='links-title'>
          <div className='section-head split-head'><div><p className='section-kicker'>04 / CONNECTION</p><h2 id='links-title'>Let’s build<br /><em>something real.</em></h2></div><p>Untuk project, kolaborasi, bisnis, atau sekadar percakapan baru.</p></div>
          <div className='contact-card hydra-contact'>
            <div className='contact-intro'><p className='contact-question'>Tell me what you are building.</p><p className='contact-answer'>Ide yang jelas, pesan yang ringkas, lalu kita lihat ke mana arahnya.</p><p className='contact-note'>contact@jrhsee.my.id</p></div>
            <form className='contact-form' onSubmit={handleContactSubmit} noValidate>
              <div className='contact-fields'>
                <label className='contact-field'><span className='contact-icon'>01</span><input aria-label='Nama kamu' required value={name} onChange={(e) => setName(e.target.value)} placeholder='Nama kamu' /></label>
                <div className='contact-field contact-topic' ref={contactTopicRef}><span className='contact-icon'>02</span><button className='contact-topic-trigger' type='button' aria-expanded={topicOpen} onClick={() => setTopicOpen((v) => !v)}><span>{purpose || 'Pilih topik'}</span><span>⌄</span></button>{topicOpen ? <div className='contact-topic-menu' role='listbox'>{contactTopics.map((item) => <button key={item} type='button' role='option' onClick={() => { setPurpose(item); setTopicOpen(false) }}><span>{item}</span><span>{purpose === item ? '✓' : ''}</span></button>)}</div> : null}</div>
                <label className='contact-field contact-message'><span className='contact-icon'>03</span><textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Tulis pesan kamu...' rows={6} /><span className='contact-counter'>{message.trim() ? message.trim().split(/\s+/).length : 0}/169</span></label>
              </div>
              {contactError ? <p className='contact-feedback is-error'>{contactError}</p> : null}{contactStatus ? <p className='contact-feedback is-success'>{contactStatus}</p> : null}
              <div className='contact-submit'><div className='contact-privacy' ref={contactPrivacyRef}><TermsCheckbox checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} required termsOpen={termsOpen} onTermsToggle={() => setTermsOpen((v) => !v)} inputRef={privacyInputRef} /></div><button type='submit'><span>Open email</span> →</button></div>
            </form>
          </div>
        </section>
      </main>

      <div className='floating-utilities'><button className='theme-toggle-floating' type='button' aria-label='Toggle theme' onClick={() => setDarkMode((v) => !v)}>{darkMode ? '☀' : '☾'}</button><a className='back-to-top' href='#identity' aria-label='Kembali ke atas'>↑</a></div>
      <footer className='site-footer hydra-footer'><div className='site-footer-main'><div className='site-footer-brand'><img src='/assets/images/logo.png' alt='' /><strong>JRH</strong><span>INDEPENDENT DIGITAL BUILDER</span></div><nav className='site-footer-nav'>{sectionItems.map(([id, label]) => <a key={id} href={'#' + id}>{label.toUpperCase()}</a>)}</nav><div className='footer-orbit'>JRH / 2026</div></div><div className='site-footer-bottom'><span>© 2026 JRH</span><span>EXPLORE · LEARN · BUILD</span></div></footer>
    </div>
  )
}
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('JRH root element not found')
createRoot(rootElement).render(<App />)
