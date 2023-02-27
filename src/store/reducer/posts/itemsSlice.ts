import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IProducts} from "../../../shared/interfaces/app.interface";
type CartResArr = IProducts & { count: number }

interface cartItem extends IProducts {
    count: number
}

interface CounterState {
    countItems: number
    Products: cartItem[]
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
        cartAdd: (state, action: PayloadAction<IProducts>) => {
            console.log(action.payload)
            const addedCount = [action.payload].map(elem => ({
                ...elem,
                count: 1
            }))
            const data = [...state.Products, ...addedCount];

            state.Products = data.reduce<cartItem[]>((acc, current) => {
                const x = acc.find(item => item.id === current.id);
                if (!x) {
                    return acc.concat([current]);
                } else
                    x.count++;
                return acc;
            }, [] as cartItem[]);
            cartLength();
        },
        cartRemove: (state, action: PayloadAction<number>) => {
            state.Products = state.Products.filter((item) => item.id !== action.payload);
            cartLength();
        },
        cartClear: (state) => {
            state.Products = [];
            cartLength();
        },
        cartUpdate: (state, action: PayloadAction<{
            id: number,
            count: number
        }>) => {
            const {id, count} = action.payload;
            state.Products = state.Products.map((item: CartResArr) => {
                if (item.id === id) {
                    item.count = count;
                }
                return item;
            })
            state.Products = state.Products.filter((item: CartResArr) => item.count > 0);
        },
        toggleCart: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
})
export const {cartLength, cartAdd, cartRemove, cartClear,cartUpdate ,toggleCart} = itemsSlice.actions;


  export default itemsSlice.reducer