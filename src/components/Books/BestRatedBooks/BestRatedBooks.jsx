import React from 'react';
import PropTypes from 'prop-types';
import { useBestRatedBooks } from '../../../lib/customHooks';
import BookItem from '../BookItem/BookItem';
import styles from './BestRatedBooks.module.css';

function BestRatedBooks({ author }) {
  const { bestRatedBooks } = useBestRatedBooks();
  const role = localStorage.getItem('role');

  let filteredBooks = bestRatedBooks;

  if (role !== 'admin' && author) {
    filteredBooks = bestRatedBooks.filter(
      (book) => book.author === author,
    );
  }

  const bestRatedBooksContent = filteredBooks.length > 0 ? (
    filteredBooks.map((elt) => (
      <BookItem key={`book-${elt.id}`} book={elt} size={3} />
    ))
  ) : (
    <h3>Aucune recommandation</h3>
  );

  return (
    <section className={`content-container ${styles.BestRatedBooks}`}>
      <h2>
        {role === 'admin'
          ? 'Livre similaire'
          : 'Du même auteur...'}
      </h2>
      <div className={styles.List}>
        {bestRatedBooksContent}
      </div>
    </section>
  );
}

BestRatedBooks.propTypes = {
  author: PropTypes.string,
};

BestRatedBooks.defaultProps = {
  author: null,
};

export default BestRatedBooks;
