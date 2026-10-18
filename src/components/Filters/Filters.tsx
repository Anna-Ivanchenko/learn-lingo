import type { FiltersProps } from "./types";
import styles from "./Filters.module.css";

const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Mandarin Chinese',
  'Italian',
  'Korean',
  'Vietnamese',
];

const LEVELS = [
  'A1 Beginner',
  'A2 Elementary',
  'B1 Intermediate',
  'B2 Upper-Intermediate',
  'C1 Advanced',
  'C2 Proficient',
];

const PRICES = ['25', '27', '28', '30', '32', '35'];

function Filters({filters, onFilterChange}:FiltersProps) {
  return (
    <div className={styles.filters}>
      <label className={styles.filter}>
        <span className={styles.label}>Languages</span>
        <select
          className={styles.select}
          value={filters.language}
          onChange={event => onFilterChange('language', event.target.value)          
          }
        >
          <option value="">All languages</option>
          {LANGUAGES.map(language => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.filter}>
        <span className={styles.label}>Level of knowledge</span>
        <select
          className={styles.select}
          value={filters.level}
          onChange={event =>
            onFilterChange('level', event.target.value)
          }
        >
          <option value="">All levels</option>
          {LEVELS.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      <label className={`${styles.filter} ${styles.priceFilter}`}>
        <span className={styles.label}>Price</span>
        <select
          className={styles.select}
          value={filters.price}
          onChange={event =>
            onFilterChange('price', event.target.value)
          }
        >
          <option value="">Any</option>
          {PRICES.map(price => (
            <option key={price} value={price}>
              {price} $
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Filters;