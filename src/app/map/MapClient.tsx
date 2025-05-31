'use client';

import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import styles from './map.module.scss';

type Restaurant = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
};

const mouseIcon = L.icon({
  iconUrl: '/images/mouse-icon.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const userIcon = L.icon({
  iconUrl: '/images/mouse-user.png',
  iconSize: [72, 72],
  iconAnchor: [36, 72],
  popupAnchor: [0, -72],
});

function FlyToMarker({ position }: { position: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 17, { duration: 0.8 });
    }
  }, [position, map]);
  return null;
}

export default function MapClient() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [flyTarget, setFlyTarget] = useState<LatLngExpression | null>(null);

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [
            pos.coords.latitude,
            pos.coords.longitude,
          ];
          setPosition(coords);
          setFlyTarget(coords);
        },
        () => {
          setError('Localisation désactivée. Entrez une adresse ci-dessous.');
        }
      );
    } else {
      setError('Géolocalisation non disponible.');
    }
  }, []);

  const handleAddressSearch = async () => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const results = await res.json();
      if (results.length > 0) {
        const { lat, lon } = results[0];
        const coords: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setPosition(coords);
        setFlyTarget(coords);
        setError(null);
      } else {
        setError('Adresse non trouvée.');
      }
    } catch (err) {
      console.error('Erreur de géocodage :', err);
      setError('Erreur de géocodage.');
    }
  };

  const initialCenter: [number, number] = position || [48.8566, 2.3522];

  return (
    <div className={styles.mapContainer}>
      {error && (
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Entrez une adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button onClick={handleAddressSearch}>Rechercher</button>
          <p className={styles.error}>{error}</p>
        </div>
      )}

      <MapContainer
        center={initialCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100%' }}
      >
        {flyTarget && <FlyToMarker position={flyTarget} />}

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* Marqueur position actuelle */}
        {position && (
          <Marker
            position={position}
            icon={userIcon}
            eventHandlers={{
              click: () => setFlyTarget(position),
            }}
          >
            <Popup>📍 Vous êtes ici</Popup>
          </Marker>
        )}

        {/* Marqueurs restaurants */}
        {restaurants.map((resto) => {
          const coords: [number, number] = [resto.latitude, resto.longitude];
          return (
            <Marker
              key={resto.id}
              position={coords}
              icon={mouseIcon}
              eventHandlers={{
                click: () => setFlyTarget(coords),
              }}
            >
              <Popup>
                <strong>{resto.name}</strong>
                <br />
                {resto.address}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
