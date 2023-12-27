import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneBook } from "../../../services/bookService";

import styles from "./BookDetails.module.css";

export default function BookDetails() {
  const { bookId } = useParams();

  const [book, setBook] = useState({});

  useEffect(() => {
    getOneBook(bookId)
      .then((result) => {
        console.log(result);
        setBook(result);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles["details-container"]}>
      <div className={styles["right-container"]}>
        <div className={styles["img-container"]}>
          <img src={book.cover_image} alt="book_cover" />
        </div>

        <div className={styles["description"]}>
          <p>{book.description}</p>
        </div>
      </div>

      <div className={styles["left-container"]}>
        <p className={styles["book-name"]}> {book.title} </p>
        <p className={styles["book-author"]}> {book.author} </p>
        <p className={styles["book-price"]}> {book.price} лв. </p>

        <div className={styles["quantity"]}>
          <label htmlFor="quantity">Quantity</label>
          <input type="number" />
        </div>

        <div className={styles["btns-container"]}>
          <button className={styles["add-btn"]}>Add to Cart</button>
          <button className={styles["buy-btn"]}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
