import type { Teacher } from '../../types/teacher';
import { useState } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import { useAuth } from '../../contexts/useAuth';
import toast from 'react-hot-toast';

import styles from './TeacherCard.module.css';

import { IoStar } from "react-icons/io5";
import { FiBookOpen } from "react-icons/fi";
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import ellipse from '../../assets/icons/ellipse.svg';

import BookingModal from '../BookingModal/BookingModal';


interface TeacherCardProps {
  teacher: Teacher;
}

function TeacherCard({ teacher }: TeacherCardProps) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { user } = useAuth();
const { favoriteIds, toggleFavorite, isFavoritesLoading } = useFavorites();

const isFavorite = favoriteIds.includes(teacher.id);

const handleFavoriteClick = async () => {
  if (!user) {
    toast.error('Please log in to add teachers to your favorites.', {
      id: 'login-required',
    });
    return;
  }

  if (isFavoritesLoading) {
    toast.error('Please wait, favorites are loading.', {
      id: 'favorites-loading',
    });
    return;
  }

  const success = await toggleFavorite(teacher.id);

  if (!success) {
    toast.error('Could not update favorites. Please try again.', {
      id: 'favorites-loading',
    });
  }
};
  

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
          <div className={styles.title}>
            <p className={styles.label}>Languages</p>
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
            <button
              type="button"
              className={`${styles.heart} ${
                isFavorite ? styles.favorite : ''
              }`}
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
              aria-pressed={isFavorite}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? (
                <FaHeart className={styles.iconheart} />
              ) : (
                <FaRegHeart className={styles.iconheart} />
              )}
            </button>
          </div>
        </div>

        <p className={styles.description_1}>
          <span className={styles.descLabel}>Speaks: </span>
          <span className={`${styles.descValue} ${styles.underline}`}>
            {teacher.languages.join(', ')}
          </span>
        </p>

        <p className={styles.description_2}>
          <span className={styles.descLabel}>Lesson Info: </span>
          <span className={styles.descValue}>{teacher.lesson_info}</span>
        </p>

        <p className={styles.description_3}>
          <span className={styles.descLabel}>Conditions: </span>
          <span className={styles.descValue}>{teacher.conditions.join(' ')}</span>
        </p>

        <button
          className={`${styles.button} ${styles.readMoreButton}`}
          type="button"
          onClick={() => setIsExpanded(prev => !prev)}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>

        {isExpanded && (
          <div className={styles.expanded}>
            <p className={styles.description}>
              {teacher.experience}
            </p>

            <div className={styles.reviews}>
              {teacher.reviews.map((review, index) => (
                <div
                  className={styles.review}
                  key={`${review.reviewer_name}-${index}`}
                >
                  <img 
                    src={`https://i.pravatar.cc/100?u=${encodeURIComponent(review.reviewer_name)}`}
                    alt={review.reviewer_name}
                    className={styles.rewavatar}
                  />
                  <p className={styles.reviewerName}>
                    {review.reviewer_name}
                  </p>
                  <p className={styles.reviewerRating}>
                    <IoStar className={styles.iconstar} />
                    {review.reviewer_rating.toFixed(1)}
                  </p>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>                  
              ))}
            </div>
          </div>
        )}


        <ul className={styles.levels}>
          {teacher.levels.map(level => (
            <li className={styles.level} key={level}>#
              {level}
            </li>
          ))}
        </ul>
        
        {isExpanded && (
          <button
            className={styles.bookbutton}
            type="button"
            onClick={() => setIsBookingOpen(true)}
          >
            Book trial lesson
          </button>
        )}

      </div>

      {isBookingOpen && (
        <BookingModal
          teacher={teacher}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </article>
  )
}

export default TeacherCard;