import styles from './Footer.module.css'

export default function Footer () {

    return (
        <footer>
            <div className={styles['footersOptions']}>

                <div className={styles['footerSector']}>
                    <h1>Адрес/Контакти</h1>
                    <p>София, България</p>
                    <p>ул. Иван Вазов 3</p>
                    <p>+359 899 123 123</p>
                    <p>info@booklover.bg</p>
                </div>

                <div className={styles['footerSector']}>
                    <h1>FAQ</h1>
                    <p>Политика</p>
                    <p>Доставка и връщане</p>
                </div>

                {/* <div className={styles['footerShippingAndReturn']}>
                    <h1>Shipping and returns</h1>
                </div> */}

                

                <div className={styles['footerSector']}>
                <h1>Начини на плащане</h1>
                <p>Visa</p>
                <p>MasterCard</p>
                <p>Revolut</p>
                <p>Epay</p>
                </div>

                <div className={styles['footerSector']}>
                    <h1>Социални мрежи</h1>
                    <p className={styles['linkFB']}>
                        <a href="www.facebook.com">Facebook</a>
                    </p>
                    <p className={styles['linkInstagram']}>
                        <a href="www.instagram.com">Instagram</a>
                    </p>
                    
                </div>

                <div className={styles['footerSector']}>
                <h1>Научете първи новостите!</h1>
                <p>Абонирайте се за нашия бюлетин</p>
                <div className={styles['inputText']}>
                    <input type="text" id='text' name='text' className={styles['emailInput']} placeholder="Вашият имейл" />
                </div>
                    <div className={styles['btnSubscribe']}>

                        {/* TODO: add link! */}
                        
                        <a href="#">Абонирай се</a>
                        
                    </div>
                </div>
            </div>
        </footer>
    )
}