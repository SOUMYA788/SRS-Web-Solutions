import React from 'react'

export const BorderContainerStyle1 = ({ className, children }) => {
    return (
        <div className={`w-fit mx-auto p-1 sm:p-4 border-2 border-slate-300 dark:border-slate-400 rounded-md flex flex-row flex-wrap gap-4 mt-3 ${className}`}>
            {children}
        </div>
    )
}
