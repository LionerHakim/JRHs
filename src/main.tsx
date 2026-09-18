import { createRoot } from 'react-dom/client'
import { siteConfig } from './config/site'
import './index.css'

function App() {
  return (
    <main id="top">
      <header>
        <a href="#top">{siteConfig.identity.shortName}</a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a><a href="#work">Projects</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
        </nav>
      </header>
      <section aria-labelledby="hero-title">
        <p>{siteConfig.hero.eyebrow}</p>
        <h1 id="hero-title">{siteConfig.hero.titleLine1} {siteConfig.hero.titleLine2}</h1>
        <p>{siteConfig.hero.description}</p>
        <p><a href={siteConfig.social.github}>GitHub</a></p>
        <img src={siteConfig.identity.profileImage} alt={siteConfig.identity.name} />
      </section>
      <section id="about" aria-labelledby="about-title">
        <h2 id="about-title">{siteConfig.about.titleLine1} {siteConfig.about.titleLine2}</h2>
        <p>{siteConfig.about.lead}</p><p>{siteConfig.about.body}</p>
        <dl>{siteConfig.about.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>
      <section id="work" aria-labelledby="work-title">
        <h2 id="work-title">Projects</h2>
        {siteConfig.projects.map(project => <article key={project.title}>
          <p>{project.number} · {project.category}</p><h3>{project.title}</h3><p>{project.description}</p>
          <ul>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          <a href={project.url}>Open project</a>
          {project.links && <ul>{project.links.map(link => <li key={link.url}><a href={link.url}>{link.name}{link.handle ? ' — ' + link.handle : ''}</a></li>)}</ul>}
        </article>)}
      </section>
      <section aria-label="Working principle"><p>{siteConfig.quote}</p></section>
      <section id="experience" aria-labelledby="experience-title">
        <h2 id="experience-title">Experience</h2><h3>Education</h3>
        {siteConfig.education.map(item => <article key={item.period}><p>{item.period}</p><h4>{item.institution}</h4><p>{item.program}</p><p>{item.detail}</p></article>)}
        <h3>Work principles</h3><ul>{siteConfig.workPrinciples.map(item => <li key={item}>{item}</li>)}</ul>
      </section>
      <section id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">{siteConfig.contact.titleLine1} {siteConfig.contact.titleLine2}</h2><p>{siteConfig.contact.description}</p>
        <ul><li><a href={siteConfig.social.instagram}>Instagram</a></li><li><a href={siteConfig.social.telegram}>Telegram</a></li>{siteConfig.social.linkedin && <li><a href={siteConfig.social.linkedin}>LinkedIn</a></li>}</ul>
      </section>
      <section aria-labelledby="music-title"><h2 id="music-title">{siteConfig.music.title}</h2><ul>{siteConfig.music.tracks.map(track => <li key={track.src}>{track.title} — <a href={track.src}>Audio file</a></li>)}</ul></section>
      <footer><p>© 2026 {siteConfig.identity.shortName}.</p><a href={siteConfig.social.portfolio}>Portfolio</a></footer>
    </main>
  )
}
createRoot(document.getElementById('root')!).render(<App />)
