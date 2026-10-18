
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../../services/firebase';
import TeacherList from '../../components/TeacherList/TeacherList';
import type { Teacher } from '../../types/teacher';

import styles from './Teachers.module.css';

function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

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

  return (
    <section className={styles.teachers}>
      <TeacherList teachers={teachers} />
    </section>
  );
}

export default Teachers;
