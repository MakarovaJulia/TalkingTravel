import styles from "./index.module.sass";
import Moment from "react-moment";


export function PinComment({id, comment}: any) {
    return (
        <div className={styles.comment_wrapper}>
            <img src={comment?.userImg} alt="" className={styles.user_image}/>
            <div className={styles.comment_container}>
                <div className={styles.comment_content}>
                    <div className={styles.text}>
                        <div className={styles.username}>
                            {comment?.username}
                        </div>
                        <span className={styles.time}>
                            <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
                        </span>
                    </div>
                    <p className={styles.comment}>{comment?.comment}</p>
                </div>
            </div>
        </div>
    )
}