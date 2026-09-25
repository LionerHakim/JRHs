import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { siteConfig } from './config/site'
import { TermsCheckbox } from './components/contact/TermsCheckbox'
import { TestimonialsSection } from './components/testimonials/TestimonialsSection'
import { useTheme } from './hooks/useTheme'
import { useMusicPlayer } from './hooks/useMusicPlayer'

import './index.css'

import { sectionItems, sectionIds, musicTracks, contactTopics } from './config/ui'

type MenuIconId = 'identity' | 'projects' | 'education' | 'media' | 'testimonials' | 'contact'

const MenuIcon = ({ id }: { id: MenuIconId }) => {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  const shapes: Record<MenuIconId, ReactNode> = {
    identity: <><circle cx="12" cy="8" r="3" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>,
    projects: <><path d="M4 7.5h16" /><path d="M5.5 7.5V6.2A2.2 2.2 0 0 1 7.7 4h8.6a2.2 2.2 0 0 1 2.2 2.2v1.3" /><rect x="3.5" y="7.5" width="17" height="12" rx="2.2" /></>,
    education: <><rect x="5" y="6" width="14" height="14" rx="2.2" /><path d="M8 6V4h8v2M8.5 10h7M8.5 14h7M8.5 18h4" /></>,
    media: <><rect x="4" y="5" width="16" height="14" rx="2.2" /><circle cx="9" cy="10" r="1.3" /><path d="m6.5 16 3.5-3 2.3 2 2.7-3 2.5 4" /></>,
    testimonials: <><path d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v10A1.5 1.5 0 0 1 18 17.5h-7L7 20v-2.5H6A1.5 1.5 0 0 1 4.5 16V6A1.5 1.5 0 0 1 6 4.5Z" /><path d="M8 8h8M8 11.5h6M8 15h4" /></>,
    contact: <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /><path d="M4 7V5.5A1.5 1.5 0 0 1 5.5 4H8M4 17v1.5A1.5 1.5 0 0 0 5.5 20H8" /></>,
  }
  return <svg {...common}>{shapes[id]}</svg>
}

type ControlIconName = 'shuffle' | 'previous' | 'next' | 'repeat' | 'volume'

const ControlIcon = ({ name }: { name: ControlIconName }) => {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  const paths: Record<ControlIconName, ReactNode> = {
    shuffle: <><path d="M16 3h4v4" /><path d="m20 3-5.5 5.5a4 4 0 0 1-5.7 0L6 5" /><path d="M4 19h4l10-10" /><path d="M16 17h4v4" /></>,
    previous: <><path d="M6 5v14" /><path d="m18 6-8 6 8 6V6Z" /></>,
    next: <><path d="M18 5v14" /><path d="m6 6 8 6-8 6V6Z" /></>,
    repeat: <><path d="M17 2l3 3-3 3" /><path d="M4 12V9a3 3 0 0 1 3-3h13" /><path d="m7 22-3-3 3-3" /><path d="M20 12v3a3 3 0 0 1-3 3H4" /></>,
    volume: <><path d="M4 10v4h4l5 4V6l-5 4H4Z" /><path d="M17 9a5 5 0 0 1 0 6" /><path d="M19.5 6.5a8.5 8.5 0 0 1 0 11" /></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}


export default function App() {
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>('identity')
  const scrollProgressRef = useRef<HTMLSpanElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [musicOpen, setMusicOpen] = useState(false)
  const [menuQuery, setMenuQuery] = useState('')
  const [musicVolume, setMusicVolume] = useState(() => {
    try {
      const stored = Number(window.localStorage.getItem('jrhs:music-volume'))
      return Number.isFinite(stored) ? Math.min(1, Math.max(0, stored)) : 0.8
    } catch {
      return 0.8
    }
  })
  const [musicShuffle, setMusicShuffle] = useState(false)
  const [musicRepeat, setMusicRepeat] = useState(false)
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
  const [touched, setTouched] = useState({ name: false, message: false, privacy: false, purpose: false })
  const navActionsRef = useRef<HTMLDivElement>(null)
  const menuPanelRef = useRef<HTMLElement>(null)
  const musicPanelRef = useRef<HTMLElement>(null)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const musicToggleRef = useRef<HTMLButtonElement>(null)
  const contactPrivacyRef = useRef<HTMLDivElement>(null)
  const privacyInputRef = useRef<HTMLInputElement>(null)
  const contactTopicRef = useRef<HTMLDivElement>(null)
  const contactStartedAtRef = useRef(Date.now())
  const previousMenuOpenRef = useRef(false)
  const previousMusicOpenRef = useRef(false)

  const menuSubtitles: Record<(typeof sectionItems)[number][0], string> = {
    identity: 'Tentang saya',
    projects: 'Karya dan proyek',
    education: 'Rekam jejak dan pengalaman',
    media: 'Konten dan publikasi',
    testimonials: 'Pemikiran dan tulisan',
    contact: 'Hubungi JRH',
  }

  const normalizedMenuQuery = menuQuery.trim().toLocaleLowerCase('id-ID')
  const filteredSectionItems = sectionItems.filter(([id, label]) => {
    if (!normalizedMenuQuery) return true
    return `${label} ${menuSubtitles[id]}`.toLocaleLowerCase('id-ID').includes(normalizedMenuQuery)
  })

  const formatMusicTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '00:00'
    const minutes = Math.floor(seconds / 60)
    const remainder = Math.floor(seconds % 60)
    return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
  }

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
  } = useMusicPlayer({ musicOpen, repeat: musicRepeat, shuffle: musicShuffle })

  useEffect(() => {
    const audio = musicAudioRef.current
    if (audio) audio.volume = musicVolume
    try {
      window.localStorage.setItem('jrhs:music-volume', String(musicVolume))
    } catch {
      // Storage can be unavailable in restricted browsing contexts.
    }
  }, [musicVolume, musicAudioRef])

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
    if (menuOpen) {
      requestAnimationFrame(() => document.getElementById('menu-section-search')?.focus())
    } else if (previousMenuOpenRef.current && !musicOpen) {
      menuToggleRef.current?.focus()
    }
    previousMenuOpenRef.current = menuOpen
  }, [menuOpen, musicOpen])

  useEffect(() => {
    if (!musicOpen) {
      if (previousMusicOpenRef.current && !menuOpen) musicToggleRef.current?.focus()
      previousMusicOpenRef.current = false
      return
    }
    previousMusicOpenRef.current = true
    requestAnimationFrame(() => {
      musicPanelRef.current?.querySelector<HTMLButtonElement>('.panel-close')?.focus()
    })
  }, [musicOpen, menuOpen])

  useEffect(() => {
    const activePanel = menuOpen ? menuPanelRef.current : musicOpen ? musicPanelRef.current : null
    if (!activePanel) return

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusable = Array.from(
        activePanel.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hidden && !element.hasAttribute('inert'))

      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [menuOpen, musicOpen])

  useEffect(() => {
    const handleMenuShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setMusicOpen(false)
        setMenuOpen(true)
      }
    }

    document.addEventListener('keydown', handleMenuShortcut)
    return () => document.removeEventListener('keydown', handleMenuShortcut)
  }, [])

  useEffect(() => {
    const shouldLockScroll = menuOpen || musicOpen
    const previousOverflow = document.body.style.overflow
    document.documentElement.dataset.overlayOpen = shouldLockScroll ? 'true' : 'false'
    document.body.style.overflow = shouldLockScroll ? 'hidden' : ''

    const page = document.querySelector('main')
    const footer = document.getElementById('site-footer')
    ;[page, footer].forEach((element) => {
      if (element) element.inert = shouldLockScroll
    })

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
        if (
          !navActionsRef.current?.contains(target) &&
          !menuPanelRef.current?.contains(target) &&
          !musicPanelRef.current?.contains(target)
        ) {
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
      document.body.style.overflow = previousOverflow
      ;[page, footer].forEach((element) => {
        if (element) element.inert = false
      })
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
    setTouched({ name: true, message: true, privacy: true, purpose: true })

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
    setTouched((current) => ({ ...current, privacy: false, purpose: false }))
  }

  return (
    <div className={`site-shell${menuOpen ? " menu-open" : ""}${musicOpen ? " music-open" : ""}`}>
      <div className="scroll-progress" aria-hidden="true"><span ref={scrollProgressRef} /></div>
      <a className="skip-link" href="#identity" tabIndex={menuOpen || musicOpen ? -1 : 0}>Lewati ke konten utama</a>
      <header className="nav">
        <a className="wordmark" href="#identity" aria-label="JRH home">
          <span className="wordmark-mark" aria-hidden="true">JRH</span>
        </a>
        <div className="nav-actions" ref={navActionsRef}>
          <button
            ref={musicToggleRef}
            className={`nav-action music-toggle${musicOpen ? ' is-open' : ''}${musicPlaying ? ' is-playing' : ''}`}
            type="button"
            aria-expanded={musicOpen}
            aria-controls="music-panel"
            aria-label={musicPlaying ? 'Music sedang diputar' : (musicOpen ? 'Tutup music player' : 'Buka music player')}
            onClick={() => { setMenuOpen(false); setMusicOpen((open) => !open) }}
          >
            <span className="nav-action-glyph music-toggle-icon" aria-hidden="true">{musicPlaying ? <i className="music-icon-bars"><b /><b /><b /></i> : '♪'}</span>
            <span className="nav-action-label">Music</span>
            
          </button>

          <button
            ref={menuToggleRef}
            className={`nav-action menu-toggle${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={() => { setMusicOpen(false); setMenuOpen((open) => !open) }}
          >
            <span className="nav-menu-lines" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span className="nav-action-label">Menu</span>
            <span className="nav-action-meta" aria-hidden="true">{menuOpen ? 'CLOSE' : 'OPEN'}</span>
          </button>

        </div>
      </header>

          <nav ref={menuPanelRef} id="primary-navigation" className={menuOpen ? 'menu-panel is-open' : 'menu-panel'} aria-label="Primary navigation" aria-hidden={!menuOpen} inert={!menuOpen}>
            <div className="menu-panel-head">
              <div>
                <span>Navigate through JRH</span>
                <strong>Menu</strong>
              </div>
              <div className="menu-panel-head-actions">
                <span className="menu-panel-count">{String(sectionItems.length).padStart(2, '0')} SECTIONS</span>
                <button className="panel-close" type="button" tabIndex={menuOpen ? 0 : -1} aria-label="Tutup menu" onClick={() => setMenuOpen(false)}>×</button>
              </div>
            </div>

            <label className="panel-search">
              <span aria-hidden="true">⌕</span>
              <input
                id="menu-section-search"
                type="search"
                value={menuQuery}
                onChange={(event) => setMenuQuery(event.target.value)}
                placeholder="Search section…"
                aria-label="Cari section"
                tabIndex={menuOpen ? 0 : -1}
              />
              <kbd>Ctrl / ⌘ K</kbd>
            </label>

            <div className="menu-panel-grid">
              {filteredSectionItems.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? 'location' : undefined}
                tabIndex={menuOpen ? 0 : -1}
                className={activeSection === id ? 'is-active' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <span className="menu-item-icon"><MenuIcon id={id} /></span>
                <span className="menu-item-index" aria-hidden="true">{String(sectionItems.findIndex(([sectionId]) => sectionId === id) + 1).padStart(2, '0')}</span>
                <span className="menu-item-copy">
                  <strong>{label}</strong>
                  <small>{menuSubtitles[id]}</small>
                </span>
                <span className="menu-item-arrow" aria-hidden="true">→</span>
              </a>
              ))}
              {!filteredSectionItems.length ? <div className="menu-empty">Tidak ada section yang cocok.</div> : null}
            </div>
            <div className="menu-panel-foot">
              <span>JRH</span>
              <span>Currently viewing · {activeSection.toUpperCase()}</span>
            </div>
          </nav>

          <aside ref={musicPanelRef} id="music-panel" className={musicOpen ? 'music-panel is-open' : 'music-panel'} aria-label="Music player" aria-hidden={!musicOpen} inert={!musicOpen}>
            <div className="music-panel-head">
              <div>
                <span className="music-eyebrow">Playlist for your focus</span>
                <strong>Music</strong>
              </div>
              <div className="music-panel-head-actions">
                <span className="music-status" aria-live="polite" aria-atomic="true">{musicStatus}</span>
                <button className="panel-close" type="button" tabIndex={musicOpen ? 0 : -1} aria-label="Tutup music player" onClick={() => setMusicOpen(false)}>×</button>
              </div>
            </div>

            <div className="music-now-playing">
              <div className="music-track-art" aria-hidden="true"><span>♪</span></div>
              <div className="music-track-copy">
                <span className="music-now-badge"><i /> NOW PLAYING</span>
                <strong>{musicTracks[musicIndex].title}</strong>
                <span>{musicTracks[musicIndex].artist}</span>
                <div className="music-time">
                  <span>{formatMusicTime(musicProgress)}</span>
                  <span>/ {formatMusicTime(musicDuration)}</span>
                </div>
              </div>
            </div>

            <div
              className="music-progress"
              role="slider"
              tabIndex={musicOpen ? 0 : -1}
              aria-label="Track progress"
              aria-orientation="horizontal"
              aria-valuemin={0}
              aria-valuemax={musicDuration || 1}
              aria-valuenow={musicDuration ? Math.min(musicDuration, musicProgress) : 0}
              aria-valuetext={`${formatMusicTime(musicProgress)} / ${formatMusicTime(musicDuration)}`}
              onClick={(event) => {
                const audio = musicAudioRef.current
                if (!audio || !musicDuration) return
                const rect = event.currentTarget.getBoundingClientRect()
                audio.currentTime = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)) * musicDuration
              }}
              onKeyDown={(event) => {
                const audio = musicAudioRef.current
                if (!audio || !musicDuration) return
                if (event.key === 'ArrowRight') {
                  event.preventDefault()
                  audio.currentTime = Math.min(musicDuration, audio.currentTime + 5)
                } else if (event.key === 'ArrowLeft') {
                  event.preventDefault()
                  audio.currentTime = Math.max(0, audio.currentTime - 5)
                } else if (event.key === 'Home') {
                  event.preventDefault()
                  audio.currentTime = 0
                } else if (event.key === 'End') {
                  event.preventDefault()
                  audio.currentTime = musicDuration
                }
              }}
            >
              <span style={{ width: musicDuration ? `${Math.min(100, (musicProgress / musicDuration) * 100)}%` : '0%' }} />
            </div>

            <div className="music-controls" aria-label="Music controls">
              <button
                className={musicShuffle ? 'is-mode-active' : undefined}
                type="button"
                tabIndex={musicOpen ? 0 : -1}
                aria-label={musicShuffle ? 'Matikan shuffle' : 'Aktifkan shuffle'}
                aria-pressed={musicShuffle}
                onClick={() => setMusicShuffle((enabled) => !enabled)}
              >
                <ControlIcon name="shuffle" />
              </button>
              <button type="button" tabIndex={musicOpen ? 0 : -1} aria-label="Previous track" onClick={() => changeMusicTrack(-1)}><ControlIcon name="previous" /></button>
              <button className="music-play" type="button" tabIndex={musicOpen ? 0 : -1} aria-label={musicPlaying ? 'Pause' : 'Play'} aria-pressed={musicPlaying} onClick={toggleMusicPlayback}>
                {musicPlaying ? 'Ⅱ' : '▶'}
              </button>
              <button type="button" tabIndex={musicOpen ? 0 : -1} aria-label="Next track" onClick={() => changeMusicTrack(1)}><ControlIcon name="next" /></button>
              <button
                className={musicRepeat ? 'is-mode-active' : undefined}
                type="button"
                tabIndex={musicOpen ? 0 : -1}
                aria-label={musicRepeat ? 'Matikan repeat' : 'Aktifkan repeat'}
                aria-pressed={musicRepeat}
                onClick={() => setMusicRepeat((enabled) => !enabled)}
              >
                <ControlIcon name="repeat" />
              </button>
            </div>

            <div className="music-playlist" aria-label="Playlist">
              <div className="music-playlist-head">
                <span><span className="playlist-glyph" aria-hidden="true">☷</span> PLAYLIST · {musicTracks.length} TRACKS</span>
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
                    <span className="music-playlist-art" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span></span>
                    <span className="music-playlist-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="music-playlist-copy">
                      <strong>{track.title}</strong>
                      <span>{track.artist}</span>
                    </span>
                    <span className="music-playlist-state" aria-hidden="true">{musicIndex === index && musicPlaying ? '♪' : '▶'}</span>
                  </button>
                ))}
              </div>
            </div>

            <label className="music-volume">
              <span className="music-volume-icon"><ControlIcon name="volume" /></span>
              <input type="range" min="0" max="1" step="0.01" value={musicVolume} onChange={(event) => setMusicVolume(Number(event.target.value))} aria-label="Volume" tabIndex={musicOpen ? 0 : -1} />
              <span>{Math.round(musicVolume * 100)}%</span>
            </label>

            <audio ref={musicAudioRef} preload="none" aria-hidden="true" />
          </aside>



      <main>
        <section id="identity" className="hero" aria-labelledby="identity-title">
          <div className="hero-copy">
            <h1 id="identity-title">{siteConfig.identity.headline}</h1>
            <p className="hero-description">{siteConfig.identity.description}</p>
            <div className="hero-actions">
              <a className="hero-pill" href="#media">Explore media</a>
              <a className="ghost-pill" href="#contact">Contact</a>
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
                sizes="(max-width: 600px) 82vw, 410px"
              />
            </div>
          </figure>

        </section>

        <section id="projects" className="section projects-section" data-section="projects" aria-labelledby="projects-title">
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

        <section id="education" className="section" data-section="education" aria-labelledby="education-title">
          <div className="section-head">
            <h2 id="education-title">Experience</h2>
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

        <section id="media" className="section media-section" data-section="media" aria-labelledby="media-title">
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

        <aside className="thinking-quotes" aria-label="Prinsip berpikir JRH" tabIndex={0}>
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

        <section id="contact" className="section contact-section" data-section="contact" aria-labelledby="contact-title">
          <div className="section-head">
            <h2 id="contact-title">Contact</h2>
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
                  <input id="contact-name" name="name" aria-label="Nama kamu" required maxLength={120} value={name} onChange={(event) => setName(event.target.value)} onBlur={() => setTouched((current) => ({ ...current, name: true }))} aria-invalid={touched.name && !name.trim()} placeholder="Nama kamu" autoComplete="name" />
                </label>
                <div className="contact-field contact-topic" ref={contactTopicRef}>
                  <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 7h14M5 12h14M5 17h9" /></svg></span>
                  <button
                    className={`contact-topic-trigger${topicOpen ? ' is-open' : ''}`}
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={topicOpen}
                    aria-required="true"
                    aria-controls="contact-topic-options"
                    aria-label="Topik email (wajib)"
                    aria-invalid={touched.purpose && !purpose}
                    onClick={() => setTopicOpen((open) => !open)}
                    onBlur={() => setTouched((current) => ({ ...current, purpose: true }))}
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
                          onClick={() => { setPurpose(item); setTouched((current) => ({ ...current, purpose: true })); setTopicOpen(false) }}
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
                              setTouched((current) => ({ ...current, purpose: true }))
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
                  <textarea id="contact-message" name="message" aria-label="Pesan kamu" required value={message} onChange={(event) => {
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
                <button type="submit" aria-label="Buka aplikasi email untuk mengirim pesan">✈ <span>Buka Email Saya</span> <span aria-hidden="true">→</span></button>
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
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
          }}
        >
          <span aria-hidden="true">↑</span><span>TOP</span>
        </a>
      </div>

      <footer className="site-footer" id="site-footer">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <strong>JRH</strong>
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
        </div>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('JRH root element not found')

const renderBootFailure = () => {
  rootElement.innerHTML = `
    <div class="jrh-boot" role="alert">
      <div>
        JRH
        <small>Halaman gagal dimuat. Silakan muat ulang halaman.</small>
      </div>
    </div>
  `
}

try {
  createRoot(rootElement).render(<App />)
  rootElement.dataset.jrhMounted = 'true'
} catch (error) {
  console.error('[JRH] React boot failed:', error)
  renderBootFailure()
}
