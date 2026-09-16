import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, BookOpen, Code2, ExternalLink, Github, Instagram, Menu, Moon, Quote, Sparkles, Sun, TrendingUp, Volume2, VolumeX, X } from 'lucide-react'
import { siteConfig, type Project } from './config/site'
import './index.css'
import './level5.css'

function getSavedTheme() {
  try { return localStorage.getItem('jrh-theme') === 'dark' } catch { return false }
}

function App() {
  const [dark, setDark] = useState(getSavedTheme)
  const [menu, setMenu] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [photoFailed, setPhotoFailed] = useState(false)
  const [active, setActive] = useState('top')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    try { localStorage.setItem('jrh-theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
      const ids = ['about', 'work', 'journal', 'contact']
      let current = 'top'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && window.scrollY + 180 >= el.offsetTop) current = id
      }
      setActive(current)
    }
    const onPointer = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      if (target && !target.closest('.nav')) setMenu(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenu(false); setSelectedProject(null) }
      const key = event.key.toLowerCase()
      if ((event.ctrlKey || event.metaKey) && ['c', 'x', 'u', 's', 'p', 'a'].includes(key)) event.preventDefault()
    }
    const prevent = (event: Event) => event.preventDefault()
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

  const toggleMusic = async () => {
    const audio = audioRef.current ?? new Audio(siteConfig.music.src)
    audioRef.current = audio
    audio.loop = true
    audio.volume = 0.28
    setAudioError(false)
    if (!audio.paused) { audio.pause(); setPlaying(false); return }
    try { await audio.play(); setPlaying(true) } catch { setPlaying(false); setAudioError(true) }
  }

  return <div className="app">
    <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
    <header className={`nav ${menu ? 'is-open' : ''}`} aria-label="Main navigation">
      <a className="brand" href="#top" aria-label={`${siteConfig.shortName} home`} onClick={() => setMenu(false)}><span className="brand-mark">J</span><span className="brand-name">{siteConfig.shortName}<i>.</i></span></a>
      <nav id="primary-navigation" className={menu ? 'open' : ''} aria-label="Primary navigation">
        {([['about','About'],['work','Work'],['journal','Journal'],['contact','Contact']] as const).map(([id,label]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} onClick={e => { e.preventDefault(); go(id) }}><span>{label}</span>{active === id && <i />}</a>)}
      </nav>
      <div className="nav-actions">
        <button className={`glass-icon ${playing ? 'is-active' : ''}`} type="button" onClick={toggleMusic} aria-label={playing ? 'Matikan musik' : 'Putar musik'} aria-pressed={playing} title={audioError ? `Tambahkan ${siteConfig.music.src}` : siteConfig.music.title}>{playing ? <Volume2 size={16}/> : <VolumeX size={16}/>}</button>
        <button className="glass-icon" type="button" onClick={() => setDark(v => !v)} aria-label={dark ? 'Aktifkan light mode' : 'Aktifkan dark mode'} aria-pressed={dark}>{dark ? <Sun size={16}/> : <Moon size={16}/>}</button>
        <button className="mobile-menu glass-icon" type="button" onClick={() => setMenu(v => !v)} aria-label={menu ? 'Tutup menu' : 'Buka menu'} aria-expanded={menu} aria-controls="primary-navigation">{menu ? <X size={18}/> : <Menu size={18}/>}</button>
      </div>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status"/> {siteConfig.hero.eyebrow}<Sparkles size={12}/></div>
          <h1>{siteConfig.hero.titleLine1}<br/><em>{siteConfig.hero.titleLine2}</em></h1>
          <p>{siteConfig.hero.description}</p>
          <div className="hero-actions"><button className="button primary" type="button" onClick={() => go('work')}>Explore work <ArrowUpRight size={16}/></button><a className="text-link" href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram <ExternalLink size={13}/></a></div>
          <div className="hero-meta"><span><b>01</b> Digital portfolio</span><span><b>2026</b> Independent work</span></div>
        </div>
        <div className="hero-orbit" aria-label={`${siteConfig.shortName} profile`}><div className="hero-glow"/><div className="profile-photo-wrap">{photoFailed ? <div className="profile-fallback" aria-label="JRH">JRH</div> : <img className="profile-photo" src={siteConfig.profileImage} alt={siteConfig.name} draggable="false" onError={() => setPhotoFailed(true)}/>}</div><div className="orbit-card"><span>{siteConfig.shortName}</span><strong>JRH</strong><small>digital portfolio</small></div><div className="orbit-dot one"/><div className="orbit-dot two"/></div>
      </section>

      <section className="ticker" aria-label="Interests">{siteConfig.interests.map((item, index) => <span key={item}>{index > 0 && <span className="ticker-sep">—</span>}{item}</span>)}</section>

      <section id="about" className="section about"><div className="section-label">{siteConfig.about.label}</div><div className="about-grid"><div><h2>{siteConfig.about.titleLine1}<br/><em>{siteConfig.about.titleLine2}</em></h2></div><div><p className="lead">{siteConfig.about.lead}</p><p>{siteConfig.about.body}</p><div className="facts">{siteConfig.facts.map(([title,text]) => <div key={title}><b>{title}</b><span>{text}</span></div>)}</div></div></div></section>

      <section id="work" className="section work"><div className="section-head"><div><div className="section-label">02 / SELECTED WORK</div><h2>Things I’ve<br/><em>made.</em></h2></div><span className="count">{String(siteConfig.projects.length).padStart(2,'0')} projects</span></div><div className="project-list">{siteConfig.projects.map(project => <article className="project" key={project.title} tabIndex={0} onClick={() => setSelectedProject(project)} onKeyDown={e => { if(e.key === 'Enter') setSelectedProject(project) }}><div className="project-no">{project.number}</div><div className="project-main"><div className="project-top"><span>{project.category}</span><span className="project-open"><ArrowUpRight size={18}/></span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="detail-hint">View details <ArrowUpRight size={13}/></span></div></article>)}</div></section>

      <section id="journal" className="section journal"><div className="journal-card"><div><div className="section-label">03 / CURRENTLY</div><h2>Reading the world<br/><em>between the lines.</em></h2><p>Economics, behavioral finance, AI, Web3, geopolitics and the strange little patterns that connect them.</p></div><div className="stack">{siteConfig.currently.map(([label,value],index) => <div key={label}>{index === 0 ? <BookOpen size={17}/> : index === 1 ? <TrendingUp size={17}/> : <Code2 size={17}/>}<span>{label}</span><b>{value}</b></div>)}</div></div></section>
      <section className="quote"><Quote size={28}/><p>{siteConfig.quote}</p></section>
      <section id="contact" className="section contact"><div className="section-label">04 / CONTACT</div><div className="contact-row"><div><h2>{siteConfig.contact.titleLine1}<br/><em>{siteConfig.contact.titleLine2}</em></h2><p>{siteConfig.contact.description}</p></div><a className="contact-button" href={siteConfig.instagram} target="_blank" rel="noreferrer"><Instagram size={18}/> Start a conversation <ArrowUpRight size={16}/></a></div></section>
    </main>

    <footer><div><a className="brand" href="#top"><span className="brand-mark">J</span><span>{siteConfig.shortName}<i>.</i></span></a><p>Personal portfolio · Indonesia</p></div><div className="footer-links"><a href={siteConfig.github} target="_blank" rel="noreferrer"><Github size={15}/> GitHub</a><a href={siteConfig.instagram} target="_blank" rel="noreferrer"><Instagram size={15}/> @jefrirh_</a></div><small>© 2026 JRH</small></footer>

    {selectedProject && <div className="project-modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={e => e.stopPropagation()}><button className="modal-close glass-icon" onClick={() => setSelectedProject(null)} aria-label="Tutup detail"><X size={18}/></button><span className="modal-number">{selectedProject.number} / PROJECT</span><h2 id="project-title">{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="modal-tags">{selectedProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="modal-link" href={selectedProject.url} target="_blank" rel="noreferrer">Open project <Github size={16}/><ArrowUpRight size={16}/></a></div></div>}
  </div>
}

createRoot(document.getElementById('root')!).render(<App />)
