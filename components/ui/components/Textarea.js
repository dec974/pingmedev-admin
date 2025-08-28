import styles from "../../../styles/ui/components/Textarea.module.css";

function Textarea({ label, id, placeholder, value, onChange, ...props }) {
    return (
        <div>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}
            <textarea
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={styles.textarea}
                {...props}
            />
        </div>
    );
}

export default Textarea;