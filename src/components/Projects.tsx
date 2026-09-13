import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'JRH Portfolio',
    description: 'Personal digital space untuk ekonomi, markets, technology, dan human behavior.',
    meta: 'Web · React · TypeScript',
    url: 'https://github.com/LionerHakim/JRHs',
    featured: true,
  },
  {
    title: 'KitaBisa.com',
    description: 'Web project independen yang terinspirasi konsep social-donation dan dukungan komunitas.',
    meta: 'Web project · Front-end',
    url: 'https://github.com/LionerHakim/KITABISA.COM',
    featured: false,
  },
  {
    title: 'Ultah',
    description: 'Eksperimen front-end ringan bertema ulang tahun dengan pendekatan personal dan playful.',
    meta: 'Web project · Front-end',
    url: 'https://github.com/LionerHakim/Ultah',
    featured: false,
  },
] as const;

export default function Projects() {
  return (
    <section id="projects" className="section-shell projects-section" aria-labelledby="projects-title">
      <div className="projects-heading">
        <div>
          <p className="eyebrow">02 / Projects</p>
          <h2 id="projects-title" className="display-title">Things I build.</h2>
        </div>
        <p className="projects-intro">Projects are the clearest record of how JRH turns curiosity into something tangible.</p>
      </div>

      <div className="projects-list">
        {projects.map((project, index) => (
          <article key={project.title} className={`project-object ${project.featured ? 'project-featured' : ''}`}>
            <div className="project-index">0{index + 1}</div>
            <div className="project-content">
              <p className="project-meta">{project.meta}</p>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </div>
            <a className="project-visit" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit project ${project.title}`}>
              {project.featured ? 'Visit Website' : 'View Project'} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
