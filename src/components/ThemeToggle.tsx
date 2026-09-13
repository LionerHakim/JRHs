import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('jrh-theme');
    const isLight = stored === 'light';
    setLight(isLight);
    document.documentElement.classList.toggle('light', isLight);
    document.documentElement.style.colorScheme = isLight ? 'light' : 'dark';
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle('light', next);
    document.documentElement.style.colorScheme = next ? 'light' : 'dark';
    window.localStorage.setItem('jrh-theme', next ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-control)] text-[var(--color-text)] transition hover:text-[var(--color-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
      aria-label={light ? 'Gunakan mode gelap' : 'Gunakan mode terang'}
      title={light ? 'Mode gelap' : 'Mode terang'}
    >
      {light ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
    </button>
  );
}
