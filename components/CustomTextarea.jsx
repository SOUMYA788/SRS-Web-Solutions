import React from 'react'

const CustomTextarea = ({textAreaName, textAreaPlaceholder, textAreaValue, textAreaOnChange, textAreaError}) => {
    return (
        <textarea name={textAreaName} placeholder={textAreaPlaceholder} value={textAreaValue} onChange={textAreaOnChange} className={`w-full h-40 p-3 text-sm border-2 border-gray-400 bg-transparent rounded-md resize-none focus:outline-none focus:border-gray-500 ${textAreaError ? 'border-red-500' : 'border-gray-400'}`} />
    )
}

export default CustomTextarea