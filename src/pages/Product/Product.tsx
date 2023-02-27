import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {useQueries, UseQueryOptions} from "@tanstack/react-query";
import {IProducts} from "../../shared/interfaces/app.interface";
import Header from "components/Header/Header";
import usePortal from "../../hooks/usePortal";
import {Preloader} from "../../components/Preloader/Preloader";
import {ButtonCart} from "../../components/ui/ButtonCart/ButtonCart";
import {StarsIcon} from "shared/icons/iconsElement";
type paramsUseProducts = [string | undefined, string | undefined];


const useProducts = (arrParams: paramsUseProducts) => {
    if (arrParams[0] !== undefined && arrParams[1] !== undefined) {
        return useQueries({
            queries: arrParams.map<UseQueryOptions<IProducts>>((acc, index) => {
                return {
                    queryKey: index < 1 ? ["products/category", arrParams[0]] : ["products", arrParams[1]],
                }
            })
        });
    } else {
        throw new Error("lol!!! no empty params")
    }
}

const Product = () => {
    const {id, cat} = useParams();
    const fixedCat = cat?.replace(/%/g, " ");
    const [imgLoaded, setImgLoaded] = useState<boolean>(false);
    const res = useProducts([fixedCat, id]);
    console.log(res, "res")

    const {data: dataCat, status: statusCat, isLoading: isLoadCat, error: isErrCat} = res[0];

    const PreloaderPortal = usePortal(<Preloader/>);
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (imgRef.current !== null) {
            imgRef.current.onload = () => {
                console.log(123)
                setImgLoaded(true)
            }
        }
    }, [imgRef])

    if (statusCat !== "success" && imgLoaded === false) {
        return PreloaderPortal
    }

    const {data, status, isLoading, error, isError} = res[1];


    const {title, price, description, image, category, rating} = data! ?? [];
    const {title: titleCat, description: descCat} = dataCat! ?? [];
    console.log(isLoading)
    return (
        <>
            <Header/>
            <section className="bg-header-top/[.68]">
                <div className="container">
                    <div className="wrap py-3">
                        <div className="text-amber-50 hover:text-amber-100">
                            <p>
                                Product : {title}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container text-white mt-10">
                    <div className="wrap">
                        <div className="flex justify-between p-3.5">
                            <div className="flex flex-wrap max-h-80">
                                <div className="text-white mb-6 w-1/2 text-lg hover:text-white/[.87]">
                                    <h2>{title}</h2>
                                </div>
                                <div
                                    className="text-white w-1/4 mb-6 flex flex-col ml-6 text-lg hover:text-white/[.87]">
                                    <h2 className="flex items-center"><p
                                        className="font-700 uppercase">Pricing</p>: {price} <span
                                        className="text-emerald-500">$$$</span></h2>
                                    <p className="text-sm flex items-center"><span
                                        className="font-700 flex items-center">Category</span></p>
                                </div>
                                <div className="text-white max-w-2xl w-full mb-24 text-lg">
                                    <p className="hover:text-white/[.87]"><span
                                        className="font-700 block w-full mb-3 hover:text-white/[.87]">Description :</span> {description}
                                    </p>
                                </div>
                                <div className="max-w-2xl w-full">
                                    <ButtonCart isGreen title={"buy"} disabled={false} onClick={()=>{console.log(123)}}/>
                                </div>
                            </div>
                            <div
                                className="max-w-xl h-[30rem] object-cover p-3.5 ease-linear duration-300 bg-white border-4 border-emerald-500 rounded-2xl w-full">
                                <div className="p-1.5 flex items-center">
                                    <p className="text-yellow-400 mr-8 text-2xl">
                                        {rating?.rate}
                                    </p>
                                    <StarsIcon width={25} height={25}/>
                                </div>
                                <img ref={imgRef} width={325} height={275} src={image}
                                     className="w-full object-contain ease-in-out duration-300 h-full"
                                     alt="img 1"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Product;
