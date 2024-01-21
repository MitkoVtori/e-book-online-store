import styles from '../NotFound/NotFound.module.css'
import { Link } from "react-router-dom";

export default function NotFound(){
    document.title = 'Error';
    return(
        <>
        <div className={styles['not-found-container']}>
            <img className={styles['image']}
            src="images/fix-broken-links.png"
            />      
            <Link to={"/"} className={styles['home-link']}>Начало</Link>
        </div>
        </>
    );

}