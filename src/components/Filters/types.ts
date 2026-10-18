export interface TeacherFilters {
  language: string;
  level: string;
  price: string;
}

export interface FiltersProps {
  filters: TeacherFilters;
  onFilterChange: (
    name: keyof TeacherFilters,
    value: string
  ) => void;
}