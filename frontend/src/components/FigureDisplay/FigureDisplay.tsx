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
  dataType: string;
}

export default function FigureDisplay({
  title,
  figureData,
  isLoading,
  fetchError,
  dataType,
}: FigureDisplayProps): JSX.Element {
  if (fetchError) {
    return <div>{fetchError}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.figureNumber}>
          {figureData?.figureNumber}
          <span
            className={dataType === 'intensity' ? styles.figureTextIntensity : styles.figureText}
          >
            {' '}
            {dataType === 'genmix' ? figureData?.figureText : `(${figureData?.figureText})`}
          </span>
        </p>
      </div>
    </div>
  );
}
