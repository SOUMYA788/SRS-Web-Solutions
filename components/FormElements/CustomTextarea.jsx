import React from 'react'

const CustomTextarea = ({textAreaName, textAreaPlaceholder, textAreaValue, textAreaOnChange, textAreaError}) => {
    return (
        <textarea name={textAreaName} placeholder={textAreaPlaceholder} value={textAreaValue} onChange={textAreaOnChange} className={`w-full h-40 p-3 text-sm dark:text-slate-400 border-2 border-gray-400 dark:border-gray-500 focus:border-gray-500 bg-transparent rounded-md resize-none focus:outline-none  dark:focus:border-gray-400 ${textAreaError ? 'border-red-500' : 'border-gray-400'}`} />
    )
}

export default CustomTextarea