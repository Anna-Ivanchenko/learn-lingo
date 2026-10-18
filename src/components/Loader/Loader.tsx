
import { SpinnerDotted } from 'spinners-react';
import styles from './Loader.module.css';

interface LoaderProps {
  message?: string;
}

function Loader({ message }: LoaderProps) {
  return (
    <div
      className={styles.loaderContainer}
      role="status"
      aria-live="polite"
    >
      <SpinnerDotted
        size={70}
        thickness={95}
        speed={100}
        color="rgba(244, 197, 80, 1)"
      />

      <span className={styles.message}>
        {message || 'Loading...'}
      </span>
    </div>
  );
}

export default Loader;
