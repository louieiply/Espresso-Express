import React from "react";

const Productitem = ({photoUrl, title,price, description}) => {

    return(
    <div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
        <img class="object-cover w-full h-72 xl:h-80" src={photoUrl} alt="T-Shirt"/>
        <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200">{title}</h4>
        <p class="text-blue-500">${price}</p>
        
        <button class="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            <i class="fa fa-shopping-cart fa-sm" aria-hidden="true"></i> <span class="mx-1">Add to cart</span>
        </button>
    </div>);

}

export default Productitem;

