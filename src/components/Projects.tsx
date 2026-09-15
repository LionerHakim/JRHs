import { ArrowUpRight } from 'lucide-react';

const projects = [
  { title: 'Portfolio', description: 'Personal digital space untuk ekonomi, markets, technology, dan human behavior.', url: 'https://github.com/LionerHakim/JRHs', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=900&q=88' },
  { title: 'KitaBisa.com', description: 'Web project independen yang terinspirasi konsep social-donation dan dukungan komunitas.', url: 'https://github.com/LionerHakim/KITABISA.COM', image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&h=900&q=88' },
  { title: 'Ultah', description: 'Eksperimen front-end ringan bertema ulang tahun dengan pendekatan personal dan playful.', url: 'https://github.com/LionerHakim/Ultah', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&h=900&q=88' },
  { title: 'Pinterest', description: 'Koleksi visual Galuh Purba sebagai referensi inspirasi dan eksplorasi visual.', url: 'https://id.pinterest.com/galuhpurba/', image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&h=900&q=88' },
] as const;

export default function Projects() {
  return (
    <section id="projects" className="section-shell projects-section" aria-labelledby="projects-title">
      <div className="projects-heading">
        <h2 id="projects-title" className="display-title">Yang dibangun.</h2>
        <p className="projects-intro">Beberapa project dan referensi publik yang merekam proses mengubah ide menjadi sesuatu yang bisa dibuka, diuji, dan dilihat.</p>
      </div>

      <div className="projects-list" aria-label="Daftar project">
        {projects.map((project, index) => {
          const titleId = `project-title-${index + 1}`;
          return (
            <article key={project.title} className="project-object" aria-labelledby={titleId}>
              <div className="project-media" aria-hidden="true">
                <img src={project.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" fetchPriority={index === 0 ? 'high' : 'auto'} />
                <span className="project-number">0{index + 1}</span>
              </div>
              <div className="project-content">
                <h3 id={titleId} className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
              <a className="project-visit" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Buka ${project.title}`}>
                <span>Lihat project</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
