import React from "react";
import { useLazyQuery,useQuery } from '@apollo/client';
import { QUERY_PRODUCT_BY_ID } from "../utils/queries";
import { useParams } from 'react-router-dom';
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
            <h1>
                {JSON.stringify(data)}
            </h1>
        </div>
    )
}

export default Product;