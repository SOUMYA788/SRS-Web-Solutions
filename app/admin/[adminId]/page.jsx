import DashboardForm from '@/components/Forms/DashboardForm';
import UserProfilePage from '@/components/UserProfilePage';
import { UserProfileCardOne } from '@/components/cards/UserProfileCardOne';
import { getUserData } from '@/utils/getUsersData';
import { cookies } from 'next/headers';
import React from 'react'

const AdminHome = async () => {
    const cookiesStore = cookies();
    const { success, data } = await getUserData(null, cookiesStore);
    const user = success && JSON.parse(data)

    const greetAdmin = () => {
        const newDate = new Date();
        const time = newDate.getHours()
        if (time < 12) {
            return "Good Morning"
        } else if (time > 12 && time < 15) {
            return "Good Afternoon"
        } else if (time > 15 && time < 21) {
            return "Good Evening"
        } else {
            return "Good Night"
        }
    }

    if (!success) return <h2 className="w-full text-center font-semibold">Please refresh the browser or login in again.</h2>

    return (
        <>
            <section className='w-full flex flex-row px-2 py-3 gap-2 relative'>
                <h2 className="font-semibold text-lg"> {greetAdmin()} <span className={`text-blue-500`}>{user?.userName}</span> </h2>
            </section>

            <UserProfilePage user={user} backgroundColor={user?.userProfileBackgroundColor} backgroundImage={user?.userProfileBackground} />
        </>
    )
}

export default AdminHome