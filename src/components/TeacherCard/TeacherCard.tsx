import type { Teacher } from '../../types/teacher';
import styles from './TeacherCard.module.css';
import { IoStar } from "react-icons/io5";
import { FiBookOpen } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import ellipse from '../../assets/icons/ellipse.svg';


interface TeacherCardProps {
  teacher: Teacher;
}

function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.border_avatar}><img
        className={styles.avatar}
        src={teacher.avatar_url}
        alt={`${teacher.name} ${teacher.surname}`}
      />
      <span className={styles.ellipse}>
        <img src={ellipse} alt="Status" />
      </span>
      </div>
    
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <p className={styles.label}>Language</p>
            <h2 className={styles.name}>{teacher.name} {teacher.surname}</h2>
          </div>
        
          <div className={styles.stats}>
            <span>
              <FiBookOpen className={styles.iconbook} /> Lessons online
            </span>
            <span>Lessons done: {teacher.lessons_done}</span>
            <span>
              <IoStar className={styles.iconstar} /> Rating: {teacher.rating}
            </span>
            <span>
              Price / 1 hour: <strong>{teacher.price_per_hour}$</strong>
            </span>
            <span className={styles.heart}>
              <FaRegHeart className={styles.iconheart} />
            </span>
          </div>
        </div>

        <p className={styles.description}>
          <span className={styles.descLabel}>Speaks: </span>
          <span className={`${styles.descValue} ${styles.underline}`}>
            {teacher.languages.join(', ')}
          </span>
        </p>

        <p className={styles.description}>
          <span className={styles.descLabel}>Lesson Info: </span>
          <span className={styles.descValue}>{teacher.lesson_info}</span>
        </p>

        <p className={styles.description}>
          <span className={styles.descLabel}>Conditions: </span>
          <span className={styles.descValue}>{teacher.conditions.join(' ')}</span>
        </p>

        <button className={styles.button}>Read more</button>
        <ul className={styles.levels}>
          {teacher.levels.map(level => (
            <li className={styles.level} key={level}>#
              {level}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default TeacherCard;