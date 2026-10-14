import styles from './Header.module.css';
import logo from '../../assets/icons/logo.svg';
import { FiLogIn } from "react-icons/fi";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <a href='/' className={styles.logo}>
          <img src={logo} alt='Logo' className={styles.logoIcon} />
          <span>LearnLingo</span>
        </a>
        
        <nav className={styles.navigation}>
          <a href="/">Home</a>
          <a href="/teachers">Teachers</a>
          </nav>
        </div>

      <div className={styles.actions}>
        <button type='button' className={styles.loginButton}>
          <FiLogIn className={styles.loginIcon} />
          Log in
        </button>

        <button type='button' className={styles.registrationButton}>
          Registration
        </button>
      </div>
    </header>
  );
};

export default Header;