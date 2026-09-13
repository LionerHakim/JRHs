import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <a href="#hero" className="back-to-top" aria-label="Kembali ke atas" title="Kembali ke atas">
      <ArrowUp size={17} aria-hidden="true" />
      <span>Top</span>
    </a>
  );
}
