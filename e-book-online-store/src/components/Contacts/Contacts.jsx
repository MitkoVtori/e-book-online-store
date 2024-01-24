import styles from './Contacts.module.css';

export default function Contacts() {
  const onContactSubmit = (e) => {
    e.preventDefault();
    return alert('To be implemented!');
  };
  return (
    <div className={styles['form-container']}>
      <form onSubmit={onContactSubmit} method="POST">
        <p className={styles['sign-up']}>Пишете ни!</p>

        <label htmlFor="first_last_name">Имена</label>
        <input type="text" placeholder="Име и фамилия" />

        <label htmlFor="email">Електронна поща</label>
        <input type="email" placeholder="Вашият имейл адрес" />

        <label htmlFor="title">Тема</label>
        <input type="text" placeholder="За какво се отнася запитването" />

        <label htmlFor="text">Запитване</label>
        <textarea placeholder="Как можем да сме полезни?" />

        <button type="submit" className={styles[`btn-register`]}>
          Изпрати
        </button>
      </form>
      <iframe
        className={styles['google-map']}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.5091559305356!2d23.3280948!3d42.692938700000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8573afcccab5%3A0xb248c60f9e6931e6!2z0YPQuy4g4oCe0JjQstCw0L0g0JLQsNC30L7QsuKAnCAzLCAxMDAwINCh0L7RhNC40Y8g0YbQtdC90YLRitGALCDQodC-0YTQuNGP!5e0!3m2!1sbg!2sbg!4v1706127127745!5m2!1sbg!2sbg"
      ></iframe>
    </div>
  );
}
