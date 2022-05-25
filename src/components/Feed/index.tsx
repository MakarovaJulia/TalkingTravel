import React, {useEffect, useRef, useState} from "react"
import {collection} from "firebase/firestore";
import {database, useAuth} from "../../firebase";
import {useNavigate} from "react-router";
import {categoryFeeds, getAllFeeds} from "../../utils/fetchData";
import styles from "./index.module.sass";
import {Button} from "../ui/Button";
import {GalleryPin} from "../GalleryPin";
import {useParams} from "react-router-dom";
import {Spinner} from "../Spinner";

export const Feed = () => {
    const [loading, setLoading] = useState(false)
    const [feeds, setFeeds] = useState<any>([])
    const {categoryId} = useParams()

    useEffect(() => {
        setLoading(true)
        if(categoryId){
            categoryFeeds(database, categoryId).then((data) =>{
                setFeeds(data)
                setLoading(false)
            })
        } else {
            getAllFeeds(database).then((data) => {
                setFeeds(data)
                setLoading(false)
            })
        }
    }, [categoryId])


    if (loading) return <Spinner/>

    return (
        <div className={styles.feed}>
            {feeds && feeds.map((data: any) => (
                <GalleryPin data={data}/>
            ))}
        </div>
    )
}