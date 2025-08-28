import { useState, useEffect } from 'react';
import styles from '../styles/Languages.module.css';
import Icon from '../components/ui/components/Icons';
import Modal from '../components/ui/components/Modal';
import Input from '../components/ui/components/InputText';
import Button from '../components/ui/components/Button';



function Languages() {
    const [languages, setLanguages] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [iconName, setIconName] = useState('');
    const [error, setError] = useState('');
    

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false); 
        setName('');
        setColor('');
        setIconName(''); 
        setError('');    
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        if(!name.trim() && !color.trim() && !iconName.trim()) {
            setError('field is required');
            return;
        }

        fetch('http://localhost:3000/admin/languages/', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                name,
                color,
                icon : iconName
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.result) {
                console.log('add new language');
            } else {
                console.log('error add language');
            }
        });

        closeModal();
    };
    

    useEffect(() => {
        // recuperation des langues depuis le backend
        fetch('http://localhost:3000/admin/languages')
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setLanguages(data.languages);
                } else {
                    return;
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des langues:', error);
            });
    }, []);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
        },
        h2: {
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '24px',
            color: '#333',
        },
        form: {
            display: 'flex',    
            flexDirection: 'column',
            gap: '10px',
        },
    }

    const languagesList = languages.map((language, index) => (
        <div key={index} className={styles.languageItem}>
            <div className={styles.iconContainer}>
                {language.icon && <Icon name={language.icon} color={language.color} size={"3.5rem"}/>}
            </div>
            <h3>{language.name}</h3>
        </div>
    ));

    return(
        <div>
            <h1>Languages Page</h1>
            <p>This is the languages management page.</p>
            <div className={styles.newLanguage}>
                <Button variant="primary" onClick={() => openModal()}>Nouveau langage</Button>
                <Modal isOpen={modalIsOpen} onClose={() => closeModal()} title="Ajouter un langage">
                    <p>
                        Ajouter un nouveau langage a la liste déjà existant, 
                        pour le choix de l'icone veuillez vous referer a celle de <a className={styles.modalLink} href="https://react-icons.github.io/react-icons/" target='_blank'>React Icons</a>
                    </p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className={styles.formContent}>
                            <Input
                                label="Nom du langage"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                aria-invalid={!!error}
                                aria-describedby={error ? 'error-message' : undefined}
                            />
                            <Input
                                label="Icon"
                                id="icon"
                                value={iconName}
                                onChange={(e) => setIconName(e.target.value)}
                                aria-invalid={!!error}
                                aria-describedby={error ? 'error-message' : undefined}
                            />
                            <Input
                                label="Couleur"
                                id="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                aria-invalid={!!error}
                                aria-describedby={error ? 'error-message' : undefined}
                            />
                        </div>
                        {error && (
                        <div id="error-message" style={{ color: 'red', marginTop: '0.25rem' }}>
                            {error}
                        </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <Button type="button" variant="secondary" onClick={closeModal}>
                                Annuler
                            </Button>
                            <Button type="submit" variant="primary">
                                Envoyer
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
            <div className={styles.languagesContainer}>
                {languagesList}
            </div>
        </div>
    );
};

export default Languages;