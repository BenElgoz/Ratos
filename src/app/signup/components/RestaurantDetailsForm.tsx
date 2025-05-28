'use client';

import { ChangeEvent, FormEvent } from 'react';
import styles from './RestaurantDetailsForm.module.scss';

type RestaurantDetails = {
  name: string;
  description: string;
  address: string;
  latitude: string;
  longitude: string;
  openingHours: string;
  googleMapsUrl: string;
};

type Props = {
  data: RestaurantDetails;
  onChange: (newData: RestaurantDetails) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function RestaurantDetailsForm({ data, onChange, onNext, onBack }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Informations sur ton établissement</h2>

      <div className={styles.fields}>
        <input
          type="text"
          name="name"
          placeholder="Nom du restaurant"
          value={data.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Adresse complète"
          value={data.address}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={data.latitude}
          onChange={handleChange}
        />

        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={data.longitude}
          onChange={handleChange}
        />

        <input
          type="text"
          name="openingHours"
          placeholder="Horaires d'ouverture"
          value={data.openingHours}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="googleMapsUrl"
          placeholder="Lien Google Maps"
          value={data.googleMapsUrl}
          onChange={handleChange}
        />
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
