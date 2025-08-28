import styles from "../../../styles/ui/components/ToggleSwitch.module.css";

function ToggleSwitch({id, checked, onChange, disabled = false}) {
    return (
        <label className={styles.toggleSwitch} htmlFor={id}>
            <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            />
            <span className={styles.slider} />
        </label>
    )
}

export default ToggleSwitch;