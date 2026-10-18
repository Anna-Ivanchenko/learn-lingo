
import { useState } from 'react';
import TeacherCard from '../TeacherCard/TeacherCard';
import Filters from '../Filters/Filters';
import type { Teacher } from '../../types/teacher';
import type { TeacherFilters } from '../Filters/types';
import styles from './TeacherList.module.css';

interface TeacherListProps {
  teachers: Teacher[];
  emptyMessage?: string;
}

const TEACHERS_PER_PAGE = 4;

const INITIAL_FILTERS: TeacherFilters = {
  language: '',
  level: '',
  price: '',
};

function TeacherList({
  teachers,
  emptyMessage = 'No teachers found matching your filters.',
}: TeacherListProps) {
  const [visibleCount, setVisibleCount] = useState(TEACHERS_PER_PAGE);
  const [filters, setFilters] = useState<TeacherFilters>(INITIAL_FILTERS);

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
        language =>
          language.toLowerCase() === filters.language.toLowerCase()
      );

    const matchesLevel =
      !filters.level || teacher.levels.includes(filters.level);

    const matchesPrice =
      !filters.price ||
      teacher.price_per_hour === Number(filters.price);

    return matchesLanguage && matchesLevel && matchesPrice;
  });

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);

  return (
    <>
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className={styles.list}>
        {visibleTeachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>

      {filteredTeachers.length === 0 && <p>{emptyMessage}</p>}

      {visibleCount < filteredTeachers.length && (
        <button
          type="button"
          className={styles.loadMore}
          onClick={() =>
            setVisibleCount(prevCount => prevCount + TEACHERS_PER_PAGE)
          }
        >
          Load More
        </button>
      )}
    </>
  );
}

export default TeacherList;
