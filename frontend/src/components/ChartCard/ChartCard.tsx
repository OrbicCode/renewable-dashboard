import styles from './ChartCard.module.css';
import type { JSX } from 'react';

interface ChartCardProps {
  children: JSX.Element;
}

export default function ChartCard({ children }: ChartCardProps): JSX.Element {
  return <div className={styles.container}>{children}</div>;
}
