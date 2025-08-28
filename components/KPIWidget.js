import React from "react";
import Card from '../components/ui/components/Card';

// Widget de base pour uniformiser l'affichage des KPIs avec le composant Card
export function KPIWidget({ title, children }) {
  return (
    <Card title={title}>
      <div style={{ width: '100%', textAlign: 'center', marginTop: 8 }}>{children}</div>
    </Card>
  );
}

// 1. Utilisateurs actifs (jour/semaine/mois)
export function ActiveUsersKPI({ day, week, month }) {
  return (
    <KPIWidget title="Utilisateurs actifs">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span>Jour : <b>{day}</b></span>
        <span>Semaine : <b>{week}</b></span>
        <span>Mois : <b>{month}</b></span>
      </div>
    </KPIWidget>
  );
}

// 2. Nouveaux inscrits
export function NewSignupsKPI({ count }) {
  return (
    <KPIWidget title="Nouveaux inscrits">
      <span style={{ fontSize: 32, fontWeight: 700, color: '#4c77cb' }}>{count}</span>
    </KPIWidget>
  );
}

// 3. Nombre total de discussions
export function TotalDiscussionsKPI({ count }) {
  return (
    <KPIWidget title="Discussions">
      <span style={{ fontSize: 32, fontWeight: 700, color: '#4c77cb' }}>{count}</span>
    </KPIWidget>
  );
}

// 4. Nombre de messages postés
export function TotalMessagesKPI({ count }) {
  return (
    <KPIWidget title="Messages postés">
      <span style={{ fontSize: 32, fontWeight: 700, color: '#4c77cb' }}>{count}</span>
    </KPIWidget>
  );
}

// 5. Nombre moyen de réponses par discussion
export function AvgRepliesKPI({ avg }) {
  return (
    <KPIWidget title="Réponses/discussion">
      <span style={{ fontSize: 28, color: '#4c77cb' }}>{avg}</span>
    </KPIWidget>
  );
}

// 6. Temps moyen de réponse au premier message
export function AvgFirstReplyTimeKPI({ minutes }) {
  return (
    <KPIWidget title="Temps de 1ère réponse">
      <span style={{ fontSize: 24, color: '#4c77cb' }}>{minutes} min</span>
    </KPIWidget>
  );
}

// 7. Taux de sujets sans réponse (progress bar)
export function UnansweredRateKPI({ rate }) {
  return (
    <KPIWidget title="Sujets sans réponse">
      <div style={{ width: "100%", marginTop: 8 }}>
        <div style={{
          background: "#eee",
          borderRadius: 8,
          height: 10,
          width: "100%",
          overflow: "hidden"
        }}>
          <div style={{
            width: `${rate}%`,
            background: "#f66",
            height: "100%",
            borderRadius: 8
          }} />
        </div>
        <div style={{ textAlign: "right", fontSize: 14, color: '#f66' }}>{rate}%</div>
      </div>
    </KPIWidget>
  );
}

// 8. Nombre de messages échangés en messagerie privée
export function PrivateMessagesKPI({ count }) {
  return (
    <KPIWidget title="Messages privés">
      <span style={{ fontSize: 28, color: '#4c77cb' }}>{count}</span>
    </KPIWidget>
  );
}

// 9. Nombre de conversations actives
export function ActiveConversationsKPI({ count }) {
  return (
    <KPIWidget title="Conversations actives">
      <span style={{ fontSize: 28, color: '#4c77cb' }}>{count}</span>
    </KPIWidget>
  );
}

// 10. Temps de réponse moyen dans la messagerie
export function AvgPrivateReplyTimeKPI({ minutes }) {
  return (
    <KPIWidget title="Réponse messagerie">
      <span style={{ fontSize: 24, color: '#4c77cb' }}>{minutes} min</span>
    </KPIWidget>
  );
}

// 11. Nouveaux contacts créés
export function NewContactsKPI({ count }) {
  return (
    <KPIWidget title="Nouveaux contacts">
      <span style={{ fontSize: 28, color: '#4c77cb' }}>{count}</span>
    </KPIWidget>
  );
}

// 12. Score de satisfaction (votes, réactions, likes)
export function SatisfactionScoreKPI({ score, max = 5 }) {
  // Affichage sous forme d'étoiles
  return (
    <KPIWidget title="Satisfaction">
      <div style={{ fontSize: 24, color: '#f7b500' }}>
        {"★".repeat(Math.round(score))}{"☆".repeat(max - Math.round(score))}
      </div>
      <div style={{ fontSize: 14, color: '#4c77cb' }}>{score} / {max}</div>
    </KPIWidget>
  );
}

// 13. Nombre de signalements/modérations
export function ReportsKPI({ count }) {
  return (
    <KPIWidget title="Signalements">
      <span style={{ fontSize: 28, color: "#e55" }}>{count}</span>
    </KPIWidget>
  );
}

// 14. Uptime/disponibilité (progress bar)
export function UptimeKPI({ percent }) {
  return (
    <KPIWidget title="Uptime">
      <div style={{ width: "100%", marginTop: 8 }}>
        <div style={{
          background: "#eee",
          borderRadius: 8,
          height: 10,
          width: "100%",
          overflow: "hidden"
        }}>
          <div style={{
            width: `${percent}%`,
            background: "#4caf50",
            height: "100%",
            borderRadius: 8
          }} />
        </div>
        <div style={{ textAlign: "right", fontSize: 14, color: '#4caf50' }}>{percent}%</div>
      </div>
    </KPIWidget>
  );
}

// 15. Nombre d’erreurs ou crashs
export function ErrorsKPI({ count }) {
  return (
    <KPIWidget title="Erreurs/Crashs">
      <span style={{ fontSize: 28, color: "#e55" }}>{count}</span>
    </KPIWidget>
  );
}
