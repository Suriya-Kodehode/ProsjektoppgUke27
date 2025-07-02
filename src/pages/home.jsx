
const Home = () => {

    const styles = {
        container: "flex flex-col items-center text-center",
        header: "text-3xl font-bold",
        paragraph: "text-lg",
    }
    const texts = {
        header: "Main Page",
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>{texts.header}</h1>
        </div>
    )
}

export default Home;