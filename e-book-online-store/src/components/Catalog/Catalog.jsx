import { useEffect, useState } from "react";
import { useBookContext } from "../../contexts/BookContext";
import { getAllBooks } from "../../services/bookService";

import BookCard from "../Book/BookCard/BookCard";

import styles from './Catalog.module.css';
import * as test from '../../utils/testConstants/testBooksArray';



export default function Catalog() {
    document.title = 'Каталог'
    
    const { category } = useBookContext();

    const [bookList, setBookList] = useState([]);


    useEffect(() => {
        getAllBooks()
            .then(result => {
                setBookList(result)
            })
            .catch(error => {
                console.log(error.message)
            })
    }, []);

    return (

        <div className={styles['catalog']}>
            <div className={styles["imgCover"]}>
          <img src="images/img_Books/book6.jpg" alt="" />
        </div>
        <div className={styles["title"]}>
          <h2>Всички книги</h2>
        </div>
        <div className={styles["slogan"]}>
          <p>
            Тук ще да откриете всички електронни книги, които може да закупите при нас
          </p>
        </div>

            <div className={styles['books-container']}>
                {/* TODO: replace with actual books! */}

                {test.tempBooks.map(book => <BookCard key={book.id} {...book} />)}

            </div>

        </div>
    )
}