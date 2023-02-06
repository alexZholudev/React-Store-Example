import React, {forwardRef, useId, useRef, useState} from 'react';
import {TypeInputPropsField} from "./Input.interface";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export type Ref = HTMLInputElement;

export const Input = forwardRef<Ref, TypeInputPropsField>(({type,error, label,errorMessage, ...rest}, ref) => {
    const inpRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState("");
    const id = useId();
    return (
        <div className="flex flex-col w-full mb-8">
            <label className="text-emerald-500 text-lg mb-1.5 capitalize" htmlFor={id}>{label}</label>
            <input
                className="border border-emerald-500 p-3.5 rounded-md outline-none focus:ring-2 focus:ring-emerald-500"
                id={id}
                type={type}
                onChange={(event => setValue(event.target.value))}
                {...rest}
                ref={inpRef}/>
            {error && <span className="text-red-500 text-sm">{errorMessage}</span>}
        </div>
    )
});