import { UserProfileCardTwo } from '@/components/cards/UserProfileCardTwo';
import { getUserData, getUsersData } from '@/utils/getUsersData';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'


const Users = async () => {
    const cookiesStore = cookies();
    const { success, data } = await getUserData(null, cookiesStore);
    const admin = success && JSON.parse(data)

    if (admin?.role !== "admin") return <h2 className="w-full text-center font-semibold">Please refresh the browser or login in again.</h2>

    const allUsers = await getUsersData(process.env.LOGIN_SECRET, admin?.userEmail)


    return (
        <>
            <h2 className="mb-3 font-semibold uppercase tracking-wide">all available users</h2>
            {
                allUsers && allUsers.map((user, userIndex) => (
                    <Link href={`/admin/${admin?._id}/users/${user?._id}`} className="w-full sm:w-[300px] outline-none border-2 hover:border-blue-500 focus:border-blue-500 rounded-lg transition-colors">
                        <UserProfileCardTwo key={`available_user_${userIndex}`} user={user} />
                    </Link>

                ))
            }
        </>
    )
}

export default Users