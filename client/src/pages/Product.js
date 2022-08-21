import React from "react";
import { useLazyQuery,useQuery } from '@apollo/client';
import { QUERY_PRODUCT_BY_ID } from "../utils/queries";
import { useParams } from 'react-router-dom';
// import "https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css";
const Product = () => {
    const {productId} = useParams();
    console.log(productId);
    const {loading, error, data} = useQuery(QUERY_PRODUCT_BY_ID, {
        variables: { productId: productId},
    });
    console.log(data);
    if(loading) return (<h1>loading</h1>);
    if (error) return (<h1>`Error! {error.message}`</h1>);

    return(

        <div>
            {/* <h1>{JSON.stringify(data)}</h1>     */}
            <div className="min-w-screen min-h-screen bg-amber-900 dark:bg-gray-800 flex items-center p-5 lg:p-10 overflow-hidden relative">
                <div className="w-full max-w-6xl bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left rounded">
                    <div className="md:flex items-center -mx-10">
                        <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                            <div className="relative">
                                <img src={data.getProductByID.image} className="w-full relative z-10" alt=""/>
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
                                    <button className="bg-amber-900 dark:bg-gray-900 opacity-75 hover:opacity-100 text-gray-100 dark:text-gray-300 rounded-full px-10 py-2 font-semibold"><i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
                <div>
                    <a title="Buy me a beer" href="https://www.buymeacoffee.com/scottwindon" target="_blank" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
                        <img className="object-cover object-center w-full h-full rounded-full" src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"/>
                    </a>
                </div>
            </div>
        </div>   
    )
}

export default Product;