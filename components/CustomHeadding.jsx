import React from 'react'

const CustomHeadding = ({headdingTitle, useFor, textSize}) => {

    return (
        <>
            <h2 className={`sm:m-4 mb-0 ${textSize || "text-base sm:text-3xl text-gray-600"} font-bold uppercase text-center  ${(useFor === "admin" || useFor === "admin_form") ? "italic" : ""}`}>
                {headdingTitle}
            </h2>

            <div className="hr h-[1px] w-3/4 sm:w-72 mx-auto my-2 bg-slate-300 rounded-full" />
        </>
    )
}

export default CustomHeadding