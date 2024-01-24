import { useEffect, useState } from 'react';
import * as bookService from '../../../../services/bookService';

import { BooksByCategory } from '../../BooksByCategory/BooksByCategory'

export default function HealthAndBeautyBooks() {
  document.title = `Здраве и красота`;

  const [healthAndBeautyBooks, setHealthAndBeautyBooks] = useState([]);

  useEffect(() => {
    const path = window.location.pathname;
    const category = path.split('/').pop();
    bookService
      .getAllByCategory(category)
      .then((result) => {
        setHealthAndBeautyBooks(result)
        
      })
      .catch((error) => {
        // setHasServerError(true);
        // setServerError(error.message)
        console.log(error.message);
      });

    //   .finally(()=> setSpining(false));
  }, []);

  return (
    <BooksByCategory category={"Здраве и красота"} books={healthAndBeautyBooks} />
  );
}
