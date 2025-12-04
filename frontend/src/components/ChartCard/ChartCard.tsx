import ChartHeader from '../ChartHeader/ChartHeader';
import styles from './ChartCard.module.css';
import type { JSX } from 'react';

interface ChartCardProps {
  isLoading: boolean;
  children: JSX.Element;
  title: string;
  filterPanelToggle: (chartId: string) => void;
  chartType: string | '';
  chartId: string;
}

export default function ChartCard({
  isLoading,
  children,
  title,
  filterPanelToggle,
  chartType,
  chartId,
}: ChartCardProps): JSX.Element {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className={`${styles.container} ${chartType === 'line' ? styles.maxLarge : styles.maxSmall}`}
    >
      <ChartHeader title={title} onFilterToggle={() => filterPanelToggle(chartId)} />
      {children}
    </div>
  );
}
