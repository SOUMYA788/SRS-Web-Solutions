import { UserProfile } from '@/components/cards/UserProfile';
import { getAllUsersData } from '@/utils/getAllUsersData';
import { getUserData } from '@/utils/getUserData';
import { cookies } from 'next/headers';
import Image from 'next/image';
import React from 'react'
import { FaImage } from 'react-icons/fa';


const Users = async () => {
    const cookiesStore = cookies();
    const stringifyUser = await getUserData(null, cookiesStore);
    const user = stringifyUser ? JSON.parse(stringifyUser) : null

    const allUsers = await getAllUsersData(process.env.LOGIN_SECREAT, user?.userEmail)



    if (!user) return <h2 className="w-full text-center font-semibold">Please refresh the browser or login in again.</h2>

    return (
        <>
            <h2 className="mb-3 font-semibold uppercase tracking-wide">all available users</h2>
            {
                allUsers && allUsers.map((user, userIndex) => (
                    <div key={`available_user_${userIndex}`} className={`w-full md:w-[300px] h-[250px] flex flex-col justify-end items-center ${user?.userProfileBackgroundColor} rounded-lg relative`}>
                        {
                            user?.userProfileBackgroundPicture && <Image src={user?.userProfileBackgroundPicture} alt="user" width={50} height={50} className="w-full h-1/2 object-contain rounded-md absolute top-0 left-0" />
                        }
                        {
                            !user?.userProfileBackgroundPicture && <FaImage className="w-full h-1/2 text-9xl rounded-md absolute top-0 object-top text-slate-200 bg-slate-800" />
                        }
                        <UserProfile user={user} cardWidth="w-full" />
                    </div>
                ))
            }
        </>
    )
}

export default Users