import React from 'react'

export const UserProfile = ({ user, cardWidth }) => {
    return (

        <div className={`w-full h-fit px-2 py-5 md:${cardWidth || 'w-[300px]'} bg-slate-200 bg-opacity-60 border-slate-400 shadow-md border-2 rounded-lg relative flex flex-col items-center`}>
            {user?.userProfileColor && <div tabIndex={0} className={`w-20 h-20 overflow-hidden rounded-full m-auto ${user?.userProfileColor} border-2 border-slate-600 cursor-pointer absolute -top-8`}>
                {
                    user?.userProfilePicture && <Image src={`${user?.userProfilePicture}`} alt="user" width={50} height={50} className="w-full h-full object-contain rounded-full" />
                }
            </div>}
            <div className="info mt-9">
                <h2 className='text-center text-2xl font-semibold'>{user?.userName || ""}</h2>
                <h2 className='text-center text-sm mt-1'>{user?.userEmail || ""}</h2>
                <h2 className='text-center text-sm mt-1'>{user?.userPhone || ""}</h2>
                <h2 className='text-center text-sm mt-1'> Last Modified: {new Date(user?.updatedAt).toDateString() || ""}</h2>
            </div>
        </div>

    )
}