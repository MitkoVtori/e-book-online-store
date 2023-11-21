import { useEffect, useState } from "react";
import { useBookContext } from "../../contexts/BookContext";
import { getAllBooks } from "../../services/bookService";

import BookCard from "../Book/BookCard/BookCard";

import styles from './Catalog.module.css';



export default function Catalog() {

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
    }), [bookList];

    return (

        <div className={styles['catalog']}>
            <h1>{category}</h1>

            <div className={styles['books-container']}>

                {bookList.map(book => <BookCard key={book._id} {...book} />)}

            </div>

        </div>
    )
}