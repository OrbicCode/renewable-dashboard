import styles from './ChartHeader.module.css';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import TuneIcon from '@mui/icons-material/Tune';

export default function ChartHeader() {
  return (
    <div className={styles.container}>
      <h2 style={{ margin: '0' }}>Title</h2>
      <div>
        <button>
          <TuneIcon fontSize="small" />
        </button>
        <button>
          <InfoOutlineIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}
