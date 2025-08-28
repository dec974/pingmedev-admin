import styles from "../../../styles/ui/components/Checkbox.module.css";

function Checkbox({id, label, checked, onChange, disabled = false}) {
    return (
        <div className={styles.formCheck}>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={styles.inputCheckbox}
            />
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}
        </div>
    );
}

export default Checkbox;