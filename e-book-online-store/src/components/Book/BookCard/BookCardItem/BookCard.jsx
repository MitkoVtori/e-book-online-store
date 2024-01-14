import styles from "../BookCardItem/BookCard.module.css"

export default function BookItem(
    title,
    category,
    price,
    booksInfo,
    image


){
    return (

        <>
       <div className={styles['wrapper']}>


        <article className={styles['artCard']}>
            <div className={styles['newsCardT']}>

        <img src={image} alt="" />
        <div className={styles['newsInfo']}>
            <h3>{title}</h3>
            <p className={styles['newsDate']}>{category}</p>
            <p className={styles['newsDate']}>{price}</p>
            <p className={styles['newsText']}>{booksInfo}</p>
            
        </div>
        
            </div>
        </article>

  
       </div>
        </>
    )
}