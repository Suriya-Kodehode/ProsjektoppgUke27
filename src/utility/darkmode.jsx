import { useState, useEffect, createContext, useContext } from 'react'
import { setDarkModePreference, getEffectiveDarkModePreference } from './localStorage'
import { IconButton } from '../components/UI/buttons'

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Use the effective dark mode preference (saved or system)
    const shouldUseDarkMode = getEffectiveDarkModePreference()
    
    setDarkMode(shouldUseDarkMode)
    if (shouldUseDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      setDarkModePreference('dark')
    } else {
      document.documentElement.classList.remove('dark')
      setDarkModePreference('light')
    }
  }

  const enableDarkMode = () => {
    setDarkMode(true)
    document.documentElement.classList.add('dark')
    setDarkModePreference('dark')
  }

  const enableLightMode = () => {
    setDarkMode(false)
    document.documentElement.classList.remove('dark')
    setDarkModePreference('light')
  }

  return {
    darkMode,
    toggleDarkMode,
    enableDarkMode,
    enableLightMode
  }
}

export const DarkModeToggle = ({ 
  darkMode, 
  toggleDarkMode, 
  className = '', 
  size = 'md' 
}) => {
  return (
    <IconButton
      onClick={toggleDarkMode}
      variant="secondary"
      size={size}
      className={className}
      ariaLabel="Toggle dark mode"
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? '☀️' : '🌙'}
    </IconButton>
  )
}

const DarkModeContext = createContext()

export const DarkModeProvider = ({ children }) => {
  const darkModeState = useDarkMode()

  return (
    <DarkModeContext.Provider value={darkModeState}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext)
  if (!context) {
    throw new Error('useDarkModeContext must be used within a DarkModeProvider')
  }
  return context
}
