// =============================================================================
// STRING UTILITIES
// =============================================================================

/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} String with first letter capitalized
 */
export function cap(str) {
  return str && str[0].toUpperCase() + str.slice(1);
}

/**
 * Capitalize the first letter of each word in a string
 * @param {string} str - The string to capitalize words in
 * @returns {string} String with each word capitalized
 */
export function capW(str) {
  return str ? str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    : str;
}

/**
 * Convert the entire string to lowercase
 * @param {string} str - The string to convert
 * @returns {string} Lowercase string
 */
export function low(str) {
  return str ? str.toLowerCase() : str;
}

// =============================================================================
// CSS CLASS UTILITIES
// =============================================================================

/**
 * Utility function to concatenate class names with spaces
 * Filters out falsy values for conditional classes
 * @param {...string} classes - Class names to concatenate
 * @returns {string} Concatenated class string
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Helper to convert background classes to hover classes
 * @param {string} bgClass - Background class (e.g., 'bg-blue-500')
 * @returns {string} Hover class (e.g., 'hover:bg-blue-500')
 */
export function getHoverClass(bgClass) {
  return bgClass ? bgClass.replace('bg-', 'hover:bg-') : ''
}

// =============================================================================
// THEME UTILITIES
// =============================================================================

/**
 * Get theme styles - combines light and dark classes using cn
 * @param {string} themeName - Name of the theme to get
 * @param {Object} themes - Themes object containing theme definitions
 * @param {boolean|null} isDarkMode - Explicit dark mode override (optional)
 * @returns {Object} Theme styles object with combined classes
 */
export const getThemeStyles = (themeName, themes, isDarkMode = null) => {
  const theme = themes[themeName] || themes.default
  
  // Determine dark mode: prefer passed parameter, fallback to DOM check
  let darkMode
  if (isDarkMode === true || isDarkMode === false) {
    // Explicit boolean value provided
    darkMode = isDarkMode
  } else {
    // Check DOM for theme-{name}-dark class
    darkMode = document.documentElement.classList.contains(`theme-${themeName}-dark`)
  }
  
  // Combine light and dark classes for reactive Tailwind dark mode using cn function
  return {
    bg: cn(theme.light.bg, theme.dark.bg),
    text: cn(theme.light.text, theme.dark.text),
    textMuted: cn(theme.light.textMuted, theme.dark.textMuted),
    primary: cn(theme.light.primary, theme.dark.primary),
    secondary: cn(theme.light.secondary, theme.dark.secondary),
    accent: cn(theme.light.accent, theme.dark.accent),
    border: cn(theme.light.border, theme.dark.border),
    focusRing: cn(theme.light.focusRing, theme.dark.focusRing),
    iconColor: darkMode ? theme.dark.iconColor : theme.light.iconColor
  }
}

/**
 * Helper function to apply theme classes to an element
 * @param {HTMLElement} element - DOM element to apply classes to
 * @param {Object} styles - Styles object with class names
 */
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