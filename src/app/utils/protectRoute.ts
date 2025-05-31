'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'CLIENT' | 'RESTAURATEUR';

export function useProtectedRoute(expectedRole: Role) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role') as Role | null;

    if (!token || role !== expectedRole) {
      router.push('/login');
    }
  }, [expectedRole, router]);
}
