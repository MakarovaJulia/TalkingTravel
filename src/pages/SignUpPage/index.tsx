import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import React, {useRef, useState} from "react";
import {signInWithGoogle, signup, useAuth} from '../../firebase';
import {NavLink} from "react-router-dom";
import {Button} from "../../components/ui/Button";
import {Input} from "../../components/ui/Input";
import styles from "./index.module.sass";
import sign_up_with_google_icon from "../../assets/sign_up_with_google_icon.svg";
import signup_img from "../../assets/signup_img.png";
import {usePasswordToggle} from "../../utils/usePasswordToggle";


export const SignUpPage = observer(() => {
    const [loading, setLoading] = useState(false)
    const [passwordInputType, toggleIcon] = usePasswordToggle()
    const currentUser = useAuth()

    let navigate = useNavigate()

    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })


    async function handleSignUp() {
        setLoading(true)
        try {
            await signup(emailRef.current.value, passwordRef.current.value, data)
            // navigate(`/userDetail/${currentUser.uid}`)
            navigate('/profile')
        } catch (e) {
            console.log((e as Error).message)
        }
        setLoading(false)
    }


    return (
        <div className={styles.page_wrapper}>
            <div className={styles.img_container}>
                <img className={styles.signup_img} src={signup_img}/>
            </div>
            <div className={styles.page_container}>
                <div className={styles.content_container}>
                    <NavLink to='/'
                             className={(navData) => navData.isActive ? styles.signup_link_active : styles.signup_link}>
                        На главную
                    </NavLink>
                    <h3 className={styles.signup_title}>Создать аккаунт</h3>
                    <div className={styles.sign_up_with_google}>
                        <Button id={styles.sign_up_with_google_btn} disabled={loading} onClick={signInWithGoogle}>
                            <img className={styles.sign_up_with_google_icon} src={sign_up_with_google_icon}/>
                            Sing up with Google
                        </Button>
                    </div>
                    <div className={styles.divider}>
                        <h6>-ИЛИ-</h6>
                    </div>
                    <div className={styles.signup_form}>
                        <Input id={styles.name_input} ref={nameRef}
                               onChange={(e: any) => setData({...data, name: e.target.value})}
                               placeholder="Имя пользователя"/>
                        <Input id={styles.email_input} ref={emailRef}
                               onChange={(e: any) => setData({...data, email: e.target.value})} placeholder="Email"/>
                        <div className={styles.password_wrapper}>
                            <div className={styles.password_input_wrapper}>
                                <Input id={styles.password_input} ref={passwordRef}
                                       type={passwordInputType} placeholder="Пароль"/>
                            </div>
                            <span className={styles.password_toggle_icon}>{toggleIcon}</span>
                        </div>
                        <Button disabled={false} onClick={handleSignUp}>Зарегистрироваться</Button>
                    </div>
                    <div className={styles.signup_footer}>
                        Уже есть аккаунт?
                        <NavLink to='/login'>
                            Войти
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
});