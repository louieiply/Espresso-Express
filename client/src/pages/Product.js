import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCT } from "../utils/queries";
const Product = () => {
    const {loading, data} = useQuery(QUERY_PRODUCT);
    if (loading) {
        return (
            <>
                Loading...
            </>
        )
    }
    const productData = data?.me || {}
    return(
        <>
            
            <p>Profile Page</p>
            Id:{productData._id}
            <br/>
            Product Name:{productData.name}
            <br/>
            Product description:{productData.name}
            <br/>
        </>
    );
}

export default Product;