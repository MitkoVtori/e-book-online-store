import { useState } from "react";
import styles from "../ADDSellBook/ADDSellDetails.module.css";

import { Link, useNavigate } from "react-router-dom";

import * as bookService from "../../../services/bookService";

import { useAuthContext } from "../../../contexts/AuthContext";

const formCreateInitialState = {
  title: "",
  booksInfo: "",
  price: "",
  cover_image: "",
  category: "",
};

export default function AddSellBook() {
  document.title = "AddBook";

  const {  isAuth } = useAuthContext();

  const navigate = useNavigate();

  const [formCreateValues, setFormCreateValues] = useState(
    formCreateInitialState
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormCreateValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const resetCreateFormHandler = () => {
    setFormCreateValues(formCreateInitialState);
    setErrors({});
  };

  const formCreateSubmitHandler = (e) => {
    e.preventDefault();
    handleCreateConfirmation();
  };

  ///// CREATE BOOK

  const handleCreateConfirmation = () => {
    bookService
      .addBook(formCreateValues)
      .then(() => {
        navigate("/");
      })

      .catch((err) => {
        console.log();
        console.log(err.message);
      });

    resetCreateFormHandler();
  };



  return (
    <>
    { isAuth && 
      <div className={styles.container}>
        <div className={styles.fornContainer}>
          <form
            id="request"
            className={styles.form}
            onSubmit={formCreateSubmitHandler}
          >
            <label htmlFor="title" className={styles.titleText1}>
              {" "}
              Заглавие:
              <input
                className={styles.titleText}
                type="text"
                name="title"
                id="title"
                value={formCreateValues.title}
                onChange={handleChange}
              />
              {errors.title && (
                <p className={styles.errorMessage}>{errors.title}</p>
              )}
            </label>
            <br />

            <label htmlFor="booksInfo" className={styles.newsInfo}>
              Кратко резюме за книгата:
              <textarea
                className={styles.newsInfoTextArea}
                type="text"
                name="booksInfo"
                id="booksInfo"
                value={formCreateValues.booksInfo}
                onChange={handleChange}
              />
              {errors.booksInfo && (
                <p className={styles.errorMessage}>{errors.booksInfo}</p>
              )}
            </label>
            <br />

            <label htmlFor="price" className={styles.price}>
              Цена:
              <textarea
                className={styles.newsInfoTextArea}
                type="number"
                name="price"
                id="price"
                value={formCreateValues.price}
                onChange={handleChange}
              />
              {errors.price && (
                <p className={styles.errorMessage}>{errors.price}</p>
              )}
            </label>
            <br />

            <label htmlFor="cover_image">
              Добавяне на снимка чрез линк:
              <input
                type="text"
                name="cover_image"
                id="cover_image"
                value={formCreateValues.cover_image}
                onChange={handleChange}
              />
              {errors.cover_image && (
                <p className={styles.errorMessage}>{errors.cover_image}</p>
              )}
            </label>
            <br />

            <fieldset>
              <legend>Избери категория:</legend>
              <div className={styles.categoryOptions}>
                <select
                  className={styles.contactus}
                  name="category"
                  id="category"
                  onChange={handleChange}
                  value={formCreateValues.category}
                >
                  <option value="Детски">Детски книги</option>
                  <option value="Семейни">Хоби, семейни</option>
                  <option value="Енциклопедии">Енциклопедии</option>
                  <option value="Бизнес">Бизнес</option>
                  <option value="История и политика">История и политика</option>
                  <option value="Тинейджъри">Тинейджъри</option>
                  <option value="Психология">Психология</option>
                  <option value="Фантастика">Фантастика</option>
                  <option value="Здраве">Здраве</option>
                  <option value="Личностно развитие">Личностно развитие</option>
                  <option value="Други">Други</option>
                </select>
              </div>
            </fieldset>

            <br />
            <div className={styles.buttons}>
              <button className={styles.createBtnYes} type="submit">
                Създай
              </button>
              <Link to="/">
                <button className={styles.cancelBtnNo} type="button">
                  Отказ
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
} 

{
  !isAuth &&
  <section className={styles.boundingErr}>
                    <div >
                        <h2>За да продаваш книги трябва да си регистриран потребител</h2>
                   <a href="/login"><button >ВХОД</button></a>
                </div>
                </section>
 
}

    </>
  );
}
