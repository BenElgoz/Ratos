'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './EditOffer.module.scss';
import { useProtectedRoute } from '@/app/utils/protectRoute';

export default function EditOfferPage() {
  useProtectedRoute('RESTAURATEUR');

  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState<any>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [offerType, setOfferType] = useState('');
  const [schedule, setSchedule] = useState('');

  useEffect(() => {
    const fetchOffer = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setOffer(data);
      setTitle(data.title);
      setDescription(data.description);
      setStartDate(data.startDate.split('T')[0]);
      setEndDate(data.endDate.split('T')[0]);
      setImageUrl(data.imageUrl || '');
      setOfferType(data.offerType || '');
      setSchedule(data.schedule || '');
      setLoading(false);
    };

    fetchOffer();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      title,
      description,
      startDate,
      endDate,
      imageUrl,
      offerType,
      schedule,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert('Offre mise à jour avec succès ✅');
      router.push('/dashboard');
    } else {
      const errorText = await res.text();
      console.error(errorText);
      alert('Erreur lors de la mise à jour ❌');
    }
  };

  if (loading) return <p className={styles.loading}>Chargement de l’offre...</p>;

  return (
    <form className={styles.form} onSubmit={handleUpdate}>
      <h1>📝 Modifier l’offre</h1>

      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre*" />
      <input value={offerType} onChange={e => setOfferType(e.target.value)} placeholder="Type d’offre*" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description*" />
      <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="URL de l’image*" />
      
      <div className={styles.dates}>
        <div>
          <label>Date de début</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div>
          <label>Date de fin</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
      </div>

      <input value={schedule} onChange={e => setSchedule(e.target.value)} placeholder="Créneaux horaires (optionnel)" />

      <button type="submit" className={styles.submitBtn}>💾 Enregistrer les modifications</button>
    </form>
  );
}
