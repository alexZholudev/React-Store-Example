import React, {useEffect, useState} from 'react';
import useHover from "hooks/useHover";
import {IProducts} from "shared/interfaces/app.interface";
import {StarsIcon} from "../../../shared/icons/iconsElement";
import Button from "../../ui/Button/Button";
import cart from "assets/icons/cart.png";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import {cartAdd} from "../../../store/reducer/posts/itemsSlice";
import usePortal from "../../../hooks/usePortal";
const ProductItem = (rest: IProducts) => {
    const {id, title, image, description, price,category, rating} = rest;
    const [hoverRef, isHovered] = useHover<HTMLDivElement>();
    const [translate, setTranslate] = useState<"-300%" | number>(0);
    const [anim, setAnim] = useState<"animate-item-out" | "">("");
    //after hover
    useEffect(() => {
        if (isHovered) {
            setTranslate("-300%");
            setAnim("");
        }else {
            setTranslate(0);
            setAnim("animate-item-out");
        }
    }, [isHovered]);
    //after render
    useEffect(() => {
        setTranslate(0);
        setAnim("");
    }, []);

    const  {
        cartAdd
    }  = useActions()

    const cartItems =useTypedSelector(state => state.cart.Products)

    const addCart = () => {
        cartAdd(rest)
        // usePortal()
    };

    return (
        <>
            <div ref={hoverRef}
                className="max-w-xl overflow-hidden relative before:shadow-lg before:bg-white before:w-full before:h-full before:absolute before:right-0 before:z-10 before:left-0 before:right-0 before:top-0 rounded-3xl hover:border-emerald-500 border-4 border-solid border-transparent max-h-70 p-4">
                <div className={`${isHovered ? "relative w-52 mx-auto text-center z-30 min-h-[22rem]" : 'relative w-52 mx-auto z-30 min-h-[22rem] h-full'}`}>
                    {
                        isHovered && (
                            <>
                                <div style={isHovered ? {translate: 0} : {translate: "300%"}}
                                     className={`absolute right-25% left-25% ease-linear w-full max-w-lg mx-auto top-2 bg-white/[.70] z-40` + `${isHovered ? "animate" : "animate-out"}`}>
                                    <p className="text-black text-sm mb-2.5">
                                        {description}...
                                    </p>
                                    <span className="bg-gray-600/[.78]">
                                    </span>
                                    <p>
                                        {title}...
                                    </p>
                                </div>
                            </>
                        )
                    }
                    <div style={{translate:translate}} className={isHovered ? "mb-8" : anim + " mb-8"}>
                        <div className="flex justify-between items-center">
                            <div className='flex items-center'>
                                <p className='text-xl mr-2.5'>
                                    {rating.rate}
                                </p>
                                <span className="fill-amber-300/[.57] ease-linear duration-300 hover:fill-amber-300 w-5 h-5">
                                    <StarsIcon />
                                </span>
                            </div>
                            <div>
                                {!rating.count ? <span className={"text-amber-50"}>No Empty </span> : <span className={"text-black"}>{rating.count} <p className="bg-emerald-500-500">Avaible Items</p></span>}
                            </div>
                        </div>
                        <div className='p-5 shadow-md shadow-gray-700/[.78] h-60 min-w-[45%]'>
                            <img className="mx-auto object-contain h-full z-20" width={175} height={280} src={image} alt=""/>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Button id={id} cat={category} green>
                            Details
                        </Button>
                        <span onClick={addCart} className="w-10 h-10 wrap ml-3 rounded-[50%] px-2 border-2 border-green-500/[.65] hover:border-green-500 hover:bg-emerald-100 ease-in duration-200">
                            <img width={15} height={15} src={cart} alt="cart add"/>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ProductItem;