import axios from "axios";
import {QueryFunctionContext} from "@tanstack/react-query";
export const queryFnFetch = async (query: QueryFunctionContext) => {
    const params = query.queryKey.join("/");
    return await axios.get(`https://fakestoreapi.com/${params}`,{
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => res.data);
}
