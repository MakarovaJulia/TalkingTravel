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

    useEffect(()=>{
        if (currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL)
        }
    }, [currentUser])


    return (
        <div >
            <input type="file" onChange={handleChange}/>
            <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
            <img src={photoURL} alt="avatar" width="50" height="50"/>
        </div>
    )
}