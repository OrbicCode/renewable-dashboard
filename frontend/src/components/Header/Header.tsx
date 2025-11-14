import { useState } from 'react';
import styles from './Header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Close } from '@mui/icons-material';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className={styles.container}>
      <button onClick={handleMenuToggle} className={styles.headerBtn}>
        <MenuIcon fontSize="large" />
      </button>
      <button className={styles.headerBtn}>
        <DarkModeIcon fontSize="large" />
      </button>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <button onClick={handleMenuToggle} className={styles.closeBtn}>
          <Close fontSize="large" />
        </button>
        <ul>
          <li>Live / Historical</li>
          <li>Dashboard</li>
          <li>About</li>
          <li>Data Sources</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}
