import styles from '../NotFound/NotFound.module.css'

export default function NotFound(){
    document.title = 'Error';
    return(
        <>
        <div className={styles['image']}>

            <p>Грешка</p>
        </div>
        </>
    );

}