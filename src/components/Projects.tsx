import { ArrowUpRight } from 'lucide-react';

const projects = [
  { title: 'Portfolio', description: 'Personal digital space untuk ekonomi, markets, technology, dan human behavior.', meta: 'React · TypeScript', url: 'https://github.com/LionerHakim/JRHs', featured: true },
  { title: 'KitaBisa.com', description: 'Web project independen yang terinspirasi konsep social-donation dan dukungan komunitas.', meta: 'Front-end', url: 'https://github.com/LionerHakim/KITABISA.COM', featured: false },
  { title: 'Ultah', description: 'Eksperimen front-end ringan bertema ulang tahun dengan pendekatan personal dan playful.', meta: 'Front-end', url: 'https://github.com/LionerHakim/Ultah', featured: false },
] as const;

export default function Projects() {
  return (
    <section id="projects" className="section-shell projects-section" aria-labelledby="projects-title">
      <div className="projects-heading">
        <div>
          <p className="eyebrow">02 / Projects</p>
          <h2 id="projects-title" className="display-title">Yang dibangun.</h2>
        </div>
        <p className="projects-intro">Beberapa project publik yang merekam proses mengubah ide menjadi sesuatu yang bisa dibuka, diuji, dan dilihat.</p>
      </div>

      <div className="projects-list">
        {projects.map((project, index) => {
          const titleId = `project-title-${index + 1}`;
          return (
            <article key={project.title} className={`project-object ${project.featured ? 'project-featured' : ''}`} aria-labelledby={titleId}>
              <div className="project-index" aria-hidden="true">0{index + 1}</div>
              <div className="project-content">
                <div className="project-meta-row">
                  <p className="project-meta">{project.meta}</p>
                  {project.featured && <span className="project-live-label"><span aria-hidden="true" /> Current portfolio</span>}
                </div>
                <h3 id={titleId} className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
              <a className="project-visit" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Buka project ${project.title} di GitHub`}>
                <span>Open</span><ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
