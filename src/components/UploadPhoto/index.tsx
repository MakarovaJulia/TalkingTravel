import React, {useEffect, useState} from "react"
import avatar from '../../assets/header_profile_icon.svg'
import {useAuth, uploadUserPhoto} from "../../firebase";
import {set} from "mobx";
import {inspect} from "util";
import styles from "./index.module.sass";

export default function ProfilePage(){
    const currentUser = useAuth()
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const [photoURL, setPhotoURL] = useState(avatar)

    function handleChange(e:any){
        if(e.target.files[0]){
            setPhoto(e.target.files[0])
        }
    }

    function handleClick(){
        uploadUserPhoto(photo, currentUser, setLoading)
    }

    function refreshPage() {
        window.location.reload();
    }

    function uploadPhoto() {
        handleClick()
        refreshPage()
    }

    useEffect(()=>{
        if (currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL)
        }
    }, [currentUser])


    return (
        <div>
            <div className={styles.input_photo_wrapper}>
                <div className={styles.input_title}>Сменить аватар</div>
                <input className={styles.input_photo} type="file" onChange={handleChange}/>
            </div>
            <button className={styles.input_photo_btn} disabled={loading || !photo} onClick={uploadPhoto}>Загрузить</button>
        </div>
    )
}