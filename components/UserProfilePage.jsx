import React from 'react'
import { UserProfileCardOne } from './cards/UserProfileCardOne'
import DashboardForm from './Forms/DashboardForm'

const UserProfilePage = ({ backgroundColor = "", backgroundImage = "", user }) => {
    return (

        <section className='w-full flex flex-row px-2 py-3 gap-2 relative'>
            <div className={`forgroundImg ${backgroundColor} w-full h-64 absolute top-0 left-0 p-1 z-0 rounded-md overflow-hidden`}>
                {
                    backgroundImage && <Image src={backgroundImage} alt="user" width={50} height={50} className="w-full h-full object-cover rounded-md" />
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

    )
}

export default UserProfilePage