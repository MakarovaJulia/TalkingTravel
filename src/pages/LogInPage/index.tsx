import {observer} from "mobx-react";
import {Navigate, useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import React, {useCallback, useContext, useRef, useState} from "react";
import {login, signInWithGoogle, useAuth} from "../../firebase";
import {NavLink} from "react-router-dom";
import {Button} from "../../components/ui/Button";
import {Input} from "../../components/ui/Input";
import styles from "./index.module.sass";
import signup_img from "../../assets/signup_img.png";
import sign_up_with_google_icon from "../../assets/sign_up_with_google_icon.svg";
import {usePasswordToggle} from "../../utils/usePasswordToggle";



export const LoginPage = observer(() => {

    const [loading, setLoading] = useState(false)
    const [passwordInputType, toggleIcon] = usePasswordToggle()
    const currentUser = useAuth()

    let navigate = useNavigate()

    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;



    async function handleLogin(){
        setLoading(true)
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            // navigate(`/userDetail/${currentUser.uid}`)
            navigate('/profile')
        } catch {
            alert("Error!")
        }
        setLoading(false)
    }

    return (
        <div className={styles.page_wrapper}>
            <div className={styles.img_container}>
                <img className={styles.login_img} src={signup_img}/>
            </div>
            <div className={styles.page_container}>
                <div className={styles.content_container}>
                    <NavLink to='/'
                             className={(navData) => navData.isActive ? styles.login_link_active : styles.login_link}>
                        На главную
                    </NavLink>
                    <h3 className={styles.login_title}>Войти</h3>
                    <div className={styles.login_with_google}>
                        <Button id={styles.login_with_google_btn} disabled={loading} onClick={signInWithGoogle}>
                            <img className={styles.login_with_google_icon} src={sign_up_with_google_icon}/>
                            Login with Google
                        </Button>
                    </div>
                    <div className={styles.divider}>
                        <h6>-ИЛИ-</h6>
                    </div>
                    <div className={styles.login_form}>
                        <Input id={styles.email_input} ref={emailRef} placeholder="Email" />
                        <div className={styles.password_wrapper}>
                            <div className={styles.password_input_wrapper}>
                                <Input id={styles.password_input} ref={passwordRef}
                                   type={passwordInputType} placeholder="Пароль"/>
                            </div>
                            <span className={styles.password_toggle_icon}>{toggleIcon}</span>
                        </div>
                        <Button disabled={false} onClick={handleLogin}>Войти</Button>
                    </div>
                    <div className={styles.login_footer}>
                        Еще нет аккаунта?
                        <NavLink to='/signup'>
                            Зарегистрироваться
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
});

