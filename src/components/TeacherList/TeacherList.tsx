
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

const TEACHERS_PER_PAGE = 4;

function TeacherList({
  teachers,
  hasMore,
  isLoadingMore,
  onLoadMore,
  onLoadAll,
  emptyMessage = 'No teachers found matching your filters.',
}: TeacherListProps) {
  const [filters, setFilters] = useState<TeacherFilters>(INITIAL_FILTERS);
  const [visibleCount, setVisibleCount] = useState(TEACHERS_PER_PAGE);

  const handleFilterChange = (
    name: keyof TeacherFilters,
    value: string
  ) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));

    setVisibleCount(TEACHERS_PER_PAGE);

    if (value && hasMore) {
      onLoadAll();
    }
  };

  const handleLoadMore = () => {
    const nextCount = visibleCount + TEACHERS_PER_PAGE;

    setVisibleCount(nextCount);

    if (nextCount > teachers.length && hasMore) {
      onLoadMore();
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

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredTeachers.length || hasMore;

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

      {filteredTeachers.length === 0 && !hasMore && !isLoadingMore && <p>{emptyMessage}</p>}

      {canLoadMore && (
        <button
          type="button"
          className={styles.loadMore}
          disabled={isLoadingMore}
          onClick={handleLoadMore}
        >
          {isLoadingMore ? 'Loading...' : 'Load More'}
        </button>
      )}
    </>
  );
}

export default TeacherList;
