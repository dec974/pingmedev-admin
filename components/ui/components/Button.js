import styles from "../../../styles/ui/components/Button.module.css";

function Button({
    children,
    variant = "primary", // primary, secondary, success, danger, warning, info
    outline = false,
    rounded = false,
    light = false,
    square = false,
    icon = null,
    iconPosition = "left", // 'left' ou 'right'
    disabled = false,
    type = "button",
    ...props
    }) {
    let className = styles.btn;

    if (square) className += ` ${styles.square}`;
    if (rounded) className += ` ${styles.rounded}`;
    if (light) className += ` ${styles.light}`;
    if (outline) className += ` ${styles.outline}`;
    if (variant && styles[variant]) className += ` ${styles[variant]}`;
    if (disabled) className += ` ${styles.disabled}`;

    return (
        <button className={className} type={type} disabled={disabled} {...props}>
        {icon && iconPosition === "left" && <span className={styles.icon}>{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className={styles.icon}>{icon}</span>}
        </button>
    );
}

export default Button;
