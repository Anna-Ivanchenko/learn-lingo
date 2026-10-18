
import { signOut } from 'firebase/auth';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiLogIn, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import Modal from '../Modal/Modal';

import { auth } from '../../services/firebase';
import { useAuth } from '../../contexts/useAuth';
import AuthModal from '../AuthModal/AuthModal';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import type { AuthMode } from '../AuthModal/AuthModal';

import styles from './Header.module.css';
import logo from '../../assets/icons/logo.svg';

const Header = () => {
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const closeMenu = () => setIsMenuOpen(false);

  const openAuthFromMenu = (mode: AuthMode) => {
    setAuthMode(mode);
    closeMenu();
  };

  const openLogoutFromMenu = () => {
    setIsLogoutModalOpen(true);
    closeMenu();
  };

  // Поки відкрите мобільне меню: блокуємо скрол сторінки, закриваємо по Escape
  // і автоматично, якщо вікно розтягнули до десктопної ширини.
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const desktopQuery = window.matchMedia('(min-width: 1440px)');
    const handleResize = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    desktopQuery.addEventListener('change', handleResize);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      desktopQuery.removeEventListener('change', handleResize);
    };
  }, [isMenuOpen]);

  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.mobileLink} ${styles.mobileLinkActive}` : styles.mobileLink;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
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
          <ThemeSwitcher />

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

        <button
          type="button"
          className={styles.burgerButton}
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div
          id="mobile-menu"
          className={`${styles.mobileMenu} ${
            isMenuOpen ? styles.mobileMenuOpen : ''
          }`}
        >
          <nav aria-label="Mobile navigation">
            <ul className={styles.mobileList}>
              {user && (
                <li className={styles.mobileUser} title={displayName ?? ''}>
                  {displayName}
                </li>
              )}
              <li>
                <NavLink to="/" end className={getMobileLinkClass} onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/teachers" className={getMobileLinkClass} onClick={closeMenu}>
                  Teachers
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/favorites" className={getMobileLinkClass} onClick={closeMenu}>
                    Favorites
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>

          <div className={styles.mobileActions}>
            {user ? (
              <button
                type="button"
                className={styles.mobileSecondaryButton}
                onClick={openLogoutFromMenu}
              >
                <FiLogOut className={styles.loginIcon} />
                Log out
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.mobileSecondaryButton}
                  onClick={() => openAuthFromMenu('login')}
                >
                  <FiLogIn className={styles.loginIcon} />
                  Log in
                </button>
                <button
                  type="button"
                  className={styles.mobilePrimaryButton}
                  onClick={() => openAuthFromMenu('register')}
                >
                  Registration
                </button>
              </>
            )}
          </div>

          <div className={styles.mobileTheme}>
            <span>Theme</span>
            <ThemeSwitcher />
          </div>
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
