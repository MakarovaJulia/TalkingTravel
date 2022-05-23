import React, {useEffect, useRef, useState} from "react"
import styles from "./index.module.sass";
import {Link, NavLink} from "react-router-dom";
import {getUserInfo} from "../../utils/fetchData";
import {database} from "../../firebase";
import avatar from '../../assets/header_profile_icon.svg'


export const GalleryPin = ({data}:any) => {
    const [userInfo, setUserInfo] = useState<any>(null)

    const [userId, setUserId] = useState<any>(null)

    useEffect(()=>{
        if(data) setUserId(data.userId)
        if(userId) getUserInfo(database, userId).then((data)=>{
            setUserInfo(data)
        })
    }, [userId])


    return (
        <div className={styles.pinWrapper}>
            <Link to={`/pinDetail/${data?.id}`}>
                <img className={styles.pinImage} src={data.imageURL}/>
            </Link>
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
                    <Link to={`/userDetail/${userId}`}>
                        <img className={styles.userImage} src={userInfo?.photoURL ? userInfo?.photoURL : avatar}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}