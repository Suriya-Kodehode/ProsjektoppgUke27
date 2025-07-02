import { useState, useEffect, createContext, useContext } from 'react'
import { setDarkMode as saveDarkMode, getEffectiveDarkMode, getTheme, setTheme, cleanupLegacyData } from './localStorage'
import { IconButton } from '../components/UI/buttons'
import { themes } from '../style/styling'
import { SunIcon, MoonIcon } from '../assets/svg'

// =============================================================================
// DARK MODE HOOK
// =============================================================================

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('default')

  useEffect(() => {
    // Clean up any legacy localStorage data first
    cleanupLegacyData(['theme', 'mode'])
    
    // Initialize theme and dark mode preferences
    const shouldUseDarkMode = getEffectiveDarkMode()
    const storedTheme = getTheme()
    
    setDarkMode(shouldUseDarkMode)
    setCurrentTheme(storedTheme)
    
    // Apply theme classes to document
    applyTheme(storedTheme, shouldUseDarkMode)
  }, [])

  // Apply theme and dark mode classes to document
  const applyTheme = (themeName, isDark) => {
    const html = document.documentElement
    
    // Remove all existing theme classes
    Object.keys(themes).forEach(theme => {
      html.classList.remove(`theme-${theme}`)
    })
    
    // Remove dark class
    html.classList.remove('dark')
    
    // Add new theme class
    html.classList.add(`theme-${themeName}`)
    
    // Add dark class if needed
    if (isDark) {
      html.classList.add('dark')
    }
  }

  // Dark mode controls
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    applyTheme(currentTheme, newDarkMode)
    saveDarkMode(newDarkMode ? 'dark' : 'light')
  }

  const enableDarkMode = () => {
    setDarkMode(true)
    applyTheme(currentTheme, true)
    saveDarkMode('dark')
  }

  const enableLightMode = () => {
    setDarkMode(false)
    applyTheme(currentTheme, false)
    saveDarkMode('light')
  }

  // Theme controls
  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
      setTheme(themeName)
      applyTheme(themeName, darkMode)
    }
  }

  // Utility functions
  const getCurrentThemeStyles = () => {
    const theme = themes[currentTheme] || themes.default
    return darkMode ? theme.dark : theme.light
  }

  return {
    // State
    darkMode,
    currentTheme,
    themes,
    // Dark mode controls
    toggleDarkMode,
    enableDarkMode,
    enableLightMode,
    // Theme controls
    changeTheme,
    // Utilities
    getCurrentThemeStyles
  }
}

// =============================================================================
// REACT CONTEXT
// =============================================================================

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

// =============================================================================
// UI COMPONENTS
// =============================================================================

export const DarkModeToggle = ({ 
  darkMode, 
  toggleDarkMode, 
  className = '', 
  size = 'md',
  theme = null
}) => {
  // Auto-detect current theme if none provided
  let effectiveTheme = theme
  if (!theme) {
    const classList = document.documentElement.classList
    Object.keys(themes).forEach(themeKey => {
      if (classList.contains(`theme-${themeKey}`)) {
        effectiveTheme = themeKey
      }
    })
    effectiveTheme = effectiveTheme || 'default'
  }

 
  const iconSize = "h-1.5 w-1.5";

  return (
    <IconButton
      onClick={toggleDarkMode}
      variant="primary"
      size={size}
      theme={effectiveTheme}
      className={className}
      ariaLabel="Toggle dark mode"
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <SunIcon className={iconSize} /> : <MoonIcon className={iconSize} />}
    </IconButton>
  )
}

export const ThemeSelector = ({ 
  currentTheme, 
  changeTheme, 
  themes, 
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {Object.entries(themes).map(([key, theme]) => (
        <button
          key={key}
          onClick={() => changeTheme(key)}
          className={`px-3 py-1 rounded-md text-sm transition-all ${
            currentTheme === key 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
          title={`Switch to ${theme.name} theme`}
        >
          {theme.name}
        </button>
      ))}
    </div>
  )
}

export const ThemeControls = ({ 
  darkMode, 
  toggleDarkMode, 
  currentTheme, 
  changeTheme, 
  themes,
  className = '',
  showLabels = true,
  theme = null
}) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {showLabels && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Theme
          </label>
          <ThemeSelector 
            currentTheme={currentTheme}
            changeTheme={changeTheme}
            themes={themes}
          />
        </div>
      )}
      <div className="flex items-center gap-3">
        {showLabels && (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Mode
          </label>
        )}
        <DarkModeToggle 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          theme={theme}
        />
      </div>
    </div>
  )
}
