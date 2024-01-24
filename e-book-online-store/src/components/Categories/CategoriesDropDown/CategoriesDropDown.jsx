/* eslint-disable react/prop-types */
// import { useBookContext } from '../../../contexts/BookContext.jsx';
// import { categoriesList as categories } from '../../../utils/constants/categoriesList.js';

// import styles from './CategoriesDropDown.module.css';

// export default function CategoriesDropDown({
//     mouseLeaveHandler
// }) {
//     const { onSelectCategory } = useBookContext();

//     const clickHandler = (e) => {
//         const selectedCategory = e.target.textContent.toLowerCase();
//         onSelectCategory(selectedCategory);
//         mouseLeaveHandler();
//     }

//     return (
//         <ul className={styles['dropdown-menu']}>
//             {categories.sort((a, b) => a.localeCompare(b)).map(x => <li key={x} onClick={clickHandler}>{x}</li>)}
//         </ul>
//     )
// }



import { useBookContext } from '../../../contexts/BookContext.jsx';
import { categoriesList as categories } from '../../../utils/constants/categoriesList.js';
import { Link } from 'react-router-dom';

import styles from './CategoriesDropDown.module.css';

const categoryToLink = {
    "най - новите": 'newest',
    "най - продаваните": 'best-sellers',
    'бизнес': 'bussines',
    "детски книжки": 'children',
    'семейни': 'family',
    "енциклопедии": 'enciclopedia',
    "изкуство": 'art',
    "фантастика": 'fantasy',
    'романи': 'romans',
    "поезия": 'poetry',
    "психология": 'psycology',
    "за тийнейджъри": 'teens',
    "здраве и красота": 'health-and-beauty',
    "пътуване": 'travel',
    "други": 'other',

    //TODO: match category names to backend!!!

    // Add other mappings as needed
};

export default function CategoriesDropDown({ mouseLeaveHandler }) {
    const { onSelectCategory } = useBookContext();

    const clickHandler = (selectedCategory) => {
        onSelectCategory(selectedCategory.toLowerCase());
        mouseLeaveHandler();
    }

    return (
        <ul className={styles['dropdown-menu']}>
            {categories.sort((a, b) => a.localeCompare(b)).map(category => (
                <li key={category}>
                   <Link to={`/catalog/${categoryToLink[category.toLowerCase()]}`} onClick={() => clickHandler(category)}>
                        {category}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
