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
}

export default function FigureDisplay({
  title,
  figureData,
  isLoading,
}: FigureDisplayProps): JSX.Element {
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
