import React from 'react'
import Image from 'next/image'
import { FaImage } from 'react-icons/fa'
import { UserProfileCardOne } from './UserProfileCardOne'



export const UserProfileCardTwo = ({ user, cardWidth }) => {
    // The outer div height cover the full card...
    return (
        <div className={`${cardWidth || "w-full"} h-[250px] flex flex-col justify-end items-center ${user?.userProfileBackgroundColor} rounded-lg relative`}>
            {
                user?.userProfileBackgroundPicture && <Image src={user?.userProfileBackgroundPicture} alt="user" width={50} height={50} className="w-full h-1/2 object-contain rounded-md absolute top-0 left-0" />
            }
            {
                !user?.userProfileBackgroundPicture && <FaImage className="w-full h-1/2 text-9xl rounded-md absolute top-0 object-top text-slate-200 bg-slate-800" />
            }
            <UserProfileCardOne user={user} cardWidth={cardWidth} />
        </div>
    )
}
