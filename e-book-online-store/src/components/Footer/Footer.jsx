import styles from './Footer.module.css'

export default function Footer () {

    return (
        <footer>
            <div className={styles['footersOptions']}>

                <div className={styles['footerAdress']}>
                    <h1>Adress/Contacts</h1>
                    <p>Sofia,Bulgaria</p>
                    <p>Ivan Vazov №3</p>
                    <p>+359/8999/123/123</p>
                    <p>info@booklover.bg</p>
                </div>

                <div className={styles['footerFAQ']}>
                    <h1>FAQ</h1>
                </div>

                <div className={styles['footerShippingAndReturn']}>
                    <h1>Shipping and returns</h1>
                </div>

                <div className={styles['footerStore']}>
                <h1>Store police</h1>
                </div>

                <div className={styles['footerPayment']}>
                <h1>Payment method</h1>
                <p>Visa</p>
                <p>MasterCard</p>
                <p>Revolut</p>
                <p>Epay</p>
                </div>

                <div className={styles['footerSocial']}>
                    <h1>Social media</h1>
                    <div className={styles['linkFB']}>
                        <a href="www.facebook.com">Facebook</a>
                    </div>
                    <div className={styles['linkInstagram']}>
                        <a href="www.instagram.com">Instagram</a>
                    </div>
                    
                </div>

                <div className={styles['footerSUbscribe']}>
                <h1>Be the first to Know</h1>
                <p>Sign up for our newsletter</p>
                <p className={styles['inputText']}>
                    <input type="text" id='text' name='text' className={styles['emailInput']} placeholder="Enter your email here*" />
                </p>
                    <div className={styles['btnSubscribe']}>
                        
                        <a href="#">Subscribe</a>
                        
                    </div>
                </div>
            </div>
        </footer>
    )
}