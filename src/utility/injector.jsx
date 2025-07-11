import { useEffect } from 'react'
import { useDarkModeContext } from './darkmode'
import { cap } from './tools'
import path from '../assets/FileManager'

// Title and Favicon Injector Component
export const TitleFaviconInjector = () => {
  const { currentTheme, darkMode } = useDarkModeContext()

  useEffect(() => {
    // console.log('TitleFaviconInjector: Theme/Dark mode changed:', currentTheme, darkMode)
    
    // Dynamic title injection
    document.title = `${cap('prosjektoppgUke27')} - ${cap(currentTheme)} ${darkMode ? 'Dark' : 'Light'}`

    // Dynamic favicon injection
    const iconName = darkMode ? 'customizedIcon-dark.svg' : 'customizedIcon.svg'
    const iconPath = path('icons', iconName)
    
    // console.log('TitleFaviconInjector: Setting favicon to:', iconPath)

    const favicon = document.querySelector('link[rel="icon"]')
    if (favicon) {
      favicon.href = iconPath
    }
  }, [currentTheme, darkMode])

  return null // This component doesn't render anything
}

// Base URL Injector (from your router)
export const BaseInjector = ({ base }) => {
  useEffect(() => {
    let baseElement = document.querySelector("base")
    if (!baseElement) {
      baseElement = document.createElement("base")
      document.head.appendChild(baseElement)
    }
    baseElement.setAttribute("href", base)
  }, [base])
  
  return null
}

// Combined Injector for convenience
export const DocumentInjector = ({ base }) => (
  <>
    <BaseInjector base={base} />
    <TitleFaviconInjector />
  </>
)
