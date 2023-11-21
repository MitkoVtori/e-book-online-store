import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getOneBook } from "../../../services/bookService";


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
        <>
        <h1> { book.title }</h1>
        <h2> { book.author } </h2>
        <img src={book.cover_image} alt="book" />

        <h3> { book.description } </h3>
        <h4> { book.price } </h4>
        <h5> { book.publication_date } </h5>

        </>
    )
}


