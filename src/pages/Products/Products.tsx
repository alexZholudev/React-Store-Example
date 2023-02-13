import React, { useState } from 'react';
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
import usePagination from "../../hooks/usePagination";

const Products = () => {
    // let isLoad:boolean = false;
    const [currentSwitch, setCurrentSwitch] = useState<string>("electronics");
    const {data, status, isLoading, error} = useQuery<IProducts[]>(["products"], {
        select: (data): IProducts[] =>
            [...data, ...data, ...data, ...data, ...data, ...data, ...data].sort(() => Math.random() - 0.5).map<IProducts>((item) => {
            return {
                ...item,
                title: item.title.slice(0, 35),
                description: item.title.slice(0, 100),
            }
        }),
        // enabled: isLoad,
    })
    const isOpen = useTypedSelector((state) => state.cart.isOpen)
    const { toggleCart } = useActions()
    const PreloaderPortal = usePortal(
        <Preloader/>
    );
    const CartPortal = usePortal(
        <Cart show={isOpen} close={() => toggleCart(false)}/>
    );
    const [limit, setLimit] = useState(20);
    const pagBtnHandler = (num:number) => {
        jump(num);
        window.scrollTo(0, 0);
    }
    const {
        next,
        prev,
        jump,
        pagination,
        currentData,
        currentPage,
        maxPage,
        setCurrentPage,
    } = usePagination<IProducts>(data??[], limit, currentSwitch);
    console.log(pagination, "pagination")

    const switchHandler = (str:string) => {
        setCurrentPage(1);
        setCurrentSwitch(str)
    }

    const switchAll = () => {
        setCurrentPage(1);
        setCurrentSwitch("all")
    }
    if (error instanceof Error) {
        return <span className={"text-amber-50"}>Error: {error.message}</span>
    }
    if (isLoading) {
        return PreloaderPortal;
    }

    return (
        <>
            {isOpen && CartPortal}
            <section className="section-offset">
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
            <main>
                <section className="section-offset">
                    <div className="container max-w-4xl">
                        <div className="flex items-center mx-auto">
                            <SwitchButton w={"max-w-3xl"} status={(str) => switchHandler(str)}/>
                            <button className="text-stone-100 rounded-full bg-emerald-400/[.88]  border-2 border-emerald-600 h-12 w-12 ml-5" onClick={() => switchAll()}>
                                <span className={currentSwitch==="all"? "text-black": ""}>
                                    All
                                </span>
                            </button>
                        </div>
                    </div>
                </section>
                <section className="section-offset">
                    {
                        (status === "success" && data !== undefined) && (
                            <div className={"max-w-6xl mx-auto"}>
                                <div className="grid grid-cols-4 gap-x-4 gap-x-8 gap-y-10 grid-rows-5">
                                    {currentData.map((item, index) => (
                                        <ProductItem key={index.toString()} {...item}/>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                    <div className="mx-auto max-w-2xl mt-20">
                        <b className="text-emerald-500 text-2xl w-full flex justify-center mb-5">
                            {currentPage} of {maxPage}
                        </b>
                        <div className="flex justify-center">
                            <button
                                disabled={pagination[0] === currentPage}
                                onClick={() => prev()}
                                className={`bg-black w-20 mr-4 hover:bg-emerald-500 hover:text-black ease-linear duration-150 text-md last:mr-0 text-emerald-500 border-4 border-emerald-500 font-bold py-2 px-4 rounded-lg ${currentPage === pagination[0] ? "border-emerald-500/[.65] text-gray-300/[.65]" : ""}`}>
                                {pagination[0] === currentPage ? "start" : "prev"}
                            </button>
                            {
                                pagination.map((item) => {
                                    return <button
                                        disabled={item === currentPage}
                                        className={`bg-black mr-4 last:mr-0 text-emerald-500 border-4 border-emerald-500 font-bold py-2 px-4 rounded-lg ${currentPage === item ? "bg-emerald-500 text-header-top" : ""}`}
                                        key={item}
                                        onClick={() => pagBtnHandler(item)}>
                                        {item}
                                    </button>
                                })
                            }
                            <button
                                disabled={maxPage === currentPage}
                                onClick={() => next()}
                                className={`bg-black w-20 hover:bg-emerald-500 hover:text-black ease-linear duration-150 text-md last:mr-0 text-emerald-500 border-4 border-emerald-500 font-bold py-2 px-4 rounded-lg ${maxPage === currentPage ? "border-emerald-500/[.65] text-gray-300/[.65]" : ""}`}>
                                {maxPage === currentPage ? "end" : "next"}
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Products;