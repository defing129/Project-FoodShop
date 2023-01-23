import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store/store";
import {getCartFromLS} from "../../components/utils/getCartFromLS";
import {calcTotalPrice} from "../../components/utils/calcTotalPrice";


export type CartItem = {
    id: string;
    count: number;
    title: string;
    price: number;
    imageUrl: string;
    type: number;
    size: number;
}

interface CartSliceState {
   items: CartItem[];
   totalPrice: number;
}
const { items, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
    items: items,
    totalPrice: totalPrice,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action ) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
            state.totalPrice = calcTotalPrice(state.items);

        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0
        }
    },
})

export const selectCart = (state: RootState) => state.cart
export const selectCartItemId = (id:string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id)

export const {addItem, clearItems, removeItem} = cartSlice.actions;

export default cartSlice.reducer;