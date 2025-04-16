import styles from './Button.module.scss';
import { ReactNode } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
  onClick?: () => void;
};

export default function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
