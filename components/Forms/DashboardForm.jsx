"use client"
import React, { useEffect, useState } from 'react'
import CustomButton from '../FormElements/CustomButton'

const DashboardForm = ({ user }) => {
    const [userDetails, setUserDetails] = useState(null)

    const [detailError, setDetailError] = useState({})

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

    const submitUpdateProfile = (e) => {
        e.preventDefault();
        console.log("click on update profile button");
    }

    useEffect(() => {
        setUserDetails(JSON.parse(JSON.stringify(user)))
    }, [])

    return (
        <form action="" className='flex w-full sm:flex-row flex-col mx-auto px-8 border-2 border-slate-200 rounded-sm mt-3 gap-3 flex-wrap'>


            <div className="relative flex-grow w-full">
                <label htmlFor="userName" className="leading-7 text-sm text-gray-600">Username</label>
                <input type="text" name="userName" value={userDetails?.userName || ""} onChange={detailsOnChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-transparent focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            
            <div className="relative flex-grow w-full">
                <label htmlFor="userEmail" className="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" name="userEmail" value={userDetails?.userEmail || ""} onChange={detailsOnChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-transparent focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>

            <div className="relative flex-grow w-full">
                <label htmlFor="userPhone" className="leading-7 text-sm text-gray-600">Phone Number</label>
                <input type="text" name="userPhone" value={userDetails?.userPhone || ""} onChange={detailsOnChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-transparent focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>

            <div className="relative flex-grow w-full">
                <label htmlFor="userProfileColor" className="leading-7 text-sm text-gray-600">Profile Color</label>
                <input type="text" name="userProfileColor" value={userDetails?.userProfileColor || ""} onChange={detailsOnChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-transparent focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>

            <div className="relative flex-grow w-full">
                <label htmlFor="userProfileBackground" className="leading-7 text-sm text-gray-600">Profile Background Color</label>
                <input type="text" name="userProfileBackground" value={userDetails?.userProfileBackground || ""} onChange={detailsOnChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-transparent focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>

            <CustomButton btnDisabled={false} btnName="update" btnOnClick={submitUpdateProfile}/>

        </form>
    )
}

export default DashboardForm