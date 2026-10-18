import { useTeachers } from '../../hooks/useTeachers';
import TeacherList from '../../components/TeacherList/TeacherList';
import Loader from '../../components/Loader/Loader';

import styles from './Teachers.module.css';

function Teachers() {
  const { teachers, isLoading, error } = useTeachers();

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
