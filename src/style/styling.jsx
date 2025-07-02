// Define available themes
export const themes = {
  default: {
    name: 'Default',
    light: { bg: 'bg-white', text: 'text-gray-900', primary: 'bg-blue-600', secondary: 'bg-blue-200', accent: 'bg-blue-100', border: 'border-gray-300', focusRing: 'focus:ring-gray-500' },
    dark: { bg: 'bg-gray-900', text: 'text-gray-100', primary: 'bg-blue-500', secondary: 'bg-blue-700', accent: 'bg-blue-900', border: 'border-gray-600', focusRing: 'focus:ring-gray-400' }
  },
  ocean: {
    name: 'Ocean',
    light: { bg: 'bg-slate-50', text: 'text-slate-900', primary: 'bg-cyan-600', secondary: 'bg-slate-200', accent: 'bg-cyan-100', border: 'border-slate-300', focusRing: 'focus:ring-cyan-500' },
    dark: { bg: 'bg-slate-900', text: 'text-slate-100', primary: 'bg-cyan-500', secondary: 'bg-slate-700', accent: 'bg-cyan-900', border: 'border-slate-600', focusRing: 'focus:ring-cyan-400' }
  },
  forest: {
    name: 'Forest',
    light: { bg: 'bg-green-50', text: 'text-green-900', primary: 'bg-emerald-600', secondary: 'bg-green-200', accent: 'bg-emerald-100', border: 'border-green-300', focusRing: 'focus:ring-emerald-500' },
    dark: { bg: 'bg-green-900', text: 'text-green-100', primary: 'bg-emerald-500', secondary: 'bg-green-700', accent: 'bg-emerald-900', border: 'border-green-600', focusRing: 'focus:ring-emerald-400' }
  },
  sunset: {
    name: 'Sunset',
    light: { bg: 'bg-orange-50', text: 'text-orange-900', primary: 'bg-red-600', secondary: 'bg-orange-200', accent: 'bg-red-100', border: 'border-orange-300', focusRing: 'focus:ring-red-500' },
    dark: { bg: 'bg-orange-900', text: 'text-orange-100', primary: 'bg-red-500', secondary: 'bg-orange-700', accent: 'bg-red-900', border: 'border-orange-600', focusRing: 'focus:ring-red-400' }
  },
  purple: {
    name: 'Purple',
    light: { bg: 'bg-purple-50', text: 'text-purple-900', primary: 'bg-violet-600', secondary: 'bg-purple-200', accent: 'bg-violet-100', border: 'border-purple-300', focusRing: 'focus:ring-violet-500' },
    dark: { bg: 'bg-purple-900', text: 'text-purple-100', primary: 'bg-violet-500', secondary: 'bg-purple-700', accent: 'bg-violet-900', border: 'border-purple-600', focusRing: 'focus:ring-violet-400' }
  },
  midnight: {
    name: 'Midnight',
    light: { bg: 'bg-indigo-50', text: 'text-indigo-900', primary: 'bg-indigo-600', secondary: 'bg-indigo-200', accent: 'bg-indigo-100', border: 'border-indigo-300', focusRing: 'focus:ring-indigo-500' },
    dark: { bg: 'bg-indigo-900', text: 'text-indigo-100', primary: 'bg-indigo-500', secondary: 'bg-indigo-700', accent: 'bg-indigo-900', border: 'border-indigo-600', focusRing: 'focus:ring-indigo-400' }
  }
}

// Utility function to get theme styles based on current theme and mode
export const getThemeStyles = (themeName, isDark) => {
  const theme = themes[themeName] || themes.default
  return isDark ? theme.dark : theme.light
}

// Helper function to apply theme classes to an element
export const applyThemeClasses = (element, styles) => {
  if (!element) return
  
  // Remove existing theme classes (basic cleanup)
  const classesToRemove = element.className.split(' ').filter(cls => 
    cls.startsWith('bg-') || cls.startsWith('text-') || cls.startsWith('border-')
  )
  
  classesToRemove.forEach(cls => element.classList.remove(cls))
  
  // Add new theme classes
  Object.values(styles).forEach(cls => {
    if (cls && typeof cls === 'string') {
      element.classList.add(cls)
    }
  })
}