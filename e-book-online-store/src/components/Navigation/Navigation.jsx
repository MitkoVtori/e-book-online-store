import { Link } from 'react-router-dom';

import  './Navigation.css';

export default function Navigation() {


    return (
        <nav>
            <ul>

                <li>
                    <Link to="/categories">Категории</Link>
                </li>
                <li>
                    <Link to="/news">Новини</Link>
                </li>
                <li>
                    <Link to="/sell">Продай книга</Link>
                </li>
                <li>
                    <Link to="/contacts">Контакти</Link>
                </li>
                <li>
                    <Link to="/login"> <i class="fa-solid fa-circle-user"></i> Log in </Link>
                </li>
                <li>
                    <Link to="/cart"> <i class="fa-solid fa-cart-shopping"></i> </Link>
                </li>

            </ul>
        </nav>
    )


}