import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IProducts} from "../../../shared/interfaces/app.interface";

// Define a type for the slice state
interface CounterState {
    countItems: number
    Products: IProducts[]
    isOpen: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
    countItems: 0,
    Products: [],
    isOpen: false
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        cartLength: state => {
            state.countItems = state.Products.length;
        },
        cartAdd: (state, action: PayloadAction<any>) => {
            state.Products.push(action.payload);
            cartLength();
        },
        cartRemove: (state, action: PayloadAction<any>) => {
            state.Products = state.Products.filter((item: any) => item.id !== action.payload.id);
            cartLength();
        },
        cartClear: (state) => {
            state.Products = [];
            cartLength();
        },
        toggleCart: (state,action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
// export const selectCount = (state: RootState) => state.value
export const { cartLength,cartAdd,cartRemove,cartClear,toggleCart } = itemsSlice.actions;


export default itemsSlice.reducer