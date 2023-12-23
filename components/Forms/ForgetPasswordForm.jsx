"use client"
import React,{useState} from 'react'
import CustomInputType1 from '../FormElements/CustomInput';
import CustomButton from '../FormElements/CustomButton';
import Link from 'next/link';


const ForgetPasswordForm = () => {
    const [forgetID, setForgetID] = useState("");

    const [idError, setIdError] = useState(null);

    const [btnDisabled, SetbtnDisabled] = useState(false)

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleForgetPasswordInput = (e) => {
        setForgetID({
            ...userDetails,
            [e.target.name]: e.target.value
        });
        setIdError(null);
    };

    const submitForgetForm = (e) => {
        e.preventDefault();
        SetbtnDisabled(true) // disable button here untill all works are done...
        try {
            if (!validateEmail(forgetID)) {
                setIdError("Invalid Email ID")
                return
            }
            // Check that provided email id is available in database or not...
            // after perfect matching, send the user a forget password link, in provided email id
            // and once user update password there, then user will go to the homepage of their account...
        }catch (error) {
            console.error(error);
            // if there any error, unlock the button, and tell user to retry with valid credentials...
        }
    }

    return (
        <form method="post" className="w-full mx-auto my-16 md:w-2/5 flex flex-col gap-3 text-slate-800">

            <CustomInputType1 inputType="email" inputName="email" inputPlaceHolder="Enter Your Email ID" inputValue={forgetID} inputOnChange={handleForgetPasswordInput} inputError={idError} />

            <CustomButton btnName="reset" btnType="submit" btnOnClick={submitForgetForm} btnDisabled={btnDisabled} />

            <p className="mt-2">Already signup! <Link href="/login" className="font-semibold text-black border-none px-2 py-1">login</Link> here.</p>

            <p>Need a new account! <Link href="/signup" className="font-semibold text-black border-none px-2 py-1">signup</Link> here.</p>

        </form>
    )
}

export default ForgetPasswordForm