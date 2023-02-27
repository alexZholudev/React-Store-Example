import React,{ useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

export default function usePortal(children: ReactNode)  {
    const elRef = useRef<HTMLDivElement | null>(null);

    if (!elRef.current) elRef.current = document.createElement("div");

    useEffect(() => {
        const el = elRef.current!;
        modalRoot.appendChild(el);

        return () => {
            modalRoot.removeChild(el);
        };
    }, []);


    return createPortal(children, elRef.current);
}
