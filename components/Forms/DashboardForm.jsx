"use client"
import React, { useState, useEffect } from 'react'
import { CustomButton } from '../FormElements/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { assignUser } from '@/Redux/slices/userSlice'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BiCloudUpload } from 'react-icons/bi'
import { showErrorToast, showSuccessToast } from '@/utils/showToast'
import { CustomInputType1 } from '../FormElements/CustomInput'
import { validateEmail } from '@/utils/varifyInput'





const DashboardForm = () => {
    // name, email, phone, profileColor, profileBackground
    const user = useSelector((state) => state.user.value);

    const dispatch = useDispatch();
    const router = useRouter();

    const [formProcessing, setFormProcessing] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    const [userDetails, setUserDetails] = useState({
        userName: "",
        userEmail:"",
        userPhone:"",
        userProfileBackgroundColor:"",
        userProfileColor:"",
        userProfilePicture:"",        
    });

    console.log("userDetails in userDashboard", userDetails)

    const [detailError, setDetailError] = useState({});

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
            showErrorToast(error.message || "Faild to update profile");
        } finally {
            router.refresh();
            setFormDisabled(true);
            setFormProcessing(false);
        }
    }

    const changeEditMode = (e) => {
        e.preventDefault();
        setFormDisabled((value) => !value);
    }


    const formInputSlotData = [
        {
            id: "form_input_1",
            inputType: "text",
            inputLabel: "Username",
            inputValue: userDetails?.userName || "",
            inputName: "userName",
        },
        {
            id: "form_input_2",
            inputType: "email",
            inputLabel: "Email",
            inputValue: userDetails?.userEmail || "",
            inputName: "userEmail",
        },
        {
            id: "form_input_3",
            inputType: "text",
            inputLabel: "Phone Number",
            inputValue: userDetails?.userPhone || "",
            inputName: "userPhone",
        },
        {
            id: "form_input_4",
            inputType: "text",
            inputLabel: "Profile Background Color",
            inputValue: userDetails?.userProfileBackgroundColor || "",
            inputName: "userProfileBackgroundColor",
        },
        {
            id: "form_input_5",
            inputType: "text",
            inputLabel: "Profile Color",
            inputValue: userDetails?.userProfileColor || "",
            inputName: "userProfileColor",
        },
    ]


    useEffect(() => {
        setUserDetails({
            ...userDetails,
            ...user
        });
    }, [user])


    return (
        <>
            <div className="w-full flex flex-row justify-between items-center px-2 py-1">
                <h2 className='text-center text-2xl font-semibold p-2 text-slate-800 dark:text-slate-300 tracking-wide'>
                    DETAILS
                </h2>
                <button type="button" className={`outline-none border-2 ${formDisabled ? "bg-transparent capitalize border-blue-500 font-semibold focus:outline-blue-700 focus:bg-blue-500 hover:border-blue-700 hover:bg-blue-500 focus:text-white hover:text-white tracking-wider" : "bg-red-500 tracking-wider uppercase border-red-700 focus:outline-red-700 focus:rounded-full hover:rounded-sm"}  px-4 py-2 text-xs transition-colors`} onClick={changeEditMode}>
                    {formDisabled ? "edit profile" : "cancel"}
                </button>
            </div>

            <form action="" className='flex w-full sm:flex-row flex-col mx-auto px-8 border-2 dark:border-none border-slate-200 rounded-sm mt-3 gap-3 flex-wrap'>

                <div className="w-full sm:w-48 sm:min-h-48">
                    <label htmlFor="userProfilePicture" className="w-full h-full leading-7 text-sm text-gray-600">
                        <div className="w-full h-full bg-slate-200 dark:bg-slate-700 shadow shadow-slate-600 dark:text-slate-400 border-2 border-slate-300 dark:border-slate-500 rounded-md overflow-hidden flex justify-center items-center text-4xl p-1">
                            <input type="file" name="userProfilePicture" id="userProfilePicture" onChange={formImageOnChange} className="hidden" disabled={formDisabled} accept=".jpeg, .png, .jpg" />
                            {
                                userDetails?.userProfilePicture ? <Image src={`${userDetails?.userProfilePicture}`} alt="user" width={50} height={50} className="w-full object-contain rounded-md" /> : <BiCloudUpload />
                            }
                        </div>
                    </label>
                </div>

                {
                    formInputSlotData.map(value => (
                        <div key={value.id} className="relative flex-grow w-full">
                            <CustomInputType1 inputType={value.inputType} inputLabel={value.inputLabel} inputValue={value.inputValue} inputName={value.inputName} inputOnChange={detailsOnChange} inputDisabled={formDisabled} />
                        </div>
                    ))
                }

                <CustomButton btnDisabled={formDisabled} btnName={`${formProcessing ? "processing" : "update"}`} btnOnClick={submitUpdateProfile} className="mt-5"/>

            </form>
        </>
    )
}

export default DashboardForm