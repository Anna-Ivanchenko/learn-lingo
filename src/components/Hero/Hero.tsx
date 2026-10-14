import styles from './Hero.module.css';
import heroImage from '../../assets/images/hero-pic.webp';
import { Link } from 'react-router-dom';

const Hero = () => {
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
      src={heroImage}
      alt="LearnLingo student learning with a laptop"
    />
  </div>
    </section>
  )
}

export default Hero;