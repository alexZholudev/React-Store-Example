import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './reducer/posts/itemsSlice'
import {useDispatch} from "react-redux";
export const store = configureStore({
    reducer: {
        cart: itemsReducer,
    }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type TypeRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;



