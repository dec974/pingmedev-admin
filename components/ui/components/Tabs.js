import styles from "../../../styles/ui/components/Tabs.module.css";
import { useState } from "react";

function Tabs({tabs}) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <div className={styles.tabs}>
                {tabs.map((tab, idx) => (
                <div
                    key={idx}
                    className={`${styles.tab} ${idx === activeIndex ? styles.tabActive : ''}`}
                    onClick={() => setActiveIndex(idx)}
                    role="tab"
                    aria-selected={idx === activeIndex}
                    tabIndex={0}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        setActiveIndex(idx);
                    }
                    }}
                >
                    {tab.label}
                </div>
                ))}
            </div>
            <div className={styles.tabContent} role="tabpanel">
                {tabs[activeIndex].content}
            </div>
        </>
    );
}

export default Tabs;