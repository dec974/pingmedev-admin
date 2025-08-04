import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/DashboardLayout.module.css';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button 
            className={styles.menuToggle} 
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <h1 className={styles.logo}>PingMe Admin</h1>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.userInfo}>Admin User</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
          <nav className={styles.navigation}>
            <ul>
              <li><a href="/" className={styles.navLink}>🏠 Dashboard</a></li>
              <li><a href="/users" className={styles.navLink}>👥 Users</a></li>
              <li><a href="/messages" className={styles.navLink}>💬 Messages</a></li>
              <li><a href="/analytics" className={styles.navLink}>📊 Analytics</a></li>
              <li><a href="/settings" className={styles.navLink}>⚙️ Settings</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
