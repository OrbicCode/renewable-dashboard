import styles from './FilterPanel.module.css';
import { Close } from '@mui/icons-material';

interface FilterPanelProps {
  onFilterPanelClose: () => void;
  isFilterPanelOpen: boolean;
}

export default function FilterPanel({ onFilterPanelClose, isFilterPanelOpen }: FilterPanelProps) {
  return (
    <aside className={`${styles.container} ${isFilterPanelOpen ? styles.open : ''}`}>
      <h2>Filters</h2>
      <button onClick={onFilterPanelClose}>
        <Close />
      </button>
    </aside>
  );
}
