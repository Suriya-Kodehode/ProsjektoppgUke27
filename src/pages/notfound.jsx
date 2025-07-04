import { useNavigate } from "react-router-dom";
import { Button } from "@/components/UI/buttons.jsx";
import { getThemeStyles } from "../style/styling.jsx";
import { cn } from "@/utility/tools.js";
import { useDarkModeContext } from "../utility/darkmode.jsx";

const NotFound = ({ des }) => {
   const navigate = useNavigate();
   const handleClick = () => {
    if (des) {
        navigate(`${des}`);
    }
   }

   const { darkMode, currentTheme } = useDarkModeContext()
   const theme = getThemeStyles(currentTheme, darkMode)

   const styles = {
    notfound: cn("flex flex-col justify-center items-center min-h-screen w-full text-center relative", theme.bg),
    container: cn("absolute top-[30%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] w-full max-w-md mx-auto", theme.bg, theme.border),
    head: cn("text-3xl font-bold mb-2 text-red-500 dark:text-red-400"),
    details: cn("text-base font-medium mb-2", theme.textMuted),
    button: cn("mt-2")
   }
   
   const texts = {
    head: "404 - Page Not Found",
    details: "The page you are looking for does not exist. Please check the URL or return to the home page.",
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
            <div className={styles.button}>
                <Button 
                    onClick={handleClick}
                    theme={currentTheme}
                    variant="primary"
                    size="lg"
                    className={"cursor-pointer"}
                >
                    {texts.button}
                </Button>
            </div>
        </div>
    </div>
   )
}

export default NotFound;
