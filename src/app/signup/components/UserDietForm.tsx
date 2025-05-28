'use client';

import { useState } from 'react';
import styles from './UserDietForm.module.scss';

type Props = {
  data: string[];
  onChange: (diets: string[]) => void;
  onNext: () => void;
  onBack: () => void;
};

const dietOptions = [
  'Végétarien',
  'Végan',
  'Sans gluten',
  'Sans lactose',
  'Halal',
  'Casher',
];

export default function UserDietForm({ data, onChange, onNext, onBack }: Props) {
  const [selected, setSelected] = useState<string[]>(data);

  const toggleDiet = (diet: string) => {
    const updated = selected.includes(diet)
      ? selected.filter((d) => d !== diet)
      : [...selected, diet];
    setSelected(updated);
    onChange(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Préférences alimentaires</h2>
      <p>Tu peux en sélectionner plusieurs</p>

      <div className={styles.dietGrid}>
        {dietOptions.map((diet) => (
          <button
            key={diet}
            type="button"
            className={`${styles.dietBtn} ${selected.includes(diet) ? styles.selected : ''}`}
            onClick={() => toggleDiet(diet)}
          >
            {diet}
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onBack}>
          Retour
        </button>
        <button type="submit">Suivant</button>
      </div>
    </form>
  );
}
