import React from 'react';
import './App.css';
import Products from "./pages/Products/Products";
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main";
import Product from "./pages/Product/Product";
import Header from "./components/Header/Header";

function App() {
  return (
      <>
          <Header />
          <Routes>
              <Route index path={"/"} element={<Main />} />
              <Route path={"/products"} element={<Products />} />
              <Route path={"/product/:cat/:id"} element={<Product />} />
              <Route path={"*"} element={<><div>404</div></>} />
          </Routes>
      </>
  );
}

export default App;
