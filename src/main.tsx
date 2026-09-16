import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, BookOpen, Code2, ExternalLink, Instagram, Menu, Moon, Play, Quote, Sun, TrendingUp, X } from 'lucide-react'
import './index.css'

const projects = [
  { n: '01', t: 'JRH Portfolio', k: 'Personal brand', d: 'A living portfolio for economics, technology, markets and experiments.', tags: ['React', 'Vite', 'TypeScript'], url: 'https://github.com/LionerHakim/JRHs' },
  { n: '02', t: 'KitaBisa.com', k: 'Web experiment', d: 'A focused interface study exploring familiar product patterns and interaction.', tags: ['Web', 'UI', 'Experiment'], url: 'https://github.com/LionerHakim/KITABISA.COM' },
  { n: '03', t: 'Ultah', k: 'Creative web', d: 'A playful interactive web experience built around storytelling and motion.', tags: ['Creative', 'Web', 'Motion'], url: 'https://github.com/LionerHakim/Ultah' },
]

function App() {
  const [dark, setDark] = useState(false)
  const [menu, setMenu] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  }, [dark])

  useEffect(() => {
    const close = () => setMenu(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  const go = (id: string) => {
    setMenu(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="app">
      <header className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="JRH home">JRH<span>.</span></a>
        <nav className={menu ? 'open' : ''} aria-label="Primary">
          <a href="#about" onClick={() => setMenu(false)}>About</a>
          <a href="#work" onClick={() => setMenu(false)}>Work</a>
          <a href="#journal" onClick={() => setMenu(false)}>Journal</a>
          <a href="#contact" onClick={() => setMenu(false)}>Contact</a>
        </nav>
        <div className="nav-actions">
          <button className="glass-icon" type="button" onClick={() => setPlaying(v => !v)} aria-label={playing ? 'Pause music' : 'Play music'} aria-pressed={playing}>
            <Play size={15} fill={playing ? 'currentColor' : 'none'} />
          </button>
          <button className="glass-icon" type="button" onClick={() => setDark(v => !v)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={dark}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="mobile-menu glass-icon" type="button" onClick={() => setMenu(v => !v)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
            {menu ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status" /> AVAILABLE FOR SELECTED PROJECTS</div>
            <h1>Think deeply.<br /><em>Build boldly.</em></h1>
            <p>Jefri Rahman Hakim — economics student, market observer and digital maker exploring the space between ideas, technology and people.</p>
            <div className="hero-actions">
              <button className="button primary" type="button" onClick={() => go('work')}>Explore work <ArrowUpRight size={16} /></button>
              <a className="text-link" href="https://instagram.com/jefrirh_" target="_blank" rel="noreferrer">Instagram <ExternalLink size={13} /></a>
            </div>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit-card"><span>JRH</span><strong>23</strong><small>years of curiosity</small></div>
            <div className="orbit-dot one" /><div className="orbit-dot two" />
          </div>
        </section>

        <section className="ticker" aria-label="Interests">
          <span>ECONOMICS</span><span className="ticker-sep">—</span><span>MARKETS</span><span className="ticker-sep">—</span><span>TECHNOLOGY</span><span className="ticker-sep">—</span><span>EXPERIMENTS</span><span className="ticker-sep">—</span><span>IDEAS</span>
        </section>

        <section id="about" className="section about">
          <div className="section-label">01 / ABOUT</div>
          <div className="about-grid">
            <div><h2>Curiosity is<br /><em>the common thread.</em></h2></div>
            <div><p className="lead">I like turning questions into things people can see, use, test and understand.</p><p>My work sits across development economics, financial literacy, investing, AI and the web. This portfolio is the small digital laboratory where those interests meet.</p>
              <div className="facts"><div><b>2021</b><span>Started at UII</span></div><div><b>ECON</b><span>Development Economics</span></div><div><b>JRH</b><span>Independent projects</span></div></div>
            </div>
          </div>
        </section>

        <section id="work" className="section work">
          <div className="section-head"><div><div className="section-label">02 / SELECTED WORK</div><h2>Things I’ve<br /><em>made.</em></h2></div><span className="count">03 projects</span></div>
          <div className="project-list">{projects.map(p => <article className="project" key={p.t}><div className="project-no">{p.n}</div><div className="project-main"><div className="project-top"><span>{p.k}</span><a href={p.url} target="_blank" rel="noreferrer" aria-label={`Open ${p.t} on GitHub`}><ArrowUpRight size={18} /></a></div><h3>{p.t}</h3><p>{p.d}</p><div className="tags">{p.tags.map(x => <span key={x}>{x}</span>)}</div></div></article>)}</div>
        </section>

        <section id="journal" className="section journal">
          <div className="journal-card"><div><div className="section-label">03 / CURRENTLY</div><h2>Reading the world<br /><em>between the lines.</em></h2><p>Economics, behavioral finance, AI, Web3, geopolitics and the strange little patterns that connect them.</p></div>
            <div className="stack"><div><BookOpen size={17} /><span>Reading</span><b>Books & research</b></div><div><TrendingUp size={17} /><span>Markets</span><b>Macro & investing</b></div><div><Code2 size={17} /><span>Building</span><b>Web & AI</b></div></div>
          </div>
        </section>

        <section className="quote"><Quote size={28} /><p>“Berpikir, membangun, dan terus mengeksplorasi.”</p></section>

        <section id="contact" className="section contact">
          <div className="section-label">04 / CONTACT</div><div className="contact-row"><div><h2>Have an idea?<br /><em>Let’s talk.</em></h2><p>Open to thoughtful collaborations, experiments and conversations.</p></div><a className="contact-button" href="https://instagram.com/jefrirh_" target="_blank" rel="noreferrer"><Instagram size={18} /> Start a conversation <ArrowUpRight size={16} /></a></div>
        </section>
      </main>

      <footer><div><a className="brand" href="#top">JRH<span>.</span></a><p>Personal portfolio · Indonesia</p></div><a href="https://instagram.com/jefrirh_" target="_blank" rel="noreferrer"><Instagram size={17} /> @jefrirh_</a><small>© 2026 JRH</small></footer>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
