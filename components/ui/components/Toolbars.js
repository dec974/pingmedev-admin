import styles from "../../../styles/ui/components/Toolbars.module.css";

function Toolbar({children}) {
    return <div className={styles.toolbar}>{children}</div>;
}

export default Toolbar;