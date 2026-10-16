
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../../services/firebase';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import type { Teacher } from '../../types/teacher';
import styles from './Teachers.module.css';

const TEACHERS_PER_PAGE = 4;

function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [visibleCount, setVisibleCount] = useState(TEACHERS_PER_PAGE);

  useEffect(() => {
    const teachersRef = ref(database, 'teachers');

    const unsubscribe = onValue(teachersRef, snapshot => {
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
    });

    return unsubscribe;
  }, []);

  const visibleTeachers = teachers.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + TEACHERS_PER_PAGE);
  };

  return (
    <section className={styles.teachers}>
      <div className={styles.list}>
        {visibleTeachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
      {visibleCount < teachers.length && (
        <button type="button" className={styles.loadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </section>
  );
}

export default Teachers;
