"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'

import {CustomInputType1} from '../FormElements/CustomInput'
import {CustomButton} from '../FormElements/CustomButton'
import { toast } from 'react-toastify';
import { showErrorToast, showSuccessToast } from '@/utils/showToast';

export const SignupForm = ({ adminForm }) => {
    const router = useRouter();

    const [userDetails, setUserDetails] = useState({
        userName: "",
        userEmail: "",
        userNumber: "",
        userPassword: "",
        role: adminForm ? "admin" : "user"
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
            // validate username
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

            // validate password
            if (userDetails?.userPassword.replace(" ", "").length < 5) {
                setFormError({
                    ...formError,
                    userPassword: "Password Should be Atleast 5 Charecters Long"
                })
                return
            }

            // send and save data to database
            const response = await fetch("/api/user/signup", {
                method: "POST",
                body: JSON.stringify({
                    userName: userDetails?.userName.replace(" ", "").toLowerCase(),
                    userEmail: userDetails?.userEmail,
                    userPhone: userDetails?.userNumber,
                    userPassword: userDetails?.userPassword,
                    role: userDetails?.role
                })
            })

            if (!response.ok) {
                const { message } = await response.json();
                throw new Error(message);
            }

            // as soon as login token receives move the user to home page...

            showSuccessToast('Signup Succesfully');

            setTimeout(() => {
                router.push(adminForm ? "/admin/login" : "/login")
            }, 700);

        } catch (error) {
            setUserDetails({
                userName: "",
                userEmail: "",
                userNumber: "",
                userPassword: "",
                role: adminForm ? "admin" : "user"
            })
            
            showErrorToast(error.message);

        } finally {
            setBtnDisabled(false)
        }
    }

    return (
        <form method="post" className="w-full mx-auto my-16 md:w-2/5 flex flex-col gap-3 text-slate-800">
            <CustomInputType1 inputType="name" inputName="userName" inputPlaceHolder="Enter Your Name" inputValue={userDetails?.userName} inputOnChange={inputOnChange} inputError={formError?.userName} />

            <CustomInputType1 inputType="email" inputName="userEmail" inputPlaceHolder="Enter Your Email ID" inputValue={userDetails?.userEmail} inputOnChange={inputOnChange} inputError={formError?.userEmail} />

            <CustomInputType1 inputType="number" inputName="userNumber" inputPlaceHolder="Enter Your Contact Number" inputValue={userDetails?.userNumber} inputOnChange={inputOnChange} inputError={formError?.userNumber} />

            <CustomInputType1 inputType="password" inputName="userPassword" inputPlaceHolder="Enter Your Password" inputValue={userDetails?.userPassword} inputOnChange={inputOnChange} inputError={formError?.userPassword} />

            <CustomButton btnType="submit" btnName="submit" btnDisabled={btnDisabled} formProcessing={btnDisabled} btnOnClick={clickSubmit} />

            <p className="mt-2 text-center">Already signup! <Link href={adminForm ? "/admin/login" : "/login"} className="font-semibold text-black border-none p-1">login</Link> here.</p>

            <p className="mt-1 text-center"><Link href={adminForm ? "/admin/forgetpassword" : "/forgetpassword"} className="font-semibold text-black border-none p-1">Forget</Link> Your Password!</p>
        </form>
    )
}
