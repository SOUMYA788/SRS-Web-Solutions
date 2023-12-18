import { UserProfile } from '@/components/cards/UserProfile';
import { getUserData } from '@/utils/getUserData';
import { cookies } from 'next/headers';
import Image from 'next/image';
import React from 'react'

const Users = async () => {
    const cookiesStore = cookies();
    const stringifyUser = await getUserData(null, cookiesStore);
    const user = stringifyUser ? JSON.parse(stringifyUser) : null

    const varified = false; // is a varification for admin to view the list and details of the all users

    if (!user) return <h2 className="w-full text-center font-semibold">Please refresh the browser or login in again.</h2>

    return (
        <>

            {varified && <form action="" method="post" className="w-full md:w-1/2 md:p-2 mx-auto">
                <h2 className="text-center uppercase tracking-wide mb-3">Varify Yourself</h2>
                <div className="w-full flex flex-row justify-center items-center bg-white rounded-md">
                    <input type="text" name="userName" placeholder="Enter Your Password" className="w-full px-2 py-3 bg-transparent outline-none border-none" />
                    <button type="submit" className="bg-blue-500 px-6 py-3 rounded-r-md ">varify</button>

                </div>
            </form>}

            <h2>Sample User Card</h2>
            <div className="w-full md:w-[300px] h-[250px] flex flex-col justify-end items-center bg-red-500 rounded-lg relative">
                {
                    user?.userProfilePicture && <Image src={user?.userProfilePicture} alt="user" width={50} height={50} className="w-full h-1/2 rounded-md absolute top-0 left-0" />
                }

                <UserProfile user={user} cardWidth="w-full" />
            </div>
        </>
    )
}

export default Users