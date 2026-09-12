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
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (selected === null) return;
    scrollYRef.current = window.scrollY;
    const previous = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width };
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = '100%';
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
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

  const openProject = (index: number) => setSelected(index);
  const closeProject = () => {
    const index = selected;
    setSelected(null);
    if (index !== null) window.setTimeout(() => triggerRefs.current[index]?.focus(), 0);
  };

  return (
    <section id="projects" className="section-shell">
      <div className="mx-auto max-w-6xl">
        <div className="section-heading flex items-end justify-between gap-6">
          <div><p className="eyebrow">03 / Projects</p><h2 className="display-title">Projects.</h2></div>
          <p className="hidden max-w-xs text-right text-xs leading-5 text-[#666] sm:block">Work, ideas, and directions in development.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.button key={project.title} ref={(element) => { triggerRefs.current[index] = element; }} type="button" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: .3, delay: index * .04 }} onClick={() => openProject(index)} className="group flex min-h-44 flex-col rounded-[16px] border border-[#1D1D1D] bg-[#101010] p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#333] hover:bg-[#141414] focus:outline-none focus:ring-2 focus:ring-[#007AFF] sm:min-h-48" aria-label={`Open details for ${project.title}`}>
              <div className="mb-auto flex items-start justify-between gap-4"><span className="text-[11px] uppercase tracking-[.18em] text-[#666]">0{index + 1}</span><ArrowUpRight size={17} className="text-[#666] transition-colors group-hover:text-[#007AFF]" /></div>
              <div><h3 className="font-serif text-xl font-semibold text-[#F5F5F5]">{project.title}</h3><p className="mt-2 text-xs text-[#666]">{project.type}</p></div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div className="fixed inset-0 z-[80] bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.currentTarget === event.target) closeProject(); }}>
            <motion.aside data-project-dialog initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: .24 }} className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-[#1D1D1D] bg-[#0A0A0A] p-6 shadow-2xl sm:p-8" role="dialog" aria-modal="true" aria-labelledby="project-detail-title" onMouseDown={(event) => event.stopPropagation()}>
              <button ref={closeRef} type="button" onClick={closeProject} className="mb-12 inline-flex min-h-11 min-w-11 self-end items-center justify-center rounded-full border border-[#1D1D1D] text-[#A0A0A0] transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-[#007AFF]" aria-label="Close project detail"><X size={18} /></button>
              <p className="eyebrow">Project / 0{selected + 1}</p>
              <h3 id="project-detail-title" className="mt-3 font-serif text-3xl font-semibold text-[#F5F5F5]">{projects[selected].title}</h3>
              <p className="mt-3 text-xs uppercase tracking-[.15em] text-[#666]">{projects[selected].type}</p>
              <p className="mt-10 max-w-lg text-sm leading-7 text-[#A0A0A0]">{projects[selected].description}</p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
