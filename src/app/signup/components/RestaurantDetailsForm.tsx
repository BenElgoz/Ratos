'use client';

import { FormEvent } from 'react';
import styles from './RestaurantDetailsForm.module.scss';

type OpeningHours = {
  [key in Day]: [string, string];
};

type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

type RestaurantDetails = {
  name: string;
  description: string;
  address: string;
  city: string;
  zipCode: string;
  // type: string;
  // cuisine: string;
  latitude: string;
  longitude: string;
  googleMapsUrl: string;
  openingHours: OpeningHours;
};

type Props = {
  data: RestaurantDetails;
  onChange: (newData: RestaurantDetails) => void;
  onNext: () => void;
  onBack: () => void;
};

const days: Day[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export default function RestaurantDetailsForm({ data, onChange, onNext, onBack }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleHourChange = (day: Day, index: number, value: string) => {
    const updated = {
      ...data.openingHours,
      [day]: [...data.openingHours[day]] as [string, string],
    };
    updated[day][index] = value;
    onChange({ ...data, openingHours: updated });
  };

  const toggleClosed = (day: Day) => {
    const isClosed = data.openingHours[day][0] === '' && data.openingHours[day][1] === '';
    const updated = {
      ...data.openingHours,
      [day]: isClosed ? ['11:00', '23:00'] : ['', ''],
    };
    onChange({ ...data, openingHours: updated });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Détails du restaurant</h2>

      <div className={styles.fields}>
        <input name="name" placeholder="Nom du commerce*" value={data.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description*" value={data.description} onChange={handleChange} required />
        <input name="address" placeholder="Adresse*" value={data.address} onChange={handleChange} required />
        <input name="city" placeholder="Ville*" value={data.city} onChange={handleChange} required />
        <input name="zipCode" placeholder="Code postal*" value={data.zipCode} onChange={handleChange} required />
        {/* <input name="type" placeholder="Type d’établissement*" value={data.type} onChange={handleChange} required />
        <input name="cuisine" placeholder="Type de cuisine*" value={data.cuisine} onChange={handleChange} required /> */}
        <input name="latitude" placeholder="Latitude*" value={data.latitude} onChange={handleChange} required />
        <input name="longitude" placeholder="Longitude*" value={data.longitude} onChange={handleChange} required />
        <input name="googleMapsUrl" placeholder="Lien Google Maps*" value={data.googleMapsUrl} onChange={handleChange} required />
      </div>

      <h3>Horaires d’ouverture*</h3>
      <div className={styles.hoursGrid}>
        {days.map((day) => {
          const isClosed = data.openingHours[day][0] === '' && data.openingHours[day][1] === '';
          return (
            <div key={day} className={styles.dayRow}>
              <label className={styles.dayLabel}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </label>
              <div className={styles.timeInputs}>
                <input
                  type="time"
                  value={data.openingHours[day][0]}
                  onChange={(e) => handleHourChange(day, 0, e.target.value)}
                  disabled={isClosed}
                  required={!isClosed}
                />
                <span>—</span>
                <input
                  type="time"
                  value={data.openingHours[day][1]}
                  onChange={(e) => handleHourChange(day, 1, e.target.value)}
                  disabled={isClosed}
                  required={!isClosed}
                />
              </div>
              <label className={styles.closedToggle}>
                <input
                  type="checkbox"
                  checked={isClosed}
                  onChange={() => toggleClosed(day)}
                />
                Fermé
              </label>
            </div>
          );
        })}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onBack}>Retour</button>
        <button type="submit">Suivant</button>
      </div>
    </form>
  );
}
