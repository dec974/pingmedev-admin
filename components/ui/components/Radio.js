import styles from "../../../styles/ui/components/Radio.module.css";

function Radio({id, label, name, checked, onChange, disabled = false}) {
    return (
        <div className={styles.formCheck}>
            <input
                type="radio"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={styles.inputRadio}
            />
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}
        </div>
    )
}

export default Radio;