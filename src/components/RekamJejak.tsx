import { Award, Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const experienceData = [
  { institution: 'Universitas Islam Indonesia', degree: 'Ilmu Ekonomi', year: '2021 – sekarang', activities: ['Kelompok Studi Pasar Modal (KSPM)'] },
  { institution: 'SMA Negeri 300 Brebes', degree: '', year: '2018 – 2021', activities: ['Ketua OSIS', 'Bendahara Paskibra'] },
] as const;

export default function RekamJejak() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="rekam-jejak" className="section-shell" aria-labelledby="experience-title">
      <div className="section-grid">
        <div>
          <p className="eyebrow">02 / Rekam Jejak</p>
          <h2 id="experience-title" className="display-title">Rekam jejak.</h2>
        </div>
        <div className="timeline">
          {experienceData.map((item, index) => {
            const selected = active === index;
            const detailsId = `timeline-details-${index}`;
            return (
              <article key={item.institution} className={`experience-card ${selected ? 'is-open' : ''}`}>
                <button type="button" onClick={() => setActive(selected ? null : index)} aria-expanded={selected} aria-controls={detailsId} className="w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="record-index">0{index + 1}</p>
                      <h3>{item.institution}</h3>
                      {item.degree && <p className="timeline-degree">{item.degree}</p>}
                    </div>
                    <ChevronDown size={18} className={`mt-1 shrink-0 text-[var(--color-muted)] transition-transform ${selected ? 'rotate-180 text-[var(--color-accent)]' : ''}`} aria-hidden="true" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="timeline-date"><Calendar size={13} aria-hidden="true" />{item.year}</span>
                    <span className="record-action">{selected ? 'Tutup' : 'Detail'}</span>
                  </div>
                </button>
                <div id={detailsId} className={`timeline-activity ${selected ? 'is-open' : ''}`} aria-hidden={!selected}>
                  <span><Award size={13} aria-hidden="true" />Aktivitas</span>
                  {item.activities.map((activity) => <p key={activity}>{activity}</p>)}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
