import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import styles from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  labelledBy?: string;
}

function Modal({ children, onClose, labelledBy }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={event => event.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <MdClose className={styles.mdClose} />
        </button>

        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;