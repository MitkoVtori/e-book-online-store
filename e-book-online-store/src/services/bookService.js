
 import { get, post, put, del } from "./requester.js";

// Масив от книги за тестване 
import { tempBooks } from "../utils/testConstants/testBooksArray.js";

const endpoints = {
    "allBooks": "/api-books/",
    "oneBook": "/api-books/book/",
    "cart": "/api-books/cart/"
}

export const getAllBooks = async () => {

    const result = await get(endpoints.allBooks);
    result.map((book)=> {book.cover_image = encodeUrl(book.cover_image)});
    console.log(result);
    return result;
   
    // Връщаме тестовия масив временно!!!
    // return tempBooks;
}

export const getOneBook = async (bookId) => {

    let result = await get(`${endpoints.oneBook}${bookId}/`);
    result.cover_image = encodeUrl(result.cover_image);
    console.log(result)
    return result;
}

export const getCart = async (bookId) => {

    let result = await get(`${endpoints.cart}`);
    console.log(result)
    return result;
}

const encodeUrl = (url) => {
    return decodeURIComponent(url.replace(/^\/(https%3A)/, '$1'));
}
