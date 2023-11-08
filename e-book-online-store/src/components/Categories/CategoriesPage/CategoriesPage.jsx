import { useBookContext } from "../../../contexts/BookContext"


import styles from './CategoriesPage.module.css'


export default function CategoriesPage() {

    const { books, category } = useBookContext();


    return (
        <div className={styles['categories-container']}>
            <h1>{category}</h1>

        </div>

    )
}