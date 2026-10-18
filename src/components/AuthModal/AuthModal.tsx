
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import toast from 'react-hot-toast';

import { auth } from '../../services/firebase';
import Modal from '../Modal/Modal';
import { getAuthErrorMessage } from '../../utils/getAuthErrorMessage';
import styles from './AuthModal.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export type AuthMode = 'login' | 'register';

interface AuthModalProps {
  mode: AuthMode;
  onClose: () => void;
}

function AuthModal({ mode, onClose }: AuthModalProps) {
  const isLogin = mode === 'login';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);

        toast.success('Welcome back!');
        onClose();
        return;
      }

      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credential.user, {
        displayName: name.trim(),
      });

      toast.success('Registration successful!');
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);

      toast.error(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} labelledBy="auth-modal-title">
      <div className={styles.authModal}>
        <h2 id="auth-modal-title" className={styles.title}>
          {isLogin ? 'Log In' : 'Registration'}
        </h2>

        <p className={styles.description}>
          {isLogin
            ? 'Welcome back! Please enter your credentials to access your account and continue your search for a teacher.'
            : 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information'}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Name"
              autoComplete="name"
              value={name}
              onChange={event => setName(event.target.value)}
              required
              disabled={isLoading}
            />
          )}

          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
            disabled={isLoading}
          />

          <div className={styles.passwordField}>
            <input
              className={styles.input}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              value={password}
              onChange={event => setPassword(event.target.value)}
              minLength={6}
              required
              disabled={isLoading}
            />

            <button
              className={styles.passwordToggle}
              type="button"
              onClick={() => setShowPassword(previous => !previous)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={isLoading}
            >
              {showPassword ?  <FiEye /> :<FiEyeOff /> }
            </button>
          </div>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <SpinnerDotted
                size={24}
                thickness={100}
                speed={100}
                color="rgba(18, 20, 23, 1)"
                aria-label="Loading"
              />
            ) : (
              isLogin ? 'Log In' : 'Sign Up'
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AuthModal;
