import styles from "../../../styles/ui/components/Slider.module.css";

function Slider({
    label,
    id,
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
    ...props
}) {
    return (
        <div className={styles.sliderContainer}>
        {label && (
            <label htmlFor={id} className={styles.sliderLabel}>
                {label}
            </label>
        )}
        <input
            type="range"
            id={id}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className={styles.slider}
            {...props}
        />
        </div>
    );
}
export default Slider;