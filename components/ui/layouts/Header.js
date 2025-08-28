import styles from "../../../styles/ui/layouts/Header.module.css"
function Header({ onToggleSidebar, darkMode, onToggleDarkMode }) {
    return (
        <header className={styles.header}>
            <button
                onClick={onToggleSidebar}
                aria-label="Toggle Sidebar"
                className={styles.toggleSidebarBtn}
            >
                ☰
            </button>
            Dashboard
            <label
                className={styles.toggleSwitch}
                aria-label="Toggle Dark Mode"
                role="switch"
                aria-checked={darkMode}
                tabIndex={0}
            >
                <input
                type="checkbox"
                checked={darkMode}
                onChange={onToggleDarkMode}
                className={styles.input}
                />
                <span className={styles.slider}>
                <svg
                    className={`${styles.icon} ${styles.sun}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                <svg
                    className={`${styles.icon} ${styles.moon}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                >
                    <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 0021 12.79z" />
                </svg>
                </span>
            </label>
        </header>
    );
}

export default Header;