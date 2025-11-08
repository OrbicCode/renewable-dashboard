import styles from './FigureDisplay.module.css';
import type { JSX } from 'react';
import type { Intensity } from '@shared/types';

interface FigureDisplayProps {
  title: string;
  figure: Intensity | null;
}

export default function FigureDisplay({ title, figure }: FigureDisplayProps): JSX.Element {
  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.figure}>
        {figure?.actual}
        {`(${figure?.index})`}
      </p>
    </div>
  );
}
