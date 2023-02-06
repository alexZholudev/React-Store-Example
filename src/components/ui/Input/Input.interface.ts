import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface Props {
    type: "submit" | "text" | "password" | "email" | "number";
    error?: FieldError;
    errorMessage?: string;
    label: string;
    placeholder: string;
}

export type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & Props;
