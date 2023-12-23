import React from 'react'

export const BorderContainerStyle1 = ({ children }) => {
    return (
        <div className="w-full p-1 sm:p-4 border-2 border-slate-300 rounded-md flex flex-row flex-wrap gap-4 mt-3">
            {children}
        </div>
    )
}
