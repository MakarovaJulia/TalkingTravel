import React, {useEffect, useRef, useState} from "react"
import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import {logout, useAuth} from "../../firebase";
import Profile from "../../components/profile";
import {Button} from "../../components/ui/Button";
import styles from "./index.module.sass";


export const ProfilePage = observer(() => {

    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    const currentUser = useAuth()

    async function handleLogout(){
        setLoading(true)
        try {
            await logout()
            navigate('/')
        } catch {
            alert("Error!")
        }
        setLoading(false)
    }

    const handleChangeProfile = () => {
        console.log(currentUser)
    }

    return (
        <BaseLayout>
            <div className={styles.content_container}>
                <div className={styles.content_wrapper}>
                    <div className={styles.user_info_wrapper}>
                        <img className={styles.user_avatar} src={currentUser?.photoURL} alt="IMAGE"/>
                        <div className={styles.user_info}>
                            Имя Человека
                            {currentUser?.email}
                            <Button onClick={handleChangeProfile} disabled={false} mode={"secondary"}>Редактировать</Button>
                        </div>
                    </div>
                    <div className={styles.menu_container}>
                        Мои места Подборки Лайки Прочее
                    </div>
                    {currentUser &&
                    <>
                        <Profile/>
                        <Button disabled={loading|| !currentUser} onClick={handleLogout}>Выйти</Button>
                    </>}
                </div>
            </div>
        </BaseLayout>
    )
});