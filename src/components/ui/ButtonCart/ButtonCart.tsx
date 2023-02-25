import React, {FC} from 'react';
interface ButtonCartProps {
    onClick: () => void;
    title: string;
    disabled: boolean;
}
export const ButtonCart:FC<ButtonCartProps> = ({onClick,title,disabled}) => {
    console.log(disabled)
    return (
        <button disabled={!disabled} onClick={onClick} className="bg-black w-full group hover:bg-bg-black/[.85] hover:rounded-2xl py-4 linear duration-300">
            <span className="text-white ease-in duration-300 uppercase group-hover:text-emerald-500">
                {title}
            </span>
        </button>
    );
};