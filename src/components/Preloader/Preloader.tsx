import React, {FC, useEffect} from 'react';

export const Preloader:FC = () => {

    useEffect(() => {
        document.querySelector("#modal-root")?.classList.add("modal-root");
        return () => {
            document.querySelector("#modal-root")?.classList.remove("modal-root");
        }
    },[]);

    return (
        <div className="w-full opacity-80 bg-black filter shadow-header-top backdrop-blur-3xl backdrop-opacity-30 shadow-current wrap z-20 absolute h-full">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};