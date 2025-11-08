import styles from './FigureDisplay.module.css';
import type { JSX } from 'react';

type FigureData = {
  figureNumber: number | null;
  figureText: string | null;
};

interface FigureDisplayProps {
  title: string;
  figureData?: FigureData | null;
  isLoading: boolean;
  fetchError: string;
}

export default function FigureDisplay({
  title,
  figureData,
  isLoading,
  fetchError,
}: FigureDisplayProps): JSX.Element {
  if (fetchError) {
    return <div>{fetchError}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.figure}>
        {figureData?.figureNumber} {`(${figureData?.figureText})`}
      </p>
    </div>
  );
}
