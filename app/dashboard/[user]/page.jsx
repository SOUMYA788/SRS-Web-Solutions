import DashboardForm from '@/components/Forms/DashboardForm';
import { getUserData } from '@/utils/getUserData';
import Image from 'next/image';
import { cookies } from "next/headers"
import React from 'react'

const Dashboard = async () => {
    const cookiesStore = cookies();
    const stringifyUser = await getUserData(null, cookiesStore);
    const user = stringifyUser ? JSON.parse(stringifyUser) : null

    if(!user) return <h2 className="w-full text-center font-semibold">Please refresh the browser or login in again.</h2>

    return (
        <>
            <section className='w-full flex flex-row px-2 py-3 gap-2 relative'>
                <div className={`forgroundImg ${user?.userProfileBackgroundColor || ""} w-full h-64 absolute top-0 left-0 p-1 -z-10 rounded-md overflow-hidden`}>
                    {
                        user?.userProfileBackground && <Image src={`${user?.userProfileBackground}`} alt="user" width={50} height={50} className="w-full h-full object-cover rounded-md" />
                    }
                </div>

                <div className='w-full flex flex-wrap flex-col md:flex-row-reverse justify-between gap-5 mt-44'>

                    <div className="w-full h-fit px-2 py-5 md:w-[300px] bg-slate-200 bg-opacity-60 border-slate-400 shadow-md border-2 rounded-lg relative flex flex-col items-center">
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

                    <div className='w-full flex-1 bg-slate-200 bg-opacity-60 border-slate-400 border-2 md:shadow-md rounded-lg p-2 h-fit'>
                        {/* USER INFORMATION EDITING FORM */}
                        <DashboardForm />
                    </div>

                </div>
            </section>
        </>
    )
}

export default Dashboard