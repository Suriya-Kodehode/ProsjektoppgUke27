import { useNavigate } from "react-router-dom";
import { Button } from "@/components/UI/buttons.jsx";
import { getThemeStyles } from "../style/styling.jsx";
import { cn } from "@/utility/tools.js";
import { useDarkMode } from "../utility/darkmode.jsx";

const NotFound = ({ des }) => {
   const navigate = useNavigate();
   const handleClick = () => {
    if (des) {
        navigate(`${des}`);
    }
   }

   const { darkMode, currentTheme } = useDarkMode()
   const themeStyles = getThemeStyles(currentTheme, darkMode)

   const styles = {
    notfound: cn("flex flex-col justify-center items-center h-screen text-center relative"),
    container: cn("absolute top-[30%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"),
    head: cn("text-red-500 dark:text-red-400 text-3xl font-bold mb-2"),
    details: cn(themeStyles.text, "text-base font-medium opacity-75"),
    button: cn("mt-4")
   }
   
   const texts = {
    head: "404 - Page Not Found",
    details: "The page you are looking for does not exist.",
    button: "Go to Home"
   }

   return (
    <div className={styles.notfound}>
        <div className={styles.container}>
            <h1 className={styles.head}>
                {texts.head}
            </h1>
            <p className={styles.details}>
                {texts.details}
            </p>
            <div>
                <Button 
                    className={styles.button} 
                    onClick={handleClick}
                    theme={currentTheme}
                    variant="primary"
                >
                    {texts.button}
                </Button>
            </div>
        </div>
    </div>
   )
}

export default NotFound;
