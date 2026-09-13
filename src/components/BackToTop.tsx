import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(max > 0 && window.scrollY >= Math.max(0, max - Math.min(420, window.innerHeight * 0.7)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#hero"
      className="back-to-top"
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
    >
      <ArrowUp size={17} aria-hidden="true" />
      <span>Top</span>
    </a>
  );
}
