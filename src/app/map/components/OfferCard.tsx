'use client';

import styles from './OfferCard.module.scss';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  restaurantName: string;
  restaurantCuisine?: string;
  distance?: string; // ex: "600m"
};

export default function OfferCard({
  id,
  title,
  description,
  price,
  imageUrl,
  restaurantName,
  restaurantCuisine,
  distance,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt={title} className={styles.image} />
        <div className={styles.favorite}>🤍</div>
      </div>

      <div className={styles.content}>
        <div className={styles.tag}>Plat du jour à {price}€</div>

        <h3 className={styles.name}>{restaurantName}</h3>
        <p className={styles.meta}>
          {restaurantCuisine || 'Cuisine variée'} {distance && ` - ${distance}`}
        </p>

        <p className={styles.desc}>{description}</p>

        <div className={styles.actions}>
          <button className={styles.reserve}>Réserver maintenant</button>
          <Link href={`/offer/${id}`} className={styles.view}>
            Voir l’offre
          </Link>
        </div>
      </div>
    </div>
  );
}
