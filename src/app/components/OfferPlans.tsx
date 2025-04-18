'use client';

import styles from './OfferPlans.module.scss';
import { useState } from 'react';
import Image from 'next/image';

type Benefit = {
  icon: string;
  label: string;
};

type Offer = {
  name: string;
  description: string;
  benefits: Benefit[];
};

type OfferKey = 'decouverte' | 'visibilite' | 'engagement';

const offers: Record<OfferKey, Offer> = {
  decouverte: {
    name: 'Découverte',
    description: `Testes RATOS gratuitement : 1 offre, présence sur la carte, premiers clients au rendez-vous. Zéro risque, juste pour voir si ça mord`,
    benefits: [
      { icon: '🧀', label: '1 offre active à la fois' },
      { icon: '🗺️', label: 'Présence basique sur la carte' },
      { icon: '🖊️', label: 'Création de fiche Google si besoin' },
      { icon: '💬', label: 'Accès aux avis laissés par les clients' },
      { icon: '👁️', label: 'Accès au nombre de vues de l’offre' }
    ]
  },
  visibilite: {
    name: 'Visibilité',
    description: `Attire plus de clients avec plusieurs offres actives, meilleure mise en avant sur la carte, et statistiques détaillées.`,
    benefits: [
      { icon: '📢', label: '5 offres actives en simultané' },
      { icon: '⭐', label: 'Mise en avant locale' },
      { icon: '📊', label: 'Statistiques avancées' },
      { icon: '🔧', label: 'Accompagnement Google Avis' },
      { icon: '📍', label: 'Participation aux campagnes RATOS' }
    ]
  },
  engagement: {
    name: 'Engagement',
    description: `Publie autant d’offres que tu veux, utilise les notifications ciblées et suis les retours détaillés de ta visibilité.`,
    benefits: [
      { icon: '💥', label: 'Offres illimitées + flash' },
      { icon: '📌', label: 'Mise en avant prioritaire' },
      { icon: '📬', label: 'Notifications ciblées' },
      { icon: '📈', label: 'Analyse complète' },
      { icon: '🎉', label: 'Accès aux événements exclusifs' }
    ]
  }
};

export default function OfferPlans() {
  const [active, setActive] = useState<OfferKey>('decouverte');
  const offer = offers[active];

  return (
    <section className={styles.section}>
      <h2>Boostez votre visibilité locale</h2>
      <p className={styles.subtitle}>
        Diffusez vos bons plans, attirez plus de clients, et récoltez des avis utiles
      </p>

      <div className={styles.tabs}>
        {(['decouverte', 'visibilite', 'engagement'] as OfferKey[]).map((key) => (
          <button
            key={key}
            className={`${styles.tab} ${active === key ? styles.active : ''}`}
            onClick={() => setActive(key)}
          >
            {offers[key].name}
          </button>
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.left}>
          <Image src="/images/mouse-offer.png" alt="Souris RATOS" width={160} height={160} />
          <h3>{offer.name}</h3>
          <p>{offer.description}</p>
        </div>

        <ul className={styles.right}>
          {offer.benefits.map((b, i) => (
            <li key={i}>
              <span className={styles.emoji}>{b.icon}</span>
              {b.label}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cta}>
        <a href="#" className={styles.contactBtn}>Nous contacter</a>
      </div>
    </section>
  );
}
