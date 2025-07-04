import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDarkModeContext } from '../utility/darkmode'
import { Button } from './UI/buttons'
import { SearchInput } from './UI/input'
import { cn } from '../utility/tools'
import { Home, User, Settings, Hamburger } from '../assets/svg'
import { getThemeStyles } from '../style/styling'

const Aside = () => {
    const { currentTheme, darkMode } = useDarkModeContext()
    const theme = useMemo(() => getThemeStyles(currentTheme, darkMode), [currentTheme, darkMode])
    const [isExpanded, setIsExpanded] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const sidebarRef = useRef(null)
    const navigate = useNavigate()

    const styles = {
        asideTop: cn("flex justify-start items-center col-span-1 row-span-1"),
        asideContent: cn("flex flex-col items-center col-span-1 row-span-2 pt-1"),
        collapsedNav: cn("flex flex-col gap-2 w-full items-center"),
        
        overlay: cn("fixed inset-0 z-40 transition-opacity duration-300 bg-opacity-50",
                    isExpanded ? "opacity-50" : "opacity-0 pointer-events-none"),
        
        sidebar: cn("fixed left-0 top-0 h-full w-auto z-50 shadow-xl transform transition-transform duration-300 ease-in-out",
                   theme.bg, theme.text, theme.border,
                   isExpanded ? "translate-x-0" : "-translate-x-full"),
        
        content: cn("flex flex-col h-full w-[20rem] py-1 px-1", theme.primary),
        nav: cn("flex flex-col gap-1"),
        navItem: cn("flex items-center gap-3 w-full justify-start"),
        section: cn("mb-5"),
        
        title: cn("text-sm font-semibold mb-2", theme.textMuted),
        
        icon: cn("w-1.5 h-1.5 cursor-pointer"),
        iconTab: cn("w-2 h-2 cursor-pointer"),
    }

    // Close handlers
    useEffect(() => {
        const handleClick = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target) && isExpanded) {
                setIsExpanded(false)
            }
        }
        if (isExpanded) document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [isExpanded])

    useEffect(() => {
        document.body.style.overflow = isExpanded ? 'hidden' : 'unset'
        return () => document.body.style.overflow = 'unset'
    }, [isExpanded])

    function handleNav(path) {
        navigate(path)
        setIsExpanded(false)
    }

    return (
        <div>
            {/* Collapsed Sidebar */}
            <div className={styles.asideTop}>
                <Button size='xs' variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
                    <Hamburger 
                        className={styles.iconTab}
                    />
                </Button>
            </div>
            
            <div className={styles.asideContent}>
                
            </div>

            {/* Overlay */}
            <div className={styles.overlay} />

            {/* Expanded Sidebar */}
            <div ref={sidebarRef} className={styles.sidebar}>
                <div className={styles.content}>
                    <div className={styles.section}>
                        <h3 className={styles.title}>Navigation</h3>
                        <nav className={styles.nav}>
                            <Button variant='secondary' onClick={() => handleNav('/home')}>
                                <Home className={styles.icon} />
                                <span>Home</span>
                            </Button>
                            <Button variant='secondary'>
                                <User className={styles.icon} />
                                <span>Profile</span>
                            </Button>
                            <Button variant='secondary'>
                                <Settings className={styles.icon} />
                                <span>Settings</span>
                            </Button>
                        </nav>
                    </div>

                    <div className={styles.section}>
                        <SearchInput
                            size="sm"
                            iconPosition='left'
                            iconClassName="cursor-pointer"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onEnter={(query) => console.log('Searching for:', query)}
                            placeholder="Search..."
                            variant="filled"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aside