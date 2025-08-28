import styles from "../../../styles/ui/components/Avatar.module.css";

function Avatar({ src, alt = '', size = 40 }) {
    const style = { width: size, height: size };
    return (
        <div className={styles.avatar} style={style}>
        <img className={styles.img} src={src} alt={alt} />
        </div>
    );
}

export default Avatar;