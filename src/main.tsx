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
        <div id={popoverId} className="terms-checkbox-popover" role="dialog" aria-modal="true" aria-label="Syarat dan ketentuan">
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

const musicTracks = [
  { title: '123456', artist: 'Budi Doremi', file: '123456 Budi Doremi.mp3' },
  { title: 'Akad', artist: 'Payung Teduh', file: 'Akad.mp3' },
  { title: 'Bahtera Mahligai Cinta', artist: 'Ajeng Febria, Gerry Mahesa', file: 'Bahtera Mahligai Cinta.mp3' },
  { title: 'Ngertenono Ati', artist: 'NDX A.K.A.', file: 'Ngertenono Ati.mp3' },
  { title: 'PICA PICA', artist: 'Juan Reza', file: 'PICA PICA.mp3' },
  { title: 'Tak Ada Ujungnya', artist: 'Rony Parulian', file: 'Tak Ada Ujungnya.mp3' },
  { title: 'Tewas Tertimbun Masa Lalu', artist: 'NDX A.K.A.', file: 'Tewas Tertimbun Masa Lalu.mp3' },
  { title: 'Tresno Tekan Mati', artist: 'NDX A.K.A.', file: 'Tresno Tekan Mati.mp3' },
  { title: 'Who Knows', artist: 'Daniel Caesar', file: 'Who Knows.mp3' },
].map((track) => ({
  ...track,
  src: '/assets/music/' + encodeURIComponent(track.file),
}));

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

function TestimonialsSection() {
  const testimonials = siteConfig.testimonials
  const viewportRef = useRef<HTMLDivElement>(null)
  const resumeTimerRef = useRef<number | null>(null)
  const userInteractingRef = useRef(false)
  const activeInViewRef = useRef(false)
  const autoSlideTimerRef = useRef<number | null>(null)
  const [testimonialActiveIndex, setTestimonialActiveIndex] = useState(0)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || testimonials.length < 2) return

    const getCards = () => Array.from(viewport.querySelectorAll<HTMLElement>('.testimonial'))

    const getTargetLeft = (card: HTMLElement) => {
      const viewportRect = viewport.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()
      const paddingLeft = Number.parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0
      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth)
      const target = viewport.scrollLeft + cardRect.left - viewportRect.left - paddingLeft
      return Math.min(Math.max(target, 0), maxScroll)
    }

    const getNearestIndex = () => {
      const cards = getCards()
      if (!cards.length) return 0

      let nearestIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY
      cards.forEach((card, index) => {
        const distance = Math.abs(viewport.scrollLeft - getTargetLeft(card))
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = index
        }
      })
      return nearestIndex
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

        const cards = getCards()
        const currentIndex = getNearestIndex()
        const nextIndex = currentIndex >= cards.length - 1 ? 0 : currentIndex + 1
        const targetCard = cards[nextIndex]
        if (targetCard) {
          viewport.scrollTo({ left: getTargetLeft(targetCard), behavior: 'smooth' })
        }
        scheduleAutoSlide()
      }, 3500)
    }

    const pauseForUser = () => {
      userInteractingRef.current = true
      clearAutoSlide()
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = window.setTimeout(() => {
        userInteractingRef.current = false
        scheduleAutoSlide()
      }, 1800)
    }

    const updateActiveIndex = () => {
      setTestimonialActiveIndex(getNearestIndex())
    }

    const handlePointerDown = () => pauseForUser()
    const handleWheel = () => pauseForUser()
    const handleTouchStart = () => pauseForUser()
    const handleMouseEnter = () => pauseForUser()
    const handleFocusIn = () => pauseForUser()
    const handleVisibilityChange = () => {
      if (document.hidden) clearAutoSlide()
      else scheduleAutoSlide()
    }

    const observer = new IntersectionObserver(([entry]) => {
      activeInViewRef.current = entry.isIntersecting
      if (entry.isIntersecting) scheduleAutoSlide()
      else clearAutoSlide()
    }, { threshold: 0.25 })

    observer.observe(viewport)
    viewport.addEventListener('pointerdown', handlePointerDown, { passive: true })
    viewport.addEventListener('wheel', handleWheel, { passive: true })
    viewport.addEventListener('touchstart', handleTouchStart, { passive: true })
    viewport.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    viewport.addEventListener('focusin', handleFocusIn)
    viewport.addEventListener('scroll', updateActiveIndex, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    updateActiveIndex()

    return () => {
      clearAutoSlide()
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current)
      observer.disconnect()
      viewport.removeEventListener('pointerdown', handlePointerDown)
      viewport.removeEventListener('wheel', handleWheel)
      viewport.removeEventListener('touchstart', handleTouchStart)
      viewport.removeEventListener('mouseenter', handleMouseEnter)
      viewport.removeEventListener('focusin', handleFocusIn)
      viewport.removeEventListener('scroll', updateActiveIndex)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [testimonials.length])

  const moveTestimonial = (direction: number) => {
    const viewport = viewportRef.current
    if (!viewport) return
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>('.testimonial'))
    if (!cards.length) return

    const viewportRect = viewport.getBoundingClientRect()
    const paddingLeft = Number.parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth)

    const getTargetLeft = (card: HTMLElement) => {
      const cardRect = card.getBoundingClientRect()
      const target = viewport.scrollLeft + cardRect.left - viewportRect.left - paddingLeft
      return Math.min(Math.max(target, 0), maxScroll)
    }

    let currentIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY
    cards.forEach((card, index) => {
      const distance = Math.abs(viewport.scrollLeft - getTargetLeft(card))
      if (distance < nearestDistance) {
        nearestDistance = distance
        currentIndex = index
      }
    })

    const nextIndex = (currentIndex + direction + cards.length) % cards.length
    viewport.scrollTo({ left: getTargetLeft(cards[nextIndex]), behavior: 'smooth' })
  }
  return (
    <section id="testimonials" className="section testimonials-section" aria-labelledby="testimonials-title">
      <div className="section-head">
        <h2 id="testimonials-title">Quotes</h2>
      </div>
      <p className="testimonials-subtitle">
        16 gagasan dari tokoh lintas bidang tentang karya, pembelajaran, teknologi, ekonomi, dan kehidupan.
      </p>
      <div className="testimonials-toolbar">
        <span className="testimonial-counter">{String(testimonialActiveIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')} PERSPEKTIF</span>
        <div className="testimonial-controls" aria-label="Kontrol quotes">
          <button type="button" aria-label="Quote sebelumnya" onClick={() => moveTestimonial(-1)}>←</button>
          <button type="button" aria-label="Quote berikutnya" onClick={() => moveTestimonial(1)}>→</button>
        </div>
        <span className="testimonial-swipe-hint" aria-hidden="true">GESER ↔</span>
      </div>
      <div ref={viewportRef} className="testimonials-viewport" role="region" aria-roledescription="carousel" aria-label="Koleksi quotes yang dapat digeser">
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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [musicOpen, setMusicOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return window.localStorage.getItem('jrhs-theme') === 'dark' ||
        window.sessionStorage.getItem('jrhs-theme') === 'dark'
    } catch {
      return false
    }
  })
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
  const musicAudioRef = useRef<HTMLAudioElement>(null)
  const musicIndexRef = useRef(0)
  const musicRequestRef = useRef(0)
  const [musicIndex, setMusicIndex] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicProgress, setMusicProgress] = useState(0)
  const [musicDuration, setMusicDuration] = useState(0)
  const [musicStatus, setMusicStatus] = useState('READY')


  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
    try {
      window.localStorage.setItem('jrhs-theme', darkMode ? 'dark' : 'light')
      window.sessionStorage.setItem('jrhs-theme', darkMode ? 'dark' : 'light')
    } catch {
      // Storage can be unavailable in restrictive browser modes.
    }
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (meta) meta.content = darkMode ? '#050505' : '#F7FBFF'
  }, [darkMode])

  const loadAndPlayMusic = (index: number) => {
    const audio = musicAudioRef.current
    if (!audio) return

    const safeIndex = (index + musicTracks.length) % musicTracks.length
    const nextTrack = musicTracks[safeIndex]
    const requestId = ++musicRequestRef.current
    musicIndexRef.current = safeIndex
    setMusicIndex(safeIndex)
    setMusicProgress(0)
    setMusicDuration(0)
    setMusicStatus('LOADING')
    setMusicPlaying(false)

    audio.pause()
    audio.removeAttribute('src')
    audio.load()
    audio.src = nextTrack.src
    audio.load()

    void audio.play().catch(() => {
      if (musicRequestRef.current !== requestId) return
      setMusicPlaying(false)
      setMusicStatus('READY')
    })

  }

  const toggleMusicPlayback = () => {
    const audio = musicAudioRef.current
    if (!audio) return

    if (musicPlaying) {
      audio.pause()
      return
    }

    if (!audio.src || audio.currentSrc === '') {
      loadAndPlayMusic(musicIndexRef.current)
      return
    }

    void audio.play().catch(() => {
      setMusicPlaying(false)
      setMusicStatus('READY')
    })
  }

  const changeMusicTrack = (direction: number) => {
    const nextIndex = (musicIndexRef.current + direction + musicTracks.length) % musicTracks.length
    loadAndPlayMusic(nextIndex)
  }

  useEffect(() => {
    const audio = musicAudioRef.current
    if (!audio) return

    // Load only lightweight metadata when the panel opens. Full audio
    // buffering starts when the user actually presses play or changes track.
    // Closing the panel must NOT stop playback: the audio element lives independently of the UI panel.
    if (musicOpen) {
      audio.preload = 'metadata'
      if (!audio.src) {
        audio.src = musicTracks[musicIndexRef.current].src
        audio.load()
      }
    } else if (!audio.src) {
      audio.preload = 'none'
    }
  }, [musicOpen])

  useEffect(() => {
    const audio = musicAudioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setMusicProgress(audio.currentTime || 0)
    }

    const handleLoadedMetadata = () => {
      setMusicDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    }

    const handlePlay = () => {
      setMusicPlaying(true)
      setMusicStatus('PLAYING')
    }

    const handlePause = () => {
      setMusicPlaying(false)
      setMusicStatus(audio.ended ? 'ENDED' : 'PAUSED')
    }

    const handleEnded = () => {
      const nextIndex = (musicIndexRef.current + 1) % musicTracks.length
      loadAndPlayMusic(nextIndex)
    }

    const handleError = () => {
      setMusicPlaying(false)
      setMusicStatus('ERROR')
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      musicRequestRef.current += 1
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }
  }, [])


  useEffect(() => {
    let frame = 0
    const updateScrollProgress = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const progress = maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 0
        setScrollProgress(progress)
      })
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('resize', updateScrollProgress)

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
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
    const isEditableTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false
      return Boolean(target.closest('input, textarea, select, [contenteditable="true"], [contenteditable=""]'))
    }

    const handleContextMenu = (event: MouseEvent) => {
      if (!isEditableTarget(event.target)) event.preventDefault()
    }

    const handleCopy = (event: ClipboardEvent) => {
      if (!isEditableTarget(event.target)) event.preventDefault()
    }

    const handleCut = (event: ClipboardEvent) => {
      if (!isEditableTarget(event.target)) event.preventDefault()
    }

    const handleDragStart = (event: DragEvent) => {
      if (!isEditableTarget(event.target)) event.preventDefault()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return
      const key = event.key.toLowerCase()
      const blockedShortcut =
        (event.ctrlKey || event.metaKey) &&
        ['c', 'x', 'a'].includes(key)

      if (blockedShortcut) event.preventDefault()
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('copy', handleCopy)
    document.addEventListener('cut', handleCut)
    document.addEventListener('dragstart', handleDragStart)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('cut', handleCut)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  /* =========================================================
     JRH ANTI-COPY — PUBLIC CONTENT PROTECTION
     ========================================================= */

  useEffect(() => {
    const handleImageProtection = (event: Event) => {
      const target = event.target
      if (target instanceof HTMLImageElement) {
        event.preventDefault()
      }
    }

    document.addEventListener('contextmenu', handleImageProtection)
    document.addEventListener('dragstart', handleImageProtection)

    return () => {
      document.removeEventListener('contextmenu', handleImageProtection)
      document.removeEventListener('dragstart', handleImageProtection)
    }
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
      <div className="scroll-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
      <a className="skip-link" href="#identity">Lewati ke konten utama</a>
      <header className="nav">
        <a className="wordmark" href="/" aria-label="JRH home" onClick={(event) => { event.preventDefault(); window.location.reload() }}>
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

      <main data-ui-level="20">
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
                    onChange={(event) => setPrivacy(event.target.checked)}
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
        <button className="theme-toggle-floating" type="button" aria-label={darkMode ? 'Aktifkan light mode' : 'Aktifkan dark mode'} aria-pressed={darkMode} title={darkMode ? 'Light mode' : 'Dark mode'} onClick={() => setDarkMode((value) => !value)}>
          <span aria-hidden="true">{darkMode ? '☀' : '☾'}</span>
        </button>
        <a className="back-to-top" href="#identity" aria-label="Kembali ke atas" title="Kembali ke atas">↑<span>TOP</span></a>
      </div>

      <footer className="site-footer">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <strong>JRH</strong>
          </div>

          <nav className="site-footer-nav" aria-label="Footer navigation">
            {sectionItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{label.toUpperCase()}</a>
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
createRoot(rootElement).render(<App />)
