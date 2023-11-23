import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getOneBook } from "../../../services/bookService";

import styles from "./BookDetails.module.css"

export default function BookDetails() {

    const { bookId } = useParams();

    const [book, setBook] = useState({});


    useEffect( ()=> {
        getOneBook(bookId)
        .then( result => setBook(result))
        .catch(error => console.log(error))
    }, [])


    console.log(book)

    return(


        <div  className={styles['details-container']} >

            <div className={styles['img-container']}>
                <img src={book.cover_image} alt="book_cover" />
            </div>

          

            <div className={styles['info-container']}>

            <p className={styles['book-name']} > { book.title } </p>
            <p className={styles['book-author']}> { book.author } </p>
            <p className={styles['book-price']}> {book.price} лв. </p>


            <div className={styles['btns-container']}>
                    <button className={styles['add-btn']}>Add to Cart</button>
                </div>

            
            </div>

      
                

        </div>


        // <>
        // <h1> { book.title }</h1>
        // <h2> { book.author } </h2>
        // <img src={book.cover_image} alt="book" />

        // <h3> { book.description } </h3>
        // <h4> { book.price } </h4>
        // <h5> { book.publication_date } </h5>

        // </>
    )
}


