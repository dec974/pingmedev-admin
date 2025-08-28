import styles from '../styles/Users.module.css';
import { useState, useEffect, useRef } from 'react';
import Spinner from '../components/ui/components/Spinner';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import Button from './ui/components/Button';

const customStyles = {
    content: {  
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto', 
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        maxWidth: '500px',
        width: '90%',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
};

Modal.setAppElement('#__next'); 

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRoles, setSelectedRoles] = useState(['user']);

    const router = useRouter();
    const userRef = useRef(null);
    useEffect(() => {
        // Fetch users from the backend
        fetch('https://pingmedev-backend.vercel.app/admin/users')
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setUsers(data.users);
                    // Sauvegarder les données originales seulement au premier chargement
                    if (userRef.current === null) {
                        userRef.current = data.users;
                    }
                } else {
                    console.error('Failed to fetch users');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        // filter users from users data
        const filteredUsers = users.filter(user => 
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setUsers(filteredUsers);
        setSearchTerm('');
    }

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };
    const handleCloseModal = () => {
        setModalIsOpen(false);  
    };
    const handleRoleChange = (role) => {
        // Empêcher de décocher le rôle 'user' car il est obligatoire
        if (role === 'user') {
            return;
        }
        
        setSelectedRoles(prev => {
            if (prev.includes(role)) {
                return prev.filter(r => r !== role);
            } else {
                return [...prev, role];
            }
        });
    };
    const handleSubmitNewUser = () => {
        const newUser = JSON.stringify({
            username,
            email,
            password,
            role: selectedRoles,
        });

        fetch('https://pingmedev-backend.vercel.app/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: newUser,
        })
        .then(response => response.json())
        .then(data => { 
            if (data.result) {
                setUsers(prev => [...prev, data.user]);
                setUsername('');
                setEmail('');
                setPassword('');
                setSelectedRoles(['user']);
                handleCloseModal();
            } else {
                console.error('Failed to add user:', data.message);
            }
        });
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <div className={styles.header}>
                <h1>Liste des utilisateurs</h1>
                <Button onClick={() => handleOpenModal()}>New User</Button>
                <Modal
                    isOpen={modalIsOpen}    
                    onRequestClose={handleCloseModal}
                    style={customStyles}
                    contentLabel="Add User Modal"
                >
                    <div className={styles.modalContainer}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Ajouter un utilisateur</h2>
                            <button className={styles.closeModalButton} onClick={handleCloseModal}>×</button>
                        </div>
                        <div className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="username">Nom d'utilisateur</label>
                                <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="role">Rôle(s)</label>
                                <div className={styles.checkboxGroup}>
                                    <label className={`${styles.checkboxLabel} ${styles.requiredRole}`}>
                                        <input 
                                            type="checkbox" 
                                            value="user"
                                            checked={selectedRoles.includes('user')}
                                            onChange={() => handleRoleChange('user')}
                                            disabled={true}
                                        />
                                        <span>Utilisateur (obligatoire)</span>
                                    </label>
                                    <label className={styles.checkboxLabel}>
                                        <input 
                                            type="checkbox" 
                                            value="mentor"
                                            checked={selectedRoles.includes('mentor')}
                                            onChange={() => handleRoleChange('mentor')}
                                        />
                                        <span>Mentor</span>
                                    </label>
                                    <label className={styles.checkboxLabel}>
                                        <input 
                                            type="checkbox" 
                                            value="moderator"
                                            checked={selectedRoles.includes('moderator')}
                                            onChange={() => handleRoleChange('moderator')}
                                        />
                                        <span>Modérateur</span>
                                    </label>
                                    <label className={styles.checkboxLabel}>
                                        <input 
                                            type="checkbox" 
                                            value="admin"
                                            checked={selectedRoles.includes('admin')}
                                            onChange={() => handleRoleChange('admin')}
                                        />
                                        <span>Administrateur</span>
                                    </label>
                                    <label className={styles.checkboxLabel}>
                                        <input 
                                            type="checkbox" 
                                            value="superadmin"
                                            checked={selectedRoles.includes('superadmin')}
                                            onChange={() => handleRoleChange('superadmin')}
                                        />
                                        <span>Super Administrateur</span>
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className={styles.submitButton} onClick={() => handleSubmitNewUser()}>Ajouter</button>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className={styles.userList}>
                <div className={styles.userSearch}>
                    <input type='text' placeholder='Search users...' className={styles.searchInput} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    <button className={styles.searchButton} onClick={() => handleSearch()}>Search</button>
                    <button className={styles.resetButton} onClick={() => {setUsers(userRef.current); console.log(users)}}>Reset</button>
                </div>
                <table className={styles.userTable}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <div className={styles.actionButtons}>
                                        <button className={styles.editButton} onClick={() => router.push(`/users/edit/${user._id}`)}>Edit</button>
                                        <button className={styles.deleteButton} onClick={(_id) => handleDeleteUser(_id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Users;