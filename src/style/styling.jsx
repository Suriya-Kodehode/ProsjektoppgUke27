import { getThemeStyles as getThemeStylesUtil, applyThemeClasses } from '../utility/tools'

// =============================================================================
// CUSTOM GRADIENTS
// =============================================================================

// Custom gradient utilities that can be used with Tailwind's gradient classes
export const gradients = {
  default: {
    name: 'Default',
    gradient: 'bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-200 dark:from-blue-900 dark:via-teal-800 dark:to-blue-950'
  },
  ocean: {
    name: 'Ocean', 
    gradient: 'bg-gradient-to-br from-slate-100 to-cyan-100 dark:from-slate-900 dark:to-cyan-900'
  },
  forest: {
    name: 'Forest',
    gradient: 'bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900 dark:to-emerald-900'
  },
  sunset: {
    name: 'Sunset',
    gradient: 'bg-gradient-to-br from-orange-100 to-red-200 dark:from-orange-900 dark:to-red-900'
  },
  purple: {
    name: 'Purple',
    gradient: 'bg-gradient-to-br from-purple-100 to-violet-200 dark:from-purple-900 dark:to-violet-900'
  },
  midnight: {
    name: 'Midnight',
    gradient: 'bg-gradient-to-br from-indigo-100 to-blue-200 dark:from-indigo-900 dark:to-blue-900'
  }
}

// Helper function to get gradient for a theme
export const getThemeGradient = (themeName) => {
  return gradients[themeName]?.gradient || gradients.default.gradient
}

// =============================================================================
// THEME DEFINITIONS
// =============================================================================

// Define available themes
export const themes = {
  default: {
    name: 'Default',
    light: { bg: 'bg-white', text: 'text-[#262626]', textMuted: 'text-[#494949]/70', primary: 'bg-blue-500', secondary: 'bg-blue-300', accent: 'bg-blue-100', border: 'border-gray-300', focusRing: 'focus:ring-gray-500', iconColor: '#262626' },
    dark: { bg: 'dark:bg-gray-900', text: 'dark:text-[#f3f4f6]', textMuted: 'dark:text-[#b9b9b9]/70', primary: 'dark:bg-[#3752ea]', secondary: 'dark:bg-[#6674e5]', accent: 'dark:bg-blue-900', border: 'dark:border-gray-600', focusRing: 'dark:focus:ring-gray-400', iconColor: '#f3f4f6' }
  },
  ocean: {
    name: 'Ocean',
    light: { bg: 'bg-slate-50', text: 'text-slate-900', textMuted: 'text-slate-900/70', primary: 'bg-cyan-600', secondary: 'bg-slate-200', accent: 'bg-cyan-100', border: 'border-slate-300', focusRing: 'focus:ring-cyan-500', iconColor: '#0f172a' },
    dark: { bg: 'dark:bg-slate-900', text: 'dark:text-slate-100', textMuted: 'dark:text-slate-100/70', primary: 'dark:bg-cyan-500', secondary: 'dark:bg-slate-700', accent: 'dark:bg-cyan-900', border: 'dark:border-slate-600', focusRing: 'dark:focus:ring-cyan-400', iconColor: '#f1f5f9' }
  },
  forest: {
    name: 'Forest',
    light: { bg: 'bg-green-50', text: 'text-green-900', textMuted: 'text-green-900/70', primary: 'bg-emerald-600', secondary: 'bg-green-200', accent: 'bg-emerald-100', border: 'border-green-300', focusRing: 'focus:ring-emerald-500', iconColor: '#14532d' },
    dark: { bg: 'dark:bg-green-900', text: 'dark:text-green-100', textMuted: 'dark:text-green-100/70', primary: 'dark:bg-emerald-500', secondary: 'dark:bg-green-700', accent: 'dark:bg-emerald-900', border: 'dark:border-green-600', focusRing: 'dark:focus:ring-emerald-400', iconColor: '#dcfce7' }
  },
  sunset: {
    name: 'Sunset',
    light: { bg: 'bg-orange-50', text: 'text-orange-900', textMuted: 'text-orange-900/70', primary: 'bg-red-600', secondary: 'bg-orange-200', accent: 'bg-red-100', border: 'border-orange-300', focusRing: 'focus:ring-red-500', iconColor: '#9a3412' },
    dark: { bg: 'dark:bg-orange-900', text: 'dark:text-orange-100', textMuted: 'dark:text-orange-100/70', primary: 'dark:bg-red-500', secondary: 'dark:bg-orange-700', accent: 'dark:bg-red-900', border: 'dark:border-orange-600', focusRing: 'dark:focus:ring-red-400', iconColor: '#fed7aa' }
  },
  purple: {
    name: 'Purple',
    light: { bg: 'bg-purple-50', text: 'text-purple-900', textMuted: 'text-purple-900/70', primary: 'bg-violet-600', secondary: 'bg-purple-200', accent: 'bg-violet-100', border: 'border-purple-300', focusRing: 'focus:ring-violet-500', iconColor: '#581c87' },
    dark: { bg: 'dark:bg-purple-900', text: 'dark:text-purple-100', textMuted: 'dark:text-purple-100/70', primary: 'dark:bg-violet-500', secondary: 'dark:bg-purple-700', accent: 'dark:bg-violet-900', border: 'dark:border-purple-600', focusRing: 'dark:focus:ring-violet-400', iconColor: '#e9d5ff' }
  },
  midnight: {
    name: 'Midnight',
    light: { bg: 'bg-indigo-50', text: 'text-indigo-900', textMuted: 'text-indigo-900/70', primary: 'bg-indigo-600', secondary: 'bg-indigo-200', accent: 'bg-indigo-100', border: 'border-indigo-300', focusRing: 'focus:ring-indigo-500', iconColor: '#312e81' },
    dark: { bg: 'dark:bg-indigo-900', text: 'dark:text-indigo-100', textMuted: 'dark:text-indigo-100/70', primary: 'dark:bg-indigo-500', secondary: 'dark:bg-indigo-700', accent: 'dark:bg-indigo-900', border: 'dark:border-indigo-600', focusRing: 'dark:focus:ring-indigo-400', iconColor: '#e0e7ff' }
  }
}

// Helper function to get theme styles
export const getThemeStyles = (themeName, isDarkMode = null) => {
  return getThemeStylesUtil(themeName, themes, isDarkMode)
}

export { applyThemeClasses }