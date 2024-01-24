import { useEffect, useState } from 'react';
import * as bookService from '../../../../services/bookService';

import { BooksByCategory } from '../../BooksByCategory/BooksByCategory'

export default function NewestBooks() {
  document.title = `Най-новите`;

  const [newestBooks, setNewestBooks] = useState([]);

  useEffect(() => {
    const path = window.location.pathname;
    const category = path.split('/').pop();
    bookService
      .getAllByCategory(category)
      .then((result) => {
        setNewestBooks(result)
        
      })
      .catch((error) => {
        // setHasServerError(true);
        // setServerError(error.message)
        console.log(error.message);
      });

    //   .finally(()=> setSpining(false));
  }, []);

  return (
    <BooksByCategory category={"Най-новите"} books={newestBooks} />
  );
}
