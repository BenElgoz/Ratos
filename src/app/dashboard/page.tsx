'use client';

import { useProtectedRoute } from '../utils/protectRoute';

export default function DashboardPage() {
  useProtectedRoute('RESTAURATEUR');

  return <h1>Bienvenue sur ton dashboard !</h1>;
}
