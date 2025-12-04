import styles from './FilterPanel.module.css';
import { Close } from '@mui/icons-material';

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
  console.log(activeFilterPanel);
  return (
    <aside className={`${styles.container} ${isFilterPanelOpen ? styles.open : ''}`}>
      <button onClick={onFilterPanelClose}>
        <Close />
      </button>
      {activeFilterPanel === 'gen-mix' ? (
        <h2>Gen-mix Filters</h2>
      ) : activeFilterPanel === 'hist-int-line' ? (
        <h2>Historical Intensity Filters Filters</h2>
      ) : (
        <h2>Filters</h2>
      )}
      {}
    </aside>
  );
}
