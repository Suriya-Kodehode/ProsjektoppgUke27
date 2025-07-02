/**
 * localStorage Utility Module
 * 
 * A comprehensive, reusable utility for managing localStorage operations.
 * Provides safe, error-handled methods for storing and retrieving data.
 * 
 * Features:
 * - Safe localStorage operations with error handling
 * - JSON serialization/deserialization
 * - Server-side rendering compatibility
 * - Dark mode preference management
 * - Theme preference management
 * - Generic user preference management with namespacing
 * - localStorage availability detection
 * 
 * @example
 * import { getItem, setItem } from './localStorage'
 * 
 * // Store and retrieve data
 * setItem('userSettings', { theme: 'dark', lang: 'en' })
 * const settings = getItem('userSettings', {})
 * 
 * @example
 * import { getDarkMode, setDarkMode, getTheme, setTheme } from './localStorage'
 * 
 * // Dark mode and theme management
 * const mode = getDarkMode() // 'dark', 'light', or null
 * setDarkMode('dark')
 * const theme = getTheme() // theme name or 'default'
 * setTheme('ocean')
 */

// =============================================================================
// CORE LOCALSTORAGE OPERATIONS
// =============================================================================

/**
 * Check if localStorage is available
 * @returns {boolean} Whether localStorage is available
 */
export const isAvailable = () => {
  try {
    if (typeof window === 'undefined') return false
    const testKey = '__localStorage_test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Safely get an item from localStorage
 * @param {string} key - The localStorage key
 * @param {any} defaultValue - The default value to return if key doesn't exist
 * @returns {any} The stored value or default value
 */
export const getItem = (key, defaultValue = null) => {
  try {
    if (typeof window === 'undefined') return defaultValue
    const item = localStorage.getItem(key)
    if (!item) return defaultValue
    
    try {
      return JSON.parse(item)
    } catch (parseError) {
      console.warn(`localStorage key "${key}" contains non-JSON data, returning raw value:`, item)
      return item
    }
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Safely set an item in localStorage
 * @param {string} key - The localStorage key
 * @param {any} value - The value to store
 * @returns {boolean} Success status
 */
export const setItem = (key, value) => {
  try {
    if (typeof window === 'undefined') return false
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error)
    return false
  }
}

/**
 * Safely remove an item from localStorage
 * @param {string} key - The localStorage key
 * @returns {boolean} Success status
 */
export const removeItem = (key) => {
  try {
    if (typeof window === 'undefined') return false
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error)
    return false
  }
}

/**
 * Clear all localStorage data
 * @returns {boolean} Success status
 */
export const clearAll = () => {
  try {
    if (typeof window === 'undefined') return false
    localStorage.clear()
    return true
  } catch (error) {
    console.warn('Error clearing localStorage:', error)
    return false
  }
}

// =============================================================================
// THEME MANAGEMENT
// =============================================================================

/**
 * Get the saved theme preference
 * @returns {string} The saved theme name or 'default' if not set
 */
export const getTheme = () => {
  return getItem('theme', 'default')
}

/**
 * Set the theme preference
 * @param {string} theme - The theme name to save
 * @returns {boolean} Success status
 */
export const setTheme = (theme) => {
  if (!theme || typeof theme !== 'string') {
    console.warn('Invalid theme value. Must be a non-empty string.')
    return false
  }
  return setItem('theme', theme)
}

/**
 * Remove the theme preference
 * @returns {boolean} Success status
 */
export const removeTheme = () => {
  return removeItem('theme')
}

/**
 * Get the effective theme setting with fallback
 * @param {string} defaultTheme - Default theme if none is saved
 * @returns {string} The theme name to use
 */
export const getEffectiveTheme = (defaultTheme = 'default') => {
  const savedTheme = getTheme()
  return savedTheme || defaultTheme
}

// =============================================================================
// DARK MODE MANAGEMENT
// =============================================================================

/**
 * Get the saved dark mode preference
 * @returns {string|null} 'dark', 'light', or null if not set
 */
export const getDarkMode = () => {
  return getItem('mode', null)
}

/**
 * Set the dark mode preference
 * @param {'dark'|'light'} mode - The mode to save
 * @returns {boolean} Success status
 */
export const setDarkMode = (mode) => {
  if (mode !== 'dark' && mode !== 'light') {
    console.warn('Invalid dark mode value. Use "dark" or "light".')
    return false
  }
  return setItem('mode', mode)
}

/**
 * Check if user prefers dark mode based on system settings
 * @returns {boolean} Whether system prefers dark mode
 */
export const getSystemDarkMode = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Get the effective dark mode setting (saved preference or system preference)
 * @returns {boolean} Whether dark mode should be enabled
 */
export const getEffectiveDarkMode = () => {
  const savedMode = getDarkMode()
  
  if (savedMode === 'dark') return true
  if (savedMode === 'light') return false
  
  // If no saved preference, use system preference
  return getSystemDarkMode()
}

// =============================================================================
// COMBINED THEME AND MODE MANAGEMENT
// =============================================================================

/**
 * Get combined theme and mode preferences
 * @returns {object} Object with theme and mode properties
 */
export const getThemeAndMode = () => {
  return {
    theme: getTheme(),
    mode: getDarkMode(),
    effectiveMode: getEffectiveDarkMode()
  }
}

/**
 * Set both theme and mode preferences
 * @param {string} theme - The theme name
 * @param {'dark'|'light'} mode - The mode preference
 * @returns {object} Success status for both operations
 */
export const setThemeAndMode = (theme, mode) => {
  const themeSuccess = setTheme(theme)
  const modeSuccess = setDarkMode(mode)
  
  return {
    theme: themeSuccess,
    mode: modeSuccess,
    success: themeSuccess && modeSuccess
  }
}

/**
 * Reset all theme and mode preferences
 * @returns {object} Success status for both operations
 */
export const resetThemeAndMode = () => {
  const themeSuccess = removeTheme()
  const modeSuccess = removeItem('mode')
  
  return {
    theme: themeSuccess,
    mode: modeSuccess,
    success: themeSuccess && modeSuccess
  }
}

// =============================================================================
// GENERIC USER PREFERENCES
// =============================================================================

/**
 * Get user preference with fallback
 * @param {string} key - The preference key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} The preference value
 */
export const getUserPreference = (key, defaultValue = null) => {
  return getItem(`user_pref_${key}`, defaultValue)
}

/**
 * Set user preference
 * @param {string} key - The preference key
 * @param {any} value - The preference value
 * @returns {boolean} Success status
 */
export const setUserPreference = (key, value) => {
  return setItem(`user_pref_${key}`, value)
}

/**
 * Remove user preference
 * @param {string} key - The preference key
 * @returns {boolean} Success status
 */
export const removeUserPreference = (key) => {
  return removeItem(`user_pref_${key}`)
}

/**
 * Clean up legacy localStorage data by re-saving with proper JSON formatting
 * @param {string[]} keys - Array of keys to clean up
 * @returns {boolean} Success status
 */
export const cleanupLegacyData = (keys = ['theme', 'mode']) => {
  try {
    if (typeof window === 'undefined') return false
    
    keys.forEach(key => {
      const rawValue = localStorage.getItem(key)
      if (rawValue) {
        try {
          // Try to parse - if it fails, we need to clean it up
          JSON.parse(rawValue)
        } catch (error) {
          // Re-save with proper JSON formatting
          console.log(`Cleaning up legacy data for key "${key}":`, rawValue)
          setItem(key, rawValue)
        }
      }
    })
    
    return true
  } catch (error) {
    console.warn('Error cleaning up legacy localStorage data:', error)
    return false
  }
}