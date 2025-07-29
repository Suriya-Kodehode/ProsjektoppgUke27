import { useMemo } from "react";
import { useDarkModeContext } from "../utility/darkmode";
import { getThemeStyles } from "../style/styling";
import { cn } from "../utility/tools";
import { X } from "../assets/svg";
import { Button } from "./UI/buttons";
import { settingsButtons } from "./settingOptions/settingsButtons";

const Settings = ({ onClose }) => {
    const { currentTheme, darkMode } = useDarkModeContext();
    const theme = useMemo(() => getThemeStyles(currentTheme, darkMode), [currentTheme, darkMode]);

    const styles = {
        container: cn("fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300"),
        closeButton: cn("absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"),
        bg: cn("rounded-lg shadow-lg p-1.5 min-w-[70%] min-h-[90%] relative", theme.bg),
        title: cn("text-xl font-bold mt-3 mb-2 text-center", theme.text),
        content: cn("p-4 flex flex-col gap-3 items-center"),
        button: cn("cursor-pointer")
    }

    return (
        <div className={styles.container}>
            <div className={styles.bg}>
                <button className={styles.closeButton} onClick={onClose}>
                    <X />
                </button>
                <h2 className={styles.title}>Settings</h2>
                <div className={styles.content}>
                    {settingsButtons.map((button) => (
                        <Button 
                            key={button.id}
                            variant={button.variant}
                            size="md"
                            theme={currentTheme}
                            onClick={button.onClick}
                            className={styles.button}
                        >
                            {button.text}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Settings;