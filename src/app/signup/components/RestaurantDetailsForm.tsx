'use client';

import { FormEvent } from 'react';
import styles from './RestaurantDetailsForm.module.scss';

type OpeningHours = {
  monday: [string, string];
  tuesday: [string, string];
  wednesday: [string, string];
  thursday: [string, string];
  friday: [string, string];
  saturday: [string, string];
  sunday: [string, string];
};

type RestaurantDetails = {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  type: string;
  cuisine: string;
  openingHours: OpeningHours;
};

type Props = {
  data: RestaurantDetails;
  onChange: (newData: RestaurantDetails) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function RestaurantDetailsForm({ data, onChange, onNext, onBack }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Détails du restaurant</h2>
      <div className={styles.fields}>
      <input name="name" placeholder="Nom" value={data.name} onChange={handleChange} required />
      <input name="address" placeholder="Adresse" value={data.address} onChange={handleChange} required />
      <input name="city" placeholder="Ville" value={data.city} onChange={handleChange} required />
      <input name="zipCode" placeholder="Code Postal" value={data.zipCode} onChange={handleChange} required />
      <input name="type" placeholder="Type" value={data.type} onChange={handleChange} required />
      <input name="cuisine" placeholder="Cuisine" value={data.cuisine} onChange={handleChange} required />
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={onBack}>Retour</button>
        <button type="submit">Suivant</button>
      </div>
    </form>
  );
}
