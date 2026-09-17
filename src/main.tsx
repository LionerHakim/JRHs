import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, BookOpen, Code2, ExternalLink, Link2, Menu, Moon, Quote, Sparkles, Sun, TrendingUp, Volume2, VolumeX, X } from 'lucide-react'
import { createRoot } from 'react-dom/client'
import { siteConfig, type Project } from './config/site'
import './index.css'
import './level5.css'

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
  const [playing, setPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [photoFailed, setPhotoFailed] = useState(false)
  const [active, setActive] = useState('top')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const synthOscillatorsRef = useRef<OscillatorNode[]>([])
  const synthAudioNodesRef = useRef<AudioNode[]>([])

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#07070a' : '#f5f5f7')
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
    const onPointer = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      if (target && !target.closest('.nav')) setMenu(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenu(false); setSelectedProject(null) }
      if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u', 's', 'p', 'a'].includes(e.key.toLowerCase())) e.preventDefault()
    }
    const prevent = (e: Event) => e.preventDefault()
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('contextmenu', prevent)
    document.addEventListener('selectstart', prevent)
    document.addEventListener('dragstart', prevent)
    document.addEventListener('keydown', onKey)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('contextmenu', prevent)
      document.removeEventListener('selectstart', prevent)
      document.removeEventListener('dragstart', prevent)
      document.removeEventListener('keydown', onKey)
      audioRef.current?.pause()
      audioRef.current = null
      synthOscillatorsRef.current.forEach(node => { try { node.stop() } catch {} })
      synthAudioNodesRef.current.forEach(node => { try { node.disconnect() } catch {} })
      synthOscillatorsRef.current = []
      synthAudioNodesRef.current = []
      audioContextRef.current?.close().catch(() => {})
      audioContextRef.current = null
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedProject])

  const go = (id: string) => {
    setMenu(false)
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const stopSynth = () => {
    synthOscillatorsRef.current.forEach(node => { try { node.stop() } catch {} })
    synthAudioNodesRef.current.forEach(node => { try { node.disconnect() } catch {} })
    synthOscillatorsRef.current = []
    synthAudioNodesRef.current = []
    audioContextRef.current?.suspend().catch(() => {})
  }

  const startSynth = async () => {
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) throw new Error('Web Audio is not supported')
    const ctx = audioContextRef.current ?? new AudioCtx()
    audioContextRef.current = ctx
    await ctx.resume()
    const master = ctx.createGain()
    master.gain.value = 0.07
    master.connect(ctx.destination)
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 820
    filter.Q.value = 0.7
    filter.connect(master)
    const notes = [110, 164.81, 220]
    const oscillators = notes.map((frequency, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = index === 0 ? 'sine' : 'triangle'
      osc.frequency.value = frequency
      gain.gain.value = index === 0 ? 0.32 : 0.12
      osc.connect(gain)
      gain.connect(filter)
      osc.start()
      return { osc, gain }
    })
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.type = 'sine'
    lfo.frequency.value = 0.08
    lfoGain.gain.value = 180
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    lfo.start()
    synthOscillatorsRef.current = [lfo, ...oscillators.map(({ osc }) => osc)]
    synthAudioNodesRef.current = [master, filter, lfoGain, ...oscillators.flatMap(({ gain }) => [gain])]
  }

  const toggleMusic = async () => {
    setAudioError(false)
    if (playing) {
      audioRef.current?.pause()
      if (audioContextRef.current) stopSynth()
      setPlaying(false)
      return
    }
    try {
      if (siteConfig.music.src) {
        const audio = audioRef.current ?? new Audio(siteConfig.music.src)
        audioRef.current = audio
        audio.loop = true
        audio.volume = 0.28
        await audio.play()
      } else await startSynth()
      setPlaying(true)
    } catch {
      setPlaying(false)
      setAudioError(true)
    }
  }

  const nav = [['about', 'About'], ['profile', 'Profile'], ['work', 'Projects'], ['contact', 'Contact']] as const

  return <div className="app">
    <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
    <header className={`nav ${menu ? 'is-open' : ''}`} aria-label="Main navigation">
      <a className="brand" href="#top" onClick={() => setMenu(false)} aria-label="JRH home"><span className="brand-mark">J</span><span className="brand-name">{siteConfig.shortName}<i>.</i></span></a>
      <nav id="primary-navigation" className={menu ? 'open' : ''} aria-label="Primary">
        {nav.map(([id, label]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} onClick={e => { e.preventDefault(); go(id) }}><span>{label}</span>{active === id && <i />}</a>)}
      </nav>
      <div className="nav-actions">
        <button className={`glass-icon ${playing ? 'is-active' : ''}`} onClick={toggleMusic} aria-label={playing ? 'Pause ambient music' : 'Play ambient music'} title={audioError ? 'Audio gagal dimulai — coba lagi' : siteConfig.music.title}>{playing ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
        <button className="glass-icon" onClick={() => setDark(v => !v)} aria-label={dark ? 'Use light theme' : 'Use dark theme'} title={dark ? 'Light mode' : 'Dark mode'}>{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
        <button className="mobile-menu glass-icon" onClick={() => setMenu(v => !v)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="primary-navigation">{menu ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status" /> {siteConfig.hero.eyebrow}<Sparkles size={12} /></div>
          <h1>{siteConfig.hero.titleLine1}<br /><em>{siteConfig.hero.titleLine2}</em></h1>
          <p>{siteConfig.hero.description}</p>
          <div className="hero-actions"><button className="button primary" onClick={() => go('work')}>Explore projects <ArrowUpRight size={16} /></button><a className="text-link" href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram <ExternalLink size={13} /></a></div>
          <div className="hero-meta"><span><b>01</b> Digital portfolio</span><span><b>2026</b> Independent work</span><span><b>{siteConfig.location}</b></span></div>
        </div>
        <div className="hero-orbit">
          <div className="hero-glow" />
          <div className="profile-photo-wrap">{photoFailed ? <div className="profile-fallback"><span>JRH</span><small>economics · markets · software</small></div> : <img className="profile-photo" src={siteConfig.profileImage} alt={siteConfig.name} draggable="false" onError={() => setPhotoFailed(true)} />}</div>
          <div className="orbit-card"><span>{siteConfig.shortName}</span><strong>JRH</strong><small>economics · markets · software</small></div>
          <div className="orbit-dot one" /><div className="orbit-dot two" />
        </div>
      </section>

      <section className="ticker" aria-label="Interests">{siteConfig.interests.map((item, i) => <span key={item}>{i > 0 && <span className="ticker-sep">—</span>}{item}</span>)}</section>

      <section id="about" className="section about"><div className="section-label">{siteConfig.about.label}</div><div className="about-grid"><div><h2>{siteConfig.about.titleLine1}<br /><em>{siteConfig.about.titleLine2}</em></h2></div><div><p className="lead">{siteConfig.about.lead}</p><p>{siteConfig.about.body}</p><div className="facts">{siteConfig.facts.map(([t, x]) => <div key={t}><b>{t}</b><span>{x}</span></div>)}</div></div></div></section>

      <section id="profile" className="section profile-section"><div className="section-label">02 / PROFILE</div><div className="profile-grid"><div><h2>Study.<br /><em>Market.</em><br />Build.</h2></div><div className="profile-panels"><article className="info-card"><div className="card-icon"><BookOpen size={17} /></div><span className="card-kicker">EDUCATION</span>{siteConfig.education.map(e => <div className="timeline" key={e.period}><b>{e.period}</b><strong>{e.institution}</strong><span>{e.program}</span><small>{e.detail} · {e.location}</small></div>)}</article><article className="info-card market-card"><div className="card-icon"><TrendingUp size={17} /></div><span className="card-kicker">MARKET PROFILE</span><div className="market-stat"><strong>{siteConfig.marketProfile.start}</strong><span>{siteConfig.marketProfile.experience}</span></div><p>{siteConfig.marketProfile.description}</p><div className="tags">{siteConfig.marketProfile.methods.map(x => <span key={x}>{x}</span>)}</div><div className="philosophy">{siteConfig.marketProfile.philosophy}</div></article></div></div></section>

      <section id="work" className="section work"><div className="section-head"><div><div className="section-label">03 / PROJECTS</div><h2>Things I’ve<br /><em>made.</em></h2></div><span className="count">{String(siteConfig.projects.length).padStart(2, '0')} projects</span></div><div className="project-list">{siteConfig.projects.map(project => <article className="project" key={project.title} tabIndex={0} onClick={() => setSelectedProject(project)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(project) } }}><div className="project-no">{project.number}</div><div className="project-main"><div className="project-top"><span>{project.category}</span><span className="project-open"><ArrowUpRight size={18} /></span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div>{project.links && <div className="project-links">{project.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}><span>{link.name}</span>{link.handle && <small>{link.handle}</small>}<ExternalLink size={12} /></a>)}</div>}<span className="detail-hint">View details <ArrowUpRight size={13} /></span></div></article>)}</div></section>

      <section className="quote"><Quote size={28} /><p>{siteConfig.quote}</p></section>

      <section id="contact" className="section contact"><div className="section-label">04 / CONTACT</div><div className="contact-row"><div><h2>{siteConfig.contact.titleLine1}<br /><em>{siteConfig.contact.titleLine2}</em></h2><p>{siteConfig.contact.description}</p></div><a className="contact-button" href={siteConfig.instagram} target="_blank" rel="noreferrer"><Link2 size={18} /> Instagram <ArrowUpRight size={16} /></a></div></section>
    </main>

    <footer><div><a className="brand" href="#top" aria-label="JRH home"><span className="brand-mark">J</span><span>{siteConfig.shortName}<i>.</i></span></a><p>Personal portfolio · Indonesia</p></div><div className="footer-links"><a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub</a></div></footer>

    {selectedProject && <div className="project-modal" role="dialog" aria-modal="true" aria-label={`${selectedProject.title} details`} onMouseDown={e => { if (e.target === e.currentTarget) setSelectedProject(null) }}><div className="project-modal-card"><button className="glass-icon project-modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={18} /></button><span className="card-kicker">{selectedProject.number} / {selectedProject.category}</span><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="tags">{selectedProject.tags.map(t => <span key={t}>{t}</span>)}</div>{selectedProject.links && <div className="modal-links">{selectedProject.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer"><span>{link.name}</span>{link.handle && <small>{link.handle}</small>}<ArrowUpRight size={15} /></a>)}</div>}<a className="button primary" href={selectedProject.url} target="_blank" rel="noreferrer">Open project <ArrowUpRight size={16} /></a></div></div>}
  </div>
}

function UnusedIconHint({ icon }: { icon: ReactNode }) { return <span aria-hidden="true" style={{ display: 'none' }}>{icon}</span> }

createRoot(document.getElementById('root')!).render(<App />)
