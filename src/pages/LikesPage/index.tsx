import React, {useEffect, useState} from "react"
import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {database, useAuth} from "../../firebase";
import styles from "./index.module.sass";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {collection, getDocs} from "firebase/firestore";
import {GalleryPin} from "../../components/GalleryPin";
import {getSpecificPin, getUserLikedPosts} from "../../utils/fetchData";


export const LikesPage = observer(() => {

    const usersDatabaseRef = collection(database, 'profile');
    const postsDatabaseRef = collection(database, 'posts');
    const [loading, setLoading] = useState(false)
    const [usersInfo, setUsersInfo] = useState<any>([]);
    const [likes, setLikes] = useState<any>([])
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
        let arr: any
        getUserLikedPosts(database, currentUser).then((data) => {
            data.map((pin) => {
                console.log('PIN')
                console.log(Object.values(pin).toString())
                getSpecificPin(database, Object.values(pin).toString()).then((pin) => {
                    console.log('PIN')
                    console.log(pin.data())
                    arr.push()
                })
                setLikes(data)
            })
        })
    }, [currentUser])


    return (
        <div className={styles.content_container}>
            <div className={styles.recommended_pins}>
                {likes && likes.map((data: any) => (
                    <div>
                        <GalleryPin data={data}/>
                    </div>
                ))}
            </div>
        </div>
    )
});