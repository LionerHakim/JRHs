import { useEffect, useState } from 'react'

export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return window.localStorage.getItem('jrhs-theme') === 'dark' ||
        window.sessionStorage.getItem('jrhs-theme') === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
    try {
      window.localStorage.setItem('jrhs-theme', darkMode ? 'dark' : 'light')
      window.sessionStorage.setItem('jrhs-theme', darkMode ? 'dark' : 'light')
    } catch {
      // Storage can be unavailable in restrictive browser modes.
    }
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (meta) meta.content = darkMode ? '#050505' : '#F7FBFF'
  }, [darkMode])

  return { darkMode, setDarkMode }
}
