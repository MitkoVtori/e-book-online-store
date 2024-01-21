import styles from "../SellBook/SellBook.module.css";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export default function SellBook() {
  document.title = "Selling Page";

  const { auth } = useContext(AuthContext);

  let isLogdin = true;

  if (auth) {
    isLogdin = false;
  }

  return (
    <>
      {isLogdin ? (
        <div className={styles["wrapper"]}>
          <section className={styles["leftPart"]}>
            <h1>Купи, продай и намери своята книга</h1>
            <p className={styles["infoText"]}>
              E-book е онлайн книжарница, в която можеш да намериш своята дълго
              търсена книга. На нашата платформа ние продаваме както дигитални
              книги така и любимите за всички хартиени копия
              <div className=""></div>
              Успяхме ли да те заинтригуваме? Какво още чакаш? Само с няколко
              лесни стъпки и ти ще можеш да купуваш и продаваш книги.
            </p>

            <p className={styles["fee"]}>
              Месечен абонамент <span>25 лева</span>
            </p>

            <p className={styles["trialFree"]}>
              Регистрирай се днес и се възползвай от нашата промоция 2 месеца
              безплатен абонамент!
            </p>
            <p className = {styles["testBTN"]}>
            <Link to="/profile/update">
                {" "}
                <a>Update profile</a>{" "}
              </Link>
            </p>
            
       
          </section>

          <section className={styles["rightPart"]}>
            <div className={styles["img"]}>
              <img src="images/bookSell.jpeg" alt="sellImg" />
            </div>
          </section>
        </div>
      ) : (
        <section className={styles["selling"]}>
          <div className={styles["imgBackground"]}>
            <img src="images/img_Books/book2.jpg" alt="sellImg" />
          </div>

          <div className={styles["selingText"]}>
            <p> Продай своята книга!</p>
          </div>

          <div className={styles["btnSingUp"]}>
            <Link to="/selling">
              {" "}
              <a>Sell your book now</a>{" "}
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
