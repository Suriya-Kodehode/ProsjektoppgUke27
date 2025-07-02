

import { useDarkMode, DarkModeToggle } from '../utility/darkmode'
import { cn } from '../utility/tools'

const Header = () => {
    const { darkMode, toggleDarkMode } = useDarkMode()

    const styles = {
        headLeft: cn("flex justify-start items-center col-start-1 col-end-2"),
        headCenter: cn("flex justify-center items-center col-start-2 col-end-3"),
        headRight: cn("flex justify-end items-center col-start-3 col-end-4"),
        headTitle: cn("text-xl font-bold text-center"),
        buttonModeToggle: cn("cursor-pointer circle"),
    }

    return (
        <>
            <div className={styles.headLeft}>
                <h2 className="text-lg font-semibold">Logo</h2>
            </div>
            <div className={styles.headCenter}>
                <h1 className={styles.headTitle}>Header</h1>
            </div>
            <div className={styles.headRight}>
                <DarkModeToggle 
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    size="md"
                    className={styles.buttonModeToggle}
                />
            </div>
        </>
    )
}

export default Header