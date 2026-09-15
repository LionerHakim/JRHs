const experienceData = [
  { institution: 'SMA Negeri 300 Brebes', degree: '', year: '2018-2021', activities: ['Ketua OSIS', 'Bendahara Paskibra'] },
  { institution: 'Universitas Islam Indonesia', degree: 'Ilmu Ekonomi', year: '2021-sekarang', activities: ['Kelompok Studi Pasar Modal (KSPM)'] },
] as const;

export default function RekamJejak() {
  return (
    <section id="experience" className="section-shell experience-section" aria-labelledby="experience-title">
      <div className="editorial-grid experience-grid">
        <div className="experience-heading">
          <span className="eyebrow">Rekam jejak</span>
          <h2 id="experience-title" className="display-title">Yang membentuk perjalanan.</h2>
          <p className="section-lead">Pendidikan, organisasi, dan lingkungan belajar yang ikut membentuk cara berpikir hingga hari ini.</p>
        </div>

        <div className="experience-list" aria-label="Perjalanan pendidikan dan aktivitas">
          {experienceData.map((item, index) => {
            const titleId = `experience-title-${index + 1}`;

            return (
              <article key={item.institution} className={`experience-row experience-row-${index + 1}`} aria-labelledby={titleId}>
                <div className="experience-rail" aria-hidden="true">
                  <span className="experience-node"><span>{String(index + 1).padStart(2, '0')}</span></span>
                </div>

                <div className="experience-main">
                  <div className="experience-topline">
                    <span className="experience-year">{item.year}</span>
                  </div>
                  <h3 id={titleId}>{item.institution}</h3>
                  {item.degree && <p className="experience-degree">{item.degree}</p>}
                  {item.activities.length > 0 && (
                    <div className="experience-activities" aria-label={`Peran di ${item.institution}`}>
                      {item.activities.map((activity) => (
                        <span key={activity} className="experience-role">{activity}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
