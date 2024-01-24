import { useEffect, useState } from 'react';
import * as bookService from '../../../../services/bookService';

import { BooksByCategory } from '../../BooksByCategory/BooksByCategory';

export default function Enciclopedia() {
  document.title = `Енциклопедии`;

  const [enciclopedia, setEnciclopedia] = useState([]);

  // const printCategory = currCategory[0].toUpperCase() + currCategory.substring(1);

  useEffect(() => {
    bookService
      .getAllByCategory('enciclopedia')
      .then((result) => setEnciclopedia(result))
      .catch((error) => {
        // setHasServerError(true);
        // setServerError(error.message)
        console.log(error.message);
      });
    //   .finally(()=> setSpining(false));
  }, []);

  return <BooksByCategory category={'Енциклопедии'} books={enciclopedia} />;
}
