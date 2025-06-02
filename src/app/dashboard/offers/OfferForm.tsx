'use client';

import { useState } from 'react';
import styles from './OfferForm.module.scss';

export default function OfferForm() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [schedule, setSchedule] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !startDate || !endDate || !type || !imageUrl) {
      alert('Tous les champs obligatoires doivent être remplis.');
      return;
    }

    const payload = {
      title,
      description,
      startDate,
      endDate,
      offerType: type,
      imageUrl,
      schedule: schedule || undefined,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('↪️ Réponse serveur :', errorText);
        throw new Error('Erreur serveur');
      }

      alert('Offre créée avec succès ! 🎉');

      // Réinitialiser le formulaire
      setTitle('');
      setType('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setSchedule('');
      setImageUrl('');
    } catch (err) {
      console.error('❌ Erreur création offre :', err);
      alert('Erreur lors de la création de l’offre.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>📣 Création d’une offre</h1>

      <div className={styles.left}>
        <input
          type="text"
          placeholder="URL de l’image*"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <input
          type="text"
          placeholder="Titre de l’offre*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Type d’offre* (ex : Menu du jour, Happy hour...)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>

      <div className={styles.right}>
        <textarea
          placeholder="Description de l’offre*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className={styles.dates}>
          <div>
            <label>Date de début*</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label>Date de fin*</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        <div className={styles.schedule}>
          <label>Créneaux horaires (optionnel)</label>
          <input
            type="text"
            placeholder="ex : 12h-14h du lundi au vendredi"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Mettre l’offre en ligne
        </button>
      </div>
    </form>
  );
}
