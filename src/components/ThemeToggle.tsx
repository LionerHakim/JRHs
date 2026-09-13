import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const getInitialTheme = () => {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
};

export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const apply = (next: boolean) => {
      root.classList.toggle('dark', next);
      root.style.colorScheme = next ? 'dark' : 'light';
      setDark(next);
    };

    const saved = localStorage.getItem('jrhs-theme');
    if (saved === 'dark' || saved === 'light') {
      apply(saved === 'dark');
    } else {
      apply(media.matches);
    }

    const onSystemChange = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem('jrhs-theme')) apply(event.matches);
    };
    media.addEventListener?.('change', onSystemChange);
    return () => media.removeEventListener?.('change', onSystemChange);
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.style.colorScheme = next ? 'dark' : 'light';
    localStorage.setItem('jrhs-theme', next ? 'dark' : 'light');
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-control)] text-[var(--color-ink)] shadow-[var(--shadow-soft)] transition duration-160 hover:-translate-y-0.5 hover:border-[var(--color-accent)] active:scale-[.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
      aria-label={dark ? 'Gunakan tema terang' : 'Gunakan tema gelap'}
      aria-pressed={dark}
      title={dark ? 'Tema terang' : 'Tema gelap'}
    >
      {dark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  );
}
