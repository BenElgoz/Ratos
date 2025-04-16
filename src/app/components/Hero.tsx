import styles from './Hero.module.scss';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <Image
          src="/images/logo-ratos-orange.svg"
          alt="Logo Ratos"
          width={120}
          height={40}
          className={styles.logo}
        />
        <h1>Rate pas l’occasion de gratter</h1>
        <p>
          Télécharge l’app pour dénicher rapidement, facilement (et gratuitement !) les meilleurs bons plans près de chez toi.
        </p>
        <div className={styles.buttons}>
          <a href="#" className={styles.storeBtn}>
            <Image src="/images/appstore.svg" alt="App Store" width={120} height={40} />
          </a>
          <a href="#" className={styles.storeBtn}>
            <Image src="/images/playstore.svg" alt="Play Store" width={120} height={40} />
          </a>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <Image
          src="/images/phone-mockup.png"
          alt="Aperçu application"
          width={300}
          height={600}
        />
        {/* Fromages flottants à ajouter si tu veux en décor */}
      </div>
    </section>
  );
}
