const experienceData = [
  { institution: 'Universitas Islam Indonesia', degree: 'Ilmu Ekonomi', year: '2021 – sekarang', activities: ['Kelompok Studi Pasar Modal (KSPM)'] },
  { institution: 'SMA Negeri 300 Brebes', degree: '', year: '2018 – 2021', activities: ['Ketua OSIS', 'Bendahara Paskibra'] },
  { institution: 'SMP Negeri 200 Brebes', degree: '', year: '2015 – 2018', activities: ['Paskibra'] },
  { institution: 'SD Negeri 100 Brebes', degree: '', year: '2009 – 2015', activities: [] },
] as const;

export default function RekamJejak() {
  return (
    <section id="experience" className="section-shell experience-section" aria-labelledby="experience-title">
      <div className="editorial-grid">
        <div>
          <p className="eyebrow">03 / Experience</p>
          <h2 id="experience-title" className="display-title">Rekam jejak.</h2>
        </div>
        <div className="experience-list">
          {experienceData.map((item, index) => (
            <article key={item.institution} className="experience-row">
              <div className="experience-number">0{index + 1}</div>
              <div className="experience-main">
                <div className="experience-topline"><span>{item.year}</span></div>
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
