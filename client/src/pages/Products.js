import React, {useEffect} from 'react';
import Auth from "../utils/auth";
import { UPDATE_PRODUCTS } from '../utils/actions';
import { useMutation, useQuery , useLazyQuery} from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import Productitem from '../components/Productitem/Productitem';
import { idbPromise } from '../utils/helpers';
import { QUERY_CATEGORIES, QUERY_PRODUCTS_BY_CATEGORY, QUERY_PRODUCTS } from '../utils/queries';
import "../components/Products/products.css"


const Products = () => {

    const {loading:loadingCategories, data:dataCategories, refetch} = useQuery(QUERY_CATEGORIES);
    const {loading:loadingProducts, data:dataProducts} = useQuery(QUERY_PRODUCTS);
    const [getProductsByCategory, {data} ] = useLazyQuery(QUERY_PRODUCTS_BY_CATEGORY);
    const [state, dispatch] = useStoreContext();

    // const { currentCategory } = state;

    useEffect(() => {
      if(dataProducts) {
        dispatch({
            type: UPDATE_PRODUCTS,
            products: dataProducts.getProducts,
        });
        dataProducts.getProducts.forEach((product) => {
            idbPromise('products', 'put', product);
          });
      } else if (!loadingProducts) {
        idbPromise('products', 'get').then((products) => {
          dispatch({
            type: UPDATE_PRODUCTS,
            products: products,
          });
        });
      }
    }, [dataProducts, loadingProducts, dispatch]);
    


const showProductFilter = (data, dataProducts) => {
    return data?.getProductsByCategory ? 
        data?.getProductsByCategory.map(product => 
        <Productitem productId={product._id} title={product.name} photoUrl= {product.image} price= {product.price} quantity={product.quantity}/>)
        : dataProducts?.getProducts?.map(product => <Productitem productId={product._id} title={product.name} photoUrl= {product.image} price= {product.price} quantity={product.quantity}/>)

}
const showProductCounter = (data, dataProducts) => {
    return data?.getProductsByCategory ?
    data?.getProductsByCategory.length
    : dataProducts?.getProducts.length
}
    // const getCategories = () => {
    //     if (loadingProducts) {
    //         return (
    //             <>
    //                 Loading...
    //             </>
    //         )
    //     }
    
    //     const ProductsData = data?.Products || {}
        
    //     return (<a href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Milk</a>)
        
    // }


const handleClick = async (category) => {
    console.log(category._id);
   await getProductsByCategory({
    variables:{categoryId:category._id}
   }) 
}
    return(
<div className="">
    
<section className="min-h-screen bg-amber-900 dark:bg-gray-800 py-10">
        <div className="container bg-orange-100 dark:bg-gray-700 px-6 py-10 mx-auto rounded">
            <div className="lg:flex lg:-mx-2">
                <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
                    { loadingCategories? <p>Loading...</p>:dataCategories?.getCategories.map(category => <a onClick= {()=> handleClick(category) } href="#" className="block font-medium text-gray-700 dark:text-gray-300 hover:underline">{category.categoryName}</a>)}
                </div>

                <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
                    <div className="flex items-center justify-between text-sm tracking-widest uppercase">
                        <p className="text-gray-500 dark:text-gray-300 count-items">{showProductCounter(data, dataProducts)} Items</p>
                        <div className="flex items-center">
                            <p className="text-gray-500 dark:text-gray-300">Sort</p>
                            <select className="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none">
                                <option value="#">Price</option>
                                <option value="#">Name</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        { showProductFilter(data, dataProducts)}
                         
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>
    );

}

export default Products;
