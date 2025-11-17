import ChartHeader from '../ChartHeader/ChartHeader';
import styles from './ChartCard.module.css';
import type { JSX } from 'react';

interface ChartCardProps {
  isLoading: boolean;
  children: JSX.Element;
  title: string;
  filterPanelToggle: () => void;
}

export default function ChartCard({
  isLoading,
  children,
  title,
  filterPanelToggle,
}: ChartCardProps): JSX.Element {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <ChartHeader title={title} filterPanelToggle={filterPanelToggle} />
      {children}
    </div>
  );
}
