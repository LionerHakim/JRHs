import { useEffect, useRef, useState } from 'react'
import { siteConfig } from './config/site'
import './index.css'

const sections = [['identity', 'Identity'], ['education', 'Education'], ['projects', 'Projects'], ['links', 'Links']] as const

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setPaletteOpen(false)
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setPaletteOpen(true) }
      if (event.key === 'Escape') { setPaletteOpen(false); setActiveProject(null) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (paletteOpen) { setQuery(''); requestAnimationFrame(() => inputRef.current?.focus()) }
  }, [paletteOpen])

  const commands = [
    ...sections.map(([id, label]) => ({ label: `Go to ${label}`, action: () => go(id) })),
    { label: 'Open GitHub', action: () => window.open(siteConfig.social.github, '_blank', 'noopener,noreferrer') },
    { label: 'Open Portfolio', action: () => window.open(siteConfig.social.portfolio, '_blank', 'noopener,noreferrer') },
  ]
  const filtered = commands.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))

  return <div className="site-shell">
    <header className="nav">
      <a className="wordmark" href="#identity" aria-label="JRH home">JRH<span>/</span></a>
      <nav aria-label="Main navigation">{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <button className="command-trigger" type="button" onClick={() => setPaletteOpen(true)} aria-label="Open command palette"><span>⌘K</span><b>Command</b></button>
    </header>

    <main>
      <section id="identity" className="hero" aria-labelledby="identity-title">
        <div className="hero-copy"><p className="eyebrow">01 / IDENTITY</p><h1 id="identity-title">{siteConfig.identity.name}</h1><p className="hero-description">{siteConfig.identity.description}</p></div>
        <figure className="hero-image"><img src={siteConfig.identity.profileImage} alt={`${siteConfig.identity.name} — JRH`} /><figcaption>JRH</figcaption></figure>
      </section>

      <section id="education" className="section" aria-labelledby="education-title">
        <div className="section-head"><span>02</span><h2 id="education-title">Education</h2></div>
        <div className="records">{siteConfig.education.map((item) => <article className="record" key={item.period + item.institution}><time>{item.period}</time><div><h3>{item.institution}</h3><p>{item.program}</p><small>{item.detail}</small></div></article>)}</div>
      </section>

      <section id="projects" className="section" aria-labelledby="projects-title">
        <div className="section-head"><span>03</span><h2 id="projects-title">Projects & Channels</h2></div>
        <div className="project-grid">{siteConfig.projects.map((project, index) => <article className="project" key={project.number}>
          <button type="button" className="project-button" onClick={() => setActiveProject(index)} aria-label={`View ${project.title}`}><span className="project-number">{project.number}</span><div><p className="project-category">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p></div><span className="arrow" aria-hidden="true">↗</span></button>
          <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </article>)}</div>
      </section>

      <section id="links" className="section" aria-labelledby="links-title">
        <div className="section-head"><span>04</span><h2 id="links-title">Links</h2></div>
        <div className="links-list">{Object.entries(siteConfig.social).filter(([, url]) => url).map(([name, url]) => <a key={name} href={url} target="_blank" rel="noreferrer"><span>{name}</span><span>↗</span></a>)}</div>
      </section>
    </main>

    <footer><span>JRH</span><span>Jefri Rahman Hakim</span><span>Digital Portfolio</span></footer>

    {activeProject !== null && <div className="modal-backdrop" role="presentation" onMouseDown={() => setActiveProject(null)}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(e) => e.stopPropagation()}>
        <button className="close" type="button" onClick={() => setActiveProject(null)} aria-label="Close">×</button>
        <p className="eyebrow">{siteConfig.projects[activeProject].number} / DETAIL</p><h2 id="modal-title">{siteConfig.projects[activeProject].title}</h2><p>{siteConfig.projects[activeProject].description}</p>
        <div className="modal-links">{siteConfig.projects[activeProject].links?.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.name}{link.handle ? ` · ${link.handle}` : ''} ↗</a>)}<a href={siteConfig.projects[activeProject].url} target="_blank" rel="noreferrer">Open primary link ↗</a></div>
      </section>
    </div>}

    {paletteOpen && <div className="palette-backdrop" role="presentation" onMouseDown={() => setPaletteOpen(false)}>
      <section className="palette" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(e) => e.stopPropagation()}>
        <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type a command…" aria-label="Search commands" />
        <div className="command-list">{filtered.map((item) => <button key={item.label} type="button" onClick={item.action}>{item.label}<span>↵</span></button>)}{!filtered.length && <p>No matching command.</p>}</div>
      </section>
    </div>}
  </div>
}
