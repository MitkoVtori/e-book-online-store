import { useEffect, useState } from 'react';
import * as bookService from '../../../../services/bookService';

import { BooksByCategory } from '../../BooksByCategory/BooksByCategory';

export default function FamilyBooks() {
  document.title = `Фантастика`;

  const [fantasyBooks, setFantasyBooks] = useState([]);
  

  
  
  // const printCategory = currCategory[0].toUpperCase() + currCategory.substring(1);


  useEffect(() => {
    bookService
      .getAllByCategory("fantasy")
      .then((result) => setFantasyBooks(result))
      .catch((error) => {
        // setHasServerError(true);
        // setServerError(error.message)
        console.log(error.message);
      });
    //   .finally(()=> setSpining(false));
  }, []);

  return <BooksByCategory category={'Фантастика'} books={fantasyBooks} />;
}
