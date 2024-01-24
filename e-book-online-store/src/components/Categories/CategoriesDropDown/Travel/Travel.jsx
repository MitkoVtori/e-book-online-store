import { useEffect, useState } from 'react';
import * as bookService from '../../../../services/bookService';

import { BooksByCategory } from '../../BooksByCategory/BooksByCategory'

export default function TravelBooks() {
  document.title = `Пътуване`;

  const [travelBooks, setTravelBooks] = useState([]);

  useEffect(() => {
    const path = window.location.pathname;
    const category = path.split('/').pop();
    bookService
      .getAllByCategory(category)
      .then((result) => {
        setTravelBooks(result)
        
      })
      .catch((error) => {
        // setHasServerError(true);
        // setServerError(error.message)
        console.log(error.message);
      });

    //   .finally(()=> setSpining(false));
  }, []);

  return (
    <BooksByCategory category={"Пътуване"} books={travelBooks} />
  );
}
