import styles from './SocialCall.module.scss';
import Image from 'next/image';

export default function SocialCall() {
  return (
    <section className={styles.social}>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image
            src="/images/story-social.jpg"
            alt="Jeune mangeant au resto"
            width={400}
            height={300}
            style={{ borderRadius: '12px', width: '100%', height: 'auto' }}
          />
        </div>

        <div className={styles.text}>
          <h2>Suis la trace des bons plans jusque dans nos stories</h2>
          <p>
            Rejoins-nous sur les réseaux pour ne rien rater du grattage&nbsp;!
          </p>
          <div className={styles.icons}>
            <a href="#"><Image src="/images/ico-instagram.svg" alt="Instagram" width={32} height={32} /></a>
            <a href="#"><Image src="/images/ico-tiktok.svg" alt="TikTok" width={32} height={32} /></a>
            <a href="#"><Image src="/images/ico-facebook.svg" alt="Facebook" width={32} height={32} /></a>
            <a href="#"><Image src="/images/ico-linkedin.svg" alt="LinkedIn" width={32} height={32} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
