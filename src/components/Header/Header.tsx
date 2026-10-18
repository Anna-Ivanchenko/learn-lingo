
import { signOut } from 'firebase/auth';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import Modal from '../Modal/Modal';

import { auth } from '../../services/firebase';
import { useAuth } from '../../contexts/useAuth';
import AuthModal from '../AuthModal/AuthModal';
import type { AuthMode } from '../AuthModal/AuthModal';

import styles from './Header.module.css';
import logo from '../../assets/icons/logo.svg';

const Header = () => {
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { user } = useAuth();
  const { pathname } = useLocation();

  const isTeachersPage = pathname === '/teachers';
  const isFavoritesPage = pathname === '/favorites';

  const displayName = user?.displayName || user?.email;

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
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Logo" className={styles.logoIcon} />
            <span>LearnLingo</span>
          </Link>

          <nav className={styles.navigation}>
            <Link to="/">Home</Link>

            {isFavoritesPage && (
              <Link to="/teachers">Teachers</Link>
            )}

            {isTeachersPage && user && (
              <Link to="/favorites">Favorites</Link>
            )}

            {!isTeachersPage && !isFavoritesPage && (
              <>
                <Link to="/teachers">Teachers</Link>

                {user && <Link to="/favorites">Favorites</Link>}
              </>
            )}
          </nav>
        </div>

        <div className={styles.actions}>
          {user ? (
            <>
              <span className={styles.userName} title={displayName ?? ''}>
                {displayName}
              </span>

              <button
                type="button"
                className={styles.loginButton}
                onClick={() => setIsLogoutModalOpen(true)}
              >
                <FiLogOut className={styles.loginIcon} />
                Log out
              </button>
            </>
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

      {isLogoutModalOpen && (
        <Modal
          onClose={() => setIsLogoutModalOpen(false)}
          labelledBy="logout-modal-title"
        >
          <div className={styles.logoutModal}>
            <h2 id="logout-modal-title">Log out</h2>

            <p>Are you sure you want to log out?</p>

            <div className={styles.logoutActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className={styles.confirmLogoutButton}
                onClick={async () => {
                  await handleLogout();
                  setIsLogoutModalOpen(false);
                }}
              >
                Yes, log out
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
