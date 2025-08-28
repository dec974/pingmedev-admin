import styles from "../../../styles/ui/components/InputText.module.css";

function InputText({label, id, placeholder, value, onChange, ...props}) {
    return (
        <div>
            {label && (
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            )}
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={styles.input}
                {...props}
            />
        </div>
    ); 
}

export default InputText;