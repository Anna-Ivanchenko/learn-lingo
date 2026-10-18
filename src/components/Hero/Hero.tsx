import styles from './Hero.module.css';
import { useTheme } from '../../contexts/useTheme';
import type { Theme } from '../../contexts/ThemeContext';
import heroOrange from '../../assets/images/hero-pic-orange.webp';
import heroGreen from '../../assets/images/hero-pic-green.webp';
import heroBlue from '../../assets/images/hero-pic-blue.webp';
import heroPink from '../../assets/images/hero-pic-pink.webp';
import heroRed from '../../assets/images/hero-pic-red.webp';

const HERO_IMAGES: Record<Theme, string> = {
  orange: heroOrange,
  green: heroGreen,
  blue: heroBlue,
  pink: heroPink,
  red: heroRed,
};
import { Link } from 'react-router-dom';

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Unlock your potential with the best <span className={styles.titleAccent}>language</span> tutors</h1>
        <p className={styles.description}>Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
        
        <Link className={styles.button} to="/teachers">
          Get started
        </Link>
      </div>

      <div className={styles.imageWrapper}>
    <img
      className={styles.image}
      src={HERO_IMAGES[theme]}
      alt="LearnLingo student learning with a laptop"
    />
  </div>
    </section>
  )
}

export default Hero;