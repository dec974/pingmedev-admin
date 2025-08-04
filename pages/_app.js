import '../styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import Spinner from '../components/ui/Spinner';

function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pages qui ne doivent pas avoir le layout dashboard
  const noLayoutPages = ['/login', '/auth/github/callback'];
  
  // Vérifier si la page actuelle doit avoir le layout
  const shouldShowLayout = !noLayoutPages.includes(router.pathname);

  // Gérer l'authentification côté client uniquement
  useEffect(() => {
      // check if user is connected
      if(!localStorage.getItem('isLoggedIn') && router.pathname !== '/login') {
        setIsLoading(false);
        router.push('/login');
        return;
    } else {
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
        setIsLoading(false);
      }
      // // Simuler une connexion pour l'exemple
      // localStorage.setItem('isLoggedIn', 'true');
      // const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      // setIsLoggedIn(loggedIn);
      // // Rediriger vers login si pas connecté et pas déjà sur la page login
      // if (!loggedIn && router.pathname !== '/login') {
      //   router.push('/login');
      // }
      // setIsLoading(false);
  }, [router]);

  // Afficher un loader pendant la vérification d'authentification
  if (isLoading) {
    return (
      <Spinner size={50} />
    );
  }

  return (
    <>
      <Head>
        <title>PingMe Admin</title>
        <meta name="description" content="PingMe Administration Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {shouldShowLayout ? (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default App;
