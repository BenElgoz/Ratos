'use client';

import { useState } from 'react';
import styles from './CheeseSidebar.module.scss';
import Image from 'next/image';
import Link from 'next/link';

type Offer = {
  id: string;
  title: string;
  description: string;
  restaurantName: string;
  distance: string;
  imageUrl: string;
};

type Props = {
  offers: Offer[];
  isOpen: boolean;
  onClose: () => void;
};

export default function CheeseSidebar({ offers, isOpen, onClose }: Props) {
  const [search, setSearch] = useState('');

  const filtered = offers.filter((o) =>
    o.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2>Offres à proximité</h2>
        <button onClick={onClose} className={styles.closeBtn}>✕</button>
      </div>

      <input
        type="text"
        placeholder="🔍 Rechercher autour de moi"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.filters}>
        <span className={styles.tag}>Tout</span>
        <span className={styles.tag}>Prix</span>
        <span className={styles.tag}>Distance</span>
        <span className={styles.tag}>Régime</span>
        <span className={styles.tag}>Avis</span>
        <span className={styles.tag}>Type d’établissement</span>
        <span className={styles.tag}>Ambiance</span>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.noOffers}>
          <Image src="/images/mouse-offer.png" alt="rat sniffing" width={80} height={80} />
          <p>Pas de fromage à gratter<br />par ici pour l’instant…</p>
        </div>
      ) : (
        <ul className={styles.results}>
          {filtered.map((offer) => (
            <li key={offer.id} className={styles.offerCard}>
              <Image src={offer.imageUrl} alt={offer.title} width={80} height={80} />
              <div className={styles.details}>
                <strong className={styles.priceTag}>{offer.title}</strong>
                <span className={styles.restaurant}>{offer.restaurantName} - {offer.distance}</span>
                <p className={styles.desc}>{offer.description}</p>
                <div className={styles.actions}>
                  <button className={styles.reserve}>Réserver maintenant</button>
                  <Link href={`/offer/${offer.id}`} className={styles.seeMore}>
                    Voir l’offre
                    </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
