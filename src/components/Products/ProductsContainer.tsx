import React, {FC} from 'react';
import {IProducts} from "../../app/app.interface";
import ProductItem from "./ProductItem/ProductItem";
interface ProductsContainerProps {
    arrProducts: IProducts[]
}

const ProductsContainer:FC<ProductsContainerProps> = ({arrProducts}) => {
    return (
        <div className="grid grid-cols-4 gap-x-4 gap-8 grid-rows-5">
            {arrProducts.map((item, index) => {
                console.log(item, "index")
                return (
                   <>
                       <ProductItem key={index.toString()} {...item}/>
                   </>
                )})}
        </div>
    );
};

export default ProductsContainer;