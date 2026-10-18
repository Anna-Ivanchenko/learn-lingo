
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';

import { database } from '../../services/firebase';
import TeacherList from '../../components/TeacherList/TeacherList';
import Loader from '../../components/Loader/Loader';
import type { Teacher } from '../../types/teacher';

import styles from './Teachers.module.css';

function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const teachersRef = ref(database, 'teachers');

    const unsubscribe = onValue(
      teachersRef,
      snapshot => {
        const data = snapshot.val();

        if (data) {
          const teachersList: Teacher[] = Object.entries(data).map(
            ([id, teacher]) => ({
              id,
              ...(teacher as Omit<Teacher, 'id'>),
            })
          );

          setTeachers(teachersList);
        } else {
          setTeachers([]);
        }

        setError(null);
        setIsLoading(false);
      },
      error => {
        console.error('Failed to load teachers:', error);
        setError('Failed to load teachers.');
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <section className={styles.teachers}>
      {isLoading ? (
        <Loader message="Loading teachers..." />
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <TeacherList teachers={teachers} />
      )}
    </section>
  );
}

export default Teachers;
