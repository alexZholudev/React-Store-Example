import React from 'react';
import {useParams} from "react-router-dom";
import {useQueries, UseQueryOptions} from "@tanstack/react-query";
import {IProducts} from "../../shared/interfaces/app.interface";
import Header from "components/Header/Header";
import usePortal from "../../hooks/usePortal";
import {Preloader} from "../../components/Preloader/Preloader";
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
    console.log(res, "res")
   const {data:dataCat, status:statusCat,isLoading:isLoadCat,error:isErrCat} = res[0];
    const PreloaderPortal = usePortal(
        <Preloader/>
    );

   const {data,status,isLoading,error,isError} = res[1];
    if (isLoadCat && isLoading && dataCat === undefined) {
       return PreloaderPortal
   }


    const {title,price,description,image} = data as IProducts[];


    if (status === "success" && statusCat === "success") {

        console.log(dataCat, "dataCat")
        // console.log(data, "data")
        return (
            <>
                <Header/>
                <section>
                    <div className="container">
                        <div className="wrap">
                            <div className="flex flex-col p-3.5">
                                <div className="max-w-2xl max-h-12">
                                    <img src={data} className="w-full h-full" alt="img 1"/>
                                </div>
                                <div className="product__info">
                                    <div className="product__info__title">
                                        <h2>{data.title}</h2>
                                    </div>
                                    <div className="product__info__price">
                                        <h2>{data.price}</h2>
                                    </div>
                                    <div className="product__info__description">
                                        <p>{data.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }else{
        return <div>404</div>
    }
};

export default Product;