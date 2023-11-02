
import styles from './HomePage.module.css'



export default function HomePage () {

    return (

        <div className={styles['home']} >
            <div className={styles['background']}>
                <img src="images/landing.jpg" alt="" />
            </div>

           <p className={styles['slogan']}> <q>Един начин да се справиш с живота е да го четеш като роман</q> </p>
        </div>
    )
}