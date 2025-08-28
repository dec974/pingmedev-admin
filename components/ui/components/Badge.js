import styles from "../../../styles/ui/components/Badge.module.css";

function Badge({children, variant = 'primary'}) {
    const variantClass = styles[variant] || styles.primary;
    return <span className={`${styles.badge} ${variantClass}`}>{children}</span>;
}

export default Badge;