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
 * - Generic user preference management with namespacing
 * - localStorage availability detection
 * 
 * @example
 * import { getLocalStorageItem, setLocalStorageItem } from './localStorage'
 * 
 * // Store and retrieve data
 * setLocalStorageItem('userSettings', { theme: 'dark', lang: 'en' })
 * const settings = getLocalStorageItem('userSettings', {})
 * 
 * @example
 * import { getDarkModePreference, setDarkModePreference } from './localStorage'
 * 
 * // Dark mode management
 * const mode = getDarkModePreference() // 'dark', 'light', or null
 * setDarkModePreference('dark')
 */

/**
 * Utility functions for localStorage operations
 * Provides a safe and reusable way to interact with localStorage
 */

/**
 * Safely get an item from localStorage
 * @param {string} key - The localStorage key
 * @param {any} defaultValue - The default value to return if key doesn't exist
 * @returns {any} The stored value or default value
 */
export const getLocalStorageItem = (key, defaultValue = null) => {
  try {
    if (typeof window === 'undefined') return defaultValue
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
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
export const setLocalStorageItem = (key, value) => {
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
export const removeLocalStorageItem = (key) => {
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
 * Check if localStorage is available
 * @returns {boolean} Whether localStorage is available
 */
export const isLocalStorageAvailable = () => {
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
 * Clear all localStorage data
 * @returns {boolean} Success status
 */
export const clearLocalStorage = () => {
  try {
    if (typeof window === 'undefined') return false
    localStorage.clear()
    return true
  } catch (error) {
    console.warn('Error clearing localStorage:', error)
    return false
  }
}

// Dark mode specific localStorage functions
/**
 * Get the saved dark mode preference
 * @returns {string|null} 'dark', 'light', or null if not set
 */
export const getDarkModePreference = () => {
  return getLocalStorageItem('mode', null)
}

/**
 * Set the dark mode preference
 * @param {'dark'|'light'} mode - The mode to save
 * @returns {boolean} Success status
 */
export const setDarkModePreference = (mode) => {
  if (mode !== 'dark' && mode !== 'light') {
    console.warn('Invalid dark mode value. Use "dark" or "light".')
    return false
  }
  return setLocalStorageItem('mode', mode)
}

/**
 * Check if user prefers dark mode based on system settings
 * @returns {boolean} Whether system prefers dark mode
 */
export const getSystemDarkModePreference = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Get the effective dark mode setting (saved preference or system preference)
 * @returns {boolean} Whether dark mode should be enabled
 */
export const getEffectiveDarkModePreference = () => {
  const savedMode = getDarkModePreference()
  
  if (savedMode === 'dark') return true
  if (savedMode === 'light') return false
  
  // If no saved preference, use system preference
  return getSystemDarkModePreference()
}

// Generic preference management functions
/**
 * Get user preference with fallback
 * @param {string} key - The preference key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} The preference value
 */
export const getUserPreference = (key, defaultValue = null) => {
  return getLocalStorageItem(`user_pref_${key}`, defaultValue)
}

/**
 * Set user preference
 * @param {string} key - The preference key
 * @param {any} value - The preference value
 * @returns {boolean} Success status
 */
export const setUserPreference = (key, value) => {
  return setLocalStorageItem(`user_pref_${key}`, value)
}

/**
 * Remove user preference
 * @param {string} key - The preference key
 * @returns {boolean} Success status
 */
export const removeUserPreference = (key) => {
  return removeLocalStorageItem(`user_pref_${key}`)
}
