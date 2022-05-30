import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import styles from "./index.module.sass";
import {Form} from "../../components/Form";


export const AddCardPage = observer(() => {
    let navigate = useNavigate()

    const goTo = (path: string): void => {
        navigate(path)
    }

    return (
        <BaseLayout>
            <div className={styles.page_container}>
                <div className={styles.content_container}>
                    <h4 className={styles.content_main_title}>Присоединяйся</h4>
                    <h2 className={styles.content_second_title}>Добавь новое место</h2>
                    <h5 className={styles.content_third_title}>Карточка отобразиться на главной странице и в твоем
                        блоге.</h5>
                    <Form/>
                </div>
            </div>
        </BaseLayout>
    )
});