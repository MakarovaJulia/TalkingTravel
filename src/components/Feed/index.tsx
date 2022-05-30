import React, {useEffect, useState} from "react"
import {database} from "../../firebase";
import {categoryFeeds, getAllFeeds} from "../../utils/fetchData";
import styles from "./index.module.sass";
import {GalleryPin} from "../GalleryPin";
import {useParams} from "react-router-dom";
import {Spinner} from "../Spinner";

export const Feed = () => {
    const [loading, setLoading] = useState(false)
    const [feeds, setFeeds] = useState<any>([])
    const {categoryId} = useParams()

    useEffect(() => {
        setLoading(true)
        if (categoryId) {
            categoryFeeds(database, categoryId).then((data) => {
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