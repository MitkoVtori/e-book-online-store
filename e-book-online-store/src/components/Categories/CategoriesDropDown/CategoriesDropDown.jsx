import { categoriesList as categories } from '../../../utils/constants/categoriesList.js';

import styles from './CategoriesDropDown.module.css';


export default function CategoriesDropDown({
    mouseLeaveHandler
}
) {

    const clickHandler = (e) => {
        console.log(e.target.textContent);
//Тук ще се извиква метод от BookContext(когато имаме такъв), на който ще се подава като аргумент (categoryName),
//  за да може при зареждане на CategoriesPage да направи заявка за избраната категория

        mouseLeaveHandler();
    }

    return (
        <ul className={styles['dropdown-menu']}>
            {categories.sort((a, b) => a.localeCompare(b)).map(x => <li key={x} onClick={clickHandler} >{x}</li>)}
        </ul>
    )
}




