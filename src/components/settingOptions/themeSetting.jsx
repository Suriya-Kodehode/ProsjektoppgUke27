import { useMemo } from "react";
import { useDarkModeContext } from "../../utility/darkmode";
import { getThemeStyles } from "../../style/styling";
import { cn } from "../../utility/tools";
import { X } from "../../assets/svg";
import { ThemeControls } from "../../utility/darkmode";

const ThemeSetting = ({ onClose }) => {
    const { currentTheme, darkMode, changeTheme, toggleDarkMode, themes } = useDarkModeContext();
    const theme = useMemo(() => getThemeStyles(currentTheme, darkMode), [currentTheme, darkMode]);

    const styles = {
        container: cn("fixed inset-0 z-[60] flex items-center justify-center bg-black/60 transition-opacity duration-300"),
        closeButton: cn("absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"),
        bg: cn("rounded-lg shadow-xl p-6 min-w-[60%] min-h-[70%] relative", theme.bg, theme.border, "border"),
        title: cn("text-2xl font-bold mb-6 text-center", theme.text),
        content: cn("flex flex-col gap-6 items-center")
    }

    return (
        <div className={styles.container}>
            <div className={styles.bg}>
                <button className={styles.closeButton} onClick={onClose}>
                    <X />
                </button>
                <h2 className={styles.title}>Theme Settings</h2>
                <div className={styles.content}>
                    <ThemeControls 
                        darkMode={darkMode}
                        toggleDarkMode={toggleDarkMode}
                        currentTheme={currentTheme}
                        changeTheme={changeTheme}
                        themes={themes}
                        showLabels={true}
                        variant="primary"
                        theme={currentTheme}
                    />
                </div>
            </div>
        </div>
    )
}

export default ThemeSetting;