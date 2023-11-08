import { useBookContext } from '../../../contexts/BookContext.jsx';
import { categoriesList as categories } from '../../../utils/constants/categoriesList.js';

import styles from './CategoriesDropDown.module.css';


export default function CategoriesDropDown({
    mouseLeaveHandler
}
) {

    const {onSelectCategory} = useBookContext();

    const clickHandler = (e) => {
        const selectedCategory = (e.target.textContent);
        onSelectCategory(selectedCategory);
        mouseLeaveHandler();
    }

    return (
        <ul className={styles['dropdown-menu']}>
            {categories.sort((a, b) => a.localeCompare(b)).map(x => <li key={x} onClick={clickHandler} >{x}</li>)}
        </ul>
    )
}




