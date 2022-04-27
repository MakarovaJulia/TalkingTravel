import {observer} from "mobx-react";
import styles from "./index.module.sass";
import {NavLink} from "react-router-dom";
import React from "react";

export const Category = ({data}:any) => {
    return (
        <div className={styles.category_wrapper}>
            <NavLink to={`/category/${data.name}`}
                     className={(navData) => navData.isActive ? styles.header_link_active : styles.header_link}>
                <img className={styles.category_icon} src={data.iconSrc} alt="Категория"/>
            </NavLink>
        </div>
    )
}