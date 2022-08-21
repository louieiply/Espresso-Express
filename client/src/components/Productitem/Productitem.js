import React from "react";
import { Link } from "react-router-dom";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";

const Productitem = ({ productId ,photoUrl, title,price, description, quantity}) => {

    const [state, dispatch] = useStoreContext();
    var item = {
        _id: productId,
        photo: photoUrl,
        name: title,
        price: price,
        description: description,
        quantity: quantity
    }
    const { cart } = state;
    // console.log(cart);
    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === productId)
        if (itemInCart){
            console.log("run");
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: productId,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
              });            
        }
        else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...item, purchaseQuantity: 1 }
              });
        }
    }

    return(
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
        <Link to={`/product/${productId}`}>
            <img className="object-cover w-full h-72 xl:h-80 rounded" src={photoUrl} alt="T-Shirt"/>
        </Link>
        <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200 text-center">{title}</h4>
        <h4 className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-200 text-center">{quantity} item in stock</h4>
        <p className="text-blue-500">${price}</p>
            <button className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={addToCart}
                    
            >
                <i className="fa fa-shopping-cart fa-sm" aria-hidden="true"></i> <span className="mx-1">Add to cart</span>
            </button>

    </div>);

}

export default Productitem;

