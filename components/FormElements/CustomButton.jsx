import React from 'react'

const CustomButton = ({ btnName, btnType, btnOnClick, btnDisabled, formProcessing }) => {
    return (
        <button type={btnType} onClick={btnOnClick} className="w-full bg-gray-500 border-2 text-white p-3 text-sm rounded-md uppercase tracking-wider hover:bg-gray-600 focus:bg-gray-600 transition" disabled={btnDisabled}>
            {formProcessing ? "Processing" : btnName}
        </button>
    )
}

export default CustomButton