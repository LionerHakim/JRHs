import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

const projects = [
  {
    title: 'JRH Portfolio',
    description: 'Personal digital space untuk ekonomi, markets, technology, dan human behavior.',
    meta: 'Web · React · TypeScript',
    url: 'https://github.com/LionerHakim/JRHs',
  },
  {
    title: 'Market Notes',
    description: 'Ruang eksperimen untuk catatan pasar, observasi ekonomi, dan ide investasi.',
    meta: 'Concept · Markets · Research',
    url: '',
  },
  {
    title: 'Behavior Archive',
    description: 'Eksperimen editorial tentang keputusan manusia, teknologi, dan perilaku.',
    meta: 'Concept · Technology · Human Behavior',
    url: '',
  },
] as const;

type Project = (typeof projects)[number];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [opener, setOpener] = useState<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setSelected(null); opener?.focus(); return; }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'));
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; window.clearTimeout(timer); };
  }, [selected, opener]);

  const openProject = (project: Project, button: HTMLButtonElement) => { setOpener(button); setSelected(project); };
  const closeProject = () => { setSelected(null); opener?.focus(); };

  return (
    <section id="projects" className="section-shell" aria-labelledby="projects-title">
      <div className="section-grid">
        <div>
          <p className="eyebrow">03 / Projects</p>
          <h2 id="projects-title" className="display-title">Projects.</h2>
        </div>
        <div className="grid gap-3">
          {projects.map((project, index) => (
            <article key={project.title} className="project-card">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="record-index">0{index + 1}</span>
                    <p className="eyebrow">{project.meta}</p>
                  </div>
                  <h3 className="mt-3 font-[var(--font-perfectly-nineties-regular)] text-3xl font-normal text-[var(--color-ink)]">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text)]">{project.description}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button type="button" onClick={(event) => openProject(project, event.currentTarget)} className="portal-link border border-[var(--color-line)] bg-[var(--color-paper)] px-4 text-sm font-semibold text-[var(--color-ink)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] active:scale-[.97]" aria-haspopup="dialog" aria-label={`Lihat detail ${project.title}`}>Info Detail</button>
                  {project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer" className="portal-link border border-[var(--color-line)] bg-[var(--color-control)] px-4 text-sm font-medium text-[var(--color-text)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">Link Langsung <ArrowUpRight size={14} aria-hidden="true" /></a> : <span className="portal-link border border-[var(--color-line)] bg-[var(--color-control)] px-4 text-xs font-medium text-[var(--color-muted)]" aria-label="Link langsung belum diisi">Link langsung —</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100]">
          <button type="button" className="absolute inset-0 h-full w-full bg-black/60" onClick={closeProject} aria-label="Tutup detail proyek" />
          <aside ref={dialogRef} className="project-detail-drawer absolute inset-x-0 bottom-0 flex max-h-[92svh] flex-col overflow-y-auto border-t border-[var(--color-line)] bg-[var(--color-control)] p-5 shadow-[var(--shadow-raised)] md:inset-y-0 md:left-auto md:right-0 md:w-[min(32rem,92vw)] md:max-h-none md:border-l md:border-t-0 md:p-7" role="dialog" aria-modal="true" aria-labelledby="project-detail-title">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--color-line)] pb-5">
              <div><p className="eyebrow">Project detail</p><h3 id="project-detail-title" className="mt-2 font-[var(--font-perfectly-nineties-regular)] text-4xl font-normal text-[var(--color-ink)]">{selected.title}</h3></div>
              <button ref={closeRef} type="button" onClick={closeProject} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]" aria-label="Tutup detail proyek"><X size={17} aria-hidden="true" /></button>
            </div>
            <div className="pt-6">
              <p className="text-sm uppercase tracking-[.12em] text-[var(--color-muted)]">{selected.meta}</p>
              <p className="mt-4 text-base leading-7 text-[var(--color-text)]">{selected.description}</p>
              {selected.url ? <a href={selected.url} target="_blank" rel="noopener noreferrer" className="portal-link mt-7 bg-[var(--color-ink)] px-5 font-semibold text-[var(--color-paper)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] active:scale-[.97]">Link Langsung <ArrowUpRight size={15} aria-hidden="true" /></a> : <p className="mt-7 border-t border-[var(--color-line)] pt-4 text-xs uppercase tracking-[.12em] text-[var(--color-muted)]">Tempat link langsung siap diisi di data proyek.</p>}
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
