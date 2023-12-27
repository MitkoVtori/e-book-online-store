import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import * as bookService from '../../../../services/bookService'

import NewsCard from "../../NewsItemCards/NewsCardCatalog/NewsItem";



export default function BusinessBooks(){
    document.title = 'Бизнес книги';

    const [businessBooks, setBusinessBooks] = useState([]);
   
//   const[hasServerError, setHasServerError]= useState(false);
//   const[serverError,setServerError]= useState({})
    
    useEffect(() => {
       
        bookService.getAllBG()
        .then(result => setBusinessBooks(result))
        .catch( error => {
            // setHasServerError(true);
            // setServerError(error.message)
            console.log(error.message);
          })
        //   .finally(()=> setSpining(false)); 
    }, 
    [])

    const sortedNews = [...bgNews].sort((a, b) => new Date(b._createdOn) - new Date(a._createdOn));
    return(
        <>


<div className={styles.pageWrapper}> 
        <div className={styles.title}>

        <h2>Новините от България</h2>
        </div>

            
            
            {spining && <Spiner />}
            {hasServerError && (
                        <p className={styles.serverError}>Грешка! </p>
                    )}
                    
                {bgNews.length > 0
                ? (
                    <>
                    {
                        sortedNews.map(newsCard => (
                            <NewsCard key={newsCard._id}
                                {...newsCard}
                                />


                        ))
                    }
                    </>
                )
                :
                <div className={styles.NoNews}>
                <div className={styles.NoNewsText}>
                <h3>Все още нямаме новини в тази категория!</h3>
                    <Link to="/createNews">
                <button className={styles.NoNewsBtn}>Създай 
                </button>
                    </Link>
                </div>
                </div>
}
            </div>
        
        </>
    )
}