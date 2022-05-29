import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
//import Comments from "../../components/Comments"
import React, {useEffect, useRef, useState} from "react"
import {useParams} from "react-router-dom"
import {database, useAuth} from "../../firebase";
import styles from "./index.module.sass";
import {getPinComments, getPinLikes, getSpecificPin, getUserInfo} from "../../utils/fetchData";
import {LikeArticle} from "../../components/LikeArticle";
import {Spinner} from "../../components/Spinner";
import heartPurple from "../../assets/heart_purple.svg"
import heartBlack from "../../assets/heart_black.svg"
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp, setDoc
} from "firebase/firestore";
import {PinComment} from "../../components/Comment";
import Moment from "react-moment";
import 'moment/locale/ru'



export const CardPage = observer(() => {
    let navigate = useNavigate()

    const currentUser = useAuth()

    const {pinId} = useParams()

    const usersDatabaseRef = collection(database, 'profile');
    const [loading, setLoading] = useState(false)
    const [imageInfo, setImageInfo] = useState<any>(null)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [currentUserInfo, setCurrentUserInfo] = useState<any>(null);
    const [comment, setComment] = useState<any>(null)
    const [comments, setComments] = useState<any>([])
    const [liked, setLiked] = useState<any>(false)
    const [likes, setLikes] = useState<any>([])


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

    useEffect(()=>{
        if(currentUser){
        getUserInfo(database,currentUser.uid).then((data)=>{
            setCurrentUserInfo(data)
            })
        }
        console.log(currentUserInfo)
    }, [currentUser])

    const sendComment = async () =>{
        console.log(comment)
        console.log(pinId)
        await addDoc(collection(doc(collection(database, "posts"), pinId), "comments"), {
            comment: comment,
            userId: currentUser.uid,
            username: currentUserInfo.name,
            userImg: currentUser?.photoURL,
            timestamp: serverTimestamp()
        })
        setComment("")
    }

    useEffect(()=>{
        getPinComments(database, pinId).then((data)=>{
                setComments(data)
        })
    }, [pinId, comment])

    useEffect(()=>{
        getPinLikes(database, pinId).then((data)=>{
            setLikes(data)
        })
    }, [pinId, likes])

    // useEffect(()=> onSnapshot(collection(doc(collection(database, "posts"), pinId), "likes"),
    //     (snapshot)=> setLikes(snapshot.docs)
    //     ),
    //     [database, pinId]
    // )

    useEffect(
        ()=> {
            setLiked(likes.findIndex((like:any)=> like.id === currentUser?.uid) !== -1
            )
            console.log(liked)
        },
        [likes]
    )

    const likePost = async () =>{
        if (liked) {
            await deleteDoc(doc(collection(doc(collection(database, "posts"), pinId), "likes"), currentUser.uid))
                .then(()=>
                    deleteDoc(doc(collection(doc(collection(database, "profile"), currentUser.uid), "likedPosts"), pinId))
                )
        } else {
            await setDoc(doc(collection(doc(collection(database, "posts"), pinId), "likes"), currentUser.uid), {
                username: currentUserInfo.name
            }).then(
                ()=> setDoc(doc(collection(doc(collection(database, "profile"), currentUser.uid), "likedPosts"), pinId), {
                    pinId: pinId
                })
            )
        }
    }

    if(loading) return <Spinner/>

    return (
        <BaseLayout>
            <div className={styles.content_wrapper}>
                <div className={styles.content_container}>
                    <div className={styles.img_wrapper}>
                        <img className={styles.pin_image} src={imageInfo?.imageURL}/>
                        <div className={styles.like_btn}
                             onClick={()=>{
                                 likePost()
                             }}>
                            {/*{currentUser && <LikeArticle id={pinId} likes={imageInfo.likes} currentUser={currentUser}/>}*/}
                            {liked ?  <img className={styles.like_img} src={heartPurple}/> : <img className={styles.like_img} src={heartBlack}/>}
                            {likes.length > 0 && (
                                <span>{likes.length}</span>
                            )}
                        </div>
                    </div>
                    <div className={styles.title_wrapper}>
                        {userInfo && <div className={styles.username}>
                            @
                            <div>{userInfo?.name}</div>
                        </div>}
                        <h3>{imageInfo?.title}</h3>
                        <div className={styles.additional_info}>
                            <div>{imageInfo?.address}</div>
                            <Moment fromNow>{imageInfo?.timestamp?.toDate().locale('ru')}</Moment>
                        </div>
                        <div className={styles.info_wrapper}>
                            <p className={styles.info}>
                                {imageInfo?.description}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.comments_block_title}>Комментарии</div>
                <div className={styles.comments_wrapper}>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)}
                              placeholder='Введите комментарий' rows={2} className={styles.comment_area}/>
                    <button onClick={sendComment} disabled={false} className={styles.send_comment}>Отправить</button>
                </div>
                {comments && comments.map((data: any) => (
                    <PinComment id={pinId} comment={data}></PinComment>
                ))}
            </div>
        </BaseLayout>
    )
});