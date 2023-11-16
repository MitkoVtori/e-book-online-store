import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import * as bookService from '../services/bookService';

export const BookContext = createContext();

export const BookProvider = ({
    children
}) => {

    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [category, setCategory] = useState('');

    useEffect(() => {
        bookService.getAllBooks()
            .then(books => {
                setBooks(books);
            })
            .catch(err => {
                console.log(err.message)
            })
    }, []);

    const onSelectCategory = (categoryName) => {
        setCategory(categoryName);
        navigate('/catalog');
    }


    const context = {
       books,
       category,
       onSelectCategory,
     
    }

    return <>
        < BookContext.Provider value={context}>
            {children}
        </BookContext.Provider>

    </>

}

export const useBookContext = () => {
    const context = useContext(BookContext)
    return context
}