import styles from '../BooksByCategory/BooksByCategory.module.css';

import BookCardItem from '../../Book/BookCard/BookCardItem/BookCard';

export const BooksByCategory = ({ books, category }) => {
  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.title}>
          {/* TODO: persist category */}
          <h2>Категория {category}</h2>
        </div>

        {books.length > 0 ? (
          <>
            {books.map((newsCard) => (
              <BookCardItem key={newsCard._id} {...newsCard} />
            ))}
          </>
        ) : (
          <div className={styles.NoNews}>
            <div className={styles.NoNewsText}>
              <h3>Все още няма книги в тази категория</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
