import { Link } from 'react-router-dom';
import { useState } from 'react';
import CategoriesDropDown from '../Categories/CategoriesDropDown/CategoriesDropDown';

import styles from './Navigation.module.css';
import { useAuthContext } from '../../contexts/AuthContext';



export default function Navigation() {

    const { onLogout } = useAuthContext();

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const mouseEnterHandler = () => {
        setDropdownVisible(true)
    }
    const mouseLeaveHandler = () => {
        setDropdownVisible(false)
    }

    return (
        <nav>
            <ul> 
                <li onMouseEnter={mouseEnterHandler}  onMouseLeave={mouseLeaveHandler}>
                    <p>Категории</p>
                    {isDropdownVisible && <CategoriesDropDown mouseLeaveHandler={mouseLeaveHandler} />} 
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
                    <button onClick={onLogout} >Logout</button>
                </li>

                <li>
                    <Link to="/login"> <i className="fa-solid fa-circle-user"></i> Log in </Link>
                </li>
                <li>
                    <Link to="/cart"> <i className="fa-solid fa-cart-shopping"></i> </Link>
                </li>

            </ul>
        </nav>
    )


}