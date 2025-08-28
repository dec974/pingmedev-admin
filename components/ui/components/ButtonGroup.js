import styles from "../../../styles/ui/components/ButtonGroup.module.css";

function ButtonGroup({children}) {
    return <div className={styles.buttonGroup}>{children}</div>;
}

export default ButtonGroup;