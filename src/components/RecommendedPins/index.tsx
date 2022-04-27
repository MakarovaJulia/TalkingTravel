import React, {useEffect, useRef, useState} from "react"
import {collection} from "firebase/firestore";
import {database, useAuth} from "../../firebase";
import {useNavigate} from "react-router";
import {categoryFeeds, getAllFeeds} from "../../utils/fetchData";
import styles from "./index.module.sass";
import {Button} from "../ui/Button";
import {GalleryPin} from "../GalleryPin";
import {useParams} from "react-router-dom";

export const RecommendedPins = ({feeds}:any) => {
    return(
        <div className={styles.recommended_pins}>
            {feeds && feeds.map((data: any) => (
                <GalleryPin data={data}/>
            ))}
        </div>
    )
}