import { ArrowUpRight } from 'lucide-react';

const projects = [
  { title: 'JRHs', description: 'Personal digital space for economics, markets, technology, and human behavior.', meta: 'Editorial Portfolio', url: 'https://jrhsee.my.id/' },
];

export default function Projects() {
  return (
    <section id="projects" className="section-shell" aria-labelledby="projects-title">
      <div className="section-grid">
        <div>
          <p className="eyebrow">04 / Projects</p>
          <h2 id="projects-title" className="display-title">Projects.</h2>
        </div>
        <div className="grid gap-3">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <p className="eyebrow">{project.meta}</p>
                  <h3 className="mt-3 font-[var(--font-perfectly-nineties-regular)] text-3xl font-normal text-[var(--color-ink)]">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text)]">{project.description}</p>
                </div>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="portal-link shrink-0 border border-[var(--color-line)] bg-[var(--color-paper)] px-4 text-sm font-semibold text-[var(--color-ink)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] active:scale-[.97]">Visit Website <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
