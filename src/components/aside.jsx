import { useState, useEffect, useRef } from 'react'
import { useDarkMode } from '../utility/darkmode'
import { Button, IconButton } from './UI/buttons'
import { cn } from '../utility/tools'
import { Home, User, Settings, Search, X } from '../assets/svg'

const Aside = () => {
    const { currentTheme } = useDarkMode()
    const [isExpanded, setIsExpanded] = useState(false)
    const sidebarRef = useRef(null)

    const styles = {
        asideTop: cn("flex justify-start items-center col-span-1 row-span-1 pt-0.25"),
        asideContent: cn("flex flex-col items-center col-span-1 row-span-2 pt-1"),
        collapsedNav: cn("flex flex-col gap-2 w-full items-center"),
        overlay: cn("fixed inset-0 z-40 bg-black/50 transition-opacity duration-300", 
                    isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"),
        sidebar: cn("fixed left-0 top-0 h-full w-64 z-50 bg-white dark:bg-gray-800 shadow-xl",
                   "transform transition-transform duration-300 ease-in-out",
                   isExpanded ? "translate-x-0" : "-translate-x-full"),
        content: cn("flex flex-col h-full p-4"),
        nav: cn("flex flex-col gap-1"),
        navItem: cn("flex items-center gap-3 w-full justify-start"),
        section: cn("mb-6"),
        title: cn("text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400"),
        icon: cn("w-1.5 h-1.5 cursor-pointer"),
        iconTab: cn("w-3 h-3 cursor-pointer"),
        x: cn("absolute top-2 right-2")
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

    // Compact button props
    const btnProps = { size: "md", theme: currentTheme }
    const iconBtnProps = { ...btnProps, variant: "ghost", className: styles.iconTab }
    const navBtnProps = { ...btnProps, variant: "ghost", className: styles.navItem }

    return (
        <>
            {/* Collapsed Sidebar */}
            <div className={styles.asideTop}>
                <Button {...btnProps} variant="primary" className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                    ☰
                </Button>
            </div>
            
            <div className={styles.asideContent}>
                <nav className={styles.collapsedNav}>
                    <IconButton {...iconBtnProps} title="Home"><Home /></IconButton>
                    <IconButton {...iconBtnProps} title="Profile"><User /></IconButton>
                    <IconButton {...iconBtnProps} title="Settings"><Settings /></IconButton>
                    <IconButton {...iconBtnProps} title="Search"><Search /></IconButton>
                </nav>
            </div>

            {/* Overlay */}
            <div className={styles.overlay} />

            {/* Expanded Sidebar */}
            <div ref={sidebarRef} className={styles.sidebar}>
                <div className={styles.content}>
                    <IconButton {...iconBtnProps} className={styles.x} onClick={() => setIsExpanded(false)}>
                        <X className={styles.icon}/>
                    </IconButton>

                    <div className={styles.section}>
                        <h3 className={styles.title}>Navigation</h3>
                        <nav className={styles.nav}>
                            <Button {...navBtnProps}><Home className={styles.icon} /><span>Home</span></Button>
                            <Button {...navBtnProps}><User className={styles.icon} /><span>Profile</span></Button>
                            <Button {...navBtnProps}><Settings className={styles.icon} /><span>Settings</span></Button>
                        </nav>
                    </div>

                    <div className={styles.section}>
                        <Button {...btnProps} variant="outline" className={styles.navItem}>
                            <Search className={styles.icon} /><span>Search</span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Aside