import React from 'react'
import { cn, getHoverClass } from '../../utility/tools'
import { themes, getThemeStyles } from '../../style/styling'
import { ButtonLoadingSpinner, IconLoadingSpinner } from '../../assets/svg'

// Generate themed button variants
const getThemedVariants = (themeName) => {
  // Use provided theme name or detect current theme from document classes
  let currentThemeName = themeName || 'default'
  if (!themeName) {
    const classList = document.documentElement.classList
    Object.keys(themes).forEach(themeKey => {
      if (classList.contains(`theme-${themeKey}`)) {
        currentThemeName = themeKey
      }
    })
  }
  
  const theme = getThemeStyles(currentThemeName)
  
  return {
    primary: cn(theme.primary, 'hover:opacity-90 text-white focus:ring-2', theme.focusRing, 'focus:ring-opacity-50 transition-all duration-200'),
    secondary: cn(theme.secondary, 'hover:opacity-90', theme.focusRing, 'focus:ring-2 focus:ring-opacity-50 transition-all duration-200'),
    success: cn('bg-green-600 hover:bg-green-700 text-white focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 dark:bg-green-500 dark:hover:bg-green-600 transition-all duration-200'),
    danger: cn('bg-red-600 hover:bg-red-700 text-white focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 dark:bg-red-500 dark:hover:bg-red-600 transition-all duration-200'),
    warning: cn('bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition-all duration-200'),
    outline: cn('border-2', theme.border, 'bg-transparent', getHoverClass(theme.accent), theme.text, 'focus:ring-2', theme.focusRing, 'focus:ring-opacity-50 transition-all duration-200'),
    ghost: cn('bg-transparent dark:bg-transparent', getHoverClass(theme.accent), 'focus:ring-2', theme.focusRing, 'focus:ring-opacity-50 transition-all duration-200')
  }
}

// Base Button component with flexible styling
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  theme = null,
  onClick,
  type = 'button',
  ariaLabel,
  title,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed'
  const defaultRounding = 'rounded-lg'
  
  // Get themed variants based on provided theme or current theme and dark mode
  const variants = getThemedVariants(theme)
  
  const sizes = {
    xs: 'px-[8px] py-[4px] text-xs',
    sm: 'px-[12px] py-[6px] text-sm', 
    md: 'px-[16px] py-[8px] text-base',
    lg: 'px-[24px] py-[10px] text-lg',
    xl: 'px-[32px] py-[12px] text-xl'
  }
  
  const classes = cn(
    baseClasses,
    defaultRounding,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    fullWidth && 'w-full',
    className
  )

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      title={title}
      {...props}
    >
      {loading && <ButtonLoadingSpinner />}
      {children}
    </button>
  )
}

// Icon Button component for buttons with only icons
export const IconButton = ({
  children,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  theme = null,
  onClick,
  type = 'button',
  ariaLabel,
  title,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed'
  const defaultRounding = 'rounded-lg'
  
  // Get themed variants based on provided theme or current theme and dark mode
  const variants = getThemedVariants(theme)
  
  const sizes = {
    xs: 'p-[4px] text-xs',
    sm: 'p-[6px] text-sm',
    md: 'p-[8px] text-base',
    lg: 'p-[10px] text-lg',
    xl: 'p-[12px] text-xl'
  }
  
  const classes = cn(
    baseClasses,
    defaultRounding,
    variants[variant] || variants.secondary,
    sizes[size] || sizes.md,
    className
  )
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      title={title}
      {...props}
    >
      {loading ? (
        <IconLoadingSpinner />
      ) : (
        children
      )}
    </button>
  )
}

// Button Group component for grouping buttons together
export const ButtonGroup = ({ children, className = '', ...props }) => {
  return (
    <div className={cn('inline-flex rounded-lg shadow-sm', className)} role="group" {...props}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        
        const isFirst = index === 0
        const isLast = index === React.Children.count(children) - 1
        
        let groupClasses = ''
        if (isFirst && isLast) {
          groupClasses = 'rounded-lg'
        } else if (isFirst) {
          groupClasses = 'rounded-l-lg rounded-r-none border-r-0'
        } else if (isLast) {
          groupClasses = 'rounded-r-lg rounded-l-none'
        } else {
          groupClasses = 'rounded-none border-r-0'
        }
        
        return React.cloneElement(child, {
          className: cn(child.props.className, groupClasses)
        })
      })}
    </div>
  )
}

// Loading Button component that shows loading state
export const LoadingButton = ({ loading, children, ...props }) => {
  return (
    <Button loading={loading} disabled={loading} {...props}>
      {children}
    </Button>
  )
}
