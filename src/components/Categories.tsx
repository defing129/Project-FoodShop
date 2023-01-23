import React from "react";

import {  useSelector } from "react-redux";
import {selectCategoryId} from "../Redux/slices/filterSlices";


type CategoriesProps = {
    onChangeCategory: (i: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({onChangeCategory}) => {

    const categoryId = useSelector(selectCategoryId)


    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value, i) => {
                        return (
                            <li
                                key={i}
                                onClick={() => onChangeCategory(i)}
                                className={categoryId === i ? 'active' : ''}>
                                {value}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
}


export default Categories;