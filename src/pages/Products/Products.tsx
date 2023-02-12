import React, {useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useState} from 'react';
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import {IProducts} from "shared/interfaces/app.interface";
import {useQuery} from "@tanstack/react-query";
import usePortal from "../../hooks/usePortal";
import {Preloader} from "components/Preloader/Preloader";
import ProductItem from "components/Products/ProductItem/ProductItem";
import cart from "assets/icons/cart.png";
import Cart from "components/Cart/Cart";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import SwitchButton from "../../components/ui/SwitchButton/SwitchButton";

const Products = () => {
    const [currentSwitch, setCurrentSwitch] = useState<number>(5);
    const {data, status, isSuccess, isLoading, error, isError, isPreviousData} = useQuery<IProducts[]>(["products"], {
        select: (data): IProducts[] => [...data, ...data, ...data, ...data, ...data, ...data, ...data].sort(() => Math.random() - 0.5).map<IProducts>((item) => {
            return {
                ...item,
                title: item.title.slice(0, 35),
                description: item.title.slice(0, 100),
            }
        }),
    })
    const [sorted, setSorted] = useState<IProducts[]>([]);
    useEffect(()=>{
        if (status !== "success") return;
        if (currentSwitch < 4 && currentSwitch >= 0) {
            if (currentSwitch === 0) {
                setSorted(data.filter((item) => item.category === "electronics").slice(0, 20))
                return;
            }
            if (currentSwitch === 1) {
                setSorted(data.filter((item) => item.category === "jewelery").slice(0, 20));
                return;
            }
            if (currentSwitch === 2) {
                setSorted(data.filter((item) => item.category === "men's clothing").slice(0, 20));
                return;
            }
            if (currentSwitch === 3) {
                setSorted(data.filter((item) => item.category === "women's clothing").slice(0, 20));
                return;
            }
        } else {
            setSorted(data.slice(0, 20))
        }

    },[currentSwitch,status])

    const isOpen = useTypedSelector((state) => state.cart.isOpen)
    const {toggleCart} = useActions()
    const PreloaderPortal = usePortal(
        <Preloader/>
    );
    const CartPortal = usePortal(
        <Cart show={isOpen} close={() => toggleCart(false)}/>
    );
    const [pageCountNum, setPageCountNum] = useState(1);
    const [limit, setLimit] = useState(20);
    if (error instanceof Error) {
        return <span className={"text-amber-50"}>Error: {error.message}</span>
    }
    if (isLoading) {
        return PreloaderPortal;
    }
    let currItem = pageCountNum < 2 ? pageCountNum * limit : 0;
    const paginationHandler = (num: number) => {
        if (status !== "success") return;
        switch (num) {
            case 1:
                setSorted(data.slice(0,20))// need to fix
                setPageCountNum(1);
                sorted.slice(0, 20)
                break;
            case 2:
                if (currentSwitch === 0) {
                    const len = data.filter((item) => item.category === "electronics").length;
                    let countSort = len - currItem; //22
                    if (countSort > 20) {
                        countSort = currItem;
                    }
                    setSorted(data.filter((item) => item.category === "electronics").slice(currItem, countSort+limit))
                }
                if (currentSwitch === 1) {
                    const len = data.filter((item) => item.category === "jewelery").length;
                    let countSort = len % limit;
                    setSorted(data.filter((item) => item.category === "jewelery").slice(currItem, countSort+limit))
                }
                if (currentSwitch === 2) {
                    const len = data.filter((item) => item.category === "men's clothing").length;
                    let countSort = len % limit;
                    setSorted(data.filter((item) => item.category === "men's clothing").slice(currItem, countSort+limit))
                }
                if (currentSwitch === 3) {
                    const len = data.filter((item) => item.category === "women's clothing").length;
                    let countSort = len - currItem; //22
                    if (countSort > 20) {
                        countSort = currItem;
                    }
                    setSorted(data.filter((item) => item.category === "women's clothing").slice(currItem, countSort+limit))
                }
                setPageCountNum(2);
                setSorted(data.slice(2 * limit, 2 * limit+limit))
                break;
            case 3:
                setPageCountNum(3);
                if (currentSwitch === 0) {
                    const len = data.filter((item) => item.category === "electronics").length;
                    const currItem = 2 * limit;
                    let countSort = len > currItem ? -(currItem - len) : 0; //22
                    setSorted(data.filter((item) => item.category === "electronics").slice(currItem, countSort+currItem))
                }
                if (currentSwitch === 3) {
                    const len = data.filter((item) => item.category === "women's clothing").length;
                    const currItem = 2 * limit;
                    let countSort = len > currItem ? -(currItem - len) : 0; //22
                    setSorted(data.filter((item) => item.category === "women's clothing").slice(currItem, countSort+currItem))
                }
                setSorted(data.slice(3 * limit, 3 * limit+limit))
                break;
            case 4:
                setPageCountNum(4);
                setSorted(data.slice(4 * limit, 4 * limit+limit))
                break;
            case 5:
                setSorted(data.slice(currItem, currItem+limit))
                break;
        }
    }

    if (status === "success" && data !== undefined) {
        console.log( data?.filter((item) => item.category === "women's clothing").length,"women's clothing")
        console.log( data?.filter((item) => item.category === "men's clothing").length,"men's clothing")
        console.log( data?.filter((item) => item.category === "electronics").length, "electronics")
        console.log( data?.filter((item) => item.category === "jewelery").length,"jewelery")
    }


    return (
        <>
            {isOpen && CartPortal}
            <section className="mb-16">
                <div className={"container"}>
                    <Breadcrumbs title={"Products"}/>
                    <div className="flex justify-between items-center">
                        <h1 className="text-gray-50 text-2xl ">Products</h1>
                        <button
                            onClick={() => toggleCart(true)}
                            className="w-8 rounded-full h-8 p-2 border-2 border-emerald-500/[.65] bg-gray-100 focus:border-emerald-500 focus:bg-emerald-500">
                            <img src={cart} width={25} height={25} alt=""/>
                        </button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="flex justify-between items-center">
                        <SwitchButton w={"max-w-3xl"} status={(num) => setCurrentSwitch(num)}/>
                    </div>
                    <button className="text-red-500" onClick={() => setCurrentSwitch(4)}>
                        all
                    </button>
                </div>
            </section>
            {
                (status === "success" && data !== undefined) && (
                    <div className={"max-w-6xl ml-auto"}>
                        <div className="grid grid-cols-4 gap-x-4 gap-x-8 gap-y-10 grid-rows-5">
                            {sorted.map((item, index) => (
                                <ProductItem key={index.toString()} {...item}/>
                            ))}
                        </div>
                    </div>
                )
            }
            <div className="mx-auto max-w-md mt-20">
                <b className="text-emerald-500 text-2xl w-full flex justify-center mb-5">
                    {pageCountNum}
                </b>
                <div className="flex justify-between">
                    <button
                        disabled={pageCountNum === 1}
                        onClick={() => setPageCountNum(pageCountNum - 1)}
                        className={`bg-black w-20 mr-4 hover:bg-emerald-500 hover:text-black ease-linear duration-150 text-md last:mr-0 text-emerald-500 border-4 border-emerald-500 font-bold py-2 px-4 rounded-lg ${pageCountNum === 1 ? "border-emerald-500/[.65] text-gray-300/[.65]" : ""}`}>
                        {pageCountNum === 1 ? "start" : "prev"}
                    </button>
                    {
                        [1, 2, 3, 4].map((item) => {
                            return <button
                                className={`bg-black mr-4 last:mr-0 text-emerald-500 border-4 border-emerald-500 font-bold py-2 px-4 rounded-lg ${pageCountNum === item ? "bg-emerald-500 text-black" : ""}`}
                                key={item}
                                onClick={() => paginationHandler(item)}>
                                {item}
                            </button>
                        })
                    }
                    <button
                        disabled={pageCountNum === 4}
                        onClick={() => paginationHandler(pageCountNum + 1)}
                        className={`bg-black w-20 hover:bg-emerald-500 hover:text-black ease-linear duration-150 text-md last:mr-0 text-emerald-500 border-4 border-emerald-500 font-bold py-2 px-4 rounded-lg ${pageCountNum === 4 ? "border-emerald-500/[.65] text-gray-300/[.65]" : ""}`}>
                        {pageCountNum === 4 ? "end" : "next"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Products;