'use client';

import { ChangeEvent, FormEvent } from 'react';
import styles from './RestaurateurInfoForm.module.scss';

type UserData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

type Props = {
  data: UserData;
  phone: string;
  onChange: (newData: { userData: UserData; phone: string }) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function RestaurateurInfoForm({
  data,
  phone,
  onChange,
  onNext,
  onBack,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'phone') {
      onChange({ userData: data, phone: value });
    } else {
      onChange({
        userData: {
          ...data,
          [name]: type === 'checkbox' ? checked : value,
        },
        phone,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!data.termsAccepted) {
      alert('Tu dois accepter les CGU.');
      return;
    }
    onNext();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Créer ton compte commerçant</h2>

      <div className={styles.fields}>
        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          value={data.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          value={data.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={data.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Téléphone professionnel"
          value={phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={data.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirme ton mot de passe"
          value={data.confirmPassword}
          onChange={handleChange}
          required
        />
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="termsAccepted"
            checked={data.termsAccepted}
            onChange={handleChange}
          />
          J’accepte les conditions générales d’utilisation.
        </label>
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
