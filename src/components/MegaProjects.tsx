import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Project = {
  title: string;
  type: string;
  description: string;
  url?: string;
  status?: string;
};

const projects: Project[] = [
  { title: 'Buku', type: 'Pengembangan', description: 'Sedang mengembangkan buku yang membahas investasi, pemahaman pasar keuangan, serta perspektif ekonomi modern.', status: 'Dalam pengembangan' },
  { title: 'Startup Multinasional', type: 'Teknologi & ekonomi digital', description: 'Memiliki visi membangun startup berskala internasional yang berfokus pada teknologi dan ekonomi digital.', status: 'Dalam pengembangan' },
  { title: 'Foundation', type: 'Pendidikan & sosial', description: 'Berencana membangun foundation yang bergerak di bidang pendidikan, literasi keuangan, dan kontribusi sosial.', status: 'Rencana' },
  { title: 'Perusahaan Investment', type: 'Investasi', description: 'Mengembangkan visi untuk membangun perusahaan investasi yang berfokus pada pengelolaan aset dan pengembangan peluang ekonomi jangka panjang.', status: 'Dalam pengembangan' },
];

export default function Projects() {
  const [selected, setSelected] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const previousFocus = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (selected === null) return;
    setIsOpen(true);
    previousFocus.current = document.activeElement as HTMLElement | null;
    scrollYRef.current = window.scrollY;
    const previous = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width };
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = '100%';
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setSelected(null); return; }
      if (event.key !== 'Tab') return;
      const dialog = document.querySelector<HTMLElement>('[data-project-dialog]');
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
      document.body.style.position = previous.position;
      document.body.style.top = previous.top;
      document.body.style.width = previous.width;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [selected]);

  useEffect(() => {
    if (selected !== null || !isOpen) return;
    const target = previousFocus.current;
    const timer = window.setTimeout(() => target?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [selected, isOpen]);

  const openProject = (index: number) => {
    previousFocus.current = triggerRefs.current[index];
    setSelected(index);
  };

  const closeProject = () => setSelected(null);

  return (
    <section id="projects" className="section-shell" aria-labelledby="projects-title">
      <div className="mx-auto max-w-7xl">
        <div className="section-heading flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">02 / Projects</p>
            <h2 id="projects-title" className="display-title">Megaprojects.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[var(--color-smoke)]">Gagasan yang sedang dibangun, dikembangkan, dan dipersiapkan untuk jangka panjang.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-12 md:grid-rows-2">
          {projects.map((project, index) => (
            <motion.button
              key={project.title}
              ref={(element) => { triggerRefs.current[index] = element; }}
              type="button"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: .24, delay: index * .03 }}
              onClick={() => openProject(index)}
              className={`project-card group relative flex min-h-[16rem] w-full flex-col justify-between text-left outline-none transition duration-180 hover:-translate-y-0.5 hover:border-[#D6D6D6] focus-visible:ring-2 focus-visible:ring-[var(--color-signal-blue)] active:scale-[.97] ${index === 0 ? 'md:col-span-7 md:row-span-2 md:min-h-[32rem] md:p-8' : 'md:col-span-5 md:p-7'} p-5`}
              aria-label={`Lihat detail ${project.title}`}
              aria-haspopup="dialog"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-[var(--font-inter)] text-xs font-medium tracking-[.16em] text-[var(--color-smoke)]">0{index + 1}</span>
                  {index === 0 && <span className="rounded-full border border-[#E5E5E5] bg-[var(--color-ash-mist)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-graphite)]">Unggulan</span>}
                </div>
                <h3 className={`mt-8 font-[var(--font-perfectly-nineties-regular)] font-normal leading-[.97] text-[var(--color-ink-black)] ${index === 0 ? 'max-w-3xl text-[clamp(2.3rem,6vw,4.6rem)]' : 'text-[clamp(1.7rem,3.6vw,2.2rem)]'}`}>{project.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--color-smoke)]">{project.description}</p>
              </div>
              <div className="mt-10 border-t border-[#E5E5E5] pt-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-smoke)]">
                    <span>{project.type}</span>
                    {project.status && <><span aria-hidden="true">·</span><span>{project.status}</span></>}
                  </div>
                  <span className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-ink-black)]">Lihat Proyek <ArrowUpRight size={15} aria-hidden="true" /></span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div className="fixed inset-0 z-[80] bg-black/35" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.currentTarget === event.target) closeProject(); }}>
            <motion.aside
              data-project-dialog
              initial={reduceMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: '100%' }}
              transition={{ duration: .24, ease: 'easeOut' }}
              className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-[#E5E5E5] bg-[var(--color-paper-white)] p-6 sm:p-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-detail-title"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow">Proyek / 0{selected + 1}</p>
                <button ref={closeRef} type="button" onClick={closeProject} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#E5E5E5] bg-[var(--color-ash-mist)] text-[var(--color-ink-black)] transition active:scale-[.97] hover:bg-[var(--color-paper-white)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-blue)]" aria-label="Tutup detail proyek"><X size={18} /></button>
              </div>
              <h3 id="project-detail-title" className="mt-7 font-[var(--font-perfectly-nineties-regular)] text-4xl font-normal leading-[.98] text-[var(--color-ink-black)] sm:text-5xl">{projects[selected].title}</h3>
              <p className="mt-3 text-sm uppercase tracking-[.14em] text-[var(--color-smoke)]">{projects[selected].type}</p>
              <p className="mt-10 max-w-lg text-base leading-7 text-[var(--color-graphite)]">{projects[selected].description}</p>
              {projects[selected].status && (
                <div className="mt-8 border-t border-[#E5E5E5] pt-5">
                  <p className="text-xs uppercase tracking-[.14em] text-[var(--color-smoke)]">Status</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-medium text-[var(--color-ink-black)]"><Check size={14} className="text-[var(--color-signal-blue)]" aria-hidden="true" />{projects[selected].status}</p>
                </div>
              )}
              {projects[selected].url ? (
                <a href={projects[selected].url} target="_blank" rel="noopener noreferrer" className="portal-link mt-10 w-full bg-[var(--color-ink-black)] px-5 text-sm font-semibold text-[var(--color-paper-white)] transition hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-blue)]">Kunjungi Situs <ArrowUpRight size={15} className="ml-2" aria-hidden="true" /></a>
              ) : (
                <span className="portal-link mt-10 w-full border border-[#E5E5E5] bg-[var(--color-ash-mist)] px-5 text-sm font-medium text-[var(--color-smoke)]">Situs belum tersedia</span>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
