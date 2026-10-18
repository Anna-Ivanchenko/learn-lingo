import { THEMES } from '../../contexts/ThemeContext';
import { useTheme } from '../../contexts/useTheme';
import styles from './ThemeSwitcher.module.css';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.switcher} role="group" aria-label="Color theme">
      {THEMES.map(item => {
        const isActive = item === theme;

        return (
          <button
            key={item}
            type="button"
            className={`${styles.swatch} ${styles[item]} ${
              isActive ? styles.active : ''
            }`}
            aria-label={`${item} theme`}
            aria-pressed={isActive}
            title={`${item} theme`}
            onClick={() => setTheme(item)}
          />
        );
      })}
    </div>
  );
}

export default ThemeSwitcher;
