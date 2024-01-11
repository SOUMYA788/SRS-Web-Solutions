"use client"
import React from 'react'

export const CustomButton = ({ btnName, btnType, btnOnClick, btnDisabled, formProcessing, btnColor }) => {
    return (
        <button type={btnType} onClick={btnOnClick} className={`w-full ${btnColor || "bg-slate-200 text-slate-600 focus:text-slate-300 focus:bg-slate-700 font-semibold"} dark:bg-transparent dark:text-slate-400 dark:focus:bg-slate-400 dark:focus:text-slate-800 outline-none border-4 border-gray-400 focus:border-slate-800 dark:border-gray-500 dark:focus:border-slate-300 px-3 py-2 text-sm rounded-md uppercase tracking-wider disabled:hover:bg-gray-600 transition`} disabled={btnDisabled} >
            {formProcessing ? "Processing..." : btnName}
        </button>
    )
}