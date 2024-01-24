import { useEffect, useState } from 'react';
import * as bookService from '../../../../services/bookService';

import { BooksByCategory } from '../../BooksByCategory/BooksByCategory';

export default function FamilyBooks() {
  document.title = `Семейни книги`;

  const [familyBooks, setFamilyBooks] = useState([]);

  // const printCategory = currCategory[0].toUpperCase() + currCategory.substring(1);

  useEffect(() => {
    bookService
      .getAllByCategory('family')
      .then((result) => setFamilyBooks(result))
      .catch((error) => {
        // setHasServerError(true);
        // setServerError(error.message)
        console.log(error.message);
      });
    //   .finally(()=> setSpining(false));
  }, []);

  return <BooksByCategory category={'Семейни книги'} books={familyBooks} />;
}
