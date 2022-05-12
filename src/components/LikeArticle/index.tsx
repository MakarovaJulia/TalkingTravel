import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import heartPurple from "../../assets/purple_heart.svg"
import heartBlack from "../../assets/heart_black.svg"
import {database, useAuth} from "../../firebase";
import styles from "./index.module.sass";
import {arrayRemove, arrayUnion, collection, doc, updateDoc} from "firebase/firestore";

export const LikeArticle = (({id, likes, currentUser}:any) => {

    const likesRef = doc(database, "posts", id);
    
    const handlelike = () => {
      if(likes?.includes(currentUser.uid)){
          updateDoc(likesRef, {
              likes: arrayRemove(currentUser.uid)
          }).then(()=>{
              console.log("unliked")
          }).catch((e)=>{
              console.log(e)
          })
      } else {
          updateDoc(likesRef, {
              likes: arrayUnion(currentUser.uid)
          }).then(()=>{
              console.log("liked")
          }).catch((e)=>{
              console.log(e)
          })
      }
    }

    console.log("Текущий юзер ")
    console.log(currentUser)

    return (
        <div>
            <img className={styles.like_icon}
                 src={`${!likes?.includes(currentUser.uid) ? heartBlack : heartPurple}`}
                 onClick={handlelike}
            />
        </div>
    )
})