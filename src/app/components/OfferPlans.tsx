'use client';

import styles from './OfferPlans.module.scss';
import { useState } from 'react';
import Image from 'next/image';

const offers = {
  decouverte: {
    title: 'Offre Freemium – “Découverte”',
    price: '0€/mois',
    color: 'green',
    benefits: [
      '1 offre active à la fois',
      'Présence basique sur la carte',
      'Création de fiche Google si besoin',
      'Accès aux avis laissés par les clients',
      'Statistiques simples (nombre de vues)',
    ],
    goal: `Tester RATZ sans engagement. Publie une première offre, attire tes premiers clients, et découvre si la plateforme est faite pour toi.`
  },
  visibilite: {
    title: 'Offre Standard – “Visibilité”',
    price: '29€/mois',
    color: 'blue',
    benefits: [
      'Jusqu’à 5 offres actives',
      'Meilleure visibilité sur la carte RATZ',
      'Statistiques plus poussées (clics, visites, interactions)',
      'Accompagnement pour les avis Google',
      'Participation aux campagnes locales de RATZ',
    ],
    goal: `Gagner en visibilité locale et remplir pendant les périodes plus calmes. Idéal pour booster ta fréquentation.`
  },
  engagement: {
    title: 'Offre Premium – “Engagement”',
    price: '59€/mois',
    color: 'red',
    benefits: [
      'Offres illimitées + offres flash',
      'Mise en avant prioritaire sur la carte',
      'Notifications ciblées',
      'Analyse complète de l’impact',
      'Accès VIP aux événements et opérations co-brandées',
    ],
    goal: `Aller à fond dans la fidélisation et l’impact. Tu profites d’une visibilité maximale, de stats précises et d’un vrai lien client.`
  }
};

type OfferKey = keyof typeof offers;

export default function OfferPlans() {
  const [activeOffer, setActiveOffer] = useState<OfferKey>('decouverte');

  const offer = offers[activeOffer];

  return (
    <section className={styles.section}>
      <h2>Boostez votre visibilité locale</h2>
      <p className={styles.subtitle}>
        Diffusez vos bons plans, attirez plus de clients, et récoltez des avis utiles
      </p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeOffer === 'decouverte' ? styles.active : ''}`}
          onClick={() => setActiveOffer('decouverte')}
        >
          Découverte
        </button>
        <button
          className={`${styles.tab} ${activeOffer === 'visibilite' ? styles.active : ''}`}
          onClick={() => setActiveOffer('visibilite')}
        >
          Visibilité
        </button>
        <button
          className={`${styles.tab} ${activeOffer === 'engagement' ? styles.active : ''}`}
          onClick={() => setActiveOffer('engagement')}
        >
          Engagement
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <Image
            src="/images/mouse-offer.png"
            alt="Souris mascotte"
            width={80}
            height={80}
          />
          <div>
            <h3 className={styles.offerTitle}>
              {offer.title}
            </h3>
            <p className={`${styles.price} ${styles[offer.color]}`}>
              {offer.price}
            </p>
          </div>
        </div>

        <ul className={styles.list}>
          {offer.benefits.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <p className={styles.goal}><strong>Objectif&nbsp;:</strong> {offer.goal}</p>
      </div>
    </section>
  );
}
