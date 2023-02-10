import React, {FC, useEffect, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IProducts} from "../../shared/interfaces/app.interface";
import {useActions} from "../../hooks/useActions";
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
    const total = currCartElem.reduce((acc, item) => {
        return acc + item.price
    }, 0)

    const {cartUpdate} = useActions()

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        setTranslate(show ? 0 : "-200%");
        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, [show, items]);

    const deleteItem = (id:number) => {

    }

    const addCount = ({count,id}: {count:number,id:number}) => {
        count++;
        cartUpdate({count,id})
    }

    const removeCount = ({count,id}: {count:number,id:number}) => {
        count--;
        cartUpdate({count,id})
    }


    return (
        <>
            show && (
            <div   className="top-0 right-0 bottom-0 left-0 absolute w-full z-50 bg-header-top/[.68]">
                <div style={{translate}} className="border-emerald-500 animate-item border-4 bg-white max-w-xl p-6 rounded-br-lg rounded-tr-lg h-full">
                    <div className="flex items-center justify-between">
                        <h3 className="text-header-top text-2xl">
                            Cart {currCartElem.length ? `${currCartElem.length} items for` : ""} {total ? `${total}$` : ""}
                        </h3>
                        <button className="text-header-top" onClick={close}>
                            X
                        </button>
                    </div>
                    <div className="flex flex-col mt-4">
                        {
                            !items.length && (
                                <div className="w-full h-full">
                                    <p>
                                        Cart is empty
                                    </p>
                                </div>
                            )
                        }
                        {
                            items.map((item,index) => {
                                return (
                                    <div key={index.toString()} className="flex mb-4">
                                        <img src={item.image} className="mr-auto object-cover bg-[length:20%] bg-center" height={80} width={80} alt=""/>
                                        <div className="w-64">
                                            <p className="text-header-top max-w-lg text-sm">
                                                {item.title}...
                                            </p>
                                            <p>
                                                {item.category}
                                            </p>
                                            {item.count} X {item.price}$ = {(item.count * item.price).toFixed(2)}$
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <button className="mb-1 text-header-top" onClick={() => deleteItem(item.id)}>X</button>
                                            <button className="mb-1 text-header-top" onClick={() => addCount({count:item.count,id:item.id})}>+1</button>
                                            <button className="text-header-top" onClick={() => removeCount({count:item.count,id:item.id})}>-1</button>
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