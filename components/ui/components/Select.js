import styles from "../../../styles/ui/components/Select.module.css";

function Select({ label, id, options = [], value, onChange, ...props }) {
    return (
        <div>
            {label && (
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            )}
            <select
            id={id}
            value={value}
            onChange={onChange}
            className={styles.select}
            {...props}
            >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
                </option>
            ))}
            </select>
        </div>
    );
}

export default Select;