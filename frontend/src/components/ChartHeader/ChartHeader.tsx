import styles from './ChartHeader.module.css';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import TuneIcon from '@mui/icons-material/Tune';

interface ChartHeaderProps {
  title: string;
  onFilterToggle: () => void;
}

export default function ChartHeader({ title, onFilterToggle }: ChartHeaderProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div>
        <button onClick={onFilterToggle} className={styles.btn}>
          <TuneIcon fontSize="small" />
        </button>
        <button className={styles.btn}>
          <InfoOutlineIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}
