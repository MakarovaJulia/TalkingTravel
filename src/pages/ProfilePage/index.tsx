import React, {useEffect, useState} from "react"
import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {database, logout, useAuth} from "../../firebase";
import styles from "./index.module.sass";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {collection, getDocs, orderBy, query, where} from "firebase/firestore";
import {Spinner} from "../../components/Spinner";
import {GalleryPin} from "../../components/GalleryPin";
import {deletePinById} from "../../utils/fetchData";


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
    }, [usersInfo, feeds])


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

    const deletePin = (id: any) => {
        setLoading(true)
        deletePinById(database, id)
        setLoading(false)
        navigate('/profile')
    }

    if (loading) return <Spinner/>

    console.log(currentUser)

    return (
        <div className={styles.content_container}>
            <div className={styles.content_wrapper}>
                <div className={styles.recommended_pins}>
                    {feeds && feeds.map((data: any) => (
                        <div>
                            <GalleryPin data={data}/>
                            <button className={styles.delete_pin_btn} onClick={() => deletePin(data.id)}>Удалить пост
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
});