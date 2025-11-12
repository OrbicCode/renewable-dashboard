import styles from './Header.module.css';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  return (
    <header className={styles.container}>
      <MenuIcon fontSize="large" />
      <nav></nav>
    </header>
  );
}
