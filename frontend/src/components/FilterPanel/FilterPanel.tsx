import styles from './FilterPanel.module.css';
import { Close } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HistoricalIntensityFilterPanel from '../filters/HistoricalIntensityFilterPanel/HistoricalIntensityFilterPanel';

interface FilterPanelProps {
  onFilterPanelClose: () => void;
  isFilterPanelOpen: boolean;
  activeFilterPanel: string;
}

export default function FilterPanel({
  onFilterPanelClose,
  isFilterPanelOpen,
  activeFilterPanel,
}: FilterPanelProps) {
  return (
    <aside className={`${styles.container} ${isFilterPanelOpen ? styles.open : ''}`}>
      <button className={styles.closeBtn} onClick={onFilterPanelClose}>
        <Close fontSize="large" />
      </button>
      <button className={styles.arrowBtn} onClick={onFilterPanelClose}>
        <ArrowForwardIcon fontSize="large" />
      </button>
      {activeFilterPanel === 'gen-mix' ? (
        <h2>Gen-mix Filters</h2>
      ) : activeFilterPanel === 'hist-int-line' ? (
        <>
          <h2>Historical Intensity Filters</h2>
          <HistoricalIntensityFilterPanel />
        </>
      ) : (
        <h2>Filters</h2>
      )}
      {}
    </aside>
  );
}
