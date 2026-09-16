import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, BookOpen, Code2, ExternalLink, Instagram, Menu, Moon, Quote, Sun, TrendingUp, Volume2, VolumeX, X } from 'lucide-react'
import './index.css'

const projects = [
  { n: '01', t: 'JRH Portfolio', k: 'Personal brand', d: 'A living portfolio for economics, technology, markets and experiments.', tags: ['React', 'Vite', 'TypeScript'], url: 'https://github.com/LionerHakim/JRHs' },
  { n: '02', t: 'KitaBisa.com', k: 'Web experiment', d: 'A focused interface study exploring familiar product patterns and interaction.', tags: ['Web', 'UI', 'Experiment'], url: 'https://github.com/LionerHakim/KITABISA.COM' },
  { n: '03', t: 'Ultah', k: 'Creative web', d: 'A playful interactive web experience built around storytelling and motion.', tags: ['Creative', 'Web', 'Motion'], url: 'https://github.com/LionerHakim/Ultah' },
]

function getSavedTheme() {
  try { return localStorage.getItem('jrh-theme') === 'dark' } catch { return false }
}

function App() {
  const [dark, setDark] = useState(getSavedTheme)
  const [menu, setMenu] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [photoFailed, setPhotoFailed] = useState(false)
  const audioRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    try { localStorage.setItem('jrh-theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  useEffect(() => {
    const close = () => setMenu(false)
    const onPointer = (event: PointerEvent) => {
      if (!(event.target as HTMLElement).closest('.nav')) setMenu(false)
    }
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (event.key === 'Escape') setMenu(false)
      if ((event.ctrlKey || event.metaKey) && ['c', 'x', 'u', 's', 'p', 'a'].includes(key)) event.preventDefault()
    }
    const prevent = (event: Event) => event.preventDefault()
    window.addEventListener('resize', close)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('contextmenu', prevent)
    document.addEventListener('selectstart', prevent)
    document.addEventListener('dragstart', prevent)
    document.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('resize', close)
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('contextmenu', prevent)
      document.removeEventListener('selectstart', prevent)
      document.removeEventListener('dragstart', prevent)
      document.removeEventListener('keydown', onKey)
      if (timerRef.current) window.clearInterval(timerRef.current)
      void audioRef.current?.close()
    }
  }, [])

  const toggleMusic = async () => {
    if (playing) {
      if (timerRef.current) window.clearInterval(timerRef.current)
      timerRef.current = null
      await audioRef.current?.close()
      audioRef.current = null
      setPlaying(false)
      return
    }
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    await ctx.resume()
    audioRef.current = ctx
    const master = ctx.createGain()
    master.gain.value = 0.16
    master.connect(ctx.destination)
    const playMelody = () => {
      if (ctx.state !== 'running') return
      const now = ctx.currentTime
      const notes = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23]
      notes.forEach((frequency, index) => {
        const start = now + index * 0.38
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = frequency
        gain.gain.setValueAtTime(0.0001, start)
        gain.gain.exponentialRampToValueAtTime(0.11, start + 0.035)
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.34)
        osc.connect(gain).connect(master)
        osc.start(start)
        osc.stop(start + 0.36)
      })
    }
    playMelody()
    timerRef.current = window.setInterval(playMelody, 3100)
    setPlaying(true)
  }

  const go = (id: string) => {
    setMenu(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="app">
      <header className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="JRH home" onClick={() => setMenu(false)}>JRH<span>.</span></a>
        <nav id="primary-navigation" className={menu ? 'open' : ''} aria-label="Primary navigation">
          <a href="#about" onClick={() => go('about')}>About</a>
          <a href="#work" onClick={() => go('work')}>Work</a>
          <a href="#journal" onClick={() => go('journal')}>Journal</a>
          <a href="#contact" onClick={() => go('contact')}>Contact</a>
        </nav>
        <div className="nav-actions">
          <button className="glass-icon" type="button" onClick={toggleMusic} aria-label={playing ? 'Matikan musik' : 'Putar musik'} aria-pressed={playing}>{playing ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
          <button className="glass-icon" type="button" onClick={() => setDark(v => !v)} aria-label={dark ? 'Aktifkan light mode' : 'Aktifkan dark mode'} aria-pressed={dark}>{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
          <button className="mobile-menu glass-icon" type="button" onClick={() => setMenu(v => !v)} aria-label={menu ? 'Tutup menu' : 'Buka menu'} aria-expanded={menu} aria-controls="primary-navigation">{menu ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status" /> AVAILABLE FOR SELECTED PROJECTS</div>
            <h1>Think deeply.<br /><em>Build boldly.</em></h1>
            <p>Jefri Rahman Hakim — economics student, market observer and digital maker exploring the space between ideas, technology and people.</p>
            <div className="hero-actions"><button className="button primary" type="button" onClick={() => go('work')}>Explore work <ArrowUpRight size={16} /></button><a className="text-link" href="https://instagram.com/jefrirh_" target="_blank" rel="noreferrer">Instagram <ExternalLink size={13} /></a></div>
          </div>
          <div className="hero-orbit">
            <div className="profile-photo-wrap">{photoFailed ? <div className="profile-fallback" aria-label="JRH">JRH</div> : <img className="profile-photo" src="https://github.com/LionerHakim.png?size=512" alt="Jefri Rahman Hakim" draggable="false" onError={() => setPhotoFailed(true)} />}</div>
            <div className="orbit-card"><span>JRH</span><strong>23</strong><small>years of curiosity</small></div>
            <div className="orbit-dot one" /><div className="orbit-dot two" />
          </div>
        </section>

        <section className="ticker" aria-label="Interests"><span>ECONOMICS</span><span className="ticker-sep">—</span><span>MARKETS</span><span className="ticker-sep">—</span><span>TECHNOLOGY</span><span className="ticker-sep">—</span><span>EXPERIMENTS</span><span className="ticker-sep">—</span><span>IDEAS</span></section>
        <section id="about" className="section about"><div className="section-label">01 / ABOUT</div><div className="about-grid"><div><h2>Curiosity is<br /><em>the common thread.</em></h2></div><div><p className="lead">I like turning questions into things people can see, use, test and understand.</p><p>My work sits across development economics, financial literacy, investing, AI and the web. This portfolio is the small digital laboratory where those interests meet.</p><div className="facts"><div><b>2021</b><span>Started at UII</span></div><div><b>ECON</b><span>Development Economics</span></div><div><b>JRH</b><span>Independent projects</span></div></div></div></div></section>
        <section id="work" className="section work"><div className="section-head"><div><div className="section-label">02 / SELECTED WORK</div><h2>Things I’ve<br /><em>made.</em></h2></div><span className="count">03 projects</span></div><div className="project-list">{projects.map(p => <article className="project" key={p.t}><div className="project-no">{p.n}</div><div className="project-main"><div className="project-top"><span>{p.k}</span><a href={p.url} target="_blank" rel="noreferrer" aria-label={`Open ${p.t} on GitHub`}><ArrowUpRight size={18} /></a></div><h3>{p.t}</h3><p>{p.d}</p><div className="tags">{p.tags.map(x => <span key={x}>{x}</span>)}</div></div></article>)}</div></section>
        <section id="journal" className="section journal"><div className="journal-card"><div><div className="section-label">03 / CURRENTLY</div><h2>Reading the world<br /><em>between the lines.</em></h2><p>Economics, behavioral finance, AI, Web3, geopolitics and the strange little patterns that connect them.</p></div><div className="stack"><div><BookOpen size={17} /><span>Reading</span><b>Books & research</b></div><div><TrendingUp size={17} /><span>Markets</span><b>Macro & investing</b></div><div><Code2 size={17} /><span>Building</span><b>Web & AI</b></div></div></div></section>
        <section className="quote"><Quote size={28} /><p>“Berpikir, membangun, dan terus mengeksplorasi.”</p></section>
        <section id="contact" className="section contact"><div className="section-label">04 / CONTACT</div><div className="contact-row"><div><h2>Have an idea?<br /><em>Let’s talk.</em></h2><p>Open to thoughtful collaborations, experiments and conversations.</p></div><a className="contact-button" href="https://instagram.com/jefrirh_" target="_blank" rel="noreferrer"><Instagram size={18} /> Start a conversation <ArrowUpRight size={16} /></a></div></section>
      </main>
      <footer><div><a className="brand" href="#top">JRH<span>.</span></a><p>Personal portfolio · Indonesia</p></div><a href="https://instagram.com/jefrirh_" target="_blank" rel="noreferrer"><Instagram size={17} /> @jefrirh_</a><small>© 2026 JRH</small></footer>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
