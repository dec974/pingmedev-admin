import styles from "../../../styles/ui/components/Modal.module.css";

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} aria-label="Close modal" onClick={onClose}>
                &times;
                </button>
                {title && <h2 id="modalTitle" className={styles.title}>{title}</h2>}
                {children}
            </div>
        </div>
    );
}

export default Modal;