import stytles from "../../../styles/ui/components/Tooltip.module.css";

function Tooltip({children, text}) {
    return (
        <span className={styles.tooltipWrapper} tabIndex={0}>
        {children}
        <span role="tooltip" className={styles.tooltipText}>
            {text}
            <span className={styles.tooltipArrow} />
        </span>
        </span>
    );
}

export default Tooltip;