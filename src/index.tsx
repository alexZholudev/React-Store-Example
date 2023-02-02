import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { queryFnFetch} from "./hooks/useFetch";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 6 * 15,
            cacheTime: 1000 * 10,
            queryFn : (queryKey) => queryFnFetch(queryKey),
        },
    },
});

const container = document.getElementById("root");
if (!container) {
    throw new Error("no container to render to");
}
const root = createRoot(container);
root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </QueryClientProvider>
);

