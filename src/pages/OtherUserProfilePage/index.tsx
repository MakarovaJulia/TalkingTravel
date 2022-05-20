import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import React, {useEffect, useRef, useState} from "react"
import {useParams} from "react-router-dom"
import {database, useAuth} from "../../firebase";
import styles from "./index.module.sass";
import {getUserInfo, userUploadedPins} from "../../utils/fetchData";
import avatar from  "../../assets/header_profile_icon.svg"
import {Button} from "../../components/ui/Button";
import {RecommendedPins} from "../../components/RecommendedPins";



export const OtherUserProfilePage = observer(() => {
    let navigate = useNavigate()

    const {userId} = useParams()

    const [userInfo, setUserInfo] = useState<any>(null)
    const [feeds, setFeeds] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const goTo = (path: string): void => {
        navigate(path)
    }

    const handleChangeProfile = () => {
        console.log(userInfo)
    }

    useEffect(()=>{
        setLoading(true)
        if(userId){
            getUserInfo(database, userId).then(user => {
                setUserInfo(user)
            })
            userUploadedPins(database, userId).then(feed => {
                setFeeds(feed)
                console.log(feed)
            })
            setLoading(false)
        }
    },[userId])



    if(loading) return <div>Загрузка...</div>

    return (
        <BaseLayout>
            <div className={styles.content_container}>
                <div className={styles.content_wrapper}>
                    <div className={styles.user_info_wrapper}>
                        <img className={styles.user_avatar} src={userInfo?.photoURL ? userInfo?.photoURL: avatar} alt="IMAGE"/>
                        <div className={styles.user_info}>
                            <h5>{userInfo?.name}</h5>
                            <h5>{userInfo?.email}</h5>
                        </div>
                    </div>
                    {feeds && (
                        <div className={styles.feeds_wrapper}>
                            <RecommendedPins feeds={feeds}/>
                        </div>
                    )}
                </div>
            </div>
        </BaseLayout>
    )
});