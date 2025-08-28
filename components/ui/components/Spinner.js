import styles from "../../../styles/ui/components/Spinner.module.css";

function Spinner({ size = 'medium'}) {
    const sizeClass =
    size === 'small'
        ? styles.spinnerSmall
        : size === 'large'
        ? styles.spinnerLarge
        : styles.spinnerMedium;

    return <div className={`${styles.spinner} ${sizeClass}`} aria-label="Loading" role="status" />;
}

export default Spinner;