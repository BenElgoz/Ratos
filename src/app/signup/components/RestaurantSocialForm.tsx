'use client';

import { FormEvent } from 'react';
import styles from './RestaurantSocialForm.module.scss';

type SocialLinks = {
  instagram: string;
  tiktok: string;
  facebook: string;
  linkedin: string;
  x: string;
};

type Props = {
  data: SocialLinks;
  onChange: (data: SocialLinks) => void;
  onBack: () => void;
  onSubmit: () => void;
};

export default function RestaurantSocialForm({ data, onChange, onBack, onSubmit }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className={styles.inputs}>
  <input className={styles.input} name="instagram" placeholder="Instagram" value={data.instagram} onChange={handleChange} />
  <input className={styles.input} name="tiktok" placeholder="TikTok" value={data.tiktok} onChange={handleChange} />
  <input className={styles.input} name="facebook" placeholder="Facebook" value={data.facebook} onChange={handleChange} />
  <input className={styles.input} name="linkedin" placeholder="LinkedIn" value={data.linkedin} onChange={handleChange} />
  <input className={styles.input} name="x" placeholder="X (ex-Twitter)" value={data.x} onChange={handleChange} />
</div>
      <div className={styles.actions}>
        <button type="button" onClick={onBack}>Retour</button>
        <button type="submit">Valider</button>
      </div>
    </form>
  );
}
