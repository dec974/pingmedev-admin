import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function GitHubCallback() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            fetch('http://localhost:3000/auth/github/callback', {
                method: 'POST',
                headers: {  
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            })
            .then(response => response.json())
            .then(data => {     
                // Stocker le token dans le localStorage
                localStorage.setItem('isLoggedIn', 'true');
            });
        } else {
            console.error('Aucun code reçu dans l\'URL');
        }
    }, []);
    return <div>Connexion Github en cours</div>;
}