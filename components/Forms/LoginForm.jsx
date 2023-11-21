"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import CustomInput from '../FormElements/CustomInput'
import CustomButton from '../FormElements/CustomButton'

const LoginForm = () => {
    const router = useRouter();
    const [loginDetails, setLoginDetails] = useState({
        loginEmail: "",
        loginPassword: "",
        loginEmailError: null
    })

    const [btnDisabled, setBtnDisabled] = useState(false);

    const inputOnChange = (e) => {
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value,
            loginEmailError: null
        })
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const clickSubmit = async(e) => {
        e.preventDefault();
        setBtnDisabled(true)
        try {
            // validate email
            if (!validateEmail(loginDetails?.email)) {
                setLoginDetails({
                    ...loginDetails,
                    emailError: "Invalid Email"
                })
            }
            const responce = await fetch("/api/login", {
                method:"POST",
                body:{
                    loginEmail: loginDetails?.loginEmail,
                    loginPassword: loginDetails?.loginPassword
                }
            })
            if(responce.ok){
                console.log(responce);
            }
            // email correct, 
            // ---- featch email and password data from database accourding to email
            // ---- match passwords, if matched, then give login token            
            // router.push("/") // as soon as login token receives move the user to home page...
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form method="post" className="w-full mx-auto my-16 md:w-2/5 flex flex-col gap-3 text-slate-800">
            <CustomInput inputType="email" inputName="loginEmail" inputPlaceHolder="Enter Your Email ID" inputValue={loginDetails?.loginEmail} inputOnChange={inputOnChange} inputError={loginDetails?.loginEmailError} />

            <CustomInput inputType="password" inputName="loginPassword" inputPlaceHolder="Enter Your Password" inputValue={loginDetails?.loginPassword} inputOnChange={inputOnChange} />

            <CustomButton btnType="submit" btnName="submit" btnDisabled={btnDisabled} btnOnClick={clickSubmit} />

            <p className="mt-2 text-center">Need a new account! <Link href="/signup" className="font-semibold text-black border-none p-1">signup</Link> here.</p>

            <p className="mt-1 text-center"><Link href="/forgetpassword" className="font-semibold text-black border-none p-1">Forget</Link> Your Password!</p>
        </form>
    )
}

export default LoginForm