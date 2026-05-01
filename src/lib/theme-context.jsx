import { createContext, useState, useEffect, useContext } from 'react'
import { getThemeColors } from './design-system'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [isLoading, setIsLoading] = useState(true)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('calendus-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (prefersDark) {
      setTheme('dark')
    }
    setIsLoading(false)
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (isLoading) return

    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem('calendus-theme', theme)

    // Apply CSS variables
    const colors = getThemeColors(theme)
    root.style.setProperty('--color-bg-primary', colors.bg.primary)
    root.style.setProperty('--color-bg-secondary', colors.bg.secondary)
    root.style.setProperty('--color-text-primary', colors.text.primary)
    root.style.setProperty('--color-text-secondary', colors.text.secondary)
    root.style.setProperty('--color-border', colors.border.default)
    root.style.setProperty('--color-primary', colors.primary[500])
  }, [theme, isLoading])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const colors = getThemeColors(theme)

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors, isLoading }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
