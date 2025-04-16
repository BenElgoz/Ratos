import styles from './FeaturesSteps.module.scss';
import Image from 'next/image';
import Button from './Button';

export default function FeaturesSteps() {
  return (
    <section className={styles.features}>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            src="/images/gratter-quartier.jpg"
            alt="Groupe de jeunes au resto"
            width={400}
            height={500}
            style={{ borderRadius: '12px', width: '100%', height: 'auto' }}
          />
        </div>

        <div className={styles.text}>
          <h2>Prêt à gratter le quartier&nbsp;?</h2>
          <p className={styles.subtitle}>RATOS en trois étapes simples&nbsp;:</p>
          <ol className={styles.steps}>
            <li>
              <strong>Télécharge l’app et crée ton compte 🐭</strong><br />
              En quelques minutes, rejoins la meute en t’inscrivant avec ton email et ton quartier préféré. Pas besoin de permis, juste l’envie de découvrir&nbsp;!
            </li>
            <li>
              <strong>Explore autour de toi 🧀</strong><br />
              Les bons plans t’attendent partout sur la carte : restos, bars, lieux cachés… Clique sur un fromage, découvre une offre, réserve si besoin.
            </li>
            <li>
              <strong>Gagne, note, recommence 🔄</strong><br />
              Laisse ton avis, débloque des badges, gagne des récompenses et deviens un vrai rat d’élite du bon plan&nbsp;!
            </li>
          </ol>

          <Button variant="primary">Je veux tester l’app</Button>
        </div>
      </div>
    </section>
  );
}
