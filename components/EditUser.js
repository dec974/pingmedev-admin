import styles from '../styles/EditUser.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from '../components/ui/components/Spinner';


function EditUser(){
    const [user, setUser] = useState(null);
    const router = useRouter();
    const { userId } = router?.query;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (!userId) {
            // Handle the case where userId is not available
            return;
        }
        fetch(`https://pingmedev-backend.vercel.app/admin/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setUser(data.user);
                } else {
                    console.error('User not found');
                }
            });
    }, [userId]);

    

    if (!userId || !user) {
        return <Spinner />;
    }

    const handlePromote = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`https://pingmedev-backend.vercel.app/admin/users/${userId}/promote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (data.success) {
                setUser({ ...user, role: data.newRole });
            } else {
                setError(data.message || 'Erreur lors de la promotion');
            }
        } catch (e) {
            setError('Erreur réseau');
        }
        setLoading(false);
    };

    return (
        <div>
            <button onClick={() => router.back()} className={styles.backButton}>Retour</button>
            <h1>Édition de l'utilisateur : {user.username}</h1>
            <div className={styles.userInfo}>
                <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
                <p><strong>Email :</strong> {user.email}</p>
                <p><strong>Rôle :</strong> {user.role}</p>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button onClick={handlePromote} disabled={loading} className={styles.promoteButton}>
                {loading ? 'Mise à jour...' : 'Promouvoir (changer le rôle)'}
            </button>
        </div>
    );
}

export default EditUser;