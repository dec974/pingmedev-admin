import styles from '../styles/Home.module.css';
import Spinner from '../components/ui/components/Spinner';
import { useState, useEffect } from 'react';
import Card from '../components/ui/components/Card';
import { FaUsers, FaEnvelope, FaChartBar } from 'react-icons/fa6';
// Import des widgets KPI
import {
  ActiveUsersKPI, NewSignupsKPI, TotalDiscussionsKPI, TotalMessagesKPI,
  AvgRepliesKPI, AvgFirstReplyTimeKPI, UnansweredRateKPI, PrivateMessagesKPI,
  ActiveConversationsKPI, AvgPrivateReplyTimeKPI, NewContactsKPI,
  SatisfactionScoreKPI, ReportsKPI, UptimeKPI, ErrorsKPI
} from './KPIWidget';

function Home() {
  const [loading, setLoading] = useState(true);
  const [countUsers, setCountUsers] = useState(0);
  const [countPosts, setCountPosts] = useState(0);
  // Ajout d'états factices pour les autres KPIs (à remplacer par vos vraies données)
  const [kpiData, setKpiData] = useState({
    activeDay: 42,
    activeWeek: 210,
    activeMonth: 800,
    newSignups: 12,
    totalDiscussions: 120,
    totalMessages: 540,
    avgReplies: 4.5,
    avgFirstReplyTime: 32,
    unansweredRate: 8,
    privateMessages: 90,
    activeConversations: 15,
    avgPrivateReplyTime: 18,
    newContacts: 7,
    satisfactionScore: 4.2,
    reports: 2,
    uptime: 99.98,
    errors: 1
  });
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
    // Simule un chargement
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className={styles.title}>
        Bienvenue sur PingMe Admin
      </h1>
      {/* Section Dashboard KPI */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 16, background: 'var(--dashboard-bg, #f7f7f7)',
        padding: 24, borderRadius: 16, justifyContent: 'center', marginBottom: 32
      }}>
        {/* Exemples d'intégration des widgets KPI */}
        <ActiveUsersKPI day={kpiData.activeDay} week={kpiData.activeWeek} month={kpiData.activeMonth} />
        <NewSignupsKPI count={kpiData.newSignups} />
        <TotalDiscussionsKPI count={kpiData.totalDiscussions} />
        <TotalMessagesKPI count={kpiData.totalMessages} />
        <AvgRepliesKPI avg={kpiData.avgReplies} />
        <AvgFirstReplyTimeKPI minutes={kpiData.avgFirstReplyTime} />
        <UnansweredRateKPI rate={kpiData.unansweredRate} />
        <PrivateMessagesKPI count={kpiData.privateMessages} />
        <ActiveConversationsKPI count={kpiData.activeConversations} />
        <AvgPrivateReplyTimeKPI minutes={kpiData.avgPrivateReplyTime} />
        <NewContactsKPI count={kpiData.newContacts} />
        <SatisfactionScoreKPI score={kpiData.satisfactionScore} />
        <ReportsKPI count={kpiData.reports} />
        <UptimeKPI percent={kpiData.uptime} />
        <ErrorsKPI count={kpiData.errors} />
      </div>
      {/* Anciennes cards conservées pour exemple */}
      <div className={styles.dashboardCards}>
        <Card title="Utilisateurs">
          <FaUsers className={styles.cardIcon} size={50}/>
          <p className={styles.cardNumber}>{countUsers}</p>
        </Card>
        <Card title="Posts">
          <FaEnvelope className={styles.cardIcon} size={50}/>
          <p className={styles.cardNumber}>{countPosts}</p>
        </Card>
      </div>
    </div>
  );
}

export default Home;
