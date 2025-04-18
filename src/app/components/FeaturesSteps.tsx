import styles from './FeaturesSteps.module.scss';
import Image from 'next/image';

export default function FeaturesSteps() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image
            src="/images/gratter-quartier.jpg"
            alt="Groupe de jeunes au resto"
            width={400}
            height={500}
            style={{ borderRadius: '12px', width: '100%', height: 'auto' }}
          />
        </div>

        <div className={styles.content}>
          <h2>Prêt à gratter le quartier&nbsp;?</h2>
          <p className={styles.intro}>RATOS en trois étapes simples :</p>

          <div className={styles.step}>
            <span className={`${styles.badge} ${styles.orange}`}>1</span>
            <div>
              <strong className={styles.stepTitle}>
                Télécharge l’app et crée ton compte 🐭
              </strong>
              <p>
                En quelques minutes, rejoins la meute en t’inscrivant avec ton email et ton quartier préféré. Pas besoin de permis, juste l’envie de découvrir&nbsp;!
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <span className={`${styles.badge} ${styles.yellow}`}>2</span>
            <div>
              <strong className={styles.stepTitle}>
                Explore autour de toi 🧀
              </strong>
              <p>
                Les bons plans t’attendent partout sur la carte : restos, bars, lieux cachés… Clique sur un fromage, découvre une offre, réserve si besoin.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <span className={`${styles.badge} ${styles.purple}`}>3</span>
            <div>
              <strong className={styles.stepTitle}>
                Gagne, note, recommence 🔄
              </strong>
              <p>
                Laisse ton avis, débloque des badges, gagne des récompenses et deviens un vrai rat d’élite du bon plan&nbsp;! Tout se fait dans l’app, à ton rythme.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
