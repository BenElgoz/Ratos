import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/logo-ratos-orange.svg" alt="Logo Ratos" width={120} height={40} />
        </Link>
        {/* Nav à ajouter plus tard */}
      </div>
    </header>
  );
}
