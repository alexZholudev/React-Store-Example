import {useQuery, QueryFunctionContext, UseQueryOptions} from "@tanstack/react-query"
import axios from "axios";

// export const useFetch: QueryFunction = async ({query}:{query :string}):Promise<void> => {
//     axios.get(`${query}`).then((res) => {
//         return res.data
//     })
// };


export const useQueryAll = <T>(url: string[] ,query:string) => {
    const queryFn = async ({queryKey}: QueryFunctionContext) => {
        const [url] = queryKey;
        const res = await axios.get<T>(`${query}${url}`).then((res) => res.data);
        return res;
    }

    return useQuery(url, queryFn, {});
}