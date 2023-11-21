"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'

import CustomInput from '../FormElements/CustomInput'
import CustomButton from '../FormElements/CustomButton'

const SignupForm = () => {
    const router = useRouter();

    const [userDetails, setUserDetails] = useState({
        userName: "",
        userEmail: "",
        userNumber: "",
        userPassword: ""
    })

    const [formError, setFormError] = useState({
        userName: "",
        userEmail: "",
        userNumber: "",
    })

    const [btnDisabled, setBtnDisabled] = useState(false);

    const inputOnChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        })
        setFormError({
            ...formError,
            [e.target.name]: null
        })
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateNumber = (number) => {
        if (!number.length === 10 || !number.length === 12) { return false }
        if (!parseInt(number)) { return false }
        return true
    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        setBtnDisabled(true)
        try {
            if (userDetails?.userName.replace(" ", "").length < 5) {
                setFormError({
                    ...formError,
                    userName: "Invalid Username"
                })
                return
            }

            // validate email
            if (!validateEmail(userDetails?.userEmail)) {
                setFormError({
                    ...formError,
                    userEmail: "Invalid Email"
                })
                return
            }

            // validate phone number
            if (!validateNumber(userDetails?.userNumber)) {
                setFormError({
                    ...formError,
                    userNumber: "Invalid Number"
                })
                return
            }

            // send and save data to database
            const responce = await fetch("/api/signup", {
                method: "POST",
                body: {
                    userName: userDetails?.userName.replace(" ", "").toLowerCase(),
                    userEmail: userDetails?.userEmail,
                    userPhone: userDetails?.userNumber,
                    userPassword: userDetails?.userPassword
                }
            })

            // as soon as login token receives move the user to home page...
            if (responce.ok) {
                console.log(responce);
                router.push("/")
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form method="post" className="w-full mx-auto my-16 md:w-2/5 flex flex-col gap-3 text-slate-800">
            <CustomInput inputType="name" inputName="userName" inputPlaceHolder="Enter Your Name" inputValue={userDetails?.userName} inputOnChange={inputOnChange} inputError={formError?.userName} />

            <CustomInput inputType="email" inputName="userEmail" inputPlaceHolder="Enter Your Email ID" inputValue={userDetails?.userEmail} inputOnChange={inputOnChange} inputError={formError?.userEmail} />

            <CustomInput inputType="number" inputName="userNumber" inputPlaceHolder="Enter Your Contact Number" inputValue={userDetails?.userNumber} inputOnChange={inputOnChange} inputError={formError?.userNumber} />

            <CustomInput inputType="password" inputName="userPassword" inputPlaceHolder="Enter Your Password" inputValue={userDetails?.userPassword} inputOnChange={inputOnChange} inputError={formError?.userPassword} />

            <CustomButton btnType="submit" btnName="submit" btnDisabled={btnDisabled} btnOnClick={clickSubmit} />

            <p className="mt-2 text-center">Already signup! <Link href="/login" className="font-semibold text-black border-none p-1">login</Link> here.</p>

            <p className="mt-1 text-center"><Link href="/forgetpassword" className="font-semibold text-black border-none p-1">Forget</Link> Your Password!</p>
        </form>
    )
}

export default SignupForm