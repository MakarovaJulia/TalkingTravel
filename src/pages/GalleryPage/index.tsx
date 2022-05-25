import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import {Feed} from "../../components/Feed";
import React from "react";
import {Category} from "../../components/Category";
import {categories} from "../../categoriesData"
import styles from './index.module.sass';
import {useAuth} from "../../firebase";



export const GalleryPage = observer(() => {
    let navigate = useNavigate()
    const currentUser = useAuth()

    const goTo = (path: string): void => {
        navigate(path)
    }

    return (
        <BaseLayout>
            <div className={styles.gallery_wrapper}>
                <div className={styles.categories_wrapper}>
                    {categories && categories.map(data => <Category key={data.id} data={data}/>)}
                </div>
                <Feed/>
            </div>
        </BaseLayout>
    )
});