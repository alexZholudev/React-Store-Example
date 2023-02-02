import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
interface BreadcrumbsProps {
    title: string
}

const Breadcrumbs:FC<BreadcrumbsProps> = ({title}) => {
    return (
        <div className="py-2.5 h-12 w-full mb-5 mx-auto border-b-2 border-b-emerald-500/[.65]">
            <p className={"text-white/[90] text-xl uppercase"}>
                <NavLink className={"mr-2.5 capitalize text-white/[.88]"} to={"/"}>
                    Main
                </NavLink> / <span className={"ml-2.5 capitalize text-white/[.86]"}>{title}</span>
            </p>
        </div>
    );
};

export default Breadcrumbs;