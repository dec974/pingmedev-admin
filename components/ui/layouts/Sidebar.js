import styles from "../../../styles/ui/layouts/Sidebar.module.css";
import { FaHome, FaCode, FaUsers } from "react-icons/fa";
import { LuMessageSquareText } from "react-icons/lu";
import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
    { label: "Dashboard", icon: FaHome, href: "/" },
    { label: "Langages", icon: FaCode, href: "/languages" },
    { label: "Users", icon: FaUsers, href: "/users" },
    { label: "Posts", icon: LuMessageSquareText, href: "/posts" },
];

function Sidebar({ collapsed }) {
    const router = useRouter();

    return (
        <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ""}`}>
        <nav>
            {navItems.map(({ icon: Icon, label, href }) => {
            const isActive = router.pathname === href;
            return (
                <Link href={href} key={label} passHref legacyBehavior>
                <a
                    className={`${styles.navA} ${isActive ? styles.navAActive : ""}`}
                    aria-current={isActive ? "page" : undefined}
                >
                    <span className={styles.icon}>
                    <Icon />
                    </span>
                    <span
                    className={`${styles.navALostText} ${
                        collapsed ? styles.navALostTextCollapsed : ""
                    }`}
                    >
                    {label}
                    </span>
                </a>
                </Link>
            );
            })}
        </nav>
        </aside>
    );
}

export default Sidebar;
