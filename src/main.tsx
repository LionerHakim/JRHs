import { createRoot } from 'react-dom/client'
import { siteConfig } from './config/site'
import './index.css'

function App() {
  const { identity, social, education, projects } = siteConfig

  return (
    <main id="top">
      <header>
        <a href="#top">{identity.shortName}</a>
        <nav aria-label="Primary navigation">
          <a href="#identity">Identity</a>
          <a href="#education">Education</a>
          <a href="#projects">Projects</a>
          <a href="#links">Links</a>
        </nav>
      </header>

      <section id="identity" aria-labelledby="identity-title">
        <h1 id="identity-title">{identity.name}</h1>
        <p>{identity.description}</p>
        <img src={identity.profileImage} alt={identity.name} />
      </section>

      <section id="education" aria-labelledby="education-title">
        <h2 id="education-title">Education</h2>
        {education.map(item => (
          <article key={item.period}>
            <p>{item.period}</p>
            <h3>{item.institution}</h3>
            <p>{item.program}</p>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section id="projects" aria-labelledby="projects-title">
        <h2 id="projects-title">Projects & Channels</h2>
        {projects.map(project => (
          <article key={project.title}>
            <p>{project.number} · {project.category}</p>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul>
              {project.tags.map(tag => <li key={tag}>{tag}</li>)}
            </ul>
            <p><a href={project.url}>Open project</a></p>
            {project.links && (
              <ul>
                {project.links.map(link => (
                  <li key={link.url}>
                    <a href={link.url}>{link.name}{link.handle ? ' — ' + link.handle : ''}</a>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>

      <section id="links" aria-labelledby="links-title">
        <h2 id="links-title">Links</h2>
        <ul>
          <li><a href={social.github}>GitHub</a></li>
          <li><a href={social.instagram}>Instagram</a></li>
          <li><a href={social.telegram}>Telegram</a></li>
          {social.linkedin && <li><a href={social.linkedin}>LinkedIn</a></li>}
          <li><a href={social.portfolio}>Portfolio</a></li>
        </ul>
      </section>

      <footer>
        <p>© 2026 {identity.shortName}.</p>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
