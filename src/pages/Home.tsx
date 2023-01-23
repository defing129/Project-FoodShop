import React, { useEffect, useRef, useState} from "react";

import qs from "qs";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";


import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {
    selectCategoryId,
    selectorSearchValue,
    selectSortType,
    setCategoryId,
    setFilters
} from "../Redux/slices/filterSlices";
import {selectPizza} from "../Redux/slices/pizzaSlice";
import {fetchPizzas, SearchPizzaParams} from "../Redux/slices/pizzaSlice";
import {useAppDispatch} from "../Redux/store/store";


const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const searchValue = useSelector(selectorSearchValue)
    const categoryId = useSelector(selectCategoryId);
    const sortType = useSelector(selectSortType);
    const {items, status} = useSelector(selectPizza);

    const [currentPage,  setCurrentPage] = useState(1);

    const onChangeCategory = (i: number) => {
        dispatch(setCategoryId(i))
    }





    const getPizzas =  ()  => {
           dispatch(fetchPizzas({
               searchValue,
               categoryId,
               currentPage: String(currentPage),
               sortType,
           }));
    }


    useEffect(() => {
        if (window.location.search) {
            const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams ;
            const sort = list.find(obj => obj.sortProperty === params.sortType);
            dispatch(
                setFilters({
                    searchValue: params.searchValue,
                    categoryId: Number(params.categoryId),
                    currentPage: Number(params.currentPage) ,
                    sort: sort ? sort : list[0],
                })
            )
            isSearch.current = true;
        }

    },[])


    useEffect(() => {
        getPizzas();
           isSearch.current = false;
    }, [categoryId, sortType, currentPage, searchValue]);


    useEffect(() => {
       if ( isMounted.current) {
           const queryString = qs.stringify({
               sortProperty: sortType,
               categoryId,
               currentPage,
               searchValue
           })
           navigate(`?${queryString}`);
       }
       isMounted.current = true;
    }, [categoryId, sortType, currentPage, searchValue]);

    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories onChangeCategory={onChangeCategory}  />
                <Sort  />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    status === 'loading' ? [...new Array(4)].map((_, index) => (
                        <Skeleton key={index}/>
                    )) : pizzas
                }

            </div>
            <Pagination setCurrentPage={(i) => setCurrentPage(i)}/>
        </div>
    )
}


export default Home;