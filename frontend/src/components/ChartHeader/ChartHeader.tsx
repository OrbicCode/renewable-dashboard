import styles from './ChartHeader.module.css';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';

interface ChartHeaderProps {
  title: string;
  filterPanelToggle: (isFilterPanelOpen: boolean) => void;
}

export default function ChartHeader({ title, filterPanelToggle }: ChartHeaderProps) {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);

  function handleFilterIconClick() {
    setIsFilterPanelOpen(!isFilterPanelOpen);
    filterPanelToggle(isFilterPanelOpen);
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div>
        <button onClick={handleFilterIconClick} className={styles.btn}>
          <TuneIcon fontSize="small" />
        </button>
        <button className={styles.btn}>
          <InfoOutlineIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}
