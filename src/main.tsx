import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  Menu,
  Pause,
  Play,
  Search,
  Send,
  Share2,
  SkipForward,
  Sparkles,
  X,
} from 'lucide-react'
import { createRoot } from 'react-dom/client'
import { siteConfig, type Project } from './config/site'
import './index.css'
import './future.css'

const navItems = [
  ['about', 'About'],
  ['work', 'Projects'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
] as const

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function getProjectFromLocation(projects: readonly Project[]) {
  const raw = window.location.hash.startsWith('#project=') ? window.location.hash.slice(9) : ''
  return projects.find(item => slugify(item.title) === raw) ?? null
}

function App() {
  const [menu, setMenu] = useState(false)
  const [musicOpen, setMusicOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [active, setActive] = useState('about')
  const [scrolled, setScrolled] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [copied, setCopied] = useState(false)
  const [showTop, setShowTop] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const musicWrapRef = useRef<HTMLDivElement | null>(null)
  const modalCloseRef = useRef<HTMLButtonElement | null>(null)
  const modalRef = useRef<HTMLElement | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)
  const trackIndexRef = useRef(0)

  const projects = siteConfig.projects as readonly Project[]
  const currentTrack = siteConfig.music.tracks[trackIndex]
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map(project => project.category)))],
    [projects],
  )

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return projects.filter(project => {
      const categoryMatch = category === 'All' || project.category === category
      const searchMatch = !normalized || [project.title, project.category, project.description, ...project.tags]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
      return categoryMatch && searchMatch
    })
  }, [category, projects, query])

  useEffect(() => {
    document.documentElement.dataset.theme = 'light'
    document.documentElement.style.colorScheme = 'light'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#ffffff')
  }, [])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        const percent = Math.min(100, Math.max(0, (window.scrollY / max) * 100))
        document.documentElement.style.setProperty('--scroll-progress', `${percent}%`)
        setScrolled(window.scrollY > 18)
        setShowTop(window.scrollY > window.innerHeight * 0.7)
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
    const targets = navItems.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!targets.length) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-20% 0px -62% 0px', threshold: [0.12, 0.25, 0.5] })
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
  }, [filteredProjects.length, category])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable
      if (event.key === '/' && !typing) {
        event.preventDefault()
        searchRef.current?.focus()
      }
      if (event.key === 'Escape') {
        setMenu(false)
        setMusicOpen(false)
        closeProject()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onPopState = () => setSelectedProject(getProjectFromLocation(projects))
    const initialProject = getProjectFromLocation(projects)
    setSelectedProject(initialProject)
    window.addEventListener('popstate', onPopState)
    window.addEventListener('hashchange', onPopState)
    return () => {
      window.removeEventListener('popstate', onPopState)
      window.removeEventListener('hashchange', onPopState)
    }
  }, [projects])

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
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.title = `${selectedProject.title} — JRH`
    requestAnimationFrame(() => modalCloseRef.current?.focus())
    return () => {
      document.body.style.overflow = previousOverflow
      document.title = siteConfig.title
      requestAnimationFrame(() => lastFocusedRef.current?.focus())
    }
  }, [selectedProject])

  useEffect(() => {
    if (!selectedProject) return
    const onModalKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !modalRef.current) return
      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])',
      ))
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
    document.addEventListener('keydown', onModalKey)
    return () => document.removeEventListener('keydown', onModalKey)
  }, [selectedProject])

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (selectedProject) return
    document.title = siteConfig.title
  }, [selectedProject])

  const go = (id: string) => {
    setMenu(false)
    setMusicOpen(false)
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
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
    const expectedSrc = new URL(track.src, window.location.href).href
    if (audio.src !== expectedSrc) {
      audio.src = expectedSrc
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

  const openProject = (project: Project) => {
    window.history.pushState(null, '', `#project=${slugify(project.title)}`)
    setCopied(false)
    setSelectedProject(project)
  }

  const closeProject = () => {
    if (window.location.hash.startsWith('#project=')) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    }
    setCopied(false)
    setSelectedProject(null)
  }

  const copyProjectLink = async (project: Project) => {
    const url = `${window.location.origin}${window.location.pathname}#project=${slugify(project.title)}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  const shareProject = async (project: Project) => {
    const url = `${window.location.origin}${window.location.pathname}#project=${slugify(project.title)}`
    if (navigator.share) {
      try {
        await navigator.share({ title: `${project.title} — JRH`, text: project.description, url })
        return
      } catch {}
    }
    await copyProjectLink(project)
  }

  return (
    <div className="app">
      <div className="scroll-progress" aria-hidden="true" />
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${menu ? 'is-open' : ''}`}>
        <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); go('top') }} aria-label="JRH home">
          <span className="brand-mark" aria-hidden="true">J</span>
          <span className="brand-word">JRH<span>.</span></span>
          <span className="brand-context">Digital portfolio</span>
        </a>
        <nav id="primary-navigation" className={menu ? 'open' : ''} aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={event => { event.preventDefault(); go(id) }}>{label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <div className="music-nav-wrap" ref={musicWrapRef}>
            <button className={`music-nav ${playing ? 'is-playing' : ''}`} onClick={() => setMusicOpen(value => !value)} aria-expanded={musicOpen} aria-controls="music-popover" aria-label="Open music player">
              <span className="music-play-icon" aria-hidden="true">{playing ? <Pause size={14} /> : <Play size={14} />}</span>
              <span className="music-title"><b>Music</b><small>{currentTrack?.title ?? siteConfig.music.title}</small></span>
            </button>
            {musicOpen && (
              <div id="music-popover" className="music-popover" role="dialog" aria-label="JRH music player">
                <div className="music-head"><span>{siteConfig.music.title}</span><span>{trackIndex + 1} / {siteConfig.music.tracks.length}</span></div>
                <div className="music-main">
                  <button className="music-control" onClick={toggleMusic} aria-label={playing ? 'Pause music' : 'Play music'}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>
                  <div className="music-copy"><strong>{currentTrack?.title ?? siteConfig.music.title}</strong><small>{audioError ? 'Audio tidak tersedia' : playing ? 'Now playing' : 'Ready to play'}</small></div>
                  <button className="music-next" onClick={nextTrack} aria-label="Next track"><SkipForward size={16} /></button>
                </div>
                <div className="music-slider-wrap">
                  <input type="range" min="0" max={duration || 0} step="0.1" value={currentTime} onChange={event => seekMusic(Number(event.target.value))} aria-label="Music progress" disabled={!duration} />
                  <span style={{ width: `${progress}%` }} aria-hidden="true" />
                </div>
              </div>
            )}
          </div>
          <button className="icon-button mobile-menu" onClick={() => { setMenu(value => !value); setMusicOpen(false) }} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="primary-navigation">
            {menu ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>
      {menu && <button className="menu-backdrop" aria-label="Close menu" onClick={() => setMenu(false)} />}
      <main id="top">
        <section className="hero">
          <div className="hero-copy reveal is-visible">
            <div className="eyebrow"><span className="eyebrow-rule" />{siteConfig.hero.eyebrow}</div>
            <h1 id="hero-title">{siteConfig.hero.titleLine1}<br /><em>{siteConfig.hero.titleLine2}</em></h1>
            <p>{siteConfig.hero.description}</p>
            <div className="hero-actions">
              <button className="button primary" onClick={() => go('work')}>Explore work <ArrowRight size={16} /></button>
              <a className="button secondary" href={siteConfig.github} target="_blank" rel="noreferrer">GitHub <ExternalLink size={15} /></a>
            </div>
            <div className="hero-signals" aria-label="Portfolio summary">
              <div><span>Projects</span><strong>{String(projects.length).padStart(2, '0')}</strong></div>
              <div><span>Channels</span><strong>03</strong></div>
              <div><span>Mode</span><strong>BUILD</strong></div>
            </div>
          </div>
          <div className="hero-visual reveal is-visible">
            <div className="hero-photo-wrap">
              <div className="portrait-frame">
                <img src={siteConfig.profileImage} alt="Jefri Rahman Hakim" className="profile-photo" fetchPriority="high" decoding="async" />
              </div>
            </div>
            <div className="hero-caption">
              <div><span>JRH / 2026</span><strong>A personal system for projects, publishing, and experiments.</strong></div>
              <button className="caption-arrow" onClick={() => go('about')} aria-label="Go to about section"><ArrowUpRight size={16} /></button>
            </div>
          </div>
        </section>

        <section className="portfolio-intro" aria-label="Portfolio identity">
          <span>01 / JRH</span><p>Think deeply. Build with purpose.</p><span>Digital portfolio · Independent workspace</span>
        </section>

        <section id="about" className="section about-section">
          <div className="section-kicker reveal"><span>02</span><span>About</span></div>
          <div className="about-layout">
            <div className="section-intro reveal"><span className="section-overline">The point of the work</span><h2>{siteConfig.about.titleLine1}<br /><em>{siteConfig.about.titleLine2}</em></h2><p>{siteConfig.about.lead}</p></div>
            <div className="about-body reveal"><p className="lead-copy">{siteConfig.about.body}</p><div className="fact-grid">{siteConfig.facts.map(([label, value]) => <div className="fact" key={label}><span className="number-display">{label}</span><strong>{value}</strong></div>)}</div></div>
          </div>
        </section>

        <section id="work" className="section projects-section">
          <div className="section-kicker reveal"><span>03</span><span>Work</span></div>
          <div className="work-head reveal">
            <div><span className="section-overline">Selected archive</span><h2>Built, published, iterated.</h2></div>
            <p>{filteredProjects.length} / {projects.length} projects · open any work to explore.</p>
          </div>
          <div className="project-toolbar reveal">
            <label className="search-box"><Search size={16} /><input ref={searchRef} value={query} onChange={event => setQuery(event.target.value)} placeholder="Search projects…" aria-label="Search projects" /><kbd>/</kbd></label>
            <div className="filter-row" aria-label="Project categories">
              {categories.map(item => <button key={item} className={category === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}
            </div>
          </div>
          <div className="project-grid">
            {filteredProjects.map((project, index) => (
              <article className={`project-card reveal card-accent-${(index % 4) + 1}`} key={project.title}>
                <button className="project-card-hit" onClick={() => openProject(project)} aria-label={`Open details for ${project.title}`}>
                  <div className="project-topline"><span className="number-display">{project.number}</span><span>{project.category}</span></div>
                  <div className="project-body"><div className="project-icon"><ArrowUpRight size={18} /></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
                  <div className="project-footer"><span>View details</span><ChevronRight size={15} /></div>
                </button>
              </article>
            ))}
          </div>
          {filteredProjects.length === 0 && <div className="empty-state reveal"><Search size={20} /><strong>No matching projects.</strong><span>Try a different search or switch the category.</span></div>}
        </section>

        <section className="statement reveal" aria-label="JRH principle"><div className="statement-mark"><Sparkles size={18} /> JRH</div><div><span className="section-note">Working principle</span><p>“{siteConfig.quote}”</p></div></section>

        <section id="experience" className="section experience-section">
          <div className="section-kicker reveal"><span>04</span><span>Experience</span></div>
          <div className="section-heading reveal"><div><span className="section-overline">Timeline</span><h2>Learning by doing.</h2></div><p>A compact record of the academic path and working approach behind this portfolio.</p></div>
          <div className="experience-layout">
            <article className="experience-card reveal"><div className="card-topline"><div className="card-icon"><BookOpen size={17} /></div><span>Academic path</span></div><div className="timeline-list">{siteConfig.education.map(item => <div className="timeline-item" key={item.period}><span className="number-display">{item.period}</span><div><strong>{item.institution}</strong><p>{item.program}</p><small>{item.detail}</small></div></div>)}</div></article>
            <article className="experience-card principle-card reveal"><div className="card-topline"><div className="card-icon"><Sparkles size={17} /></div><span>Working approach</span></div><div className="principle-list">{siteConfig.workPrinciples.map((item, index) => <div key={item}><span className="principle-number">0{index + 1}</span><strong>{item}</strong></div>)}</div><div className="principle-quote"><span>JRH</span><strong>Clear thinking × useful output</strong></div></article>
          </div>
        </section>

        <section id="contact" className="cta-section reveal">
          <div className="section-kicker"><span>05</span><span>Contact</span></div>
          <div className="cta-grid"><div className="cta-copy"><span className="section-overline">Open channel</span><h2>{siteConfig.contact.titleLine1}<br /><em>{siteConfig.contact.titleLine2}</em></h2><p>{siteConfig.contact.description}</p></div><div className="cta-actions"><a className="button primary large" href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram <ExternalLink size={16} /></a><a className="button secondary large" href={siteConfig.telegram} target="_blank" rel="noreferrer">Telegram <Send size={15} /></a><span>Choose the channel that works for you.</span></div></div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top"><div className="footer-brand"><span className="brand-mark" aria-hidden="true">J</span><span className="brand-word">JRH<span>.</span></span></div><div className="footer-socials"><a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub"><ExternalLink size={16} /></a><a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><ExternalLink size={16} /></a></div></div>
        <nav aria-label="Footer navigation">{navItems.map(([id, label]) => <a key={id} href={`#${id}`} onClick={event => { event.preventDefault(); go(id) }}>{label}</a>)}</nav>
        <div className="footer-bottom"><span>© 2026 JRH.</span><span>Built with clarity and purpose.</span></div>
      </footer>

      {showTop && <button className="to-top" onClick={() => go('top')} aria-label="Back to top"><ArrowUp size={16} /></button>}

      {selectedProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) closeProject() }}>
          <section ref={modalRef} className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <div className="modal-head"><div className="modal-eyebrow"><span className="number-display">{selectedProject.number}</span><span>{selectedProject.category}</span></div><button ref={modalCloseRef} className="icon-button modal-close" onClick={closeProject} aria-label="Close project details"><X size={18} /></button></div>
            <div className="modal-title-row"><div><span className="section-overline">Project</span><h2 id="project-modal-title">{selectedProject.title}</h2></div><div className="project-icon modal-icon" aria-hidden="true"><ArrowUpRight size={20} /></div></div>
            <p className="modal-description">{selectedProject.description}</p>
            <div className="tags modal-tags">{selectedProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="modal-links">{(selectedProject.links ?? [{ name: 'Open project', url: selectedProject.url }]).map(link => <a key={link.url} className="button secondary" href={link.url} target="_blank" rel="noreferrer"><span>{link.name}</span>{link.handle && <small>{link.handle}</small>}<ArrowUpRight size={14} /></a>)}</div>
            <div className="modal-tools"><button className="tool-button" onClick={() => void copyProjectLink(selectedProject)}>{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Copied' : 'Copy link'}</button><button className="tool-button" onClick={() => void shareProject(selectedProject)}><Share2 size={15} /> Share</button><span>Esc to close</span></div>
          </section>
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
