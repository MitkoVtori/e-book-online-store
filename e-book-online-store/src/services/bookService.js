
 import { get, post, put, del } from "./requester.js";

// Масив от книги за тестване 
// import { tempBooks } from "../utils/testConstants/testBooksArray.js";

const endpoints = {
    "allBooks": "api-books/",
    "oneBook": "api-books/book/",
    "cart": "/api-books/cart/",
    "businessBook": "/api-books/businessBook"
}

export const getAllBooks = async () => {

    const result = await get(endpoints.allBooks);
    result.map((book)=> {book.cover_image = encodeUrl(book.cover_image)});
    console.log(result);
    return result;
   
    // Връщаме тестовия масив временно!!!
    // return tempBooks;
}

//////////////////////// Vito
export const getAllBusiness = async () => {
    const result = await get(endpoints.businessBook);
    const data = Object.values(result).filter(bookCategory => bookCategory.category == 'Бизнес');
    return data;
}
// ////////////////////

export const getOneBook = async (bookId) => {

    try{
        let result = await get(`${endpoints.oneBook}${bookId}/`);
        result.cover_image = encodeUrl(result.cover_image).slice(22, result.cover_image.length);
    
        console.log(result)
        return result;
    }
    catch (error) {
        console.error("Error fetching book:", error);
        throw error; // Propagate the error to the calling component
    }
  
}

export const getCart = async (bookId) => {

    let result = await get(`${endpoints.cart}`);
    console.log(result)
    return result;
}

const encodeUrl = (url) => {
    return decodeURIComponent(url.replace(/^\/(https%3A)/, '$1'));
}
