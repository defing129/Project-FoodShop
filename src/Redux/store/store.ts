import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
import filterReducer from '../slices/filterSlices'
import cartReducer from '../slices/cartSlices'
import pizzaReducer from '../slices/pizzaSlice'

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        pizza: pizzaReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
