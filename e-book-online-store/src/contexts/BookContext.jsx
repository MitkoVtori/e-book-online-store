import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


// Масив от книги за тестване 
import { tempBooks } from '../utils/testConstants/testBooksArray.js';



export const BookContext = createContext();

export const BookProvider = ({
    children
}) => {

    const navigate = useNavigate();

    const [books, setBooks] = useState(tempBooks);
    const [category, setCategory] = useState('');

    const onSelectCategory = (categoryName) => {
        setCategory(categoryName);
        navigate('/categories');
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