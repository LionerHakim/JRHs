import { Hammer, Sparkles } from 'lucide-react';

const tools = [
  { title: 'Image Tool', description: 'A focused utility for working with images.', accent: 'blue' },
  { title: 'File Tool', description: 'Simple tools for everyday file workflows.', accent: 'violet' },
  { title: 'Market Tool', description: 'A future space for practical market utilities.', accent: 'orange' },
];

export default function WebTools() {
  return (
    <section id="web-tools" className="section-shell" aria-labelledby="web-tools-title">
      <div className="section-grid">
        <div>
          <p className="eyebrow">03 / Web Tools</p>
          <h2 id="web-tools-title" className="display-title">Things worth building.</h2>
        </div>
        <div>
          <p className="max-w-2xl text-base leading-7 text-[var(--color-text)]">Web tools yang akan hadir sebagai bagian dari proses membangun. Untuk sekarang, semuanya sengaja ditandai <strong className="font-semibold text-[var(--color-ink)]">Coming Soon</strong>—tanpa link atau klaim yang belum nyata.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {tools.map((tool) => (
              <article key={tool.title} className="project-card relative flex min-h-64 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${tool.accent === 'blue' ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]' : tool.accent === 'violet' ? 'bg-[color-mix(in_srgb,var(--color-accent-violet)_12%,transparent)] text-[var(--color-accent-violet)]' : 'bg-[color-mix(in_srgb,var(--color-accent-warm)_12%,transparent)] text-[var(--color-accent-warm)]'}`}><Hammer size={17} aria-hidden="true" /></span>
                    <span className="rounded-full border border-[var(--color-line)] bg-[var(--color-canvas)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.12em] text-[var(--color-muted)]">Coming Soon</span>
                  </div>
                  <h3 className="mt-8 font-[var(--font-perfectly-nineties-regular)] text-3xl font-normal text-[var(--color-ink)]">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text)]">{tool.description}</p>
                </div>
                <div className="mt-8 flex items-center gap-1.5 border-t border-[var(--color-line)] pt-4 text-xs text-[var(--color-muted)]"><Sparkles size={13} aria-hidden="true" /> In progress</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
