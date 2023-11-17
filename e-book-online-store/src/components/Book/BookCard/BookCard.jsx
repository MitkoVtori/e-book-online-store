

import styles from './BookCard.module.css';



export default function BookCard({
    author,
    description,
    cover_image,
    genres,
    publication_date,
    title,
    price

}) {

    return (


        <article className={styles['card-container']}>

            <div className={styles['card']}>

                <div className={styles['card-img-container']}>
                    <img src={cover_image} alt="r" />
                </div>

                <p> <strong> {title} </strong> </p>
                <p> {price} лв. </p>

            </div>

            <div className={styles['btns-container']}>
                <button className={styles['add-btn']}>Add to Cart</button>
            </div>

        </article>
    )
}