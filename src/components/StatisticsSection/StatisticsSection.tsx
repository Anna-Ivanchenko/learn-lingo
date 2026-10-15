import styles from './StatisticsSection.module.css';

const statistics = [
  {value:'32,000 +', label:'Experienced tutors'},
  {value:'300,000 +', label:'5-star tutor reviews'},
  {value:'120 +', label:'Subjects taught'},
  {value:'120 +', label:'Tutor nationalities'},
]

const StatisticsSection = () => {
  return (
    <section className={styles.statistics}>
      <ul className={styles.list}>
        {statistics.map(({ value, label }) => (
          <li className={styles.item} key={label}>
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default StatisticsSection;