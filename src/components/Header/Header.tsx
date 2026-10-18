import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useAuth } from '../../contexts/useAuth';
import toast from 'react-hot-toast';
import { useState } from 'react';
import AuthModal from '../AuthModal/AuthModal';
import type { AuthMode } from '../AuthModal/AuthModal';

import styles from './Header.module.css';
import logo from '../../assets/icons/logo.svg';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

const Header = () => {
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('You have logged out.');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Could not log out. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setAuthMode(null);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <a href="/" className={styles.logo}>
            <img src={logo} alt="Logo" className={styles.logoIcon} />
            <span>LearnLingo</span>
          </a>

          <nav className={styles.navigation}>
            <a href="/">Home</a>
            <a href="/teachers">Teachers</a>
          </nav>
        </div>
        
        <div className={styles.actions}>
          {user ? (
            <button
              type="button"
              className={styles.loginButton}
              onClick={handleLogout}
            >
              <FiLogOut className={styles.loginIcon} />
              Log out
            </button>
          ) : (
            <>
              <button
                type="button"
                className={styles.loginButton}
                onClick={() => setAuthMode('login')}
              >
                <FiLogIn className={styles.loginIcon} />
                Log in
              </button>

              <button
                type="button"
                className={styles.registrationButton}
                onClick={() => setAuthMode('register')}
              >
                Registration
              </button>
            </>
          )}
        </div>

      </header>

      {authMode !== null && (
        <AuthModal mode={authMode} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Header;
