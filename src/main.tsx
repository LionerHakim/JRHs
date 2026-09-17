import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, BookOpen, ExternalLink, Link2, Menu, Moon, Pause, Play, SkipForward, Sun, TrendingUp, X } from 'lucide-react'
import { createRoot } from 'react-dom/client'
import { siteConfig, type Project } from './config/site'
import './index.css'

function getInitialDark() {
  try {
    const saved = localStorage.getItem('jrh-theme')
    if (saved === 'dark') return true
    if (saved === 'light') return false
  } catch {}
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

const navItems = [
  ['about', 'About'],
  ['profile', 'Profile'],
  ['work', 'Projects'],
  ['contact', 'Contact'],
] as const

function App() {
  const [dark, setDark] = useState(getInitialDark)
  const [menu, setMenu] = useState(false)
  const [musicOpen, setMusicOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [active, setActive] = useState('top')
  const [scrolled, setScrolled] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const musicWrapRef = useRef<HTMLDivElement | null>(null)
  const modalCloseRef = useRef<HTMLButtonElement | null>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)
  const trackIndexRef = useRef(0)

  const currentTrack = siteConfig.music.tracks[trackIndex]
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0
  const projects = siteConfig.projects as readonly Project[]

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#000000' : '#f5f5f7')
    try { localStorage.setItem('jrh-theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        const percent = Math.min(100, Math.max(0, (window.scrollY / max) * 100))
        document.documentElement.style.setProperty('--scroll-progress', `${percent}%`)
        setScrolled(window.scrollY > 24)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const targets = navItems
      .map(([id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (!targets.length) return

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0.15, 0.35, 0.6] })

    targets.forEach(target => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' })

    document.querySelectorAll('.reveal').forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenu(false)
        setMusicOpen(false)
        setSelectedProject(null)
      }
    }
    const preventDrag = (event: DragEvent) => event.preventDefault()

    document.addEventListener('keydown', onKey)
    document.addEventListener('dragstart', preventDrag)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('dragstart', preventDrag)
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!musicOpen) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (!musicWrapRef.current?.contains(target)) setMusicOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [musicOpen])

  useEffect(() => {
    if (!selectedProject) return
    lastFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => modalCloseRef.current?.focus())
    return () => {
      document.body.style.overflow = ''
      requestAnimationFrame(() => lastFocusedRef.current?.focus())
    }
  }, [selectedProject])

  const closeProject = () => setSelectedProject(null)

  const go = (id: string) => {
    setMenu(false)
    setMusicOpen(false)
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const ensureAudio = (src: string) => {
    if (audioRef.current) return audioRef.current

    const audio = new Audio(src)
    audio.preload = 'metadata'
    audio.volume = 0.28
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime || 0))
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration || 0))
    audio.addEventListener('ended', () => {
      const next = (trackIndexRef.current + 1) % siteConfig.music.tracks.length
      void playTrack(next)
    })
    audio.addEventListener('error', () => {
      setPlaying(false)
      setAudioError(true)
    })
    audioRef.current = audio
    return audio
  }

  async function playTrack(index: number) {
    const track = siteConfig.music.tracks[index]
    if (!track) return

    const audio = ensureAudio(track.src)
    setAudioError(false)
    const currentSrc = audio.getAttribute('src') || audio.src

    if (!currentSrc.endsWith(track.src)) {
      audio.src = track.src
      audio.load()
      setCurrentTime(0)
      setDuration(0)
    }

    trackIndexRef.current = index
    setTrackIndex(index)

    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
      setAudioError(true)
    }
  }

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (playing && audio) {
      audio.pause()
      setPlaying(false)
      return
    }
    await playTrack(trackIndex)
  }

  const nextTrack = () => {
    const next = (trackIndex + 1) % siteConfig.music.tracks.length
    void playTrack(next)
  }

  const seekMusic = (value: number) => {
    if (!audioRef.current || duration <= 0) return
    audioRef.current.currentTime = value
    setCurrentTime(value)
  }

  const openProject = (project: Project) => setSelectedProject(project)

  return (
    <div className="app">
      <div className="scroll-progress" aria-hidden="true" />

      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${menu ? 'is-open' : ''}`}>
        <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); go('top') }} aria-label="JRH home">
          <span className="brand-word">{siteConfig.shortName}<i>.</i></span>
          <span className="brand-context">Economics, markets, software</span>
        </a>

        <nav id="primary-navigation" className={menu ? 'open' : ''} aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <a
              key={id}
              className={active === id ? 'active' : ''}
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
              onClick={event => { event.preventDefault(); go(id) }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="music-nav-wrap" ref={musicWrapRef}>
            <button
              className={`music-nav ${playing ? 'is-playing' : ''}`}
              onClick={() => setMusicOpen(value => !value)}
              aria-expanded={musicOpen}
              aria-controls="music-popover"
              aria-label="Open music player"
            >
              <span className="music-play-icon">{playing ? <Pause size={14} /> : <Play size={14} />}</span>
              <span className="music-title"><b>Music</b><small>{currentTrack?.title ?? siteConfig.music.title}</small></span>
            </button>

            {musicOpen && (
              <div id="music-popover" className="music-popover glass" role="dialog" aria-label="JRH music player">
                <div className="music-head"><span>{siteConfig.music.title}</span><span>{trackIndex + 1} / {siteConfig.music.tracks.length}</span></div>
                <div className="music-main">
                  <button className="music-control" onClick={toggleMusic} aria-label={playing ? 'Pause music' : 'Play music'}>
                    {playing ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <div className="music-copy"><strong>{currentTrack?.title ?? siteConfig.music.title}</strong><small>{audioError ? 'Audio tidak dapat diputar' : playing ? 'Now playing' : 'Ready to play'}</small></div>
                  <button className="music-next" onClick={nextTrack} aria-label="Next track"><SkipForward size={16} /></button>
                </div>
                <div className="music-slider-wrap">
                  <input type="range" min="0" max={duration || 0} step="0.1" value={currentTime} onChange={event => seekMusic(Number(event.target.value))} aria-label="Music progress" disabled={!duration} />
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>

          <button className="icon-button" onClick={() => setDark(value => !value)} aria-label={dark ? 'Use light theme' : 'Use dark theme'}>
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button className="icon-button mobile-menu" onClick={() => { setMenu(value => !value); setMusicOpen(false) }} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="primary-navigation">
            {menu ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      {menu && <button className="menu-backdrop" aria-label="Close menu" onClick={() => setMenu(false)} />}

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy reveal is-visible">
            <div className="eyebrow"><span className="eyebrow-rule" />{siteConfig.hero.eyebrow}</div>
            <h1 id="hero-title">{siteConfig.hero.titleLine1}<br /><em>{siteConfig.hero.titleLine2}</em></h1>
            <p>{siteConfig.hero.description}</p>
            <div className="hero-actions">
              <button className="button primary" onClick={() => go('work')}>View projects <ArrowRight size={16} /></button>
              <a className="button secondary" href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram <ExternalLink size={14} /></a>
            </div>
            <div className="hero-meta" aria-label="JRH location and focus">
              <span>{siteConfig.location}</span>
              <span className="meta-dot" aria-hidden="true" />
              <span>Development Economics</span>
            </div>
          </div>

          <div className="hero-visual reveal is-visible">
            <div className="hero-photo-wrap">
              <div className="portrait-frame">
                <img src={siteConfig.profileImage} alt="Jefri Rahman Hakim" className="profile-photo" fetchPriority="high" />
              </div>
              <div className="photo-index" aria-hidden="true">01 / JRH</div>
            </div>
            <div className="hero-caption">
              <div><span>Current frame</span><strong>Economics, markets, digital systems</strong></div>
              <span className="caption-arrow" aria-hidden="true"><ArrowUpRight size={15} /></span>
            </div>
          </div>
        </section>

        <section className="interest-band" aria-label="Areas of interest">
          <div className="interest-title">Focus</div>
          <div className="interest-items">
            {siteConfig.interests.map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, '0')}</i>{item}</span>)}
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-kicker reveal"><span>01</span><span>About</span></div>
          <div className="about-layout">
            <div className="section-intro reveal">
              <h2>{siteConfig.about.titleLine1}<br /><em>{siteConfig.about.titleLine2}</em></h2>
              <p>{siteConfig.about.lead}</p>
            </div>
            <div className="about-body reveal">
              <p className="lead-copy">{siteConfig.about.body}</p>
              <div className="fact-grid">
                {siteConfig.facts.map(([label, value]) => (
                  <div className="fact" key={label}>
                    <span className="number-display">{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="profile" className="section profile-section">
          <div className="section-kicker reveal"><span>02</span><span>Profile</span></div>
          <div className="section-heading reveal">
            <h2>Study, market, build.</h2>
            <p>The academic foundation and market practice behind the work.</p>
          </div>

          <div className="profile-layout">
            <article className="profile-card reveal">
              <div className="card-topline"><div className="card-icon"><BookOpen size={17} /></div><span>Education</span></div>
              <div className="card-title-row"><h3>Academic path</h3><span className="card-index">A</span></div>
              <div className="timeline-list">
                {siteConfig.education.map(item => (
                  <div className="timeline-item" key={item.period}>
                    <span className="number-display">{item.period}</span>
                    <div>
                      <strong>{item.institution}</strong>
                      <p>{item.program}</p>
                      <small>{item.detail}. {item.location}</small>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="profile-card reveal">
              <div className="card-topline"><div className="card-icon"><TrendingUp size={17} /></div><span>Market profile</span></div>
              <div className="card-title-row"><h3>Risk before return</h3><span className="card-index">B</span></div>
              <div className="market-stats">
                <div><span>Since</span><strong className="number-display">{siteConfig.marketProfile.start}</strong></div>
                <div><span>Focus</span><strong>{siteConfig.marketProfile.focus}</strong></div>
              </div>
              <p className="market-description">{siteConfig.marketProfile.description}</p>
              <div className="method-group">
                <span>Methods</span>
                <div className="method-list">{siteConfig.marketProfile.methods.map(method => <span key={method}>{method}</span>)}</div>
              </div>
              <div className="principle"><span>Principle</span><strong>{siteConfig.marketProfile.philosophy}</strong></div>
            </article>
          </div>
        </section>

        <section id="work" className="section projects-section">
          <div className="section-kicker reveal"><span>03</span><span>Projects</span></div>
          <div className="section-heading projects-heading reveal">
            <h2>Selected work.</h2>
            <p>{projects.length} projects and digital channels connected to the JRH portfolio.</p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className={`project-row reveal project-row-${index + 1}`} key={project.title}>
                <div className="project-number number-display">{project.number}</div>
                <div className="project-main">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                </div>
                <button className="project-action" onClick={() => openProject(project)} aria-label={`Open details for ${project.title}`}>
                  <span>Details</span><ArrowUpRight size={17} />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="statement reveal" aria-label="JRH principle">
          <div className="statement-mark">JRH</div>
          <div><span className="section-note">Principle</span><p>“{siteConfig.quote}”</p></div>
        </section>

        <section id="contact" className="cta-section reveal">
          <div className="section-kicker"><span>04</span><span>Contact</span></div>
          <div className="cta-grid">
            <div className="cta-copy">
              <h2>{siteConfig.contact.titleLine1}<br /><em>{siteConfig.contact.titleLine2}</em></h2>
              <p>{siteConfig.contact.description}</p>
            </div>
            <div className="cta-action">
              <a className="button primary large" href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={16} /></a>
              <span>Open conversation via Instagram</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand"><span className="brand-word">{siteConfig.shortName}<i>.</i></span><span>Economics, markets, software</span></div>
        <nav aria-label="Footer navigation">
          {navItems.map(([id, label]) => <a key={id} href={`#${id}`} onClick={event => { event.preventDefault(); go(id) }}>{label}</a>)}
        </nav>
        <div className="footer-links">
          <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub"><ExternalLink size={15} /></a>
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Link2 size={15} /></a>
        </div>
        <div className="footer-meta">© 2026 JRH. Built with purpose in Indonesia.</div>
      </footer>

      {selectedProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) closeProject() }}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <div className="modal-head">
              <div><span className="number-display">{selectedProject.number}</span><span className="project-category">{selectedProject.category}</span></div>
              <button ref={modalCloseRef} className="icon-button modal-close" onClick={closeProject} aria-label="Close project details"><X size={18} /></button>
            </div>
            <h2 id="project-modal-title">{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>
            <div className="tags modal-tags">{selectedProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="modal-links">
              {(selectedProject.links ?? [{ name: 'Open project', url: selectedProject.url }]).map(link => (
                <a key={link.url} className="button secondary" href={link.url} target="_blank" rel="noreferrer">
                  <span>{link.name}</span>{link.handle && <small>{link.handle}</small>}<ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
