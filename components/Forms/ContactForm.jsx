"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import CustomInputType1 from '../FormElements/CustomInput';
import CustomTextarea from '../FormElements/CustomTextarea';
import CustomButton from '../FormElements/CustomButton';


const ContactForm = () => {
    const router = useRouter()

    const [userDetails, setUserDetails] = useState({
        userEmail: "",
        userMessage: ""
    });

    const [formErrors, setFormErrors] = useState({
        userEmail: null,
        userMessage: null
    });

    const [disableButton, setDisableButton] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleInput = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });

        setFormErrors({
            ...formErrors,
            [e.target.name]: null
        })
    };

    const submitContact = async (e) => {
        e.preventDefault();
        setDisableButton(true)

        try {
            // Check For Invalid Email
            if (!validateEmail(userDetails?.userEmail)) {
                setFormErrors({
                    ...formErrors,
                    userEmail: "Please provide a valid email address."
                })
                return
            }

            // Check For Invalid Message
            if (userDetails?.userMessage.trim().length < 10) {
                setFormErrors({
                    ...formErrors,
                    userMessage: "Message Length Should Not Be Less Then 10 Charecters."
                })
                return
            }

            // submitting form
            if (!formErrors.userEmail && !formErrors.userMessage) {
                // database connection and data update code...
                const responce = await fetch("/api/contact", {
                    method: "POST",
                    body: JSON.stringify({
                        userEmail: userDetails?.userEmail,
                        userMessage: userDetails?.userMessage
                    })
                })
                if (responce.ok) {
                    router.push('/')
                }
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <form method="post" className="w-full flex flex-col gap-4 text-slate-800">

                <CustomInputType1 inputType="email" inputName="userEmail" inputPlaceHolder="Your Email ID" inputValue={userDetails?.userEmail} inputOnChange={handleInput} inputError={formErrors?.userEmail} />

                <CustomTextarea textAreaName="userMessage" textAreaPlaceholder="Your Query" textAreaValue={userDetails?.userMessage} textAreaOnChange={handleInput} textAreaError={formErrors?.userMessage} />

                <CustomButton btnName="Send Message" btnType="submit" btnOnClick={submitContact} btnDisabled={disableButton} />

                <p className="mt-2 text-xs text-gray-600">
                    We'll get back to you within 48 hours.
                </p>

            </form>
        </>
    )
}

export default ContactForm