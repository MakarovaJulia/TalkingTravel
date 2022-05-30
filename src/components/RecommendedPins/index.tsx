import React from "react"
import styles from "./index.module.sass";
import {GalleryPin} from "../GalleryPin";

export const RecommendedPins = ({feeds}: any) => {
    return (
        <div className={styles.recommended_pins}>
            {feeds && feeds.map((data: any) => (
                <GalleryPin data={data}/>
            ))}
        </div>
    )
}