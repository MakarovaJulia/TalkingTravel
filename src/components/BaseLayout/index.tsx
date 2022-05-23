import {FC} from "react";
import {Footer} from "../Footer";
import styles from "./index.module.sass";
import {Header} from "../Header";

export interface IBaseLayout {

}
export const BaseLayout: FC<IBaseLayout> = ({children}) => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Header />
            </header>
            <main className={styles.content}>
                {children}
            </main>
            <footer className={styles.footer}>
                <Footer />
            </footer>
        </div>
    )
}
