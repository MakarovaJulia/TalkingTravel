import React, {useState} from 'react';
import styles from './index.module.sass';
import header_logo from '../../assets/header_logo.svg'
import burger_menu from '../../assets/burger_menu.svg'
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router";
import {useAuth} from "../../firebase";
import {Button} from "../ui/Button";
import header_profile_icon from "../../assets/header_profile_icon.svg";

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
                            {!currentUser ?
                                <Button id={styles.menu_login_btn} onClick={() => goTo('/login')} disabled={false}>
                                    <img className={styles.menu_icon} src={header_profile_icon}/>
                                </Button>
                                :
                                <Button id={styles.menu_login_btn} onClick={() => goTo('/profile')} disabled={false}>
                                    <img className={styles.menu_icon}
                                         src={currentUser?.photoURL ? currentUser?.photoURL : header_profile_icon}/>
                                </Button>
                            }
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}
