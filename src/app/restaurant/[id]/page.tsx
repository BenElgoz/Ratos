'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './RestaurantPage.module.scss';

type Promotion = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

type Restaurant = {
  name: string;
  mainImageUrl: string;
  promotions: Promotion[];
};

export default function RestaurantPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${id}`);
        if (!res.ok) throw new Error('Restaurant introuvable');
        const data = await res.json();
        setRestaurant(data);
      } catch (err) {
        console.error('Erreur chargement restaurant :', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRestaurant();
  }, [id]);

  if (loading) {
    return <div className={styles.page}>Chargement...</div>;
  }

  if (!restaurant) {
    return <div className={styles.page}>Restaurant introuvable.</div>;
  }

  return (
    <div className={styles.page}>
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${restaurant.mainImageUrl})` }}
      />

      <h1 className={styles.title}>{restaurant.name}</h1>

      <div className={styles.offers}>
        <h2>Offres disponibles</h2>

        {restaurant.promotions.length === 0 ? (
          <p>Aucune offre pour le moment.</p>
        ) : (
          <div className={styles.list}>
            {restaurant.promotions.map((offer) => (
              <div key={offer.id} className={styles.card}>
                <img src={offer.imageUrl} alt={offer.title} />
                <div className={styles.content}>
                  <h3>{offer.title}</h3>
                  <p>{offer.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
