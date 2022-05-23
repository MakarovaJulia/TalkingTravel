import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import styles from "./index.module.sass";
import {Button} from "../../components/ui/Button";
import {useAuth} from "../../firebase";
import preview_img from "../../assets/preview_img.png"
import avatar from "../../assets/header_profile_icon.svg";
import React from "react";




export const MainPage = observer(() => {
    let navigate = useNavigate()
    const currentUser = useAuth()

    const handleShareStory = ()=> {
        if (currentUser){
            navigate('/add_card_page')
            console.log('Current user')
        } else {
            navigate('/signup')
            console.log('No current user')
        }
    }

    return (
        <BaseLayout>
            <div className={styles.container}>
                <div className={styles.content_wrapper}>
                    <div className={styles.content_container}>
                        <div className={styles.content}>
                            <h1 className={styles.main_title}>
                                <span>Расскажи</span> о своих путешествиях
                            </h1>
                            <h5 className={styles.second_title}>Поделись своими любимыми местами. Размести их в своем блоге, чтобы все узнали о них!</h5>
                            <Button disabled={false} onClick={handleShareStory}>Поделиться историей</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.preview_container}>
                <img className={styles.preview_img} src={preview_img}/>
                <div className={styles.preview_title}>
                    <h1 className={styles.main_title}>
                        <span>Поделись</span> своей историей
                    </h1>
                    <h5 className={styles.second_title}>Выкладывай фото и описание своих любимых мест</h5>
                </div>
            </div>
            
        </BaseLayout>
    )
});