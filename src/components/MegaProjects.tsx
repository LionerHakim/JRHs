const projects = [
  {
    name: 'JRHs Portfolio',
    description: 'Personal digital space untuk ekonomi, markets, technology, dan human behavior.',
    meta: 'Web · React · TypeScript',
    url: 'https://github.com/LionerHakim/JRHs',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-shell" aria-labelledby="projects-title">
      <div className="section-grid">
        <div>
          <p className="eyebrow">04 / Projects</p>
          <h2 id="projects-title" className="display-title">Work in public.</h2>
          <p className="mt-6 max-w-md text-sm leading-6 text-[var(--color-muted)]">Proyek yang benar-benar ada mendapat ruang. Yang belum ada tidak perlu dibuat seolah-olah sudah selesai.</p>
        </div>
        <div className="grid gap-3">
          {projects.map((project) => (
            <article key={project.name} className="project-card">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-[var(--color-muted)]">01</p>
                  <h3 className="mt-3 font-[var(--font-perfectly-nineties-regular)] text-3xl font-normal leading-tight text-[var(--color-ink)]">{project.name}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[.1em] text-[var(--color-muted)]">{project.meta}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--color-text)]">{project.description}</p>
                </div>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="portal-pill shrink-0 border border-[var(--color-line)] bg-[var(--color-paper)] px-4 text-sm font-semibold text-[var(--color-ink)] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] active:scale-[.97]">Visit Website ↗</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
