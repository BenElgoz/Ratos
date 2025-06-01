'use client';

import { useEffect, useState } from 'react';
import styles from './SearchSidebar.module.scss';
import { Restaurant } from '@/types/restaurant';

type Props = {
  restaurants: Restaurant[];
  onSelect: (restaurant: Restaurant) => void;
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchSidebar({ restaurants, onSelect, isOpen, onClose }: Props) {
  const [search, setSearch] = useState('');

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ''}`}>
      <div className={styles.header}>
        <h2>Recherche</h2>
        <button onClick={onClose} className={styles.closeBtn}>✕</button>
      </div>
      <input
        type="text"
        placeholder="🔍 Rechercher autour de moi"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />
      <ul className={styles.results}>
        {filtered.map((restaurant) => (
          <li
            key={restaurant.id}
            className={styles.resultItem}
            onClick={() => onSelect(restaurant)}
          >
            🍽 {restaurant.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
