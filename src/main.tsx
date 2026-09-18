import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { siteConfig } from './config/site'
import './index.css'

const sectionItems = [
  ['identity', 'About'],
  ['education', 'Education'],
  ['projects', 'Projects'],
  ['links', 'Contact'],
] as const

function reducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: reducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [activeSection, setActiveSection] = useState('identity')
  const lastFocused = useRef<HTMLElement | null>(null)
  const paletteRef = useRef<HTMLElement>(null)
  const paletteInputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLElement>(null)

  const normalized = query.trim().toLowerCase()
  const filteredProjects = useMemo(() => {
    if (!normalized) return siteConfig.projects
    return siteConfig.projects.filter((project) =>
      [project.title, ...(project.links ?? []).flatMap((link) => [link.name, 'handle' in link ? link.handle : ''])]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    )
  }, [normalized])

  const rememberFocus = () => {
    lastFocused.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
  }
  const openPalette = () => {
    rememberFocus()
    setActiveProject(null)
    setPaletteOpen(true)
  }
  const openProject = (index: number) => {
    rememberFocus()
    setPaletteOpen(false)
    setActiveProject(index)
  }
  const closeAll = () => {
    setPaletteOpen(false)
    setActiveProject(null)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        openPalette()
      } else if (event.key === 'Escape') {
        closeAll()
      } else if (
        event.key === '/' &&
        !paletteOpen &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement)
      ) {
        event.preventDefault()
        openPalette()
      }
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollPercent(max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onScroll)
    }
  }, [paletteOpen])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) setActiveSection(visible[0].target.id)
    }, { rootMargin: '-18% 0px -58% 0px', threshold: [0.15, 0.35, 0.6] })

    sectionItems.forEach(([id]) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const active = paletteOpen ? paletteRef.current : activeProject !== null ? dialogRef.current : null
    if (!active) {
      requestAnimationFrame(() => lastFocused.current?.focus())
      return
    }

    requestAnimationFrame(() => {
      if (paletteOpen) paletteInputRef.current?.focus()
      else dialogRef.current?.querySelector<HTMLButtonElement>('.dialog-close')?.focus()
    })

    const selector = 'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])'
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const nodes = [...active.querySelectorAll<HTMLElement>(selector)]
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [paletteOpen, activeProject])

  return (
    <div className="site-shell">
      <header className="nav">
        <a className="wordmark" href="#identity" aria-label="JRH home">
          <span className="brand-mark" aria-hidden="true">J</span>
          <span>JRH</span>
        </a>

        <nav aria-label="Primary navigation">
          {sectionItems.map(([id, label]) => (
            <a key={id} className={activeSection === id ? 'active' : ''} href={`#${id}`} aria-current={activeSection === id ? 'page' : undefined}>
              {label}
            </a>
          ))}
        </nav>

        <button
          className="command-trigger"
          type="button"
          onClick={openPalette}
          aria-label="Open command palette"
          aria-keyshortcuts="Control+K Meta+K /"
        >
          <kbd>⌘K</kbd><span>Search</span>
        </button>
      </header>

      <main>
        <section id="identity" className="hero" aria-labelledby="identity-title">
          <div className="hero-copy">
            <p className="section-kicker">PORTFOLIO</p>
            <h1 id="identity-title">{siteConfig.identity.name}</h1>
            <p className="hero-description">{siteConfig.identity.description}</p>
            <div className="hero-actions">
              <a className="hero-pill" href="#projects">Explore projects</a>
              <a className="ghost-pill" href="#links">Contact</a>
            </div>
          </div>

          <figure className="hero-portrait">
            <div className="portrait-frame">
              <img src={siteConfig.identity.profileImage} alt={siteConfig.identity.name} width="640" height="800" fetchPriority="high" />
            </div>
          </figure>
        </section>

        <section id="education" className="section" aria-labelledby="education-title">
          <div className="section-head">
            <p className="section-kicker">EDUCATION</p>
            <h2 id="education-title">Education</h2>
          </div>
          <p className="editorial-copy">A concise record of the education currently represented in this portfolio.</p>
          <div className="records" style={{ marginTop: 36 }}>
            {siteConfig.education.map((item) => (
              <article className="record" key={item.period + item.institution}>
                <time>{item.period}</time>
                <div><h3>{item.institution}</h3><p>{item.program}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-title">
          <div className="section-head">
            <p className="section-kicker">WORK</p>
            <h2 id="projects-title">Projects</h2>
          </div>
          <p className="editorial-copy">Selected digital destinations and publishing channels represented by the current portfolio data.</p>
          <div className="project-list" style={{ marginTop: 36 }}>
            {siteConfig.projects.map((project, index) => (
              <article className="project" key={project.title}>
                <span className="project-number">{project.number}</span>
                <span className="project-name">{project.title}</span>
                <button className="project-button" type="button" onClick={() => openProject(index)} aria-label={`Open details for ${project.title}`}>
                  View
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="links" className="section" aria-labelledby="links-title">
          <div className="section-head">
            <p className="section-kicker">CONTACT</p>
            <h2 id="links-title">Contact</h2>
          </div>
          <div className="links-list">
            {Object.entries(siteConfig.social).filter(([, url]) => url).map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noreferrer">
                <span>{name === "instagram" ? "Instagram" : name === "github" ? "GitHub" : name === "telegram" ? "Telegram" : name === "portfolio" ? "Website" : name}</span>
                <small>Open</small>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <strong>JRH</strong>
        <span>Digital Portfolio</span>
      </footer>

      {activeProject !== null && (
        <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveProject(null) }}>
          <section className="dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="dialog-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="dialog-close" type="button" onClick={() => setActiveProject(null)} aria-label="Close">×</button>
            <p className="section-kicker">PROJECT</p>
            <h2 id="dialog-title">{siteConfig.projects[activeProject].title}</h2>
            <div className="dialog-links">
              {(siteConfig.projects[activeProject].links ?? []).map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                  <span>{link.name}{('handle' in link && link.handle) ? ` · ${link.handle}` : ''}</span>
                  <span>Open</span>
                </a>
              ))}
              <a href={siteConfig.projects[activeProject].url} target="_blank" rel="noreferrer">
                <span>Primary link</span><span>Open</span>
              </a>
            </div>
          </section>
        </div>
      )}

      {paletteOpen && (
        <div className="overlay palette-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPaletteOpen(false) }}>
          <section className="palette" ref={paletteRef} role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(event) => event.stopPropagation()}>
            <div className="palette-head"><span>COMMAND</span><span>{siteConfig.projects.length} projects</span></div>
            <input ref={paletteInputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or sections" aria-label="Search projects or sections" />
            <div className="command-list">
              {sectionItems.map(([id, label]) => label.toLowerCase().includes(normalized) && (
                <button key={id} type="button" onClick={() => { setPaletteOpen(false); scrollToId(id) }}>
                  <span>{label}</span><kbd>Enter</kbd>
                </button>
              ))}
              {filteredProjects.map((project) => (
                <button key={project.title} type="button" onClick={() => openProject(siteConfig.projects.indexOf(project))}>
                  <span>{project.title}</span><kbd>{project.number}</kbd>
                </button>
              ))}
              {!filteredProjects.length && !sectionItems.some(([, label]) => label.toLowerCase().includes(normalized)) && <p>No matching result.</p>}
            </div>
          </section>
        </div>
      )}

      <div className="scroll-dial" aria-hidden="true">
        <span>READ</span>
        <div className="dial"><i style={{ transform: `rotate(${-115 + scrollPercent * 2.3}deg)` }} /></div>
        <span>{Math.round(scrollPercent)}%</span>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('JRH root element not found')
createRoot(rootElement).render(<App />)
