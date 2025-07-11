import { useMemo } from "react";
import { useDarkModeContext } from "../utility/darkmode";
import { getThemeStyles } from "../style/styling";
import { cn } from "../utility/tools";
import { X } from "../assets/svg";

const Settings = ({ onClose }) => {
    const { currentTheme, darkMode } = useDarkModeContext();
    const theme = useMemo(() => getThemeStyles(currentTheme, darkMode), [currentTheme, darkMode]);

    const styles = {
        container: cn("fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300"),
        closeButton: cn("absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"),
        bg: cn("rounded-lg shadow-lg p-1.5 min-w-[70%] min-h-[90%] relative", theme.bg),
        title: cn("text-xl font-bold mb-4 text-center", theme.text)
    }

    return (
        <div className={styles.container}>
            <div className={styles.bg}>
                <button className={styles.closeButton} onClick={onClose}>
                    <X />
                </button>
                <h2 className={styles.title}>Settings</h2>
                {/* Add your settings content here */}
            </div>
        </div>
    )
}

export default Settings;