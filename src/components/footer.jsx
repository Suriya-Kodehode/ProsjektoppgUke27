import { cn } from '../utility/tools'

const Footer = () => {
    const styles = {
        footerContent: cn("flex flex-row items-center justify-center w-full"),
    }

    return (
        <>
            <div className={styles.footerContent}>
                <p>This is the footer area</p>
            </div>
        </>
    )
}

export default Footer