import { useEffect, useState } from 'react'

const THEME_KEY = 'jrhs-theme'

type Theme = 'dark' | 'light'

function readStoredTheme(): Theme {
  try {
    const localTheme = window.localStorage.getItem(THEME_KEY)
    if (localTheme === 'dark' || localTheme === 'light') return localTheme

    const sessionTheme = window.sessionStorage.getItem(THEME_KEY)
    if (sessionTheme === 'dark' || sessionTheme === 'light') return sessionTheme
  } catch {
    // Storage can be unavailable in restrictive browser modes.
  }

  return 'light'
}

export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => readStoredTheme() === 'dark')

  useEffect(() => {
    const theme: Theme = darkMode ? 'dark' : 'light'
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme

    try {
      window.localStorage.setItem(THEME_KEY, theme)
      window.sessionStorage.setItem(THEME_KEY, theme)
    } catch {
      // Storage can be unavailable in restrictive browser modes.
    }

    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (meta) meta.content = darkMode ? '#06070A' : '#F3F0F5'
  }, [darkMode])

  return { darkMode, setDarkMode }
}
