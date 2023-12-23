import { UserProfileCardTwo } from '@/components/cards/UserProfileCardTwo';
import { getAllUsersData } from '@/utils/getAllUsersData';
import { getUserData } from '@/utils/getUserData';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'


const Users = async () => {
    const cookiesStore = cookies();
    const stringifyUser = await getUserData(null, cookiesStore);
    const admin = stringifyUser ? JSON.parse(stringifyUser) : null

    const allUsers = await getAllUsersData(process.env.LOGIN_SECRET, admin?.userEmail)



    if (!admin) return <h2 className="w-full text-center font-semibold">Please refresh the browser or login in again.</h2>

    return (
        <>
            <h2 className="mb-3 font-semibold uppercase tracking-wide">all available users</h2>
            {
                allUsers && allUsers.map((user, userIndex) => (
                    <Link href={`/admin/${admin?._id}/users/${user?._id}`} className="w-full sm:w-[300px] outline-none border-2 hover:border-blue-500 focus:border-blue-500 rounded-lg transition-colors">
                        <UserProfileCardTwo key={`available_user_${userIndex}`} user={user}/>
                    </Link>

                ))
            }
        </>
    )
}

export default Users