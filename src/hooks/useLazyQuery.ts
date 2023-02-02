import {useQueries, useQuery} from "@tanstack/react-query";
import {useState} from "react";

export const useLazyQuery = <T>(key, options) => {
    const [enabled, setEnabled] = useState(false)
    return [() => setEnabled(true), useQuery<T>(key, { ...options, enabled })]
}