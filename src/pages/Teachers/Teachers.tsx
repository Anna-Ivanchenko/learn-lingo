
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../../services/firebase';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import type { Teacher } from '../../types/teacher';
import css from './Teachers.module.css';

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
    <section className={css.teachers}>
      <h1 className={css.title}>Teachers</h1>

      <div className={css.list}>
        {teachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </section>
  );
}

export default Teachers;
