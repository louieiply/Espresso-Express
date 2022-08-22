import { useReducer } from "react";
import {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY
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
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            };
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                    if( action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity
                    }
                    return product
                })
            };
    }
}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}