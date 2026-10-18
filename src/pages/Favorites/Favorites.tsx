
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';

import { database } from '../../services/firebase';
import { useFavorites } from '../../hooks/useFavorites';
import TeacherList from '../../components/TeacherList/TeacherList';
import Loader from '../../components/Loader/Loader';
import type { Teacher } from '../../types/teacher';

import styles from '../Teachers/Teachers.module.css';

function Favorites() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isTeachersLoading, setIsTeachersLoading] = useState(true);
  const [teachersError, setTeachersError] = useState<string | null>(null);

  const {
    favoriteIds,
    isFavoritesLoading,
    favoritesError,
  } = useFavorites();

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

        setTeachersError(null);
        setIsTeachersLoading(false);
      },
      error => {
        console.error('Failed to load teachers:', error);
        setTeachersError('Failed to load teachers.');
        setIsTeachersLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const favoriteTeachers = teachers.filter(teacher =>
    favoriteIds.includes(teacher.id)
  );

  const isLoading = isTeachersLoading || isFavoritesLoading;
  const error = teachersError || favoritesError;

  return (
    <section className={styles.teachers}>

      {isLoading ? (
        <Loader message="Loading favorites..." />
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <TeacherList
          teachers={favoriteTeachers}
          emptyMessage="You haven't added any teachers to your favorites yet."
        />
      )}
    </section>
  );
}

export default Favorites;
