'use client';

import { useProtectedRoute } from '../utils/protectRoute';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './map.module.scss';

type Restaurant = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
};

export default function MapPage() {
  useProtectedRoute('CLIENT');

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants`);
        const data = await res.json();
        setRestaurants(data);
      } catch (err) {
        console.error('❌ Erreur en récupérant les restaurants :', err);
      }
    };

    fetchRestaurants();
  }, []);

  const icon = L.icon({
    iconUrl: '/images/mouse-icon.png',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={[48.8566, 2.3522]} zoom={13} scrollWheelZoom={true} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {restaurants.map((resto) => (
          <Marker
            key={resto.id}
            position={[resto.latitude, resto.longitude]}
            icon={icon}
          >
            <Popup>
              <strong>{resto.name}</strong>
              <br />
              {resto.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
