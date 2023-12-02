import DashboardNav from '@/components/DashboardNav';
import DashboardForm from '@/components/Forms/DashboardForm';
import dbConnection from '@/middleware/dbConnection';
import UserModel from '@/models/User';
import Image from 'next/image';
import React from 'react'

const Dashboard = async ({ params }) => {
    const userId = params.user;
    
    const userData = async () => {
        try {
            await dbConnection();

            const validUser = await UserModel.findOne({ _id: userId }).select("-userPassword");

            if (!validUser) {
                throw new Error("Invalid User")
            }

            return validUser;
        } catch (error) {
            console.log(error)
        }
    }

    const user = await userData();

    // async function userData() {
    //     try {
    //         const response = await fetch("api/user/");
    //         if (!response.ok) {
    //             throw new Error("Response Faild");
    //         }
    //         user = response.json();
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    console.log("user is => ", user ? user : "user Not Found");

    return (
        <div className='w-full flex flex-row justify-between gap-2'>

            {user?._id && <DashboardNav userId={user?._id} />}

            <section className='w-full flex flex-row px-2 py-3 gap-2 relative'>

                <div className="forgroundImg bg-blue-500 w-full h-64 absolute top-0 left-0 -z-10 rounded-md">
                    {
                        user?.userProfileBackground && <Image src={`${user?.userProfileBackground}`} alt="user" width={50} height={50} className="w-full h-full object-cover" />
                    }
                </div>

                <div className='w-full flex flex-wrap flex-col md:flex-row-reverse justify-between gap-5 mt-44'>

                    <div className="w-full h-fit px-2 py-5 md:w-[300px] bg-slate-200 bg-opacity-60 border-slate-400 shadow-md border-2 rounded-lg relative flex flex-col items-center">
                        {user?.userProfileColor && <div tabIndex={0} className={`w-20 h-20 rounded-full m-auto ${user?.userProfileColor} border border-black cursor-pointer absolute -top-8`}>
                            {
                                user?.userProfilePicture && <Image src={`${user?.userProfilePicture}`} alt="user" width={50} height={50} className="w-full h-full object-contain" />
                            }
                        </div>}
                        <div className="info mt-9">
                            <h2 className='text-center text-2xl font-semibold'>{user?.userName || ""}</h2>
                            <h2 className='text-center text-sm mt-1'>{user?.userEmail || ""}</h2>
                            <h2 className='text-center text-sm mt-1'>{user?.userPhone || ""}</h2>
                            <h2 className='text-center text-sm mt-1'>Last Modified: {new Date(user?.updatedAt).toDateString() || ""}</h2>
                        </div>
                    </div>



                    <div className='w-full flex-1  bg-slate-200 bg-opacity-60 border-slate-400 border-2 md:shadow-md rounded-lg p-2 h-fit'>
                        {/* USER INFORMATION EDITING FORM */}
                        <h2 className='text-center text-2xl font-semibold p-2 text-slate-800 tracking-wide'>DETAILS</h2>
                        <DashboardForm user={user} />
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Dashboard