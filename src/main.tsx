import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { siteConfig } from './config/site'
import './index.css'

const sectionItems = [
  ['identity', 'About'],
  ['education', 'Education'],
  ['projects', 'Projects'],
  ['links', 'Contact'],
] as const

const sectionIds = sectionItems.map(([id]) => id)

export default function App() {
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>('identity')

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id as (typeof sectionIds)[number])
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.1, 0.35, 0.6],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="site-shell">
      <header className="nav">
        <a className="wordmark" href="#identity" aria-label="JRH home">
          <span className="brand-mark" aria-hidden="true">J</span>
          <span>JRH</span>
        </a>

        <nav aria-label="Primary navigation">
          {sectionItems.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? 'page' : undefined}
              className={activeSection === id ? 'is-active' : undefined}
            >
              {label}
            </a>
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
                  {item.activities?.length ? (
                    <ul className="record-activities" aria-label="Activities and roles">
                      {item.activities.map((activity) => (
                        <li key={activity}>{activity}</li>
                      ))}
                    </ul>
                  ) : null}
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
                        <span>{link.name}</span>
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
            <a href={`mailto:${siteConfig.contactEmail}`}>
              <span>{siteConfig.contactEmail}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <strong>JRH</strong>
      </footer>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('JRH root element not found')
createRoot(rootElement).render(<App />)
