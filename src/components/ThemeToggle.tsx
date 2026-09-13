import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [light, setLight] = useState(() => window.localStorage.getItem('jrh-theme') !== 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('light', light);
    document.documentElement.style.colorScheme = light ? 'light' : 'dark';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#F7F7F7' : '#090909');
  }, [light]);

  const toggle = () => {
    const next = !light;
    setLight(next);
    window.localStorage.setItem('jrh-theme', next ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={light ? 'Gunakan mode gelap' : 'Gunakan mode terang'}
      title={light ? 'Mode gelap' : 'Mode terang'}
    >
      {light ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
    </button>
  );
}
