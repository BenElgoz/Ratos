'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProtectedRoute } from '../utils/protectRoute';
import styles from './Dashboard.module.scss';

type Promotion = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
};

type Restaurant = {
  name: string;
  mainImageUrl: string;
  promotions: Promotion[];
};

export default function DashboardPage() {
  useProtectedRoute('RESTAURATEUR');
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurant = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setRestaurant(data);
      } catch (err) {
        console.error('Erreur de chargement du restaurant :', err);
      }
    };

    fetchRestaurant();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (!restaurant) {
    return <div className={styles.loading}>Chargement du dashboard...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${restaurant.mainImageUrl})` }}
      >
        <h1>Bienvenue {restaurant.name} !</h1>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.createBtn}
          onClick={() => router.push('/dashboard/create-offer')}
        >
          ➕ Créer une offre
        </button>
      </div>

      <div className={styles.offers}>
        <h2>Offres en cours</h2>
        {restaurant.promotions.length === 0 ? (
          <p>Aucune offre pour le moment.</p>
        ) : (
          <ul>
            {restaurant.promotions.map((promo) => (
              <li key={promo.id}>
                <strong>{promo.title}</strong> – du{' '}
                {new Date(promo.startDate).toLocaleDateString()} au{' '}
                {new Date(promo.endDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
