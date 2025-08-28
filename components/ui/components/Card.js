import styles from "../../../styles/ui/components/Card.module.css";

function Card ({ title, children}) {
    return (
        <section className={styles.card}>
            {title && <h2 className={styles.cardTitle}>{title}</h2>}
            {children}
        </section>
    );
}

export default Card;