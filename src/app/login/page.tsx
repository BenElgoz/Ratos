'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.scss';

export default function LoginPage() {
  const router = useRouter();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur serveur');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      // Redirection conditionnelle
      if (data.role === 'CLIENT') {
        router.push('/map');
      } else if (data.role === 'RESTAURATEUR') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue');
    }
  };

  return (
    <main className={styles.container}>
      <img src="/images/logo-ratos-orange.svg" alt="Logo Ratos" className={styles.logo} />

      <div className={styles.form}>
        <label>Email ou pseudo*</label>
        <input
          type="text"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          required
        />

        <label>Mot de passe*</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <button onClick={handleLogin}>Se connecter</button>
      </div>

      <p className={styles.signupLink}>
        Pas encore de compte ? <a href="/signup">En créer un</a>
      </p>
    </main>
  );
}
