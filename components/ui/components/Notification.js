import { useEffect } from "react";
import styles from "../../../styles/ui/components/Notification.module.css";

function Notification({ id, type = 'info', message, onClose, duration = 4000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
        onClose(id);
        }, duration);
        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    const typeClass =
        type === 'success'
        ? styles.toastSuccess
        : type === 'error'
        ? styles.toastError
        : type === 'warning'
        ? styles.toastWarning
        : styles.toastInfo;

    return (
        <div className={`${styles.toast} ${typeClass}`} onClick={() => onClose(id)} role="alert" tabIndex={0}>
        {message}
        <button onClick={() => onClose(id)} aria-label="Close notification" className={styles.closeBtn}>
            &times;
        </button>
        </div>
    );
}

export default Notification;