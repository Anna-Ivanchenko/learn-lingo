import { useTeachers } from '../../hooks/useTeachers';
import TeacherList from '../../components/TeacherList/TeacherList';
import Loader from '../../components/Loader/Loader';

import styles from './Teachers.module.css';

function Teachers() {
  const { teachers, hasMore, isLoading, isLoadingMore, error, loadMore, loadAll } =
    useTeachers();

  return (
    <section className={styles.teachers}>
      {isLoading ? (
        <Loader message="Loading teachers..." />
      ) : error && teachers.length === 0 ? (
        <p role="alert">{error}</p>
      ) : (
        <TeacherList
          teachers={teachers}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={loadMore}
          onLoadAll={loadAll}
        />
      )}
    </section>
  );
}

export default Teachers;
