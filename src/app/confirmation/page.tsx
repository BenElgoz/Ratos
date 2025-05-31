'use client';

import styles from './confirmation.module.scss';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1>🎉 Inscription réussie !</h1>
        <p>Ton compte a bien été créé.</p>
        <p>Tu peux maintenant te connecter à ton espace RATOS.</p>
        <Link href="/login" className={styles.button}>
          Se connecter
        </Link>
      </div>
    </main>
  );
}
