import { ArrowUpRight, Star } from 'lucide-react';

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
        {projects.map((project, index) => {
          const titleId = `project-title-${index + 1}`;
          return (
            <article
              key={project.title}
              className={`project-object ${project.featured ? 'project-featured' : ''}`}
              aria-labelledby={titleId}
            >
              <div className="project-index" aria-hidden="true">0{index + 1}</div>
              <div className="project-content">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="project-meta">{project.meta}</p>
                  {project.featured && (
                    <span className="inline-flex min-h-7 items-center gap-1 rounded-full border border-[var(--color-line)] bg-[var(--color-control)] px-2.5 text-[11px] font-semibold text-[var(--color-ink)]">
                      <Star size={11} fill="currentColor" aria-hidden="true" />
                      Featured
                    </span>
                  )}
                </div>
                <h3 id={titleId}>{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
              <a
                className="project-visit group"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buka project ${project.title} di GitHub`}
              >
                Open Project
                <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
