import styles from '../styles/Home.module.css';
import Spinner from './ui/Spinner';

function Home() {
  return (
    <div>
      <Spinner size={50} />
      <h1 className={styles.title}>
        Bienvenue sur PingMe Admin
      </h1>
      <div className={styles.dashboardCards}>
        <div className={styles.card}>
          <h3>Utilisateurs</h3>
          <p className={styles.cardNumber}>1,234</p>
        </div>
        <div className={styles.card}>
          <h3>Messages</h3>
          <p className={styles.cardNumber}>5,678</p>
        </div>
        <div className={styles.card}>
          <h3>Activité</h3>
          <p className={styles.cardNumber}>89%</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
