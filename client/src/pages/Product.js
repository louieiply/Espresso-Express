import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from '@apollo/client';
import { QUERY_PRODUCT_BY_ID } from "../utils/queries";
import { useParams } from 'react-router-dom';
import { ADD_TO_CART, UPDATE_CART_QUANTITY, UPDATE_PRODUCTS, } from '../utils/actions';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';



// import "https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css";

const Product = () => {

  const [state, dispatch] = useStoreContext();
  const { products, cart } = state;
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  console.log(productId);
  const { loading, error, data } = useQuery(QUERY_PRODUCT_BY_ID, {
    variables: { productId: productId },
  });

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === productId));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, productId]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === productId);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: productId,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };


  console.log(data);
  if (loading) return (<h1>loading</h1>);
  if (error) return (<h1>`Error! {error.message}`</h1>);

  return (

    <div>
      {/* <h1>{JSON.stringify(data)}</h1>     */}
      <div className="min-w-screen min-h-screen bg-amber-900 dark:bg-gray-800 flex items-center p-5 lg:p-10 overflow-hidden relative">
        <div className="w-full max-w-6xl bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left rounded">
          <div className="md:flex items-center -mx-10">
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <div className="relative">
                <img src={data.getProductByID.image} className="w-full relative z-10" alt="" />
                <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-10">
              <div className="mb-10">
                <h1 className="font-bold uppercase text-2xl mb-5">{data.getProductByID.name}</h1>
                <p className="text-sm">{data.getProductByID.description}</p>
              </div>
              <div>
                <div className="inline-block align-bottom mr-5">
                  <span className="text-2xl leading-none align-baseline">$</span>
                  <span className="font-bold text-5xl leading-none align-baseline">{data.getProductByID.price}</span>
                  {/* <span className="text-2xl leading-none align-baseline">.99</span> */}
                </div>
                <div className="inline-block align-bottom">
                  <button className="bg-amber-900 dark:bg-gray-900 opacity-75 hover:opacity-100 text-gray-100 dark:text-gray-300 rounded-full px-10 py-2 font-semibold" onClick={addToCart}><i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Product;