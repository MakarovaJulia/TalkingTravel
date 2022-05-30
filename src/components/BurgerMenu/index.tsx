import React, {useState} from 'react';
import styles from './index.module.sass';
import header_logo from '../../assets/header_logo.svg'
import burger_menu from '../../assets/burger_menu.svg'
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router";
import {useAuth} from "../../firebase";

export const BurgerMenu = (props: any) => {
    const {children} = props;
    let navigate = useNavigate()
    const [menuActive, setMenuActive] = useState(false)

    const currentUser = useAuth()

    const goTo = (path: string): void => {
        navigate(path)
    }

    // console.log(currentUser?.photoURL)

    return (
        <div className={styles.container}>
            <div className={styles.menu_wrapper}>
                <div className={styles.menu_content_wrapper}>
                    <img className={styles.header_logo} src={header_logo}/>
                    <img className={styles.menu_icon} src={burger_menu} onClick={() => setMenuActive(!menuActive)}/>
                    {menuActive && <div className={styles.menu_body}>
                        <div className={styles.menu_links_wrapper}>
                            <NavLink to='/'
                                     className={(navData) => navData.isActive ? styles.menu_link_active : styles.menu_link}>
                                Главная
                            </NavLink>
                            <NavLink to='/gallery'
                                     className={(navData) => navData.isActive ? styles.menu_link_active : styles.menu_link}>
                                Галерея
                            </NavLink>
                            <NavLink to='/profile'
                                     className={(navData) => navData.isActive ? styles.menu_link_active : styles.menu_link}>
                                Профиль
                            </NavLink>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}
