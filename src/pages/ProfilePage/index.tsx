import React, {useEffect, useRef, useState} from "react"
import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import {database, logout, useAuth} from "../../firebase";
import Profile from "../../components/profile";
import {Button} from "../../components/ui/Button";
import {Menu} from "../../components/Menu";
import styles from "./index.module.sass";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {collection, getDocs, orderBy, query, where} from "firebase/firestore";
import {RecommendedPins} from "../../components/RecommendedPins";


export const ProfilePage = observer(() => {

    const usersDatabaseRef = collection(database, 'profile');
    const postsDatabaseRef = collection(database, 'posts');
    const [loading, setLoading] = useState(false)
    const [feeds, setFeeds] = useState<any>(null)
    const [usersInfo, setUsersInfo] = useState<any>([]);
    let navigate = useNavigate()
    const currentUser = useAuth()

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
            let user = arr.findIndex(function (user,index){
                return user.uid === uid
            })
            let ans = arr[user]
            setUsersInfo(ans)
            setLoading(false)
        };
        getUserInfo().then();
    }, [])

    useEffect(()=>{
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

    if(loading) return <div>Загрузка...</div>

    console.log(currentUser)

    return (
        <BaseLayout>
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
                            <Button onClick={handleChangeProfile} disabled={false} mode={"secondary"}>Редактировать</Button>
                        </div>
                    </div>
                    <Menu/>
                    {currentUser &&
                    <>
                        <Profile/>
                        <Button disabled={loading|| !currentUser} onClick={handleLogout}>Выйти</Button>
                    </>}
                    {feeds && (
                        <RecommendedPins feeds={feeds}/>
                    )}
                </div>
            </div>
        </BaseLayout>
    )
});