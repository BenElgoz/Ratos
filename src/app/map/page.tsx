'use client';

import dynamic from 'next/dynamic';
import { useProtectedRoute } from '../utils/protectRoute';

// Dynamically import the map to disable SSR
const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
});

export default function MapPage() {
  useProtectedRoute('CLIENT');
  return <MapClient />;
}
