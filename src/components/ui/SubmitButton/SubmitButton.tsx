import React, {FC} from 'react';
interface ISubmitButtonProps {
        title: string;
        onClick: () => void;
}
const SubmitButton:FC<ISubmitButtonProps> = ({title,onClick}) => {
    return (
        <button
            onClick={onClick}
            className="border-black cursor-pointer bg-emerald-500 p-2.5 hover:bg-emerald-500 hover:border-emerald-500 ease-linear duration-150"
            type="submit"
        >
            <span>
                {title}
            </span>
        </button>
    );
};

export default SubmitButton;