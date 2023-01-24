import React from 'react';
import Header from "components/Header/Header";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import {useQueryAll} from "hooks/useFetch";
import {IProducts} from "app/app.interface";
import ProductsContainer from "components/Products/ProductsContainer";
const Products = () => {
    // const [products, setProducts] = React.useState<ProductsFetch[]>([]);

    // const res = useQuery<string,ProductsFetch[],Error>("prouducts", useFetch<ProductsFetch[]>("https://fakestoreapi.com/products"));
    const { isLoading, isError, data, error , status }  = useQueryAll<IProducts[]>( ["products"], "https://fakestoreapi.com/");

    if (isLoading) {
        return <span className={"text-amber-50"}>Loading...</span>
    }

    if (error instanceof Error) {
        return <span className={"text-amber-50"}>Error: {error.message}</span>
    }

    return (
        <>
            <Header />
            <Breadcrumbs title={"Products"}/>
            <div className={"container"}>
                <h1>Products</h1>
            </div>
            {
                status === "success" && <ProductsContainer arrProducts={data} />
            }
        </>
    );
};

export default Products;