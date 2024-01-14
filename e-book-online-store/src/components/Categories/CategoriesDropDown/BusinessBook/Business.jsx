
import styles from "../BusinessBook/Business.module.css"
import { useEffect, useState } from 'react';
import * as bookService from '../../../../services/bookService'

import BookCardItem from "../../../Book/BookCard/BookCardItem/BookCard"





export default function BusinessBooks(){
    document.title = 'Бизнес книги';

    const [businessBooks, setBusinessBooks] = useState([]);
   
   
    useEffect(() => {
       
        bookService.getAllBusiness()
        .then(result => setBusinessBooks(result))
        .catch( error => {
            // setHasServerError(true);
            // setServerError(error.message)
            console.log(error.message);
          })
        //   .finally(()=> setSpining(false)); 
    }, 
    [])

    return(
        <>


<div className={styles.pageWrapper}> 
        <div className={styles.title}>

        <h2>Категория Бизнес</h2>
        </div>

            
       
            
   
                    
                {businessBooks.length > 0
                ? (
                    <>
                    {
                        businessBooks.map(newsCard => (
                            <BookCardItem key={newsCard._id}
                                {...newsCard}
                                />


                        ))
                    }
                    </>
                )
                :
                <div className={styles.NoNews}>
                <div className={styles.NoNewsText}>
                <h3>Все още книги в тази категория</h3>
                    
                
                </div>
                </div>
}
            </div>
        
        </>
    )
}