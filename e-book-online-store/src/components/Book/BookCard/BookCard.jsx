
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './BookCard.module.css';



export default function BookCard({
    id,
    author,
    description,
    cover_image,
    genres,
    publication_date,
    title,
    price

}) {

   const [isButtonsVisible, setIsButtonsVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsButtonsVisible(true);

    }

    const handleMouseLeave = () => {
        setIsButtonsVisible(false);

    }

    return (
        <article className={styles['card-container']}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

            <div className={styles['card']}>

                <div className={styles['card-img-container']}>
                    <img src={cover_image} alt="r" />
                </div>

                <p> <strong> {title} </strong> </p>
                <p> {price} лв. </p>

            </div>

            {isButtonsVisible && (
                <div className={styles['btns-container']}>
                    <Link  to={`${id}`} className={styles['view-btn']} >Quick view</Link>
                    <button className={styles['add-btn']}>Add to Cart</button>
                </div>
            )
            }
         

        </article>
    )
}