import DashboardForm from '@/components/Forms/DashboardForm';
import Image from 'next/image';
import { cookies } from "next/headers"
import React from 'react'
import { UserProfileCardOne } from '@/components/cards/UserProfileCardOne';
import { getUserData } from '@/utils/getUsersData';

const Dashboard = async () => {
    const cookiesStore = cookies();
    const { success, data } = await getUserData(null, cookiesStore);
    const user = success && JSON.parse(data)

    if (!user) return <h2 className="w-full text-center font-semibold">Please refresh the browser or login in again.</h2>

    return (
        <>
            <section className='w-full flex flex-row px-2 py-3 gap-2 relative'>
                <div className={`forgroundImg ${user?.userProfileBackgroundColor || ""} w-full h-64 absolute top-0 left-0 p-1 z-0 rounded-md overflow-hidden`}>
                    {
                        user?.userProfileBackground && <Image src={`${user?.userProfileBackground}`} alt="user" width={50} height={50} className="w-full h-full object-cover rounded-md" />
                    }
                </div>

                <div className='w-full flex flex-wrap flex-col md:flex-row-reverse justify-between gap-5 mt-44 relative z-10'>
                    <UserProfileCardOne user={user} />
                    <div className='w-full flex-1 bg-slate-200 dark:bg-slate-800 bg-opacity-60 dark:bg-opacity-80 border-slate-400 border-2 md:shadow-md rounded-lg p-2 h-fit'>
                        {/* USER INFORMATION EDITING FORM */}
                        <DashboardForm />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard