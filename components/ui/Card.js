import styles from '../../styles/ui/Card.module.css';

function Card({children, title = '', ...props}) {

    return (
        <div className={styles.card}>
            { title && <div className={styles.cardTitle}><h3>{title}</h3></div> }
            <div className={styles.cardContent}>
                {children}  
            </div>
        </div>
    );
}

export default Card;