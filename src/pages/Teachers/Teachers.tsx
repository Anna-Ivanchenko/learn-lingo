
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import css from './Teachers.module.css';

function Teachers() {
  return (
    <section className={css.teachers}>
      <h1 className={css.title}>Teachers</h1>
      <div className={css.list}>
        <TeacherCard />
      </div>
    </section>
  );
}

export default Teachers;
