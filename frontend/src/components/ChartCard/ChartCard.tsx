import styles from './ChartCard.module.css';
import type { JSX } from 'react';

interface ChartCardProps {
  isLoading: boolean;
  children: JSX.Element;
}

export default function ChartCard({ isLoading, children }: ChartCardProps): JSX.Element {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div className={styles.container}>{children}</div>;
}
