import { useFavorites } from '../../hooks/useFavorites';
import { useTeachers } from '../../hooks/useTeachers';
import TeacherList from '../../components/TeacherList/TeacherList';
import Loader from '../../components/Loader/Loader';

import styles from '../Teachers/Teachers.module.css';

function Favorites() {
  const {
    teachers,
    isLoading: isTeachersLoading,
    error: teachersError,
  } = useTeachers();
  const { favoriteIds, isFavoritesLoading, favoritesError } = useFavorites();

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
