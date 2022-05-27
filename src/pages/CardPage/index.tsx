import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import React, {useEffect, useRef, useState} from "react"
import {useParams} from "react-router-dom"
import {database, useAuth} from "../../firebase";
import styles from "./index.module.sass";
import {getSpecificPin, getUserInfo} from "../../utils/fetchData";
import avatar from "../../assets/header_profile_icon.svg";
import {LikeArticle} from "../../components/LikeArticle";
import {Spinner} from "../../components/Spinner";



export const CardPage = observer(() => {
    let navigate = useNavigate()

    const currentUser = useAuth()

    const {pinId} = useParams()

    const [loading, setLoading] = useState(false)
    const [imageInfo, setImageInfo] = useState<any>(null)
    const [userInfo, setUserInfo] = useState<any>(null)

    useEffect(()=>{
        if(pinId){
            setLoading(true)
            getSpecificPin(database, pinId).then((data) =>{
                setImageInfo(data.data())
                getUserInfo(database, data.get("userId")).then((user)=>{
                    setUserInfo(user)
                 })
                setLoading(false)
            })
        }
    },[pinId])

    if(loading) return <Spinner/>

    const goTo = (path: string): void => {
        navigate(path)
    }

    return (
        <BaseLayout>
            <div className={styles.content_wrapper}>
                <div className={styles.content_container}>
                    <div className={styles.img_wrapper}>
                        <img className={styles.pin_image} src={imageInfo?.imageURL}/>
                    </div>
                    <div className={styles.title_wrapper}>
                        {userInfo && <div className={styles.username}>
                            @
                            <div>{userInfo?.name}</div>
                        </div>}
                        <h3>{imageInfo?.title}</h3>
                        <div className={styles.additional_info}>
                            <div>{imageInfo?.address}</div>
                            <div>время</div>
                        </div>
                        <div className={styles.info_wrapper}>
                            <p className={styles.info}>
                                {imageInfo?.description}
                            </p>
                            {/*<div className={styles.like_btn}>*/}
                            {/*    {currentUser && <LikeArticle id={pinId} likes={imageInfo.likes} currentUser={currentUser}/>}*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
});