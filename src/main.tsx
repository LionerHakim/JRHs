import { createRoot } from 'react-dom/client'
import { siteConfig } from './config/site'
import './index.css'

const sectionItems = [
  ['identity', 'About'],
  ['education', 'Education'],
  ['projects', 'Projects'],
  ['links', 'Contact'],
] as const

export default function App() {
  return (
    <div className="site-shell">
      <header className="nav">
        <a className="wordmark" href="#identity" aria-label="JRH home">
          <span className="brand-mark" aria-hidden="true">J</span>
          <span>JRH</span>
        </a>

        <nav aria-label="Primary navigation">
          {sectionItems.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>
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
              <img
                src={siteConfig.identity.profileImage}
                alt={siteConfig.identity.name}
                width="640"
                height="800"
                fetchPriority="high"
              />
            </div>
          </figure>
        </section>

        <section id="education" className="section" aria-labelledby="education-title">
          <div className="section-head">
            <p className="section-kicker">EDUCATION</p>
            <h2 id="education-title">Education</h2>
          </div>

          <div className="records">
            {siteConfig.education.map((item) => (
              <article className="record" key={item.period + item.institution}>
                <time>{item.period}</time>
                <div>
                  <h3>{item.institution}</h3>
                  <p>{item.program}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-title">
          <div className="section-head">
            <p className="section-kicker">WORK</p>
            <h2 id="projects-title">Projects</h2>
          </div>

          <div className="project-list">
            {siteConfig.projects.map((project) => (
              <article className="project" key={project.title}>
                <span className="project-number">{project.number}</span>
                <div className="project-content">
                  <h3 className="project-name">{project.title}</h3>
                  <div className="project-links">
                    {(project.links ?? []).map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                        <span>{link.name}{link.handle ? ` · ${link.handle}` : ''}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
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
            {Object.entries(siteConfig.social)
              .filter(([, url]) => url)
              .map(([name, url]) => {
                const label =
                  name === 'instagram' ? 'Instagram' :
                  name === 'github' ? 'GitHub' :
                  name === 'telegram' ? 'Telegram' :
                  name === 'portfolio' ? 'Website' :
                  name

                return (
                  <a key={name} href={url} target="_blank" rel="noreferrer">
                    <span>{label}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )
              })}
          </div>
        </section>
      </main>

      <footer>
        <strong>JRH</strong>
        <span>Digital Portfolio</span>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('JRH root element not found')
createRoot(rootElement).render(<App />)
