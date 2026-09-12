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
      if (event.key === 'Escape') { event.preventDefault(); setSelected(null); return; }
      if (event.key !== 'Tab') return;
      const dialog = document.querySelector<HTMLElement>('[data-project-dialog]');
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.position = previous.position; document.body.style.top = previous.top; document.body.style.width = previous.width; window.scrollTo(0, scrollYRef.current); };
  }, [selected]);

  useEffect(() => {
    if (selected !== null) return;
    const target = previousFocus.current;
    if (target) window.setTimeout(() => target.focus(), 0);
  }, [selected]);

  return (
    <section id="projects" className="section-shell">
      <div className="mx-auto max-w-6xl">
        <div className="section-heading flex items-end justify-between gap-6">
          <div><p className="eyebrow">02 / Projects</p><h2 className="display-title">Megaprojects.</h2></div>
          <p className="hidden max-w-xs text-right text-sm leading-5 text-[#636363] sm:block">Work, ideas, and directions in development.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
          {projects.map((project, index) => (
            <motion.button
              key={project.title}
              ref={(element) => { triggerRefs.current[index] = element; }}
              type="button"
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .24, delay: index * .03 }}
              onClick={() => { previousFocus.current = triggerRefs.current[index]; setSelected(index); }}
              className={`project-card group relative flex w-full flex-col justify-between p-5 text-left outline-none transition duration-180 hover:-translate-y-0.5 hover:border-[#D8D8D8] focus-visible:ring-2 focus-visible:ring-[#007AFF] active:scale-[.97] ${index === 0 ? 'md:col-span-7 md:row-span-2 md:min-h-[26rem] md:p-7' : 'md:col-span-5 md:min-h-[12.5rem]'}`}
              aria-label={`Open details for ${project.title}`} aria-haspopup="dialog"
            >
              <div>
                <div className="flex items-center justify-between gap-4"><span className="text-xs font-medium tracking-[.16em] text-[#636363]">0{index + 1}</span>{index === 0 && <span className="rounded-full border border-[#E5E5E5] bg-[#F7F7F7] px-2.5 py-1 text-[11px] font-medium text-[#3E3E3E]">Featured</span>}</div>
                <h3 className={`mt-8 font-serif font-normal leading-[.98] text-black ${index === 0 ? 'text-[clamp(2.2rem,6vw,4rem)]' : 'text-[clamp(1.6rem,3.5vw,2.1rem)]'}`}>{project.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#636363]">{project.description}</p>
              </div>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#E5E5E5] pt-4 text-sm">
                <span className="text-[#636363]">{project.type}</span>
                <span className="inline-flex min-h-11 items-center gap-2 font-medium text-black">View Project <ArrowUpRight size={15} aria-hidden="true" /></span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div className="fixed inset-0 z-[80] bg-black/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.currentTarget === event.target) setSelected(null); }}>
            <motion.aside data-project-dialog initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: .24, ease: 'easeOut' }} className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-[#E5E5E5] bg-white p-6 sm:p-10" role="dialog" aria-modal="true" aria-labelledby="project-detail-title" onMouseDown={(event) => event.stopPropagation()}>
              <button ref={closeRef} type="button" onClick={() => setSelected(null)} className="mb-12 inline-flex min-h-11 min-w-11 self-end items-center justify-center rounded-full border border-[#E5E5E5] bg-[#F7F7F7] text-black transition active:scale-[.97] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]" aria-label="Close project detail"><X size={18} /></button>
              <p className="eyebrow">Project / 0{selected + 1}</p>
              <h3 id="project-detail-title" className="mt-3 font-serif text-4xl font-normal leading-none text-black sm:text-5xl">{projects[selected].title}</h3>
              <p className="mt-3 text-sm uppercase tracking-[.14em] text-[#636363]">{projects[selected].type}</p>
              <p className="mt-10 max-w-lg text-base leading-7 text-[#3E3E3E]">{projects[selected].description}</p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
