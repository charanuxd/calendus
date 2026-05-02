import { createContext, useState, useEffect, useContext } from 'react'
import { getThemeColors, getCSSVariables } from './design-system'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [isLoading, setIsLoading] = useState(true)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('caloday-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (prefersDark) {
      setTheme('dark')
    }
    setIsLoading(false)
  }, [])

  // Apply theme to document — propagate full warm token set as CSS vars
  useEffect(() => {
    if (isLoading) return

    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem('caloday-theme', theme)

    Object.entries(getCSSVariables(theme)).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
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
