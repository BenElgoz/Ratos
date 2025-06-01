'use client';

import Image from 'next/image';
import styles from './MapNavigation.module.scss';
import { useState } from 'react';

type Props = {
  active: 'search' | 'cheese' | 'map' | 'user' | null;
  onToggleSearch: () => void;
  onToggleCheese: () => void;
};

export default function MapNavigation({
  active,
  onToggleSearch,
  onToggleCheese,
}: Props) {
  const buttons = [
    { key: 'search', icon: '/images/search-icon.svg', onClick: onToggleSearch },
    { key: 'map', icon: '/images/map-icon.svg', onClick: () => {} },
    { key: 'cheese', icon: '/images/cheese-icon.svg', onClick: onToggleCheese },
    { key: 'user', icon: '/images/user-icon.svg', onClick: () => {} },
  ];

  return (
    <nav className={styles.nav}>
      {buttons.map(({ key, icon, onClick }) => (
        <button
          key={key}
          onClick={onClick}
          className={`${styles.button} ${active === key ? styles.active : ''}`}
        >
          <Image src={icon} alt={`${key} icon`} width={24} height={24} />
        </button>
      ))}
    </nav>
  );
}
