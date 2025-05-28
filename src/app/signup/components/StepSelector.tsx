'use client';

import styles from './StepSelector.module.scss';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  onSelect: (role: 'CLIENT' | 'RESTAURATEUR') => void;
  role: 'CLIENT' | 'RESTAURATEUR' | null;
};

export default function StepSelector({ onSelect, role }: Props) {
  const [selected, setSelected] = useState<'CLIENT' | 'RESTAURATEUR' | null>(role);

  const handleSelect = (newRole: 'CLIENT' | 'RESTAURATEUR') => {
    setSelected(newRole);
    onSelect(newRole);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vous êtes</h1>
      <div className={styles.cards}>
        <div
          className={`${styles.card} ${selected === 'CLIENT' ? styles.selectedPurple : ''}`}
          onClick={() => handleSelect('CLIENT')}
        >
          <Image
            src="/images/mouse-user.png"
            alt="Client"
            width={150}
            height={150}
          />
          <p className={styles.label}>Un utilisateur</p>
        </div>

        <div
          className={`${styles.card} ${selected === 'RESTAURATEUR' ? styles.selectedOrange : ''}`}
          onClick={() => handleSelect('RESTAURATEUR')}
        >
          <Image
            src="/images/mouse-resto.png"
            alt="Commerçant"
            width={150}
            height={150}
          />
          <p className={styles.label}>Un commerçant</p>
        </div>
      </div>

      <button
        className={styles.nextButton}
        onClick={() => selected && onSelect(selected)}
        disabled={!selected}
      >
        Suivant
      </button>
    </div>
  );
}
