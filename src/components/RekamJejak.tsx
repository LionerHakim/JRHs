const experienceData = [
  { institution: 'SMA Negeri 300 Brebes', degree: '', year: '2018 – 2021', activities: ['Ketua OSIS', 'Bendahara Paskibra'] },
  { institution: 'Universitas Islam Indonesia', degree: 'Ilmu Ekonomi', year: '2021 – sekarang', activities: ['Kelompok Studi Pasar Modal (KSPM)'] },
] as const;

export default function RekamJejak() {
  return (
    <section id="experience" className="section-shell experience-section" aria-labelledby="experience-title">
      <div className="editorial-grid">
        <div className="experience-heading">
          <p className="eyebrow">03 / Journey</p>
          <h2 id="experience-title" className="display-title">Dari SMA sampai sekarang.</h2>
          <p className="section-lead">Perjalanan pendidikan dan aktivitas yang membentuk langkah JRH hingga saat ini.</p>
        </div>
        <div className="experience-list" aria-label="Perjalanan pendidikan dan aktivitas">
          {experienceData.map((item, index) => (
            <article key={item.institution} className={`experience-row ${item.institution.startsWith('SMA') ? 'experience-highlight' : ''}`}>
              <div className="experience-node" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span></div>
              <div className="experience-main">
                <div className="experience-topline">
                  <span>{item.year}</span>
                  {item.institution.startsWith('SMA') && <span className="experience-tag">Milestone</span>}
                </div>
                <h3>{item.institution}</h3>
                {item.degree && <p className="experience-degree">{item.degree}</p>}
                {item.activities.length > 0 && (
                  <ul>
                    {item.activities.map((activity) => <li key={activity}>{activity}</li>)}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
