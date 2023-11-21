import React from 'react'

const CustomInput = ({inputType, inputName, inputPlaceHolder, inputValue, inputOnChange, inputError}) => {
    return (
        <input type={inputType} name={inputName} placeholder={inputPlaceHolder} value={inputValue} onChange={inputOnChange} className={`w-full p-3 text-sm border-2 border-gray-400 bg-transparent rounded-md focus:outline-none focus:border-gray-500 ${inputError ? 'border-red-500' : 'border-gray-400'}`} />
    )
}

export default CustomInput