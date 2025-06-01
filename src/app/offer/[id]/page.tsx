'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Offer = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  restaurantName: string;
  restaurantAddress: string;
};

export default function OfferPage() {
  const { id } = useParams();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers/${id}`);
        if (!res.ok) throw new Error('Offre introuvable');
        const data = await res.json();
        setOffer(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Erreur lors du chargement');
      }
    };

    if (id) {
      fetchOffer();
    }
  }, [id]);

  if (error) {
    return <div>❌ {error}</div>;
  }

  if (!offer) {
    return <div>Chargement de l’offre…</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{offer.title}</h1>
      <img src={offer.imageUrl} alt={offer.title} style={{ width: '100%', maxWidth: 600, borderRadius: 8 }} />
      <p><strong>Prix :</strong> {offer.price} €</p>
      <p><strong>Description :</strong> {offer.description}</p>
      <p><strong>Restaurant :</strong> {offer.restaurantName}</p>
      <p><strong>Adresse :</strong> {offer.restaurantAddress}</p>
    </div>
  );
}
