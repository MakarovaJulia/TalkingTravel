import React, {FC, useEffect, useState} from "react";
import {Footer} from "../Footer";
import styles from "./index.module.sass";
import {Header} from "../Header";
import {Outlet, useNavigate} from "react-router";
import {NavLink} from "react-router-dom";
import {database, logout, useAuth} from "../../firebase";
import UploadPhoto from "../../components/UploadPhoto";
import {Button} from "../../components/ui/Button";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {collection, getDocs, orderBy, query, where} from "firebase/firestore";
import {Spinner} from "../Spinner";
import {BurgerMenu} from "../BurgerMenu";


export interface IProfileLayout {

}

export const ProfileLayout: FC<IProfileLayout> = ({children}) => {
    const usersDatabaseRef = collection(database, 'profile');
    const postsDatabaseRef = collection(database, 'posts');
    const [loading, setLoading] = useState(false)
    const [feeds, setFeeds] = useState<any>(null)
    const [usersInfo, setUsersInfo] = useState<any>([]);
    let navigate = useNavigate()
    const currentUser = useAuth()

    const handleShareStory = () => {
        if (currentUser) {
            navigate('/add_card_page')
            console.log('Current user')
        } else {
            navigate('/signup')
            console.log('No current user')
        }
    }

    let uid = "";
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid;
        } else {
            console.log("Пользователь не авторизован")
        }
    });

    useEffect(() => {
        setLoading(true)
        const getUserInfo = async () => {
            const data = await getDocs(usersDatabaseRef);
            let arr = data.docs.map((doc) => ({...doc.data()}))
            let user = arr.findIndex(function (user, index) {
                return user.uid === uid
            })
            let ans = arr[user]
            setUsersInfo(ans)
            setLoading(false)
        };
        getUserInfo().then();
    }, [])

    useEffect(() => {
        const userUploadedPins = async () => {
            const feeds = await getDocs(
                query(postsDatabaseRef,
                    where('userId', '==', usersInfo.uid),
                    orderBy("id", "desc"))
            )
            let arr = feeds.docs.map((doc) => ({...doc.data()}))
            setFeeds(arr)
        }
        userUploadedPins().then()
    }, [usersInfo])


    async function handleLogout() {
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

    if (loading) return <Spinner/>

    console.log(currentUser)
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Header/>
            </header>
            <div className={styles.burgerMenu}>
                <BurgerMenu/>
            </div>
            <div className={styles.content_container}>
                <div className={styles.content_wrapper}>
                    <div className={styles.user_info_wrapper}>
                        <img className={styles.user_avatar} src={currentUser?.photoURL} alt="IMAGE"/>
                        <div className={styles.user_info}>
                            <h1 className={styles.user_name}>
                                {usersInfo.name}
                            </h1>
                            <p className={styles.user_email}>
                                {usersInfo.email}
                            </p>
                            <div className={styles.profile_btn}>
                                {currentUser &&
                                <>
                                    <UploadPhoto/>
                                    <Button disabled={false} onClick={handleShareStory}>Поделиться историей</Button>
                                    <Button disabled={loading || !currentUser} onClick={handleLogout}>Выйти</Button>
                                </>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <NavLink to="/profile"
                                 className={(navData) => navData.isActive ? styles.menu_link_active : styles.menu_link}>Мои
                            места</NavLink>
                        <NavLink to="/likes"
                                 className={(navData) => navData.isActive ? styles.menu_link_active : styles.menu_link}>Лайки</NavLink>
                    </div>
                </div>
            </div>
            <main className={styles.content}>
                {children}
                <Outlet/>
            </main>
            <footer className={styles.footer}>
                <Footer/>
            </footer>
        </div>
    )
}