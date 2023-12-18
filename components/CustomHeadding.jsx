import React from 'react'

const CustomHeadding = ({headdingTitle, useFor}) => {
    return (
        <>
            <h2 className={`m-4 mb-0 text-3xl font-bold uppercase text-center text-gray-600 ${useFor === "admin" ? "italic" : ""}`}>
                {headdingTitle}
            </h2>

            <div className="hr h-[1px] w-3/4 sm:w-72 mx-auto my-2 bg-slate-300 rounded-full" />
        </>
    )
}

export default CustomHeadding