import { BookOpen, Building2, Landmark, TrendingUp } from 'lucide-react';

const futureItems = [
  { title: 'Buku', type: 'Investment · Financial Markets · Modern Economics', description: 'Pengembangan buku tentang investasi, pasar keuangan, dan perspektif ekonomi modern.', status: 'Dalam pengembangan', icon: BookOpen },
  { title: 'Startup Multinasional', type: 'Technology · Digital Economy', description: 'Visi membangun startup berskala internasional yang berfokus pada teknologi dan ekonomi digital.', status: 'Dalam pengembangan', icon: Building2 },
  { title: 'Foundation', type: 'Education · Financial Literacy · Social', description: 'Rencana membangun foundation untuk pendidikan, literasi keuangan, dan kontribusi sosial.', status: 'Rencana', icon: Landmark },
  { title: 'Perusahaan Investment', type: 'Investment · Asset Management', description: 'Visi membangun perusahaan investasi untuk pengelolaan aset dan pengembangan peluang ekonomi jangka panjang.', status: 'Dalam pengembangan', icon: TrendingUp },
];

export default function Projects() {
  return (
    <section id="future" className="section-shell" aria-labelledby="future-title">
      <div className="section-grid">
        <div>
          <p className="eyebrow">05 / Future</p>
          <h2 id="future-title" className="display-title">Ideas worth building.</h2>
          <p className="mt-6 max-w-md text-sm leading-6 text-[var(--color-muted)]">Rencana jangka panjang yang belum selesai—dan memang tidak perlu berpura-pura sudah selesai.</p>
        </div>
        <div className="grid gap-3">
          {futureItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="experience-card">
                <div className="flex gap-4 sm:items-center">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]"><Icon size={18} aria-hidden="true" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div><h3>{item.title}</h3><p className="mt-1 text-xs uppercase tracking-[.1em] text-[var(--color-muted)]">{item.type}</p></div>
                      <span className="rounded-full border border-[var(--color-line)] bg-[var(--color-canvas)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.11em] text-[var(--color-muted)]">{item.status}</span>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text)]">{item.description}</p>
                    <div className="mt-4 text-xs font-medium text-[var(--color-muted)]">Roadmap</div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
