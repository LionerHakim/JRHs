import { ArrowUpRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const projects = [
  { title: 'Portfolio', category: 'Personal brand', description: 'Personal digital space untuk ekonomi, markets, technology, dan human behavior.', detail: 'Ruang personal untuk menyatukan identitas, eksplorasi ide, dan eksperimen digital. Fokus utama ada pada struktur informasi, visual editorial, dan pengalaman lintas perangkat.', role: 'Design · Front-end', stack: 'React · TypeScript · Vite · CSS', url: 'https://github.com/LionerHakim/JRHs', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=900&q=82' },
  { title: 'KitaBisa.com', category: 'Web experiment', description: 'Web project independen yang terinspirasi konsep social-donation dan dukungan komunitas.', detail: 'Eksperimen antarmuka untuk mengeksplorasi bagaimana halaman digital bertema donasi dapat dibuat sederhana, jelas, dan mudah dipahami.', role: 'Front-end', stack: 'HTML · CSS · JavaScript', url: 'https://github.com/LionerHakim/KITABISA.COM', image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&h=900&q=82' },
  { title: 'Ultah', category: 'Creative web', description: 'Eksperimen front-end ringan bertema ulang tahun dengan pendekatan personal dan playful.', detail: 'Eksperimen kreatif untuk mengubah halaman sederhana menjadi pengalaman personal melalui typography, layout, animasi ringan, dan interaksi.', role: 'Front-end · Creative', stack: 'HTML · CSS · JavaScript', url: 'https://github.com/LionerHakim/Ultah', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&h=900&q=82' },
] as const;

type Project = typeof projects[number];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selected) return;
    document.body.classList.add('modal-open');
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setSelected(null); return; }
      if (event.key !== 'Tab') return;
      const dialog = closeRef.current?.closest('[role="dialog"]');
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll('button, a[href]')) as HTMLElement[];
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('modal-open'); document.removeEventListener('keydown', onKey); };
  }, [selected]);

  const openDetail = (project: Project, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setSelected(project);
  };
  const closeDetail = () => {
    setSelected(null);
    requestAnimationFrame(() => openerRef.current?.focus({ preventScroll: true }));
  };

  return <>
    <section id="projects" className="section-shell projects-section" aria-labelledby="projects-title">
      <div className="projects-v5-heading"><div><span className="eyebrow">Projects</span><h2 id="projects-title" className="display-title">Yang dibangun.</h2></div><p className="projects-intro">Beberapa project yang merekam proses mengubah ide menjadi sesuatu yang bisa dibuka, diuji, dan digunakan.</p></div>
      <div className="projects-v5-grid" aria-label="Daftar project">
        {projects.map((project, index) => <article key={project.title} className={`project-v5-card project-v5-card-${index + 1}`}>
          <div className="project-v5-media"><img src={project.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" fetchPriority={index === 0 ? 'high' : 'auto'} /><span className="project-v5-index">0{index + 1}</span></div>
          <div className="project-v5-content"><div><span className="project-v5-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><span className="project-v5-role">{project.role}</span></div><div className="project-v5-actions"><button type="button" className="project-v5-detail" onClick={(event) => openDetail(project, event.currentTarget)} aria-label={`Lihat detail ${project.title}`}>Info Detail</button><a className="project-v5-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Buka source ${project.title}`}>Source <ArrowUpRight size={15} aria-hidden="true" /></a></div></div>
        </article>)}
      </div>
      <p className="projects-note">Geser untuk eksplorasi · Pilih <strong>Info Detail</strong> untuk melihat konteks project.</p>
    </section>
    {selected && <div className="project-detail-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) closeDetail(); }}><article className="project-detail" role="dialog" aria-modal="true" aria-labelledby="project-detail-title" aria-describedby="project-detail-copy"><button ref={closeRef} type="button" className="project-detail-close" onClick={closeDetail} aria-label="Tutup detail project"><X size={18} aria-hidden="true" /></button><span className="eyebrow">{selected.category}</span><h2 id="project-detail-title">{selected.title}</h2><p id="project-detail-copy" className="project-detail-copy">{selected.detail}</p><dl><div><dt>Role</dt><dd>{selected.role}</dd></div><div><dt>Stack</dt><dd>{selected.stack}</dd></div></dl><a className="project-v5-link" href={selected.url} target="_blank" rel="noopener noreferrer">Buka Source <ArrowUpRight size={15} aria-hidden="true" /></a></article></div>}
  </>;
}
