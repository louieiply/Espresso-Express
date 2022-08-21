import { useReducer } from "react";
import {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
} from "./actions";

export const reducer = (state, action) => {
    // console.log(state);
    switch (action.type){
        case UPDATE_PRODUCTS:
            console.log(action);
            return {
                ...state,
                products: [...action.products],
            };
        case ADD_TO_CART:
            console.log(action);
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product],
            };
    }
}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}