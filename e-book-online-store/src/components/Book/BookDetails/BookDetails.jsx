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


// "_id": "4",
// "author": "George R. R. Martin",
// "description": "Nigeria",
// "cover_image": "https://www.ciela.com/media/catalog/product/cache/332cf88b637d37883ec9cea105be873e/f/i/fire_and_blood_-_george_r.r._martin_-_9780008402785_-_harpercollins.jpg",
// "price": 209,
// "title": "Fire and Bloood",
// "publication_date": 1958