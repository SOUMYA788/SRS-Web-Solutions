"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {CustomInputType1} from '../FormElements/CustomInput'
import CustomButton from '../FormElements/CustomButton'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '@/Redux/slices/userSlice';


const LoginForm = (adminForm) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [loginDetails, setLoginDetails] = useState({
        loginEmail: "",
        loginPassword: ""
    })

    const [loginEmailError, setLoginEmailError] = useState(null);

    const [btnDisabled, setBtnDisabled] = useState(false);

    const [processing, setProcessing] = useState(false);

    const inputOnChange = (e) => {
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value,
        })
        setLoginEmailError(null)
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const clickSubmit = async (e) => {
        e.preventDefault();
        setBtnDisabled(true)
        setProcessing(true)
        try {
            // validate email
            if (!validateEmail(loginDetails?.loginEmail)) { setLoginEmailError("Invalid Email") }
            // make API Call for varification.
            const featchResponse = await fetch("/api/user/login", {
                method: "POST",
                body: JSON.stringify({
                    loginEmail: loginDetails?.loginEmail,
                    loginPassword: loginDetails?.loginPassword
                })
            })


            if (featchResponse.ok) {
                const {userId} = await featchResponse.json();
                console.log("response from login from for admin", userId);
                // Valid User
                toast.success('Login Succesfully', {
                    position: "bottom-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });

                dispatch(userLoggedIn(true))

                setTimeout(() => {
                    router.push(adminForm ? `/admin/${userId}` : "/")
                }, 700);
            } else {
                console.log("Responce Fail");
                dispatch(userLoggedIn(false))

                setLoginDetails({
                    loginEmail: "",
                    loginPassword: ""
                })

                toast.error('Login Faild', {
                    position: "bottom-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
            }


        } catch (error) {
            console.log(error.message);
        } finally {
            setBtnDisabled(false)
            setProcessing(false)
        }
    }

    useEffect(() => {
        if (loginDetails.loginEmail.length > 0 && loginDetails.loginPassword.length > 0) {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        }
    }, [loginDetails.loginEmail, loginDetails.loginPassword])


    return (
        <>
            <form method="post" className="w-full mx-auto my-16 md:w-2/5 flex flex-col gap-3 text-slate-800">
                <CustomInputType1 inputType="email" inputName="loginEmail" inputPlaceHolder="Enter Your Email ID" inputValue={loginDetails?.loginEmail} inputOnChange={inputOnChange} inputError={loginEmailError} />


                <CustomInputType1 inputType="password" inputName="loginPassword" inputPlaceHolder="Enter Your Password" inputValue={loginDetails?.loginPassword} inputOnChange={inputOnChange} />

                <CustomButton btnType="submit" btnName="submit" btnDisabled={btnDisabled} btnOnClick={clickSubmit} formProcessing={processing} />

                <p className="mt-2 text-center">Need a new account! <Link href={adminForm ? "/admin/signup" : "/signup"} className="font-semibold text-black border-none p-1">signup</Link> here.</p>

                <p className="mt-1 text-center"><Link href={adminForm ? "/admin/forgetpassword" : "/forgetpassword"} className="font-semibold text-black border-none p-1">Forget</Link> Your Password!</p>
            </form>
        </>
    )
}

export default LoginForm