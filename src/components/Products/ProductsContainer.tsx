import React, {FC} from 'react';
import {IProducts} from "../../shared/interfaces/app.interface";
import ProductItem from "./ProductItem/ProductItem";
interface ProductsContainerProps {
    arrProducts: IProducts[]
}

const ProductsContainer:FC<ProductsContainerProps> = ({arrProducts}) => {
    return (
        <div className={"max-w-6xl ml-auto"}>
            <div className="grid grid-cols-4 gap-x-4 gap-x-8 gap-y-10 grid-rows-5">
                {arrProducts.map((item, index) => {
                    console.log(item, "index")
                    return (
                        <>
                            <ProductItem key={item.id.toString()} {...item}/>
                        </>
                    )})}
            </div>
        </div>
    );
};

export default ProductsContainer;