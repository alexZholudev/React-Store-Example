import React, {FC, useEffect, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IProducts} from "../../shared/interfaces/app.interface";
interface CartProps {
    show: boolean
    close: () => void
}

type CartRes = IProducts & {count?: number}
type CartResArr = IProducts & {count: number}
interface cartItem extends IProducts  {count: number}



interface CartItemReduced {
    acc:Array<CartResArr>
    current: CartResArr
}

const Cart:FC<CartProps> = ({show,close}) => {
    const [translate, setTranslate] = useState<number | string>("-200%");
    const items = useTypedSelector(state => state.cart.Products) as CartResArr[];
    const [currCartElem, setCurrCartElem] = useState<CartResArr[]>([]);
    const total = items.reduce((acc, item) => {
        return acc + item.price
    }, 0)


    // const addCount = (arr )=> {
    //   return arr.reduce((acc:Array<IProducts & Record<"count", number>>, current:IProducts) => {
    //         current.count = 1;
    //         const x = acc.find(item => item.id === current.id);
    //         if (!x) {
    //             return acc.concat([current]);
    //         } else {
    //             if (x.count === undefined) {
    //                 x.count = 1;
    //             }else{
    //             x.count++;
    //             return acc;
    //             }
    //         }
    //     }, [] as Array<CartRes>);
    // }




    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        setTranslate(show ? 0 : "-200%");
        // const reds = [...items] as cartItem[];

        const arr = Array.from(Object.create(items)).map((elem) => {
            return {
                ...elem as IProducts,
                count: 1
            }
        })

        const res = arr.reduce<cartItem[]>((acc, current): any => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
                return acc.concat([current]);
            } else {
                if (x.count === undefined) {
                    x.count = 1;
                } else {
                    x.count++;
                    return acc;
                }
            }
        }, [] as any[]);
        setCurrCartElem(res)
        console.log(currCartElem, "currCartElem")
        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [show, items]);

    return (
       <>
           show && (
               <div   className="top-0 right-0 bottom-0 left-0 absolute w-full z-50 bg-header-top/[.68]">
                   <div style={{translate}} className="border-emerald-500 animate-item border-4 bg-white max-w-xl p-6 rounded-br-lg rounded-tr-lg h-full">
                      <div className="flex items-center justify-between">
                          <h3 className="text-header-top text-2xl">
                              Cart {items.length ? `${items.length} items for` : ""} {total ? `${total}$` : ""}
                          </h3>
                          <button className="text-header-top" onClick={close}>
                              X
                          </button>
                      </div>
                       <div className="flex flex-col mt-4">
                           {
                               !currCartElem.length && (
                                   <div className="w-full h-full">
                                       <p>
                                           Cart is empty
                                       </p>
                                   </div>
                               )
                           }
                           {
                               currCartElem.map((item,index) => {
                                     return (
                                        <div key={index.toString()} className="flex">
                                            <img src={item.image} className="mr-auto object-cover bg-[length:50%] bg-center" height={75} width={75} alt=""/>
                                            <div className="w-64">
                                                <p className="text-header-top text-sm">
                                                    {item.title}
                                                </p>
                                                <p>
                                                    {item.category}
                                                </p>
                                                {item.count}X {item.price}$ = {item.count * item.price}$
                                            </div>
                                        </div>
                                     )
                                 })
                           }
                       </div>
                   </div>
               </div>
           )
       </>
    );
};

export default Cart