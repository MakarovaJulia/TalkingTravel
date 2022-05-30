import React, {useEffect} from "react";
import styles from "./index.module.sass";
import {ClipLoader} from "react-spinners";

export const Spinner = ({msg, progress}: any) => {
    useEffect(() => {
    }, [progress])
    return (
        <div className={styles.spinner}>
            <ClipLoader color="black"/>
        </div>
    )
}

