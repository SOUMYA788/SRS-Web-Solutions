import React from 'react'

// used in login, signup
export const CustomInputType1 = ({ inputType, inputName, inputPlaceHolder, inputValue, inputOnChange, inputError, inputRequired, inputLabel }) => {
    return (
        <div className="flex flex-col gap-1">
            {inputLabel && <label htmlFor={inputName} className="text-sm text-gray-500">{inputLabel}</label>}

            <input type={inputType} name={inputName} placeholder={inputPlaceHolder} value={inputValue} onChange={inputOnChange} className={`w-full p-3 text-sm outline-none border-2 border-gray-400 bg-transparent rounded-md focus:border-gray-500 ${inputError ? 'border-red-500' : 'border-gray-400'}`} required={inputRequired} />
        </div>
    )
}

export const CustomReadOnlyInput = ({ inputType, inputName, inputPlaceHolder, inputValue }) => {
    return (
        <input type={inputType} name={inputName} placeholder={inputPlaceHolder} value={inputValue} readOnly={true} className={`w-full p-3 text-sm outline-none border-2 border-gray-400 bg-transparent rounded-md focus:border-gray-500`} required={inputRequired} />
    )
}


export const CustomInputType2 = ({ inputId, inputLabel, inputDisabled }) => {
    return <div className="relative flex-grow w-full mb-4">
        <label htmlFor={inputId} className="leading-7 text-sm text-gray-600">{inputLabel}</label>
        <input type="text" name={inputId} id={inputId} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-transparent focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:opacity-75" disabled={inputDisabled} />
    </div>
}