import { Award, Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const educationData = [
  { institution: 'Universitas Islam Indonesia', degree: 'Ilmu Ekonomi', year: '2021 – sekarang', activities: ['Kelompok Studi Pasar Modal (KSPM)'] },
  { institution: 'SMA Negeri 300 Brebes', degree: '', year: '2018 – 2021', activities: ['Ketua OSIS', 'Bendahara Paskibra'] },
  { institution: 'SMP Negeri 200 Brebes', degree: '', year: '2015 – 2018', activities: ['Paskibra'] },
  { institution: 'SD Negeri 100 Brebes', degree: '', year: '2009 – 2015', activities: [] },
];

export default function RekamJejak() {
  const [active, setActive] = useState(0);

  return (
    <section id="rekam-jejak" className="section-shell" aria-labelledby="experience-title">
      <div className="mx-auto max-w-6xl">
        <div className="section-heading">
          <p className="eyebrow">03 / Experience</p>
          <h2 id="experience-title" className="display-title">Rekam jejak.</h2>
        </div>
        <div className="timeline">
          {educationData.map((item, index) => {
            const selected = active === index;
            return (
              <button
                key={item.institution}
                type="button"
                onClick={() => setActive(selected && index !== 0 ? 0 : index)}
                aria-expanded={selected}
                className="experience-card w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-[var(--color-muted)]">0{index + 1}</p>
                    <h3 className="mt-3 pr-2">{item.institution}</h3>
                    {item.degree && <p className="timeline-degree">{item.degree}</p>}
                  </div>
                  <ChevronDown size={17} className={`mt-1 shrink-0 text-[var(--color-muted)] transition-transform ${selected ? 'rotate-180 text-[var(--color-accent)]' : ''}`} aria-hidden="true" />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="timeline-date"><Calendar size={13} aria-hidden="true" />{item.year}</span>
                  <span className="rounded-full bg-[var(--color-accent-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-accent)]">{selected ? 'Terbuka' : 'Lihat detail'}</span>
                </div>
                <div className={`timeline-activity ${selected ? 'is-open' : ''}`} aria-hidden={!selected}>
                  {item.activities.length > 0 ? <>
                    <span><Award size={13} aria-hidden="true" />Aktivitas</span>
                    {item.activities.map((activity) => <p key={activity}>{activity}</p>)}
                  </> : <p>Tidak ada aktivitas tambahan yang dicatat.</p>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
