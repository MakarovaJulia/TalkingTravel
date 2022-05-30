import React, {useEffect, useState} from "react"
import avatar from '../../assets/header_profile_icon.svg'
import {uploadUserPhoto, useAuth} from "../../firebase";
import styles from "./index.module.sass";
import {Spinner} from "../Spinner";

export default function ProfilePage() {
    const currentUser = useAuth()
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const [photoURL, setPhotoURL] = useState(avatar)

    function handleChange(e: any) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
        }
    }

    function handleClick() {
        setLoading(true)
        uploadUserPhoto(photo, currentUser, setLoading).then(
            () => {
                setLoading(false)
            }
        )
    }

    useEffect(() => {
        if (currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL)
        }
    }, [currentUser])


    return (
        <div>
            <div className={styles.input_photo_wrapper}>
                <div className={styles.input_title}>Сменить аватар</div>
                <input className={styles.input_photo} type="file" onChange={handleChange}/>
                <div>
                    {loading && (
                        <Spinner/>
                    )}
                </div>
            </div>
            <button className={styles.input_photo_btn} disabled={loading || !photo} onClick={handleClick}>Загрузить
            </button>
        </div>
    )
}