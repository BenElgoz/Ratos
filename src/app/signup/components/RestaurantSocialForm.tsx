'use client';

import { ChangeEvent, FormEvent } from 'react';
import styles from './RestaurantSocialForm.module.scss';

type SocialLinks = {
  instagram?: string;
  facebook?: string;
  website?: string;
};

type Props = {
  data: SocialLinks;
  onChange: (data: SocialLinks) => void;
  onSubmit: () => void;
  onBack: () => void;
};

export default function RestaurantSocialForm({ data, onChange, onSubmit, onBack }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Réseaux sociaux</h2>
      <p>(facultatif)</p>

      <input
        type="url"
        name="instagram"
        placeholder="Lien Instagram"
        value={data.instagram || ''}
        onChange={handleChange}
      />

      <input
        type="url"
        name="facebook"
        placeholder="Lien Facebook"
        value={data.facebook || ''}
        onChange={handleChange}
      />

      <input
        type="url"
        name="website"
        placeholder="Site web"
        value={data.website || ''}
        onChange={handleChange}
      />

      <div className={styles.actions}>
        <button type="button" onClick={onBack}>
          Retour
        </button>
        <button type="submit">Terminer</button>
      </div>
    </form>
  );
}
