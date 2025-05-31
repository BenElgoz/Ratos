'use client';

import { useRouter } from 'next/navigation';

type Props = {
  redirectTo?: string;
};

export default function LogoutButton({ redirectTo = '/' }: Props) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push(redirectTo);
  };

  return (
    <button onClick={handleLogout}>
      Se déconnecter
    </button>
  );
}
