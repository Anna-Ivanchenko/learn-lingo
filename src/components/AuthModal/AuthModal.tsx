import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../../services/firebase';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './AuthModal.module.css';

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

  const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

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

    toast.error(
      'Could not complete registration. Please check your details and try again.'
    );
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
            />

            <button
              className={styles.passwordToggle}
              type="button"
              onClick={() => setShowPassword(previous => !previous)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button className={styles.submitButton} type="submit">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AuthModal;
