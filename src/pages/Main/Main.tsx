import React from 'react';
import {Link} from "react-router-dom";

const Main = () => {
    return (
        <div>
            <h1>Main</h1>
            <Link to="/products">
                <h2 className="text-emerald-50">products</h2>
            </Link>
        </div>
    );
};

export default Main;