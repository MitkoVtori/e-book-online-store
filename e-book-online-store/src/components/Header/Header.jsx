import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

import styles from './Header.module.css'



export default function Header() {


    return (
        <header >
            <div className={styles['logo']}>
                <Link to="/"><h5> <strong>BOOK</strong> <span>LOVERS</span> </h5></Link>
            </div>

            <Navigation />
        </header>
    )


}