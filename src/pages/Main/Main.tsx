import React from 'react';
import {NavLink} from "react-router-dom";

const Main = () => {
    return (
        <div>
            <h1>Main</h1>
            <NavLink to={"/products"}>
                <h2>products</h2>
            </NavLink>
        </div>
    );
};

export default Main;