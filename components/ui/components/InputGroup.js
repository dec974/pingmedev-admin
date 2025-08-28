import styles from "../../../styles/ui/components/InputGroup.module.css";

function InputGroup({id, prepend, prependIcon: PrependIcon, append, appendIcon: AppendIcon, value, onChange, placeholder, type='text', ...props}) {
    return (
        <div className={styles.inputGroup}>
        {(prepend || PrependIcon) && (
            <div className={styles.inputGroupPrepend}>
            {PrependIcon && <PrependIcon className={styles.inputIcon} aria-hidden="true" />}
            {typeof prepend === 'string' ? <span>{prepend}</span> : prepend}
            </div>
        )}
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={styles.input}
            {...props}
        />
            {(append || AppendIcon) && (
                <div className={styles.inputGroupAppend}>
                {typeof append === 'string' ? (
                    <span>{append}</span>
                ) : AppendIcon ? (
                    <AppendIcon className={styles.inputIcon} aria-hidden="true" />
                ) : (
                    append
                )}
                </div>
            )}
        </div>
    );
}

export default InputGroup;