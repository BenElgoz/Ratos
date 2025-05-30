'use client';

import { ChangeEvent, FormEvent } from 'react';
import styles from './RestaurantMediaForm.module.scss';

type Props = {
  mainImageUrl: string;
  onChange: (url: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function RestaurantMediaForm({ mainImageUrl, onChange, onNext, onBack }: Props) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Visuel principal</h2>
      <p>Ajoute une image qui représentera ton établissement</p>

      <input
  type="url"
  name="mainImageUrl"
  placeholder="URL de l'image principale"
  value={mainImageUrl}
  onChange={handleInputChange}
  required
  className={styles.urlInput}
/>

      <div className={styles.actions}>
        <button type="button" onClick={onBack}>
          Retour
        </button>
        <button type="submit">Suivant</button>
      </div>
    </form>
  );
}
