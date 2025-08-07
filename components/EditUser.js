import styles from '../styles/EditUser.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


function EditUser(){
    const [user, setUser] = useState(null);
    const router = useRouter();
    const { userId } = router.query;

    useEffect(() => {
        if (!user_id) {
            // Handle the case where user_id is not available
            console.error('User ID is not available');
            return;
        }
        fetch(`http://localhost:3000/admin/users/${user_id}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                setUser(data);
            } else {
                console.error('User not found');
            }
        });
    }, []);

    return (
        <div>
            <button onClick={() => router.back()} className={styles.backButton}>Retour</button>
            <h1>Edit User {user.username} </h1>
            
        </div>
    );
}

export default EditUser;