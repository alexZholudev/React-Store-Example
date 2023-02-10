import {bindActionCreators} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {cartLength, cartAdd, cartRemove, cartClear, toggleCart, cartUpdate} from "store/reducer/posts/itemsSlice";

const actions = {
    cartLength,
    cartAdd,
    cartRemove,
    cartClear,
    toggleCart,
    cartUpdate
}

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};
