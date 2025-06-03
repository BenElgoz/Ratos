'use client';

import styles from './confirmationoffre.module.scss';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1>Votre offre a été créée !</h1>
        <p>Elle est maitnenant visible par les clients Ratos.</p>
        <Link href="/dashboard" className={styles.button}>
          Dashboard
        </Link>
      </div>
    </main>
  );
}
