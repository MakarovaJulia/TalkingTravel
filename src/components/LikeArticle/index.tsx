import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import heartPurple from "../../assets/purple_heart.svg"
import heartBlack from "../../assets/heart_black.svg"
import {database, useAuth} from "../../firebase";
import styles from "./index.module.sass";
import {arrayRemove, arrayUnion, collection, doc, updateDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {getSpecificPin} from "../../utils/fetchData";

export const LikeArticle = (({id, likes, currentUser}:any) => {

    const [heartIcon, setHeartIcon] = useState<any>(null)

    const likesRef = doc(database, "posts", id);
    
    const handlelike = () => {
      if(likes?.includes(currentUser.uid)){
          updateDoc(likesRef, {
              likes: arrayRemove(currentUser.uid)
          }).then(()=>{
              setHeartIcon(heartBlack)
              console.log("unliked")
          }).catch((e)=>{
              console.log(e)
          })
      } else {
          updateDoc(likesRef, {
              likes: arrayUnion(currentUser.uid)
          }).then(()=>{
              setHeartIcon(heartPurple)
              console.log("liked")
          }).catch((e)=>{
              console.log(e)
          })
      }
    }

    console.log("Текущий юзер ")
    console.log(currentUser)


    useEffect(()=>{
        if(!likes?.includes(currentUser.uid)){
            setHeartIcon(heartBlack)
            } else {
            setHeartIcon(heartPurple)
        }
    },[likes])

    return (
        <div>
            <img className={styles.like_icon}
                 src={heartIcon}
                 onClick={handlelike}
            />
        </div>
    )
})