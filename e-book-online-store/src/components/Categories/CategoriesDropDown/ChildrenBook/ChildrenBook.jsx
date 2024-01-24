import { useEffect, useState } from 'react';
import * as bookService from '../../../../services/bookService';

import { BooksByCategory } from '../../BooksByCategory/BooksByCategory';

export default function ChildrenBooks() {
  document.title = `Детски книжки`;

  const [childrenBooks, setChildrenBooks] = useState([]);

  // const printCategory = currCategory[0].toUpperCase() + currCategory.substring(1);

  useEffect(() => {
    bookService
      .getAllByCategory('children')
      .then((result) => setChildrenBooks(result))
      .catch((error) => {
        // setHasServerError(true);
        // setServerError(error.message)
        console.log(error.message);
      });
    //   .finally(()=> setSpining(false));
  }, []);

  return <BooksByCategory category={'Детски книжки'} books={childrenBooks} />;
}
