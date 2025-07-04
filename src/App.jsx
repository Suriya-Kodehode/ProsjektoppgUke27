import { Outlet } from 'react-router-dom'

import { useDarkModeContext } from './utility/darkmode'
import { getThemeGradient, getThemeStyles } from './style/styling'
import { cn } from './utility/tools'

import Header from './components/header'
import Aside from './components/aside'
import Footer from './components/footer'

function App() {
  const { currentTheme, darkMode } = useDarkModeContext()
  const theme = getThemeStyles(currentTheme, darkMode);
  const themeGradient = getThemeGradient(currentTheme);

  const styles = {
    appContainer: cn("grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr_5%] min-h-screen max-w-screen", themeGradient),
    aside: "grid grid-cols-[1fr] grid-rows-[auto_1fr] justify-center col-span-1 row-span-3 w-full p-1",
    header: "grid grid-cols-[1fr_1fr_1fr] col-span-2 p-1",
    main: "flex flex-col items-center col-start-2 col-end-4 row-start-2 row-end-3 p-1",
    footer: "flex flex-row items-center justify-center col-start-2 col-end-4 row-start-3 row-end-4 p-1",
  }

  return (
    <>
      <div className={styles.appContainer}>
        <aside className={styles.aside}>
          <Aside />
        </aside>

        <header className={styles.header}>
          <Header />
        </header>
        
        <main className={styles.main}>
          <Outlet />
        </main>
        
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </div>
    </>
  )
      
}

export default App
