import styles from "../../../styles/ui/components/Accordion.module.css";
import { useState } from "react";

function Accordion({title, children}) {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.accordionItem}>
        <div
            className={styles.accordionHeader}
            onClick={() => setOpen(!open)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                setOpen(!open);
            }
            }}
            aria-expanded={open}
        >
            {title}
            <span className={`${styles.accordionIcon} ${open ? styles.accordionIconOpen : ''}`} aria-hidden="true">
            ▼
            </span>
        </div>
        <div className={`${styles.accordionContent} ${open ? styles.accordionContentOpen : ''}`}>
            {children}
        </div>
        </div>
    );
}

export default Accordion;