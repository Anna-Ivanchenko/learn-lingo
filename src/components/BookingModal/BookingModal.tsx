import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

import type { Teacher } from '../../types/teacher';
import Modal from '../Modal/Modal';
import styles from './BookingModal.module.css';

const schema = yup.object({
  reason: yup
    .string()
    .oneOf(['career', 'kids', 'abroad', 'exams', 'other'])
    .required('Please select your reason'),
  fullName: yup
    .string()
    .trim()
    .required('Please enter your name'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  phone: yup
    .string().trim().required('Please enter your phone number'),
});

type BookingFormData = yup.InferType<typeof schema>;

interface BookingModalProps {
  teacher: Teacher;
  onClose: () => void;
}

function BookingModal({ teacher, onClose }: BookingModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: 'career',
      fullName: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    const bookingData = {
      ...data,
      teacherId: teacher.id,
      teacherName: `${teacher.name} ${teacher.surname}`,
    };

    // Поки що зберігання на сервері не реалізоване.
    // Об'єкт містить дані, необхідні для майбутнього збереження бронювання.
    console.log('Booking data:', bookingData);

    toast.success('Your trial lesson request has been submitted!', {
      style: {
        background: '#e5e5e5',
        color: '#121417',
        borderRadius: '12px',
        padding: '16px 24px',
        fontSize: '16px',
      },
    });
    onClose();
  };

  return (
    <Modal onClose={onClose} labelledBy="booking-title">
      <div className={styles.header}>
        <h2 className={styles.title} id="booking-title">
          Book trial lesson
        </h2>

        <p className={styles.text}>
          Our experienced tutor will assess your current language level,
          discuss your learning goals, and tailor the lesson to your specific
          needs.
        </p>
      </div>

      <div className={styles.teacher}>
        <img
          className={styles.avatar}
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
        />

        <div className={styles.teacherInfo}>
          <span className={styles.teacherLabel}>Your teacher</span>
          <span className={styles.teacherName}>
            {teacher.name} {teacher.surname}
          </span>
        </div>
      </div>

            
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <fieldset className={styles.questionSection}>
          <legend className={styles.question}>
            What is your main reason for learning English?
          </legend>

          <div className={styles.reasons}>
            <label className={styles.reason}>
              <input
                className={styles.radio}
                type="radio"
                value="career"
                {...register('reason')}
              />
              Career and business
            </label>

            <label className={styles.reason}>
              <input
                className={styles.radio}
                type="radio"
                value="kids"
                {...register('reason')}
              />
              Lesson for kids
            </label>

            <label className={styles.reason}>
              <input
                className={styles.radio}
                type="radio"
                value="abroad"
                {...register('reason')}
              />
              Living abroad
            </label>

            <label className={styles.reason}>
              <input
                className={styles.radio}
                type="radio"
                value="exams"
                {...register('reason')}
              />
              Exams and coursework
            </label>

            <label className={styles.reason}>
              <input
                className={styles.radio}
                type="radio"
                value="other"
                {...register('reason')}
              />
              Culture, travel or hobby
            </label>
          </div>

          {errors.reason && (
            <p className={styles.error}>{errors.reason.message}</p>
          )}
        </fieldset>

        <div className={styles.fields}>
          <div className={styles.field}>
            <input
              className={styles.input}
              type="text"
              placeholder="Full Name"
              aria-label="Full Name"
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
              {...register('fullName')}
            />

            {errors.fullName && (
              <p className={styles.error}>{errors.fullName.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register('email')}
            />

            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <input
              className={styles.input}
              type="tel"
              placeholder="Phone number"
              aria-label="Phone number"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              {...register('phone')}
            />

            {errors.phone && (
              <p className={styles.error}>{errors.phone.message}</p>
            )}
          </div>
        </div>

        <button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          Book
        </button>
      </form>
    </Modal>
  );
}

export default BookingModal;



