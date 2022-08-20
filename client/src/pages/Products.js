import React, {useState, setState} from 'react';
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation, useQuery , useLazyQuery} from '@apollo/client';
import Productitem from '../components/Productitem/Productitem';
import { QUERY_CATEGORIES, QUERY_PRODUCTS_BY_CATEGORY } from '../utils/queries';
import "../components/Products/products.css"

const Products = () => {
    const {loading:loadingCategories, data:dataCategories, refetch} = useQuery(QUERY_CATEGORIES);
    const [getProductsByCategory, {data} ] = useLazyQuery(QUERY_PRODUCTS_BY_CATEGORY);
    // const {loading:loadingProducts, data:dataProducts} = useQuery(QUERY_PRODUCT);
    const [selectedCategory, setSelectedCategory] = useState(null);
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
//    const [selectedCategory,setSelectedCategory]= setState(category)
    console.log(category._id);
   await getProductsByCategory({
    variables:{categoryId:category._id}
   }) 
}
    return(
<div className="">
    
<section className="min-h-screen light:bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
            <div className="lg:flex lg:-mx-2">
                <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
                    { loadingCategories? <p>Loading...</p>:dataCategories.getCategories.map(category => <a onClick= {()=> handleClick(category) } href="#" className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">{category.categoryName}</a>)}
                </div>

                <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
                    <div className="flex items-center justify-between text-sm tracking-widest uppercase">
                        <p className="text-gray-500 dark:text-gray-300 count-items">6 Items</p>
                        <div className="flex items-center">
                            <p className="text-gray-500 dark:text-gray-300">Sort</p>
                            <select className="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none">
                                <option value="#">Price</option>
                                <option value="#">Name</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                         {data?.getProductsByCategory?.map(product => 

                            <Productitem productId={product._id} title={product.name} photoUrl= {product.image} price= {product.price}/>
                            
                         )}
                         
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>
    );

}

export default Products;
