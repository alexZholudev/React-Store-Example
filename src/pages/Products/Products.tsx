import React, {useState} from 'react';
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
    const [currentSwitch, setCurrentSwitch] = useState<number>(0);

    const {data, status, isSuccess, isLoading, error, isError, isPreviousData} = useQuery<IProducts[]>(["products"], {
        select: (data): IProducts[] => [...data, ...data, ...data, ...data].sort(() => Math.random() - 0.5).map<IProducts>((item) => {
            return {
                ...item,
                title: item.title.slice(0, 35),
                description: item.title.slice(0, 100),
            }
        }),
    })
    const filteredData = () => {
        switch (currentSwitch) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }
    }
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
                </div>
            </section>
            {
                (status === "success" && data !== undefined) && (
                    <div className={"max-w-6xl ml-auto"}>
                        <div className="grid grid-cols-4 gap-x-4 gap-x-8 gap-y-10 grid-rows-5">
                            {data.slice(currItem, limit + currItem).map((item, index) => (
                                <ProductItem key={index.toString()} {...item}/>))}
                        </div>
                    </div>
                )
            }
            <div className="mx-auto max-w-md mt-20">
                <b className="text-emerald-500 text-2xl w-full flex justify-center mb-5">
                    {
                        pageCountNum
                    }
                </b>
                <div className="flex justify-between">
                    <button
                        disabled={pageCountNum === 1}
                        onClick={() => setPageCountNum(pageCountNum - 1)}
                        className={`bg-black w-20 mr-4 hover:bg-emerald-500 hover:text-black ease-linear duration-150 text-md last:mr-0 text-emerald-500 border-4 border-emerald-500 font-bold py-2 px-4 rounded-lg ${pageCountNum === 1 ? "border-emerald-500/[.65] text-gray-300/[.65]" : ""}`}>
                        {
                            pageCountNum === 1 ? "start" : "prev"
                        }
                    </button>
                    {
                        [1, 2, 3, 4].map((item) => {
                            return <button
                                className={`bg-black mr-4 last:mr-0 text-emerald-500 border-4 border-emerald-500 font-bold py-2 px-4 rounded-lg ${pageCountNum === item ? "bg-emerald-500 text-black" : ""}`}
                                key={item}
                                onClick={() => setPageCountNum(item)}>
                                {item}
                            </button>
                        })
                    }
                    <button
                        disabled={pageCountNum === 4}
                        onClick={() => setPageCountNum(pageCountNum + 1)}
                        className={`bg-black w-20 hover:bg-emerald-500 hover:text-black ease-linear duration-150 text-md last:mr-0 text-emerald-500 border-4 border-emerald-500 font-bold py-2 px-4 rounded-lg ${pageCountNum === 4 ? "border-emerald-500/[.65] text-gray-300/[.65]" : ""}`}>
                        {
                            pageCountNum === 4 ? "end" : "next"
                        }
                    </button>
                </div>
            </div>
        </>
    );
};

export default Products;

//1 el
//2 jew
//3 mem
//4 wom
//5 all