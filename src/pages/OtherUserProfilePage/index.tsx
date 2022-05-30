import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {database, storage} from "../../firebase";
import styles from "./index.module.sass";
import {getUserInfo, userUploadedPins} from "../../utils/fetchData";
import avatar from "../../assets/header_profile_icon.svg"
import {RecommendedPins} from "../../components/RecommendedPins";
import {getDownloadURL, ref} from "firebase/storage";
import {Spinner} from "../../components/Spinner";


export const OtherUserProfilePage = observer(() => {
    let navigate = useNavigate()

    const {userId} = useParams()

    const [userInfo, setUserInfo] = useState<any>(null)
    const [feeds, setFeeds] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [userImg, setUserImg] = useState<any>(null)

    const goTo = (path: string): void => {
        navigate(path)
    }

    const handleChangeProfile = () => {
        console.log(userInfo)
    }

    useEffect(() => {
        if (userInfo) {
            getDownloadURL(ref(storage, userInfo.uid + '.png'))
                .then((url) => {
                    setUserImg(url)
                })
        }
    }, [userInfo])

    useEffect(() => {
        setLoading(true)
        if (userId) {
            getUserInfo(database, userId).then(user => {
                setUserInfo(user)
            })
            userUploadedPins(database, userId).then(feed => {
                setFeeds(feed)
                console.log(feed)
            })
            setLoading(false)
        }
    }, [userId])


    if (loading) return <Spinner/>

    return (
        <BaseLayout>
            <div className={styles.content_container}>
                <div className={styles.content_wrapper}>
                    <div className={styles.user_info_wrapper}>
                        <img className={styles.userImage} src={userInfo?.uid ? userImg : avatar}/>
                        <div className={styles.user_info}>
                            <h5>{userInfo?.name}</h5>
                            <h5 className={styles.user_email}>{userInfo?.email}</h5>
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