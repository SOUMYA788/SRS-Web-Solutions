"use client"
import React, { useState, useEffect } from 'react'
import {CustomButton} from '../FormElements/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { assignUser } from '@/Redux/slices/userSlice'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BiCloudUpload } from 'react-icons/bi'
import { showErrorToast, showSuccessToast } from '@/utils/showToast'





const DashboardForm = () => {
    // name, email, phone, profileColor, profileBackground
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    const router = useRouter()

    const [formProcessing, setFormProcessing] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [detailError, setDetailError] = useState({})

    const setError = (errorKey, errorValue) => {
        setDetailError({
            ...detailError,
            [errorKey]: errorValue
        })
    }

    const detailsOnChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })

        setDetailError({
            ...detailError,
            [e.target.name]: null
        })
    }

    const convertImageToString = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const formImageOnChange = async (e) => {
        const file = e.target.files[0];
        const userProfilePicture = await convertImageToString(file);

        setUserDetails({
            ...userDetails,
            userProfilePicture
        })
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateNumber = (number) => {
        if (!number.length === 10 || !number.length === 12 || !parseInt(number)) return false
        return true
    }

    const validateNameAndColor = (nameOrColor) => {
        const regex = /[^{}\[\]=><*@!|&()]/g
        return regex.test(nameOrColor);
    }

    const submitUpdateProfile = async (e) => {
        e.preventDefault();
        setFormProcessing(true)

        const { userName, userEmail, userPhone, userProfileColor, userProfileBackgroundColor, userProfilePicture } = userDetails;

        const validEmail = validateEmail(userEmail)
        const validName = validateNameAndColor(userName);
        const validNumber = validateNumber(userPhone);
        const validProfileColor = validateNameAndColor(userProfileColor);
        const validBackgroundColor = validateNameAndColor(userProfileBackgroundColor);

        if (!validName) {
            setError("userName", "Invalid Name")
            return
        }

        if (!validEmail) {
            setError("userEmail", "Invalid Email")
            return
        }

        if (!validNumber) {
            setError("userPhone", "Invalid Number")
            return
        }

        const updatedProfile = { userName, userEmail, userPhone };

        if (validProfileColor) { updatedProfile.userProfileColor = userProfileColor }

        if (validBackgroundColor) { updatedProfile.userProfileBackgroundColor = userProfileBackgroundColor }

        if (userProfilePicture) { updatedProfile.userProfilePicture = userProfilePicture }


        try {
            const response = await fetch("/api/user/update", {
                method: "PUT",
                body: JSON.stringify(updatedProfile)
            })

            if (!response.ok) {
                throw new Error("Faild to update profile");
            }

            dispatch(assignUser({ ...user, ...updatedProfile }))
            showSuccessToast('Profile Updated Succesfully');

        } catch (error) {
            showErrorToast(error.message);
        } finally {
            router.refresh();
            setFormDisabled(true)
            setFormProcessing(false)
        }
    }

    const changeEditMode = (e) => {
        e.preventDefault();
        setFormDisabled((value) => !value);
    }

    useEffect(() => {
        fetch("/api/user")
            .then(response => response.json())
            .then(userInfo => setUserDetails(userInfo?.userInfo))
            .catch(error => console.log(error.message))
    }, [])


    return (
        <>
            <div className="w-full flex flex-row justify-between items-center px-2 py-1">
                <h2 className='text-center text-2xl font-semibold p-2 text-slate-800 tracking-wide'>
                    DETAILS
                </h2>
                <button type="button" className={`border-2 ${formDisabled ? "bg-transparent capitalize border-blue-500 font-semibold focus:outline-blue-700 focus:bg-blue-500 hover:border-blue-700 hover:bg-blue-500 focus:text-white hover:text-white tracking-wider" : "bg-red-500 tracking-wider uppercase border-red-700 focus:outline-red-700 focus:rounded-full hover:rounded-sm"}  px-4 py-2 text-xs transition-colors`} onClick={changeEditMode}>
                    {formDisabled ? "edit profile" : "cancel"}
                </button>
            </div>

            <form action="" className='flex w-full sm:flex-row flex-col mx-auto px-8 border-2 border-slate-200 rounded-sm mt-3 gap-3 flex-wrap'>

                <div className="w-full sm:w-48 sm:min-h-48">
                    <label htmlFor="userProfilePicture" className="w-full h-full leading-7 text-sm text-gray-600">
                        <div className="w-full h-full bg-slate-200 shadow shadow-slate-600 border-2 border-slate-300 rounded-md overflow-hidden flex justify-center items-center text-4xl p-1">
                            <input type="file" name="userProfilePicture" id="userProfilePicture" onChange={formImageOnChange} className="hidden" disabled={formDisabled} accept=".jpeg, .png, .jpg" />
                            {
                                userDetails?.userProfilePicture ? <Image src={`${userDetails?.userProfilePicture}`} alt="user" width={50} height={50} className="w-full object-contain rounded-md" /> : <BiCloudUpload />
                            }
                        </div>
                    </label>
                </div>

                <div className="relative flex-grow w-full">
                    <label htmlFor="userName" className="leading-7 text-sm text-gray-600">Username</label>
                    <input type="text" name="userName" value={userDetails?.userName || ""} onChange={detailsOnChange} className="w-full bg-gray-100 bg-opacity-70 rounded border border-gray-300 focus:border-gray-500 focus:bg-transparent focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:opacity-75" disabled={formDisabled} />
                </div>

                <div className="relative flex-grow w-full">
                    <label htmlFor="userEmail" className="leading-7 text-sm text-gray-600">Email</label>
                    <input type="email" name="userEmail" value={userDetails?.userEmail || ""} onChange={detailsOnChange} className="w-full bg-gray-100 bg-opacity-70 rounded border border-gray-300 focus:border-gray-500 focus:bg-transparent focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:opacity-75" disabled={formDisabled} />
                </div>

                <div className="relative flex-grow w-full">
                    <label htmlFor="userPhone" className="leading-7 text-sm text-gray-600">Phone Number</label>
                    <input type="text" name="userPhone" value={userDetails?.userPhone || ""} onChange={detailsOnChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-transparent focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:opacity-75" disabled={formDisabled} />
                </div>

                <div className="relative flex-grow w-full">
                    <label htmlFor="userProfileColor" className="leading-7 text-sm text-gray-600">Profile Color</label>
                    <input type="text" name="userProfileColor" value={userDetails?.userProfileColor || ""} onChange={detailsOnChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-transparent focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:opacity-75" disabled={formDisabled} />
                </div>

                <div className="relative flex-grow w-full mb-4">
                    <label htmlFor="userProfileBackgroundColor" className="leading-7 text-sm text-gray-600">Profile Background Color</label>
                    <input type="text" name="userProfileBackgroundColor" value={userDetails?.userProfileBackgroundColor || ""} onChange={detailsOnChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-transparent focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:opacity-75" disabled={formDisabled} />
                </div>

                <CustomButton btnDisabled={formDisabled} btnName={`${formProcessing ? "processing" : "update"}`} btnOnClick={submitUpdateProfile} />

            </form>
        </>
    )
}

export default DashboardForm