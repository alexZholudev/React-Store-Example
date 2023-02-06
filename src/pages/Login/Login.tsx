import React, {FC, useRef} from 'react';
import {Input} from "../../components/ui/Input/Input";
import {useForm} from "react-hook-form";
import {emailValidator} from "reg/reg";
import SubmitButton from "../../components/ui/SubmitButton/SubmitButton";
interface IFields {
    username: string;
    email: string;
    password: string;
    cpassword: string;
}
const Login: FC = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isValid },
        reset,
    } = useForm<IFields>({
        mode: "onBlur",
    });

    const onSubmit = (user: IFields) => {
        console.log(isValid, 'isValid')
        const { username, email, password } = user;
        const data = { username, email, password };
        alert(JSON.stringify(data))
    }

    const onError = (error: any, e: any) => {
        console.error(error, 'err submit')
    }

    return (
        <main>
            <div className="container">
                <h1 className="text-gray-50 text-2xl">Login</h1>
                <div className="flex-1">
                    <form className="wrap flex-col max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit,onError)}>
                        <Input type={"text"}
                               {...register("username", { required: true, minLength: 5 })}
                               // errorMessage="Wrong Email"
                               label="Your username *"
                               placeholder="Username"
                               error={errors.username}
                               errorMessage="Wrong Username"
                        />
                        <Input
                            {...register("email", { required: true, minLength: 7 ,pattern: emailValidator })}
                            errorMessage="Wrong email"
                            label="Your email *"
                            type={"email"}
                            placeholder="email"
                            error={errors.email}
                            // ref={emailRef}
                        />
                        <Input
                            {...register("password", { required: true, minLength: 7 })}
                            error={errors.password}
                            errorMessage="Wrong Password"
                            label="Your password *"
                            type={"password"}
                            placeholder="password"
                            // ref={passRef}
                        />
                        <Input
                            {...register("cpassword", {
                                    validate: (value,formValues) => {
                                        const { password } = formValues;
                                        return password === value || "Passwords should match!";
                                    }
                                }
                            )}
                            error={errors.password}
                            errorMessage="Wrong Password"
                            label="Your password *"
                            type={"password"}
                            placeholder="password"
                            // ref={passRef}
                        />
                        <SubmitButton title="Confirm Registration" onClick={()=>console.log(isValid)}/>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;