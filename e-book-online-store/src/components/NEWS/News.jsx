import styles from "../NEWS/News.module.css";

export default function News() {
  return (
    <>
      <div className={styles["wrapper"]}>
        <div className={styles["imgCover"]}>
          <img src="images/img_Books/book6.jpg" alt="" />
        </div>

        <div className={styles["title"]}>
          <h2>Новини</h2>
        </div>
        <div className={styles["slogan"]}>
          <p>
            Тук може да откриете най - актуалните новини, събития и статии,
            свързани с книгите
          </p>
        </div>

        <section className={styles["books-wrapper"]}>
          <article className={styles["booksCard"]}>
            <div className={styles["bookImg"]}>
              <img src="/images/img_Books/book3.jpg" alt="pic" />
            </div>
            <div className={styles["bookCardInfo"]}>
              <h3>Най - добър роман на 2023г.</h3>
              <p>
                Вижте кои са най - добрите романи за 2023 година според
                различните категории.
              </p>
            </div>
          </article>

          <article className={styles["booksCard"]}>
            <div className={styles["bookImg"]}>
              <img src="/images/img_Books/book7.jpg" alt="" />
            </div>
            <div className={styles["bookCardInfo"]}>
              <h3>Детски книжки за Коледа</h3>
              <p>
                Започваме инициатива за даряване на детски кнжки за коледен
                подарък на деца в нужда.Може да качите вашата книжка, която
                искате да дарите с описание Дари или да закупите , такава,
                която ние да дарим.
              </p>
            </div>
          </article>

          <article className={styles["booksCard"]}>
            <div className={styles["bookImg"]}>
              <img src="/images/img_Books/book8.jpg" alt="" />
            </div>
            <div className={styles["bookCardInfo"]}>
              <h3>Предстоящи книги</h3>
              <p>
                Разгледайте нашите препоръчани нови издания и открийте наскоро
                публикувани книги, за които всички говорят. Имаме най-новите
                бестселъри в областта на художествената и научната литература от
                известни автори, знаменитости и бъдещи писатели.
              </p>
            </div>
          </article>
        </section>
      </div>
    </>
  );
}
