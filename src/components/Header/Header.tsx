import React, {FC, useEffect, useRef} from 'react';
import {NavLink} from "react-router-dom";
const Header: FC = () => {
    const headerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (headerRef.current !== null) {
            const addPad:string = headerRef.current.clientHeight.toString();
            document.body.style.paddingTop = `${addPad}px`;
        }
    });
    return (
        <header ref={headerRef} className='bg-header-top z-40 fixed left-0 shadow-header-top right-0 opacity-70 filter top-0 backdrop-blur-2xl backdrop-opacity-20 shadow-current'>
            <div className="container">
                <div className="wrap">
                   <span className="inline-block py-1.5">
                        <h1 className={"text-gray-50 outline-title uppercase text-4xl duration-1000 p-2"}>
                           <NavLink to={"/"}>
                                Logo
                           </NavLink>
                        </h1>
                   </span>
                </div>
            </div>
        </header>
    );
};

export default Header;