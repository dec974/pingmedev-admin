import { useState, useEffect } from 'react';
import styles from '../styles/Languages.module.css';
import Icon from '../components/ui/Icons';
import Modal from 'react-modal';


function Languages() {
    const [languages, setLanguages] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);      
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
                <button className={styles.addLanguageButton} onClick={openModal}>Add New Language</button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Add New Language"
                >
                    <button onClick={closeModal}>Close</button>
                    <h2>Add New Language</h2>
                    {/* Formulaire pour ajouter une nouvelle langue */}
                    <form>
                        <label>
                            Name:
                            <input type="text" name="name" />
                        </label>
                        <label>
                            Icon:
                            <input type="text" name="icon" />
                        </label>
                        <button type="submit">Add Language</button>
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