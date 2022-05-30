import {FC, useState} from "react";
import {Footer} from "../Footer";
import styles from "./index.module.sass";
import {Header} from "../Header";
import {BurgerMenu} from "../BurgerMenu";

export interface IBaseLayout {

}
export const BaseLayout: FC<IBaseLayout> = ({children}) => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Header />
            </header>
            <div className={styles.burgerMenu}>
                <BurgerMenu />
            </div>
            <main className={styles.content}>
                {children}
            </main>
            <footer className={styles.footer}>
                <Footer />
            </footer>
        </div>
    )
}
