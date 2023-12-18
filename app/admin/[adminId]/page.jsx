import DashboardForm from '@/components/Forms/DashboardForm';
import { UserProfile } from '@/components/cards/UserProfile';
import { getUserData } from '@/utils/getUserData';
import { cookies } from 'next/headers';
import React from 'react'

const AdminHome = async () => {
    const cookiesStore = cookies();
    const stringifyUser = await getUserData(null, cookiesStore);
    const user = stringifyUser ? JSON.parse(stringifyUser) : null

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

    if (!user) return <h2 className="w-full text-center font-semibold">Please refresh the browser or login in again.</h2>

    return (
        <>
            <section className='w-full flex flex-row px-2 py-3 gap-2 relative'>
                <h2 className="font-semibold text-lg"> {greetAdmin()} <span className={`text-blue-500`}>{user?.userName}</span> </h2>
            </section>

            <section className='w-full flex flex-row px-2 py-3 gap-2 relative'>
                <div className={`forgroundImg ${user?.userProfileBackgroundColor || ""} w-full h-64 absolute top-0 left-0 p-1 -z-10 rounded-md overflow-hidden`}>
                    {
                        user?.userProfileBackground && <Image src={`${user?.userProfileBackground}`} alt="user" width={50} height={50} className="w-full h-full object-cover rounded-md" />
                    }
                </div>

                <div className='w-full flex flex-wrap flex-col md:flex-row-reverse justify-between gap-5 mt-44'>
                    
                    <UserProfile user={user} />

                    <div className='w-full flex-1 bg-slate-200 bg-opacity-60 border-slate-400 border-2 md:shadow-md rounded-lg p-2 h-fit'>
                        {/* USER INFORMATION EDITING FORM */}
                        <DashboardForm />
                    </div>

                </div>
            </section>
        </>
    )
}

export default AdminHome