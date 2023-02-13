import {useCallback, useMemo, useState} from "react";

export default function usePagination<T extends {category:string}>(items: T[], itemsPerPage: number , cat: string) {
    const [currentPage, setCurrentPage] = useState(1);
    let maxPage = Math.ceil(items.length / itemsPerPage);
    const currentItems = useMemo(() => {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        const filtered = items.reduce((acc, item) => {
            if (item.category === cat) {
                acc.push(item);
            }
            if (cat === "all"){
                acc.push(item);
            }
            return acc;
        }, [] as T[]);
        maxPage = Math.ceil(filtered.length / itemsPerPage);
        return filtered.slice(begin, end);
    }, [currentPage, items, itemsPerPage,cat]);

    //  useCallback(() => {
    //     setMaxPage(Math.ceil(currentItems.length / itemsPerPage));
    // }, [items, itemsPerPage, cat]);

    const pagination = useMemo(() => {
        let arr:number[] = [];
        for (let i = 1; i <= maxPage; i++) {
            arr.push(i);
        }
        return arr;
    }, [maxPage]);

    const next = useCallback(() => {
        setCurrentPage((page) => (page >= maxPage ? maxPage : page + 1));
    }, [maxPage]);

    const prev = useCallback(() => {
        setCurrentPage((page) => (page <= 1 ? 1 : page - 1));
    }, []);

    const jump = useCallback(
        (page: number) => {
            const pageNumber = Math.max(1, page);
            setCurrentPage(() => (pageNumber > maxPage ? maxPage : pageNumber));
        }, [maxPage]
    );

    return {
        next,
        prev,
        jump,
        pagination,
        currentData: currentItems,
        currentPage,
        maxPage,
        setCurrentPage,
    };
}