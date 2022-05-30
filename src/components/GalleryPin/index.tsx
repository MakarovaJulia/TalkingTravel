import React, {useEffect, useState} from "react"
import styles from "./index.module.sass";
import {Link} from "react-router-dom";
import {getUserInfo} from "../../utils/fetchData";
import {database, storage} from "../../firebase";
import avatar from '../../assets/header_profile_icon.svg'
import {getDownloadURL, ref} from "firebase/storage";
import Moment from "react-moment";


export const GalleryPin = ({data}: any) => {
    const [userInfo, setUserInfo] = useState<any>(null)

    const [userId, setUserId] = useState<any>(null)
    const [userImg, setUserImg] = useState<any>(null)

    useEffect(() => {
        if (data) setUserId(data.userId)
        if (userId) getUserInfo(database, userId).then((data) => {
            setUserInfo(data)
        })
    }, [userId])

    useEffect(() => {
        if (userInfo) {
            getDownloadURL(ref(storage, userInfo.uid + '.png'))
                .then((url) => {
                    setUserImg(url)
                })
        }
    }, [userInfo])

    return (
        <div className={styles.pinWrapper}>
            <Link className={styles.link_wrapper} to={`/pinDetail/${data?.id}`}></Link>
            <img className={styles.pinImage} src={data.imageURL}/>
            <div className={styles.content_wrapper}>
                <div className={styles.content}>
                    <div className={styles.content_top}>
                        <div className={styles.title}>{data.country}</div>
                        <div className={styles.title}>{data.address}</div>
                    </div>
                    <div className={styles.content_bottom}>
                        <h5 className={styles.title}>{data.title}</h5>
                    </div>
                </div>
                <div className={styles.userInfo}>
                    <Moment fromNow className={styles.title}>{data?.timestamp?.toDate()}</Moment>
                    <Link to={`/userDetail/${userId}`}>
                        <img className={styles.userImage} src={userInfo?.uid ? userImg : avatar}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}