import styles from '../styles/Home.module.css';
import Spinner from './ui/Spinner';
import { useState, useEffect } from 'react';
import Card from './ui/Card';
import { FaUsers, FaEnvelope, FaChartBar } from 'react-icons/fa6';

function Home() {
  const [loading, setLoading] = useState(true);
  const [countUsers, setCountUsers] = useState(0);
  const [countPosts, setCountPosts] = useState(0);
  useEffect(() => {
    fetch('http://localhost:3000/admin/users/count')
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setCountUsers(data.count);
        } else {
          console.error('Failed to fetch user count');
        }
      })
      .catch(error => {
        console.error('Error fetching user count:', error);
      });
    fetch('http://localhost:3000/admin/posts/count')
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setCountPosts(data.count);
        } else {
          console.error('Failed to fetch post count');
        }
      })
      .catch(error => {
        console.error('Error fetching post count:', error);
      });
    setLoading(false);

  }, []);
  
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      
      <h1 className={styles.title}>
        Bienvenue sur PingMe Admin
      </h1>
      <div className={styles.dashboardCards}>
        <Card title="Utilisateurs">
          <FaUsers className={styles.cardIcon} size={50}/>
          <p className={styles.cardNumber}>{countUsers}</p>
        </Card>
        <Card title="Posts">
          <FaEnvelope className={styles.cardIcon} size={50}/>
          <p className={styles.cardNumber}>{countPosts}</p>
        </Card>
        <div className={styles.card}>
          <h3>Activité</h3>
          <p className={styles.cardNumber}>89%</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
