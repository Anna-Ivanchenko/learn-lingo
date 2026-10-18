
import { useState } from 'react';
import TeacherCard from '../TeacherCard/TeacherCard';
import Filters from '../Filters/Filters';
import type { Teacher } from '../../types/teacher';
import type { TeacherFilters } from '../Filters/types';
import styles from './TeacherList.module.css';

interface TeacherListProps {
  teachers: Teacher[];
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  onLoadAll: () => void;
  emptyMessage?: string;
}

const INITIAL_FILTERS: TeacherFilters = {
  language: '',
  level: '',
  price: '',
};

function TeacherList({
  teachers,
  hasMore,
  isLoadingMore,
  onLoadMore,
  onLoadAll,
  emptyMessage = 'No teachers found matching your filters.',
}: TeacherListProps) {
  const [filters, setFilters] = useState<TeacherFilters>(INITIAL_FILTERS);

  const handleFilterChange = (
    name: keyof TeacherFilters,
    value: string
  ) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));

    if (value && hasMore) {
      onLoadAll();
    }
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

  return (
    <>
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className={styles.list}>
        {filteredTeachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>

      {filteredTeachers.length === 0 && !hasMore && !isLoadingMore && <p>{emptyMessage}</p>}

      {hasMore && (
        <button
          type="button"
          className={styles.loadMore}
          disabled={isLoadingMore}
          onClick={onLoadMore}
        >
          {isLoadingMore ? 'Loading...' : 'Load More'}
        </button>
      )}
    </>
  );
}

export default TeacherList;
