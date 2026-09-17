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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const trackIndexRef = useRef(0)

  const currentTrack = siteConfig.music.tracks[trackIndex]
  const progress = duration > 0 ? Math.min(100, currentTime / duration * 100) : 0
  const nav = [['about', 'About'], ['profile', 'Profile'], ['work', 'Projects'], ['contact', 'Contact']] as const
  const projects = siteConfig.projects as readonly Project[]

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0a0b0d' : '#ffffff')
    try { localStorage.setItem('jrh-theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  useEffect(() => {
    const targets = nav.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!targets.length) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.25, 0.5] })
    targets.forEach(target => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('.reveal').forEach(node => revealObserver.observe(node))
    return () => revealObserver.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false)
        setMusicOpen(false)
        setSelectedProject(null)
      }
    }
    const preventDrag = (e: DragEvent) => e.preventDefault()
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
    document.body.style.overflow = selectedProject ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
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

  return (
    <div className="app">
      <div className="scroll-progress" aria-hidden="true" />

      <header className={`nav ${menu ? 'is-open' : ''}`}>
        <a className="brand" href="#top" onClick={() => { setMenu(false); setMusicOpen(false) }} aria-label="JRH home">
          <span className="brand-word">{siteConfig.shortName}<i>.</i></span>
          <span className="brand-context">Economics, markets, software</span>
        </a>

        <nav id="primary-navigation" className={menu ? 'open' : ''} aria-label="Primary navigation">
          {nav.map(([id, label]) => (
            <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} onClick={e => { e.preventDefault(); go(id) }}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="music-nav-wrap">
            <button className={`music-nav ${playing ? 'is-playing' : ''}`} onClick={() => setMusicOpen(v => !v)} aria-expanded={musicOpen} aria-controls="music-popover" aria-label="Open music player">
              <span className="music-play-icon">{playing ? <Pause size={14} /> : <Play size={14} />}</span>
              <span className="music-title"><b>Music</b><small>{currentTrack?.title ?? siteConfig.music.title}</small></span>
            </button>
            {musicOpen && (
              <div id="music-popover" className="music-popover" role="dialog" aria-label="JRH music player">
                <div className="music-head"><span>JRH Music</span><span>{trackIndex + 1}/{siteConfig.music.tracks.length}</span></div>
                <div className="music-main">
                  <button className="music-control" onClick={toggleMusic} aria-label={playing ? 'Pause music' : 'Play music'}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>
                  <div className="music-copy"><strong>{currentTrack?.title ?? siteConfig.music.title}</strong><small>{audioError ? 'Audio tidak dapat diputar' : playing ? 'Now playing' : 'Ready to play'}</small></div>
                  <button className="music-next" onClick={nextTrack} aria-label="Next track"><SkipForward size={16} /></button>
                </div>
                <div className="music-slider-wrap">
                  <input type="range" min="0" max={duration || 0} step="0.1" value={currentTime} onChange={e => seekMusic(Number(e.target.value))} aria-label="Music progress" disabled={!duration} />
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>

          <button className="icon-button" onClick={() => setDark(v => !v)} aria-label={dark ? 'Use light theme' : 'Use dark theme'}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="icon-button mobile-menu" onClick={() => { setMenu(v => !v); setMusicOpen(false) }} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="primary-navigation">
            {menu ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      {menu && <button className="menu-backdrop" aria-label="Close menu" onClick={() => setMenu(false)} />}

      <main id="top">
        <section className="hero">
          <div className="hero-copy reveal is-visible">
            <div className="eyebrow"><span className="eyebrow-rule" />{siteConfig.hero.eyebrow}</div>
            <h1>{siteConfig.hero.titleLine1}<br /><em>{siteConfig.hero.titleLine2}</em></h1>
            <p>{siteConfig.hero.description}</p>
            <div className="hero-actions">
              <button className="button primary" onClick={() => go('work')}>View projects <ArrowRight size={16} /></button>
              <a className="button secondary" href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram <ExternalLink size={14} /></a>
            </div>
          </div>

          <div className="hero-visual reveal is-visible">
            <div className="portrait-frame">
              <img src={siteConfig.profileImage} alt="Jefri Rahman Hakim" className="profile-photo" fetchPriority="high" />
            </div>
            <div className="hero-side-note">
              <p>Economics, markets, and digital systems in one working portfolio.</p>
              <span>JRH</span>
            </div>
          </div>
        </section>

        <section className="interest-band" aria-label="Areas of interest">
          <div className="interest-title">Focus</div>
          <div className="interest-items">
            {siteConfig.interests.map(item => <span key={item}>{item}</span>)}
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-intro reveal">
            <h2>{siteConfig.about.titleLine1}<br /><em>{siteConfig.about.titleLine2}</em></h2>
            <p>{siteConfig.about.lead}</p>
          </div>
          <div className="about-body reveal">
            <p>{siteConfig.about.body}</p>
            <div className="fact-grid">
              {siteConfig.facts.map(([label, value]) => (
                <div className="fact" key={label}>
                  <span className="number-display">{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="profile" className="section profile-section">
          <div className="section-heading reveal">
            <h2>Study, market, build.</h2>
            <p>The academic foundation and market practice behind the work.</p>
          </div>

          <div className="profile-layout">
            <article className="profile-card education-card reveal">
              <div className="card-topline"><div className="card-icon"><BookOpen size={17} /></div><span>Education</span></div>
              <h3>Academic path</h3>
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

            <article className="profile-card market-card reveal">
              <div className="card-topline"><div className="card-icon"><TrendingUp size={17} /></div><span>Market profile</span></div>
              <h3>Risk before return</h3>
              <div className="market-highlight"><span>Since</span><strong className="number-display">{siteConfig.marketProfile.start}</strong></div>
              <p>{siteConfig.marketProfile.description}</p>
              <div className="method-group">
                <span>Methods</span>
                <div className="method-list">{siteConfig.marketProfile.methods.map(method => <span key={method}>{method}</span>)}</div>
              </div>
              <div className="principle"><span>Principle</span><strong>{siteConfig.marketProfile.philosophy}</strong></div>
            </article>
          </div>
        </section>

        <section id="work" className="section projects-section">
          <div className="section-heading reveal">
            <h2>Selected projects.</h2>
            <p>{projects.length} projects and digital channels currently connected to the JRH portfolio.</p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card reveal project-card-${index + 1}`}
                key={project.title}
                tabIndex={0}
                onClick={() => setSelectedProject(project)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(project) } }}
              >
                <div className="project-card-head">
                  <span className="number-display">{project.number}</span>
                  <ArrowUpRight size={18} />
                </div>
                <div>
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="project-footer">
                  <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <span className="detail-link">Details <ArrowRight size={14} /></span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="statement reveal">
          <div className="statement-mark">JRH</div>
          <p>{siteConfig.quote}</p>
        </section>

        <section id="contact" className="cta-section reveal">
          <div className="cta-copy">
            <h2>{siteConfig.contact.titleLine1}<br /><em>{siteConfig.contact.titleLine2}</em></h2>
            <p>{siteConfig.contact.description}</p>
          </div>
          <a className="button primary large" href={siteConfig.instagram} target="_blank" rel="noreferrer">
            Instagram <ArrowUpRight size={16} />
          </a>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand"><span className="brand-word">{siteConfig.shortName}<i>.</i></span><span>Economics, markets, software</span></div>
        <nav aria-label="Footer navigation">
          {nav.map(([id, label]) => <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); go(id) }}>{label}</a>)}
        </nav>
        <div className="footer-links">
          <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub <ExternalLink size={13} /></a>
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram <ExternalLink size={13} /></a>
        </div>
        <small>© {new Date().getFullYear()} JRH</small>
      </footer>

      {selectedProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedProject(null) }}>
          <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title">
            <div className="modal-head">
              <span className="number-display">{selectedProject.number}</span>
              <button className="icon-button" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={18} /></button>
            </div>
            <span className="project-category">{selectedProject.category}</span>
            <h2 id="project-title">{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>
            <div className="tags modal-tags">{selectedProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="modal-actions">
              <a className="button primary" href={selectedProject.url} target="_blank" rel="noreferrer">Open project <ExternalLink size={14} /></a>
              {selectedProject.links?.map(link => <a className="button secondary" key={link.url} href={link.url} target="_blank" rel="noreferrer"><span>{link.name}</span>{link.handle && <small>{link.handle}</small>}<Link2 size={14} /></a>)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
