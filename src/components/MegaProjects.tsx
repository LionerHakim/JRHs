import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const projects = [
  { title: 'Buku', type: 'Pengembangan', description: 'Sedang mengembangkan buku yang membahas investasi, pemahaman pasar keuangan, serta perspektif ekonomi modern.' },
  { title: 'Startup Multinasional', type: 'Teknologi & ekonomi digital', description: 'Memiliki visi membangun startup berskala internasional yang berfokus pada teknologi dan ekonomi digital.' },
  { title: 'Foundation', type: 'Pendidikan & sosial', description: 'Berencana membangun foundation yang bergerak di bidang pendidikan, literasi keuangan, dan kontribusi sosial.' },
  { title: 'Perusahaan Investment', type: 'Investasi', description: 'Mengembangkan visi untuk membangun perusahaan investasi yang berfokus pada pengelolaan aset dan pengembangan peluang ekonomi jangka panjang.' },
];

export default function Projects() {
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const previousFocus = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (selected === null) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    scrollYRef.current = window.scrollY;
    const previous = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width };
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = '100%';
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSelected(null);
        return;
      }
      if (event.key !== 'Tab') return;
      const dialog = document.querySelector<HTMLElement>('[data-project-dialog]');
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.position = previous.position;
      document.body.style.top = previous.top;
      document.body.style.width = previous.width;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [selected]);

  useEffect(() => {
    if (selected !== null) return;
    const target = previousFocus.current;
    if (target) window.setTimeout(() => target.focus(), 0);
  }, [selected]);

  const closeProject = () => setSelected(null);

  return (
    <section id="projects" className="section-shell">
      <div className="mx-auto max-w-6xl">
        <div className="section-heading flex items-end justify-between gap-6">
          <div><p className="eyebrow">03 / Projects</p><h2 className="display-title">Projects.</h2></div>
          <p className="hidden max-w-xs text-right text-sm leading-5 text-[#666] sm:block">Work, ideas, and directions in development.</p>
        </div>
        <div className="divide-y divide-[#1D1D1D] border-y border-[#1D1D1D]">
          {projects.map((project, index) => (
            <motion.button
              key={project.title}
              ref={(element) => { triggerRefs.current[index] = element; }}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: .24, delay: index * .03 }}
              onClick={() => { previousFocus.current = triggerRefs.current[index]; setSelected(index); }}
              className="group flex min-h-28 w-full items-center gap-5 py-6 text-left outline-none transition hover:bg-[#080808] focus-visible:bg-[#080808] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#007AFF]"
              aria-label={`Open details for ${project.title}`}
              aria-haspopup="dialog"
            >
              <span className="w-8 shrink-0 text-sm font-medium text-[#666]">0{index + 1}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-[clamp(1.5rem,3.5vw,2rem)] font-normal leading-none text-[#F5F5F5]">{project.title}</h3>
                <p className="mt-2 text-sm leading-5 text-[#666]">{project.type}</p>
              </div>
              <span className="hidden text-sm text-[#666] md:block">Info Detail</span>
              <ArrowUpRight size={18} className="shrink-0 text-[#666] transition-transform duration-180 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#007AFF]" aria-hidden="true" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div className="fixed inset-0 z-[80] bg-black/55" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.currentTarget === event.target) closeProject(); }}>
            <motion.aside
              data-project-dialog
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: .24, ease: 'easeOut' }}
              className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-[#1D1D1D] bg-[#0A0A0A] p-6 sm:p-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-detail-title"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <button ref={closeRef} type="button" onClick={closeProject} className="mb-12 inline-flex min-h-11 min-w-11 self-end items-center justify-center rounded-full border border-[#1D1D1D] bg-[#101010] text-[#F5F5F5] transition active:scale-[.97] hover:border-[#333] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]" aria-label="Close project detail"><X size={18} /></button>
              <p className="eyebrow">Project / 0{selected + 1}</p>
              <h3 id="project-detail-title" className="mt-3 font-serif text-4xl font-normal leading-none text-[#F5F5F5] sm:text-5xl">{projects[selected].title}</h3>
              <p className="mt-3 text-sm uppercase tracking-[.14em] text-[#666]">{projects[selected].type}</p>
              <p className="mt-10 max-w-lg text-base leading-7 text-[#A0A0A0]">{projects[selected].description}</p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
