import React from 'react';
import useHover from "hooks/useHover";
import {IProducts} from "app/app.interface";

const ProductItem = (rest:IProducts) => {

    const {id, title, image, description, price, rating} = rest;
    const [hoverRef,isHovered] = useHover<HTMLDivElement>()
    return (
        <>
            <div className="max-w-xl overflow-hidden relative before:shadow-lg before:bg-white before:w-full before:h-full before:absolute before:right-0 before:z-10 before:left-0 before:right-0 before:top-0 rounded-3xl hover:border-emerald-500 border-4 border-solid border-transparent max-h-6xl p-4">
                <div className="relative z-30 h-full">
                <div className="flex justify-between items-center">
                    <span>
                       {rating.rate}
                    </span>
                    <p>
                       <>
                           {!rating.count ? <span className={"text-amber-50"}>No Empty </span> : <span className={"text-black"}>{rating.count} <p className="bg-emerald-500-500">Avaible Items</p></span>}
                       </>
                    </p>
                </div>
               <div ref={hoverRef} className='p-5 shadow-lg h-3/4 min-w-[50%]'>
                   <img className="mx-auto relative max-h-44 z-20" width={175} height={300} src={image} alt=""/>
               </div>
                    {
                        isHovered && (
                            <>
                                <div style={isHovered ? {translate:0} : {translate:"120%"} } className={`absolute ease-linear w-3/4 mx-auto top-2 bg-white/[.70] z-40`} >
                                   <p>
                                       {description}
                                   </p>
                                    <span className="bg-gray-600/[.78]">
                                    </span>
                                    <p>
                                        {title}
                                    </p>
                                </div>
                            </>
                        )
                    }
            </div>
        </div>
        </>
    )
};

export default ProductItem;