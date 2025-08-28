import React, { useState } from 'react';
import styles from '../../../styles/ui/components/Alert.module.css';

const Alert = ({ type = 'primary', message, dismissible = false, onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <div
      className={`${styles.alert} ${styles[type]}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <span>{message}</span>
      {dismissible && (
        <button
          type="button"
          className={styles.closeBtn}
          aria-label="Fermer l’alerte"
          onClick={handleClose}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
