import { forwardRef } from 'react'
import { cn } from '../../utility/tools'
import { getThemeStyles } from '../../style/styling'
import { useDarkMode } from '../../utility/darkmode'
import { Search } from '../../assets/svg'

// Base Input component with theme support
const Input = forwardRef(({ 
    className, 
    type = "text", 
    variant = "default",
    size = "md",
    icon: Icon,
    iconPosition = "left",
    iconClassName,
    onIconClick,
    useTheme = true,
    ...props 
}, ref) => {
    const { currentTheme } = useDarkMode()
    const theme = useTheme ? getThemeStyles(currentTheme) : {}

    const variants = {
        default: cn(
            "border transition-colors focus:outline-none focus:ring-2",
            useTheme && theme.bg,
            useTheme && theme.text,
            useTheme && theme.border,
            useTheme && theme.focusRing
        ),
        ghost: cn(
            "border-transparent bg-transparent focus:border-current",
            useTheme && theme.text
        ),
        filled: cn(
            "border-transparent focus:ring-2",
            useTheme && "bg-gray-100 dark:bg-gray-800",
            useTheme && theme.text,
            useTheme && theme.focusRing
        )
    }

    const sizes = {
        xs: "px-0.5 py-0.5 text-sm rounded",
        sm: "px-0.5 py-0.5 text-md rounded-sm",
        md: "px-0.5 py-0.5 text-base rounded-md",
        lg: "px-1 py-1 text-lg rounded-lg",
        xl: "px-2 py-1 text-xl rounded-lg"
    }

    const iconSizes = {
        xs: "h-1 w-1",
        sm: "h-1.5 w-1.5", 
        md: "h-2 w-2",
        lg: "h-2.5 w-2.5",
        xl: "h-3 w-3"
    }

    const padding = {
        input: {
            xs: { l: "pl-[30px]", r: "pr-[30px]" },
            sm: { l: "pl-[40px]", r: "pr-[40px]" },
            md: { l: "pl-[45px]", r: "pr-[45px]" },
            lg: { l: "pl-[55px]", r: "pr-[55px]" },
            xl: { l: "pl-[60px]", r: "pr-[60px]" }
        },
        icon: {
            xs: { l: "pl-[10px]", r: "pr-[10px]" },
            sm: { l: "pl-[10px]", r: "pr-[10px]" },
            md: { l: "pl-[10px]", r: "pr-[10px]" },
            lg: { l: "pl-[10px]", r: "pr-[10px]" },
            xl: { l: "pl-[10px]", r: "pr-[10px]" }
        }
    }

    const baseClasses = cn(
        "w-full",
        variants[variant],
        sizes[size],
        "[&::-webkit-search-cancel-button]:cursor-pointer",
        Icon && iconPosition === "left" && padding.input[size].l,
        Icon && iconPosition === "right" && padding.input[size].r,
        className
    )

    if (Icon) {
        return (
            <div className="relative">
                {iconPosition === "left" && (
                    <div className={cn(
                        "absolute inset-y-0 left-0 flex items-center",
                        padding.icon[size].l,
                        onIconClick && "cursor-pointer"
                    )} onClick={onIconClick}>
                        <Icon className={cn(iconSizes[size], useTheme && theme.text, "input-icon", iconClassName)} />
                    </div>
                )}
                <input
                    type={type}
                    className={baseClasses}
                    ref={ref}
                    {...props}
                />
                {iconPosition === "right" && (
                    <div className={cn(
                        "absolute inset-y-0 right-0 flex items-center",
                        padding.icon[size].r,
                        onIconClick && "cursor-pointer"
                    )} onClick={onIconClick}>
                        <Icon className={cn(iconSizes[size], useTheme && theme.text, "input-icon", iconClassName)} />
                    </div>
                )}
            </div>
        )
    }

    return (
        <input
            type={type}
            className={baseClasses}
            ref={ref}
            {...props}
        />
    )
})

Input.displayName = "Input"

// Specialized SearchInput component
export const SearchInput = ({ 
    onSearch, 
    onEnter,
    placeholder = "Search...",
    icon = true,
    iconPosition = "left",
    iconClassName,
    ...props 
}) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            if (onEnter) {
                onEnter(e.target.value.trim())
            } else if (onSearch) {
                onSearch(e.target.value.trim())
            }
        }
        if (props.onKeyDown) {
            props.onKeyDown(e)
        }
    }

    const handleIconClick = () => {
        if (onSearch && props.value && props.value.trim()) {
            onSearch(props.value.trim())
        }
    }

    return (
        <Input
            type="search"
            placeholder={placeholder}
            icon={icon ? Search : null}
            iconPosition={iconPosition}
            iconClassName={iconClassName}
            onIconClick={onSearch ? handleIconClick : null}
            onKeyDown={handleKeyDown}
            {...props}
        />
    )
}

export default Input
