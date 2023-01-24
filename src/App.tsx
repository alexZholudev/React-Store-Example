import React from 'react';
import './App.css';
import Products from "./pages/Products/Products";
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main";

function App() {
  return (
      <>
        <Routes>
            <Route index path={"/"} element={<Main />} />
            <Route path={"/products"} element={<Products />} />
            <Route path={"*"} element={<><div>404</div></>} />
        </Routes>
      </>
  );
}

export default App;
