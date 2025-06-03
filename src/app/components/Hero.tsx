import styles from './Hero.module.scss';
import Image from 'next/image';

export default function Hero() {
  const handleClick = () => {
    window.plausible?.('cta-click');
  };
  return (
    <section className={styles.hero}>
      <div className={styles.content}>

        <h1>Rate pas l’occasion<br />de gratter</h1>

        <p className={styles.subtitle}>
          Télécharge l’app pour dénicher rapidement, facilement (et gratuitement !) les meilleurs bons plans près de chez toi.
        </p>

        <div className={styles.buttons}>
          <a className={styles.storeBtn} href="#">
            <Image src="/images/appstore.svg" alt="App Store" width={20} height={20} />
            <span>App Store</span>
          </a>
          <a className={styles.storeBtn} href="#">
            <Image src="/images/playstore.svg" alt="Play Store" width={20} height={20} />
            <span>Play Store</span>
          </a>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <Image
          src="/images/phone-mockup.png"
          alt="Téléphone avec carte"
          width={500}
          height={500}
        />

        {/* Fromages flottants */}
        <Image
          src="/images/cheese.png"
          alt="Fromage décoratif"
          width={50}
          height={50}
          className={styles.cheese + ' ' + styles.cheese1}
        />
        <Image
          src="/images/cheese.png"
          alt="Fromage décoratif"
          width={50}
          height={50}
          className={styles.cheese + ' ' + styles.cheese2}
        />
        <Image
          src="/images/cheese.png"
          alt="Fromage décoratif"
          width={50}
          height={50}
          className={styles.cheese + ' ' + styles.cheese3}
        />
        <Image
          src="/images/cheese.png"
          alt="Fromage décoratif"
          width={50}
          height={50}
          className={styles.cheese + ' ' + styles.cheese4}
        />
      </div>
    </section>
  );
}
