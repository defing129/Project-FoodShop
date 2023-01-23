import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store/store";


export enum SortPropertyEnum {
    RATTING = 'ratting',
    TITTLE = 'title',
    PRICE = 'price'
}

export type Sort = {
    name: string;
    sortProperty: SortPropertyEnum;
}

interface FilterSliceState {
    categoryId: number;
    currentPage: number;
    sort: Sort;
    searchValue: string;
}

const initialState: FilterSliceState = {
    categoryId: 0,
    currentPage: 1,
    searchValue: '',
    sort: {
        name: 'Популярности',
        sortProperty: SortPropertyEnum.RATTING
    }
}

 const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSortType(state, action) {
            state.sort = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
        },
        setSearchValue( state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        }
    },
})

export const selectCategoryId = (state: RootState) => state.filter.categoryId;
export const selectSort = (state: RootState) => state.filter.sort
export const selectSortType = (state: RootState) => state.filter.sort.sortProperty;
export const selectorSearchValue = (state: RootState) => state.filter.searchValue;


export const {setCategoryId, setSortType, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;