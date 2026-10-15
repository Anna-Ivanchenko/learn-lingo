import type { Teacher } from '../../types/teacher';
import styles from './TeacherCard.module.css';

interface TeacherCardProps {
  teacher: Teacher;
}

function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <article className={styles.card}>
      <img
        className={styles.avatar}
        src={teacher.avatar_url}
        alt={`${teacher.name} ${teacher.surname}`}
      />
    
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <p className={styles.label}>Language</p>
            <h2 className={styles.name}>{teacher.name} {teacher.surname}</h2>
          </div>
        
          <div className={styles.stats}>
            <span>Lessons online</span>
            <span>Lessons done: {teacher.lessons_done}</span>
            <span>★Rating: {teacher.rating}</span>
            <span>
              Price / 1 hour: <strong>{teacher.price_per_hour}$</strong>
            </span>
          </div>
        </div>

        <p className={styles.description}>Speaks: {teacher.languages.join(', ')}</p>
        <p className={styles.description}>Lesson Info: {teacher.lesson_info}</p>
        <p className={styles.description}>Conditions: {teacher.conditions.join(' ')}</p>

        <ul className={styles.levels}>
          {teacher.levels.map(level => (
            <li className={styles.level} key={level}>
              {level}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default TeacherCard;