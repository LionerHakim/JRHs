import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, BookOpen, ExternalLink, Link2, Menu, Moon, Pause, Play, Quote, SkipForward, Sparkles, Sun, TrendingUp, X } from 'lucide-react'
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
  const [scrollProgress, setScrollProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const trackIndexRef = useRef(0)

  const currentTrack = siteConfig.music.tracks[trackIndex]
  const progress = duration > 0 ? Math.min(100, currentTime / duration * 100) : 0

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#08090c' : '#f7f8fa')
    try { localStorage.setItem('jrh-theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? Math.min(100, window.scrollY / max * 100) : 0)
      const ids = ['about', 'profile', 'work', 'contact']
      let current = 'top'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && window.scrollY + 180 >= el.offsetTop) current = id
      }
      setActive(current)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false)
        setMusicOpen(false)
        setSelectedProject(null)
      }
    }
    const preventDrag = (e: DragEvent) => e.preventDefault()
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('keydown', onKey)
    document.addEventListener('dragstart', preventDrag)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
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

  const nav = [['about', 'About'], ['profile', 'Profile'], ['work', 'Projects'], ['contact', 'Contact']] as const
  const projects = siteConfig.projects as readonly Project[]

  return <div className="app">
    <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

    <header className={`nav ${menu ? 'is-open' : ''}`} aria-label="Main navigation">
      <a className="brand" href="#top" onClick={() => { setMenu(false); setMusicOpen(false) }} aria-label="JRH home">
        <span className="brand-mark">J</span>
        <span className="brand-name">{siteConfig.shortName}<i>.</i></span>
      </a>

      <nav id="primary-navigation" className={menu ? 'open' : ''} aria-label="Primary">
        {nav.map(([id, label], index) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} onClick={e => { e.preventDefault(); go(id) }}>
          <span className="nav-num">{String(index + 1).padStart(2, '0')}</span>
          <span>{label}</span>
          {active === id && <span className="nav-state" aria-hidden="true" />}
        </a>)}
      </nav>

      <div className="nav-actions">
        <div className="music-nav-wrap">
          <button className={`music-nav ${playing ? 'is-playing' : ''}`} onClick={() => setMusicOpen(v => !v)} aria-expanded={musicOpen} aria-controls="music-popover" aria-label="Open music player">
            <span className="music-nav-icon">{playing ? <Pause size={14} /> : <Play size={14} />}</span>
            <span className="music-nav-label"><b>Music</b><small>{currentTrack?.title ?? 'JRH Music'}</small></span>
          </button>
          {musicOpen && <div id="music-popover" className="music-popover" role="dialog" aria-label="JRH music player">
            <div className="music-popover-head"><span>JRH / MUSIC</span><span>{String(trackIndex + 1).padStart(2, '0')} / {String(siteConfig.music.tracks.length).padStart(2, '0')}</span></div>
            <div className="music-popover-main">
              <button className="music-play" onClick={toggleMusic} aria-label={playing ? 'Pause music' : 'Play music'}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>
              <div className="music-copy"><strong>{currentTrack?.title ?? siteConfig.music.title}</strong><small>{audioError ? 'Audio tidak dapat diputar' : playing ? 'Now playing' : 'Ready to play'}</small></div>
              <button className="music-skip" onClick={nextTrack} aria-label="Next track"><SkipForward size={16} /></button>
            </div>
            <div className="music-progress"><input type="range" min="0" max={duration || 0} step="0.1" value={currentTime} onChange={e => seekMusic(Number(e.target.value))} aria-label="Music progress" disabled={!duration} /><span style={{ width: `${progress}%` }} /></div>
          </div>}
        </div>
        <button className="icon-button theme-trigger" onClick={() => setDark(v => !v)} aria-label={dark ? 'Use light theme' : 'Use dark theme'} title={dark ? 'Light mode' : 'Dark mode'}>
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
        <div className="hero-copy">
          <div className="eyebrow"><span className="status" />{siteConfig.hero.eyebrow}<Sparkles size={12} /></div>
          <h1>Think deeply.<br /><em>Build the future.</em></h1>
          <p>{siteConfig.hero.description}</p>
          <div className="hero-actions">
            <button className="button primary" onClick={() => go('work')}>Explore projects <ArrowUpRight size={16} /></button>
            <a className="text-link" href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram <ExternalLink size={13} /></a>
          </div>
          <div className="hero-meta">
            <span><b>01</b> Digital portfolio</span><span><b>2026</b> Independent work</span><span><b>UII</b> Development Economics</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="JRH profile portrait and focus">
          <div className="portrait-frame">
            <img src={siteConfig.profileImage} alt="Jefri Rahman Hakim" className="profile-photo" />
            <div className="portrait-scan" aria-hidden="true" />
            <span className="portrait-index">JRH / 01</span>
            <span className="portrait-caption">ECONOMICS · MARKETS · DIGITAL</span>
          </div>
          <div className="hero-focus-grid">
            <div><span>01</span><strong>Economics</strong><small>Development · Macro · Applied</small></div>
            <div><span>02</span><strong>Markets</strong><small>{siteConfig.marketProfile.focus}</small></div>
            <div><span>03</span><strong>Systems</strong><small>AI · Web · Experiments</small></div>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Interests">
        {siteConfig.interests.map((item, i) => <span key={item}>{i > 0 && <span className="ticker-sep">—</span>}{item}</span>)}
      </section>

      <section id="about" className="section about">
        <div className="section-label">01 / ABOUT</div>
        <div className="about-grid">
          <div><h2>{siteConfig.about.titleLine1}<br /><em>{siteConfig.about.titleLine2}</em></h2></div>
          <div><p className="lead">{siteConfig.about.lead}</p><p>{siteConfig.about.body}</p><div className="facts">{siteConfig.facts.map(([t, x]) => <div key={t}><b>{t}</b><span>{x}</span></div>)}</div></div>
        </div>
      </section>

      <section id="profile" className="section profile-section">
        <div className="section-label">02 / PROFILE</div>
        <div className="profile-grid">
          <div className="profile-heading"><h2>Study.<br /><em>Market.</em><br />Build.</h2><p>A clearer view of the academic foundation and market practice behind the work.</p></div>
          <div className="profile-panels">
            <article className="info-card education-card"><div className="card-head"><div className="card-icon"><BookOpen size={17} /></div><div><span className="card-kicker">EDUCATION</span><h3>Academic path</h3></div></div><div className="timeline-list">{siteConfig.education.map(e => <div className="timeline" key={e.period}><div className="timeline-period">{e.period}</div><strong>{e.institution}</strong><span>{e.program}</span><small>{e.detail} · {e.location}</small></div>)}</div></article>
            <article className="info-card market-card"><div className="card-head"><div className="card-icon"><TrendingUp size={17} /></div><div><span className="card-kicker">MARKET PROFILE</span><h3>Risk before return</h3></div></div><div className="market-metrics">{[['START',siteConfig.marketProfile.start],['EXPERIENCE',siteConfig.marketProfile.experience],['FOCUS',siteConfig.marketProfile.focus]].map(([a,b]) => <div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div><p>{siteConfig.marketProfile.description}</p><div className="methods"><span className="card-kicker">METHODS</span><div className="tags">{siteConfig.marketProfile.methods.map(x => <span key={x}>{x}</span>)}</div></div><div className="philosophy"><span>PRINCIPLE</span><strong>{siteConfig.marketProfile.philosophy}</strong></div></article>
          </div>
        </div>
      </section>

      <section id="work" className="section work">
        <div className="section-head"><div><div className="section-label">03 / PROJECTS</div><h2>Things I’ve<br /><em>made.</em></h2></div><span className="count">{String(projects.length).padStart(2, '0')} projects</span></div>
        <div className="project-list">{projects.map(project => <article className="project" key={project.title} tabIndex={0} aria-label={`Open details for ${project.title}`} onClick={() => setSelectedProject(project)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(project) } }}><div className="project-no">{project.number}</div><div className="project-main"><div className="project-top"><span>{project.category}</span><span className="project-open"><ArrowUpRight size={18} /></span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div>{project.links && <div className="project-links">{project.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}><span>{link.name}</span>{link.handle && <small>{link.handle}</small>}<ExternalLink size={12} /></a>)}</div>}<span className="detail-hint">Open details <ArrowUpRight size={13} /></span></div></article>)}</div>
      </section>

      <section className="quote"><Quote size={28} /><p>{siteConfig.quote}</p></section>

      <section id="contact" className="section contact"><div className="section-label">04 / CONTACT</div><div className="contact-row"><div><h2>{siteConfig.contact.titleLine1}<br /><em>{siteConfig.contact.titleLine2}</em></h2><p>{siteConfig.contact.description}</p></div><a className="contact-button" href={siteConfig.instagram} target="_blank" rel="noreferrer"><Link2 size={18} /> Instagram <ArrowUpRight size={16} /></a></div></section>
    </main>

    <footer><div><a className="brand" href="#top" aria-label="JRH home"><span className="brand-mark">J</span><span>{siteConfig.shortName}<i>.</i></span></a><p>Personal portfolio · Indonesia</p></div><div className="footer-links"><a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub</a></div></footer>

    {selectedProject && <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedProject(null) }}><div className="project-modal" role="dialog" aria-modal="true" aria-label={`${selectedProject.title} details`}><button className="icon-button project-modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={18} /></button><span className="card-kicker">{selectedProject.number} / {selectedProject.category}</span><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="tags">{selectedProject.tags.map(t => <span key={t}>{t}</span>)}</div>{selectedProject.links && <div className="modal-links">{selectedProject.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer"><span>{link.name}</span>{link.handle && <small>{link.handle}</small>}<ArrowUpRight size={15} /></a>)}</div>}<a className="button primary modal-cta" href={selectedProject.url} target="_blank" rel="noreferrer">Open project <ArrowUpRight size={16} /></a></div></div>}
  </div>
}

createRoot(document.getElementById('root')!).render(<App />)