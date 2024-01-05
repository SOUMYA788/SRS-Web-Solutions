"use client"
import React from 'react'

export const CustomButton = ({ btnName, btnType, btnOnClick, btnDisabled, formProcessing, btnColor }) => {
    return (
        <button type={btnType} onClick={btnOnClick} className={`w-full ${btnColor || "bg-gray-500 text-white"} border-2 px-3 py-2 text-sm rounded-md uppercase tracking-wider ${!btnDisabled ? "hover:bg-gray-600" : ""} focus:bg-gray-600 transition`} disabled={btnDisabled} >
            {formProcessing ? "Processing..." : btnName}
        </button>
    )
}