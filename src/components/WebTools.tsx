import { ArrowUpRight, Hammer, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const tools = [
  { title: 'Image Tool', description: 'A focused utility for working with images.', label: 'Coming Soon', accent: 'blue' },
  { title: 'File Tool', description: 'Simple tools for everyday file workflows.', label: 'Coming Soon', accent: 'violet' },
  { title: 'Market Tool', description: 'A future space for practical market utilities.', label: 'Coming Soon', accent: 'orange' },
];

export default function WebTools() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="web-tools" className="section-shell" aria-labelledby="web-tools-title">
      <div className="section-grid">
        <div>
          <p className="eyebrow">04 / Web Tools</p>
          <h2 id="web-tools-title" className="display-title">Things worth building.</h2>
        </div>
        <div>
          <p className="max-w-2xl text-base leading-7 text-[var(--color-text)]">Web tools yang akan hadir sebagai bagian dari proses membangun. Untuk sekarang, semuanya sengaja ditandai <strong className="font-semibold text-[var(--color-ink)]">Coming Soon</strong>—tanpa link atau klaim yang belum nyata.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {tools.map((tool, index) => (
              <motion.article key={tool.title} className="project-card relative flex min-h-64 flex-col justify-between p-5" initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: .35, delay: index * .07 }}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${tool.accent === 'blue' ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]' : tool.accent === 'violet' ? 'bg-[color-mix(in_srgb,var(--color-accent-violet)_12%,transparent)] text-[var(--color-accent-violet)]' : 'bg-[color-mix(in_srgb,var(--color-accent-warm)_12%,transparent)] text-[var(--color-accent-warm)]'}`}><Hammer size={17} aria-hidden="true" /></span>
                    <span className="rounded-full border border-[var(--color-line)] bg-[var(--color-canvas)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.12em] text-[var(--color-muted)]">{tool.label}</span>
                  </div>
                  <h3 className="mt-8 font-[var(--font-perfectly-nineties-regular)] text-3xl font-normal text-[var(--color-ink)]">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text)]">{tool.description}</p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-[var(--color-line)] pt-4 text-xs text-[var(--color-muted)]"><span className="inline-flex items-center gap-1.5"><Sparkles size={13} aria-hidden="true" /> In progress</span><ArrowUpRight size={14} aria-hidden="true" /></div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
