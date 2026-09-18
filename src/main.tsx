import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { siteConfig } from './config/site'
import './index.css'

type ProjectIndex = number

const sectionItems = [
  ['identity', 'Identity'],
  ['education', 'Education'],
  ['projects', 'Projects'],
  ['links', 'Links'],
] as const

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
}

function isInteractiveKey(event: ReactKeyboardEvent<HTMLButtonElement>) {
  return event.key === 'Enter' || event.key === ' '
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeProject, setActiveProject] = useState<ProjectIndex | null>(null)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [cursorPoint, setCursorPoint] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState('identity')
  const paletteRef = useRef<HTMLElement>(null)
  const paletteInputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return siteConfig.projects
    return siteConfig.projects.filter((project) =>
      [project.title, project.category, project.description, ...project.tags, ...(project.links ?? []).map((link) => link.name)]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    )
  }, [query])

  const closeOverlays = () => {
    setPaletteOpen(false)
    setActiveProject(null)
  }

  const openPalette = () => {
    lastFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setPaletteOpen(true)
  }

  const openProject = (index: ProjectIndex) => {
    lastFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setActiveProject(index)
  }

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        openPalette()
        return
      }

      if (event.key === 'Escape') {
        closeOverlays()
        return
      }

      if (event.key === '/' && !paletteOpen && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault()
        openPalette()
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      setCursorPoint({ x: event.clientX, y: event.clientY })
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollPercent(max > 0 ? (window.scrollY / max) * 100 : 0)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [paletteOpen])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.15, 0.35, 0.6] },
    )

    sectionItems.forEach(([id]) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (paletteOpen) {
      setQuery('')
      requestAnimationFrame(() => paletteInputRef.current?.focus())
      return
    }

    if (activeProject !== null) {
      requestAnimationFrame(() => modalRef.current?.querySelector<HTMLButtonElement>('.dialog-close')?.focus())
      return
    }

    requestAnimationFrame(() => lastFocusedRef.current?.focus())
  }, [paletteOpen, activeProject])

  useEffect(() => {
    const activeDialog = paletteOpen ? paletteRef.current : activeProject !== null ? modalRef.current : null
    if (!activeDialog) return

    const selector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const getFocusable = () => [...activeDialog.querySelectorAll<HTMLElement>(selector)]

    const trap = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const focusable = getFocusable()
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

    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [paletteOpen, activeProject])

  const handlePaletteKeyDown = (event: globalThis.KeyboardEvent) => {
    if (event.key !== 'Enter') return
    const first = filteredProjects[0]
    if (!first) return
    const index = siteConfig.projects.indexOf(first)
    if (index >= 0) {
      setPaletteOpen(false)
      openProject(index)
    }
  }

  const handleMagneticMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || prefersReducedMotion()) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8
    event.currentTarget.style.setProperty('--mx', x.toFixed(2) + 'px')
    event.currentTarget.style.setProperty('--my', y.toFixed(2) + 'px')
  }

  const resetMagnetic = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--mx', '0px')
    event.currentTarget.style.setProperty('--my', '0px')
  }

  const activeProjectData = activeProject === null ? null : siteConfig.projects[activeProject]

  return (
    <div className="site-shell">
      <div className="reticle" style={{ left: cursorPoint.x, top: cursorPoint.y }} aria-hidden="true" />
      <header className="nav">
        <a className="wordmark magnetic" href="#identity" style={{ '--mx': '0px', '--my': '0px' } as React.CSSProperties}>
          <span>JRH</span>
          <i aria-hidden="true">/</i>
        </a>

        <nav aria-label="Main navigation">
          {sectionItems.map(([id, label]) => (
            <a className={activeSection === id ? 'active' : ''} key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        <button
          className="command-trigger magnetic"
          style={{ '--mx': '0px', '--my': '0px' } as React.CSSProperties}
          type="button"
          onPointerMove={handleMagneticMove}
          onPointerLeave={resetMagnetic}
          onClick={openPalette}
          aria-label="Open command palette"
          aria-keyshortcuts="Control+K Meta+K /"
        >
          <span>⌘K</span>
          <b>Command</b>
        </button>
      </header>

      <main>
        <section id="identity" className="hero" aria-labelledby="identity-title">
          <div className="hero-copy boot-sequence">
            <p className="signal-readout">
              <span>01</span>
              <span>IDENTITY</span>
            </p>
            <h1 id="identity-title">{siteConfig.identity.name}</h1>
            <p className="hero-description">{siteConfig.identity.description}</p>
            <div className="hero-rule" aria-hidden="true" />
            <p className="hero-meta">JRH · Independent digital portfolio</p>
          </div>

          <figure className="hero-image boot-sequence">
            <div className="image-frame">
              <img src={siteConfig.identity.profileImage} alt={`Portrait of ${siteConfig.identity.name}`} width="640" height="800" />
              <span className="image-reticle" aria-hidden="true" />
            </div>
            <figcaption>
              <span>JRH</span>
              <span>PORTRAIT</span>
            </figcaption>
          </figure>
        </section>

        <section id="education" className="section" aria-labelledby="education-title">
          <div className="section-head">
            <span className="section-index">02</span>
            <h2 id="education-title">Education</h2>
          </div>
          <div className="records">
            {siteConfig.education.length ? siteConfig.education.map((item) => (
              <article className="record" key={item.period + item.institution}>
                <time>{item.period}</time>
                <div>
                  <h3>{item.institution}</h3>
                  <p>{item.program}</p>
                  {item.detail && <small>{item.detail}</small>}
                </div>
              </article>
            )) : <p className="empty-state">Education data will appear here.</p>}
          </div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-title">
          <div className="section-head">
            <span className="section-index">03</span>
            <div>
              <h2 id="projects-title">Projects &amp; Channels</h2>
              <p className="section-note">A working index of current digital channels and distribution points.</p>
            </div>
          </div>

          <div className="project-grid">
            {siteConfig.projects.map((project, index) => (
              <article className="project" key={project.title}>
                <button
                  type="button"
                  className="project-button"
                  onClick={() => openProject(index)}
                  onPointerMove={handleMagneticMove}
                  onPointerLeave={resetMagnetic}
                  onKeyDown={(event) => {
                    if (isInteractiveKey(event)) {
                      event.currentTarget.style.setProperty('--pressed-scale', '0.98')
                      requestAnimationFrame(() => event.currentTarget.style.setProperty('--pressed-scale', '1'))
                    }
                  }}
                  style={{ '--mx': '0px', '--my': '0px', '--pressed-scale': '1' } as React.CSSProperties}
                  aria-label={`View details for ${project.title}`}
                >
                  <span className="project-signal" aria-hidden="true" />
                  <span className="project-index">{project.number}</span>
                  <div>
                    <p className="project-category">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <span className="arrow" aria-hidden="true">↗</span>
                </button>
                <div className="tag-row" aria-label={`${project.title} tags`}>
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="links" className="section" aria-labelledby="links-title">
          <div className="section-head">
            <span className="section-index">04</span>
            <h2 id="links-title">Links</h2>
          </div>
          <div className="links-list">
            {Object.entries(siteConfig.social).filter(([, url]) => url).map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noreferrer">
                <span>{name}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <span>JRH</span>
        <span>Jefri Rahman Hakim</span>
        <span>{siteConfig.identity.title}</span>
      </footer>

      {activeProjectData && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.currentTarget === event.target) setActiveProject(null)
        }}>
          <section className="modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="dialog-close" type="button" onClick={() => setActiveProject(null)} aria-label="Close project details">×</button>
            <p className="signal-readout"><span>{activeProjectData.number}</span><span>DETAIL</span></p>
            <h2 id="modal-title">{activeProjectData.title}</h2>
            <p>{activeProjectData.description}</p>
            <div className="modal-links">
              {(activeProjectData.links ?? []).map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                  <span>{link.name}{link.handle ? ` — ${link.handle}` : ''}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
              <a href={activeProjectData.url} target="_blank" rel="noreferrer">
                <span>Open primary link</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>
        </div>
      )}

      {paletteOpen && (
        <div className="palette-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.currentTarget === event.target) setPaletteOpen(false)
        }}>
          <section className="palette" ref={paletteRef} role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(event) => event.stopPropagation()}>
            <div className="palette-topline">
              <span>COMMAND</span>
              <span>/{siteConfig.projects.length.toString().padStart(2, '0')}</span>
            </div>
            <input
              ref={paletteInputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handlePaletteKeyDown}
              placeholder="Search sections and projects…"
              aria-label="Search sections and projects"
            />
            <div className="command-list">
              {sectionItems.map(([id, label]) => {
                const matches = label.toLowerCase().includes(query.trim().toLowerCase())
                if (!matches) return null
                return (
                  <button key={id} type="button" onClick={() => scrollToId(id)}>
                    <span>{label}</span><kbd>↵</kbd>
                  </button>
                )
              })}
              {filteredProjects.map((project, index) => {
                const originalIndex = siteConfig.projects.indexOf(project)
                return (
                  <button key={project.title} type="button" onClick={() => {
                    setPaletteOpen(false)
                    openProject(originalIndex >= 0 ? originalIndex : index)
                  }}>
                    <span>{project.title}</span><kbd>{project.number}</kbd>
                  </button>
                )
              })}
              {!filteredProjects.length && !sectionItems.some(([, label]) => label.toLowerCase().includes(query.trim().toLowerCase())) && (
                <p className="empty-state">No matching signal.</p>
              )}
            </div>
          </section>
        </div>
      )}

      <div className="scroll-dial" aria-hidden="true">
        <span>READ</span>
        <div className="dial-track"><i style={{ transform: `rotate(${-115 + scrollPercent * 2.3}deg)` }} /></div>
        <strong>{Math.round(scrollPercent).toString().padStart(3, '0')}</strong>
      </div>
    </div>
  )
}
