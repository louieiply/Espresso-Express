import React, {useState, setState} from 'react';
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation, useQuery , useLazyQuery} from '@apollo/client';
import Productitem from '../components/Productitem/Productitem';
import { QUERY_CATEGORIES, QUERY_PRODUCTS_BY_CATEGORY } from '../utils/queries';

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
        
    //     return (<a href="#" class="block font-medium text-gray-500 dark:text-gray-300 hover:underline">Milk</a>)
        
    // }
const handleClick = async (category) => {
//    const [selectedCategory,setSelectedCategory]= setState(category)
   await getProductsByCategory({
    variables:{categoryId:category._id}
   }) 
   console.log(data)
}
    return(
<div class="">
    
{/* <div class="h-56 grid grid-cols-3 gap-4 content-center"> */}
{/* </div> */}
<section class="h-screen bg-white dark:bg-gray-900">
        <div class="container px-6 py-10 mx-auto">
            <div class="lg:flex lg:-mx-2">
                <div class="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
                    { loadingCategories? <p>Loading...</p>:dataCategories.getCategories.map(category => <a onClick= {()=> handleClick(category) } href="#" class="block font-medium text-gray-500 dark:text-gray-300 hover:underline">{category.categoryName}</a>)}
                </div>

                <div class="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
                    <div class="flex items-center justify-between text-sm tracking-widest uppercase">
                        <p class="text-gray-500 dark:text-gray-300 count-items">6 Items</p>
                        <div class="flex items-center">
                            <p class="text-gray-500 dark:text-gray-300">Sort</p>
                            <select class="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none">
                                <option value="#">Price</option>
                                <option value="#">Name</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                         {data?.getProductsByCategory?.map(product => <Productitem title={product.name} photoUrl= {product.image} price = {product.price}/>)}
                         
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>
    );

}

export default Products;
