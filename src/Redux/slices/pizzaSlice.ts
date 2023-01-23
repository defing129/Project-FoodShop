import  {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store/store";
import {Sort} from "./filterSlices";


type Pizza = {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    sizes: number[];
    types: number[];
}

interface PizzaSliceState {
    items: Pizza[],
    status: Status,
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export type SearchPizzaParams = {
    searchValue: string;
    sortType: string;
    currentPage: string;
    categoryId: number;
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {
            searchValue,
            categoryId,
            currentPage,
            sortType
        } = params;
        const {data} = await axios.get<Pizza[]>(`https://6320b58682f8687273a61b57.mockapi.io/items?title=${searchValue}&category=${categoryId > 0 ? categoryId : ''}&page=${currentPage}&limit=4&sortBy=${sortType}&order=desc`)
        return data;
    }
);


const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,

}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });

    }
})

export const {setItems} = pizzaSlice.actions;
export const selectPizza = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;