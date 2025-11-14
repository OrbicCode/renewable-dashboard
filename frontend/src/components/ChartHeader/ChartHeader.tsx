import styles from './ChartHeader.module.css';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

export default function ChartHeader() {
  return (
    <div className={styles.container}>
      <h2 style={{ margin: '0' }}>Title</h2>
      <div>
        <button>Filters</button>
        <button>
          <InfoOutlineIcon />
        </button>
      </div>
    </div>
  );
}
