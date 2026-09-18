import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { siteConfig } from './config/site'
import './index.css'

const sectionItems = [
  ['identity', 'About'],
  ['education', 'Experience'],
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
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState('identity')
  const lastFocused = useRef<HTMLElement | null>(null)
  const paletteRef = useRef<HTMLElement>(null)
  const paletteInputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLElement>(null)

  const normalized = query.trim().toLowerCase()
  const filteredProjects = useMemo(() => {
    if (!normalized) return siteConfig.projects
    return siteConfig.projects.filter((project) =>
      [project.title, ...(project.links ?? []).flatMap((link) => [link.name, link.handle ?? ''])]
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
    setPaletteOpen(true)
    setActiveProject(null)
  }

  const openProject = (index: number) => {
    rememberFocus()
    setActiveProject(index)
    setPaletteOpen(false)
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
        return
      }
      if (event.key === 'Escape') {
        closeAll()
        return
      }
      if (event.key === '/' && !paletteOpen && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault()
        openPalette()
      }
    }
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') setCursor({ x: event.clientX, y: event.clientY })
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollPercent(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [paletteOpen])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
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

  const magnetic = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || reducedMotion()) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', (((event.clientX - rect.left) / rect.width - .5) * 5).toFixed(2) + 'px')
    event.currentTarget.style.setProperty('--my', (((event.clientY - rect.top) / rect.height - .5) * 5).toFixed(2) + 'px')
  }

  const resetMagnetic = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--mx', '0px')
    event.currentTarget.style.setProperty('--my', '0px')
  }

  return (
    <div className="site-shell">
      <div className="reticle" style={{ left: cursor.x, top: cursor.y }} aria-hidden="true" />

      <header className="nav">
        <a className="wordmark magnetic" href="#identity" style={{ '--mx': '0px', '--my': '0px' } as CSSProperties}>JRH<span>/</span></a>
        <nav aria-label="Primary navigation">
          {sectionItems.map(([id, label]) => (
            <a key={id} className={activeSection === id ? 'active' : ''} href={`#${id}`}>{label}</a>
          ))}
        </nav>
        <button className="command-trigger magnetic" type="button" onClick={openPalette} onPointerMove={magnetic} onPointerLeave={resetMagnetic} aria-label="Open command palette" aria-keyshortcuts="Control+K Meta+K /">
          <kbd>⌘K</kbd><span>Command</span>
        </button>
      </header>

      <main>
        <section id="identity" className="hero" aria-labelledby="identity-title">
          <div className="hero-copy boot">
            <p className="readout"><span>SIGNAL</span><b>01</b></p>
            <h1 id="identity-title">{siteConfig.identity.name}</h1>
            <p className="hero-description">{siteConfig.identity.description}</p>
            <div className="hero-line" />
            <p className="hero-meta">JRH / Independent digital portfolio</p>
          </div>
          <figure className="hero-portrait boot">
            <div className="portrait-frame">
              <img src={siteConfig.identity.profileImage} alt={siteConfig.identity.name} width="640" height="800" fetchPriority="high" />
              <span className="portrait-mark" aria-hidden="true" />
            </div>
            <figcaption><span>PORTRAIT</span><span>JRH</span></figcaption>
          </figure>
        </section>

        <section id="education" className="section" aria-labelledby="education-title">
          <div className="section-head"><p className="readout"><span>RECORD</span><b>02</b></p><h2 id="education-title">Experience</h2></div>
          <div className="records">
            {siteConfig.education.map((item) => (
              <article className="record" key={item.period + item.institution}>
                <time>{item.period}</time>
                <div><h3>{item.institution}</h3><p>{item.program}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-title">
          <div className="section-head"><p className="readout"><span>INDEX</span><b>03</b></p><h2 id="projects-title">Projects</h2></div>
          <div className="project-grid">
            {siteConfig.projects.map((project, index) => (
              <article className="project" key={project.title}>
                <button
                  className="project-button magnetic"
                  type="button"
                  onClick={() => openProject(index)}
                  onPointerMove={magnetic}
                  onPointerLeave={resetMagnetic}
                  style={{ '--mx': '0px', '--my': '0px' } as CSSProperties}
                  aria-label={`Open ${project.title}`}
                >
                  <span className="project-number">{project.number}</span>
                  <span className="project-name">{project.title}</span>
                  <span className="project-open" aria-hidden="true">↗</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="links" className="section contact" aria-labelledby="links-title">
          <div className="section-head"><p className="readout"><span>CONTACT</span><b>04</b></p><h2 id="links-title">Contact</h2></div>
          <div className="links-list">
            {Object.entries(siteConfig.social).filter(([, url]) => url).map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noreferrer"><span>{name}</span><span>↗</span></a>
            ))}
          </div>
        </section>
      </main>

      <footer><span>JRH</span><span>Jefri Rahman Hakim</span><span>JRH Digital Portfolio</span></footer>

      {activeProject !== null && (
        <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveProject(null) }}>
          <section className="dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="dialog-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="dialog-close" type="button" onClick={() => setActiveProject(null)} aria-label="Close">×</button>
            <p className="readout"><span>PROJECT</span><b>{siteConfig.projects[activeProject].number}</b></p>
            <h2 id="dialog-title">{siteConfig.projects[activeProject].title}</h2>
            <div className="dialog-links">
              {(siteConfig.projects[activeProject].links ?? []).map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer"><span>{link.name}{link.handle ? ` / ${link.handle}` : ''}</span><span>↗</span></a>
              ))}
              <a href={siteConfig.projects[activeProject].url} target="_blank" rel="noreferrer"><span>Open</span><span>↗</span></a>
            </div>
          </section>
        </div>
      )}

      {paletteOpen && (
        <div className="overlay palette-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPaletteOpen(false) }}>
          <section className="palette" ref={paletteRef} role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(event) => event.stopPropagation()}>
            <div className="palette-head"><span>COMMAND</span><span>{siteConfig.projects.length.toString().padStart(2, '0')} SIGNALS</span></div>
            <input ref={paletteInputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or sections" aria-label="Search projects or sections" />
            <div className="command-list">
              {sectionItems.map(([id, label]) => label.toLowerCase().includes(normalized) && (
                <button key={id} type="button" onClick={() => { setPaletteOpen(false); scrollToId(id) }}><span>{label}</span><kbd>↵</kbd></button>
              ))}
              {filteredProjects.map((project, index) => (
                <button key={project.title} type="button" onClick={() => openProject(siteConfig.projects.indexOf(project) >= 0 ? siteConfig.projects.indexOf(project) : index)}>
                  <span>{project.title}</span><kbd>{project.number}</kbd>
                </button>
              ))}
              {!filteredProjects.length && !sectionItems.some(([, label]) => label.toLowerCase().includes(normalized)) && <p>No matching signal.</p>}
            </div>
          </section>
        </div>
      )}

      <div className="scroll-dial" aria-hidden="true">
        <span>READ</span>
        <div className="dial"><i style={{ transform: `rotate(${-115 + scrollPercent * 2.3}deg)` }} /></div>
        <b>{Math.round(scrollPercent).toString().padStart(3, '0')}</b>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('JRH root element not found')
import { createRoot } from 'react-dom/client'
createRoot(rootElement).render(<App />)
