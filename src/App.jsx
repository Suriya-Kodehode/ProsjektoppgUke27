

const styles = {
  appContainer: "grid grid-cols-[15%_1fr_1fr] grid-rows-[15%_1fr_5%] min-h-screen max-w-screen",
  aside: "flex flex-col items-center col-span-1 row-span-3 p-2",
  header: "grid grid-cols-[1fr_1fr_1fr] col-span-2 p-2",
  main: "col-span-2",
  footer: "col-span-2",

  headLeft: "flex justify-start items-center col-start-1 col-end-2",
  headCenter: "flex justify-center items-center col-start-2 col-end-3",
  headRight: "flex justify-end items-center col-start-3 col-end-4",

  headTitle: "text-xl font-bold text-center",
}

function App() {
  return (
    <>
      <div className={styles.appContainer}>
        <aside className={styles.aside}>
          <h2 className="text-lg font-semibold">Sidebar</h2>
          <p>This is the aside area</p>
        </aside>

        <header className={styles.header}>
          <div className={styles.headLeft}>
            <h2 className="text-lg font-semibold">Logo</h2>
          </div>
          <div className={styles.headCenter}>
            <h1 className={styles.headTitle}>Header</h1>
          </div>
          <div className={styles.headRight}>
            <button>Action</button>
          </div>
        </header>
        
        <main className={styles.main}>
          <h2 className="text-lg font-semibold mb-2">Main Content</h2>
          <p>This is the main area</p>
        </main>
        
        <footer className={styles.footer}>
          <p>This is the footer area</p>
        </footer>
      </div>
    </>
  )
      
}

export default App
