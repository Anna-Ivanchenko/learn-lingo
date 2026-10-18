import { useFavoriteTeachers } from '../../hooks/useFavoriteTeachers';
import TeacherList from '../../components/TeacherList/TeacherList';
import Loader from '../../components/Loader/Loader';

import styles from '../Teachers/Teachers.module.css';

function Favorites() {
  const { teachers, hasMore, isLoading, isLoadingMore, error, loadMore, loadAll } =
    useFavoriteTeachers();

  return (
    <section className={styles.teachers}>
      {isLoading ? (
        <Loader message="Loading favorites..." />
      ) : error && teachers.length === 0 ? (
        <p role="alert">{error}</p>
      ) : (
        <TeacherList
          teachers={teachers}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={loadMore}
          onLoadAll={loadAll}
          emptyMessage="You haven't added any teachers to your favorites yet."
        />
      )}
    </section>
  );
}

export default Favorites;
