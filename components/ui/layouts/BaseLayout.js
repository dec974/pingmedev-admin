import styles from "../../../styles/ui/layouts/BaseLayout.module.css"
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useState, useEffect } from "react";

function BaseLayout({children}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
        }
    }, [darkMode]);

    return (
        <div className={`${styles.gridLayout} ${sidebarCollapsed ? styles.gridLayoutCollapsed : ''}`}>
            <Header
                onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
                darkMode={darkMode}
                onToggleDarkMode={() => setDarkMode(!darkMode)}
            />
            <Sidebar collapsed={sidebarCollapsed} />
            <main className={styles.mainContent}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default BaseLayout;