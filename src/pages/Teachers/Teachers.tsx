
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../../services/firebase';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import Filters from '../../components/Filters/Filters';

import type { Teacher } from '../../types/teacher';
import type {
  TeacherFilters,
} from '../../components/Filters/types';

import styles from './Teachers.module.css';

const TEACHERS_PER_PAGE = 4;

const INITIAL_FILTERS: TeacherFilters = {
  language: '',
  level: '',
  price: '',
};

function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [visibleCount, setVisibleCount] = useState(TEACHERS_PER_PAGE);
  const [filters, setFilters] = useState<TeacherFilters>(INITIAL_FILTERS);

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

  const handleFilterChange = (
    name: keyof TeacherFilters,
    value: string
  ) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
    setVisibleCount(TEACHERS_PER_PAGE);
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesLanguage =
      !filters.language ||
      teacher.languages.some(
        language => language.toLowerCase() === filters.language.toLowerCase()
      );

    const matchesLevel =
      !filters.level || teacher.levels.includes(filters.level);

    const matchesPrice =
      !filters.price || teacher.price_per_hour === Number(filters.price);

    return matchesLanguage && matchesLevel && matchesPrice;
  });

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + TEACHERS_PER_PAGE);
  };

  return (
    <section className={styles.teachers}>
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className={styles.list}>
        {visibleTeachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <p>No teachers found matching your filters.</p>
      )}

      {visibleCount < filteredTeachers.length && (
        <button type="button" className={styles.loadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </section>
  );
}

export default Teachers;
