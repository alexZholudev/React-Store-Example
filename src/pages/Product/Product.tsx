import React from 'react';
import {useParams} from "react-router-dom";
import {useQueries, UseQueryOptions} from "@tanstack/react-query";
import {IProducts} from "../../shared/interfaces/app.interface";
type paramsUseProducts = [string|undefined, string | undefined];
const useProducts = (arrParams:paramsUseProducts) => {
    if (arrParams[0] !== undefined && arrParams[1] !== undefined) {
        return  useQueries({
            queries : arrParams.map<UseQueryOptions<IProducts[]>>((acc,index) => {
                return {
                    queryKey : index < 1 ? ["products/category",arrParams[0]] : ["products",arrParams[1]],
                }
            })
        });
    } else {
        throw new Error("lol!!! no empty params")
    }
}

const Product = () => {
    const  {id , cat} = useParams();
    const fixedCat = cat?.replace(/%/g, " ");

   const res = useProducts([fixedCat,id]);
   const {data:dataCat, status:statusCat,isLoading:isLoadCat,error:isErrCat} = res[0];
   const {data, status,isLoading,error,isError} = res[1];

   if (isLoadCat && isLoading) return null
    console.log(dataCat,'dataCat')
    return (
        <div className="text-white">
            Product {id} . Cat is {fixedCat}
            {
                statusCat === "success" && dataCat.map((item:IProducts,index) => {
                    return (
                        <div key={index.toString()}>
                            <p>
                                {item.title} - {item.price} - {item.category}
                            </p>
                            <div className="border-red-900 border-2">
                                <img src={item.image} height={300} width={300} alt=""/>
                            </div>
                            <div>{item.description}</div>
                            <div>
                                <img width={150} height={150} src={item.image} alt=""/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Product;