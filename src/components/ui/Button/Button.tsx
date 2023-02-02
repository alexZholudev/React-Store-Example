import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

interface ButtonProps {
    children: React.ReactNode;
    green?: boolean;
    id?: number;
    cat?: string;
}

const Button:FC<ButtonProps> = ({children,id,cat,green}) => {
   const navigate = useNavigate();
    const clickHandler = () => {
        navigate(`/product/${cat}/${id}`)
    }
    return (
        <button onClick={clickHandler} className="bg-header-top group overflow-hidden hover:rounded-lg ease-in-out relative p-5 w-full hover:bg-black/[.83]">
            <span className="before:w-[102%] transition-transform before:h-40 before:top-0 before:z-20 before:transition-all before:duration-300 before:ease-linear before:absolute before:skew-x-[25deg] before:-translate-x-[220%] ease-linear group-hover:before:-translate-x-[44%] before:bg-emerald-500">
                <p className={"z-30 text-amber-50 relative group-hover:text-white"}>
                    {children}
                </p>
            </span>
        </button>
    );
};

export default Button;