import Image from 'next/image'
import React from 'react'

export const UserProfileCardOne = ({ user, cardWidth }) => {
    return (
        <div className={`${cardWidth ? `${cardWidth} border-none` : 'w-full xs:w-72 dark:border-2 dark:border-slate-400'} mr-auto h-fit px-2 py-5  bg-slate-200 dark:bg-slate-800 bg-opacity-60 dark:bg-opacity-80 shadow-md outline-none rounded-lg relative flex flex-col items-center`}>
            {user?.userProfileColor && <div className={`w-20 h-20 overflow-hidden rounded-full m-auto ${user?.userProfileColor} border-2 border-slate-600 dark:border-slate-400 cursor-pointer absolute -top-8`}>
                {
                    user?.userProfilePicture && <Image src={`${user?.userProfilePicture}`} alt="user" width={50} height={50} className="w-full h-full object-contain rounded-full border-none outline-none" />
                }
            </div>}
            <div className="info mt-9 dark:text-slate-400">
                <h2 className='text-center text-2xl font-semibold dark:text-white'>{user?.userName || ""}</h2>
                <h2 className='text-center text-sm mt-1 dark:text-slate-100'>{user?.userEmail || ""}</h2>
                <h2 className='text-center text-sm mt-1'>{user?.userPhone || ""}</h2>
                <h2 className='text-center text-sm mt-1'> Last Modified: {new Date(user?.updatedAt).toDateString() || ""}</h2>
            </div>
        </div>
    )
}

