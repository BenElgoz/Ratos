'use client';

import OfferForm from './OfferForm';
import { useProtectedRoute } from '@/app/utils/protectRoute';

export default function OffersPage() {
  useProtectedRoute('RESTAURATEUR');

  return (
    <div>
      <OfferForm />
    </div>
  );
}
