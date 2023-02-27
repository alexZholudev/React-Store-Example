import React, {FC} from 'react';
interface ButtonCartProps {
    onClick: () => void;
    title: string;
    disabled: boolean;
    isGreen?: boolean;
}
export const ButtonCart:FC<ButtonCartProps> = ({onClick,isGreen,title,disabled}) => {
    return (
        <button disabled={!disabled} onClick={onClick} className={`bg-black w-full border-2 border-transparent group hover:bg-bg-black/[.85] hover:rounded-2xl py-4 linear duration-300 ${isGreen ? "bg-emerald-500 rounded-md  shadow-lg hover:shadow-emerald-400 hover:border-emerald-500 hover:bg-bg-black" :""}`}>
            <span className={`text-white ease-in duration-300 uppercase group-hover:text-emerald-500 ${isGreen ? "text-black group-hover:text-emerald-500" : ""}`}>
                {title}
            </span>
        </button>
    );
};