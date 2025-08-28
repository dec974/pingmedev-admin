import styles from "../../../styles/ui/components/ProgressBar.module.css";

function ProgressBar({ value = 0, max = 100, variant = 'primary' }) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const variantClass = styles[variant] || styles.primary;

    return (
        <div className={styles.progressContainer} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
        <div className={`${styles.progressBar} ${variantClass}`} style={{ width: `${percentage}%` }} />
        </div>
    );
}

export default ProgressBar;