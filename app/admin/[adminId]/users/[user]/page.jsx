import { BorderContainerStyle1 } from '@/components/BorderContainer';
import { UserOrderForm } from '@/components/Forms/admin_forms/UserOrderForm';
import { Orders } from '@/components/Orders';
import { Payments } from '@/components/Payments';
import { UserProfileCardTwo } from '@/components/cards/UserProfileCardTwo';
import { dateAndTimeFormatter } from '@/utils/dateAndTimeFormatter';
import { getUserData } from '@/utils/getUserData';
import { getUserOrders } from '@/utils/getUserOrders';
import { getUserPaymentDetails } from '@/utils/getUserPaymentDetails';
import { cookies } from 'next/headers';
import React from 'react'


const Details = async ({ params }) => {
  const userId = params.user;
  const cookieStore = cookies();


  const stringifyUserData = await getUserData(null, null, userId, process.env.LOGIN_SECRET);
  const userData = JSON.parse(stringifyUserData); // userData is not admin's data

  const stringifyOrders = await getUserOrders(null, null, userData?._id, process.env.LOGIN_SECRET);
  const userOrders = stringifyOrders ? JSON.parse(stringifyOrders) : null;

  const stringifyPaymentDetails = await getUserPaymentDetails(null, null, userData?._id, process.env.LOGIN_SECRET);
  const userPaymentDetails = stringifyPaymentDetails ? JSON.parse(stringifyPaymentDetails) : null;



  return (

    <>
      {/*
        User's Details Will Show Here. Details include 
        ---- full profile, 
        ---- orders (success, pending, faild, cancelled), and 
        ---- payments (success, due, faild) 
      */}

      <section className="w-full">
        <h2 className="text-lg font-semibold tracking-wide text-slate-700 mb-2 uppercase">PROFILE</h2>

        <UserProfileCardTwo cardWidth="w-56" user={userData} />
      </section>


      <section className="w-full my-3">

        <h2 className="text-lg font-semibold tracking-wide text-slate-700 mb-2 uppercase">personal details</h2>

        <BorderContainerStyle1>

          <div className="w-full sm:w-1/2 lg:w-[30%] xl:w-1/4">
            <h2 className="uppercase text-xs text-gray-600 mb-2">user id</h2>
            <p className="w-full bg-gray-100 rounded border border-gray-300 text-sm text-gray-700 py-1 px-2 leading-8">{userData?._id}</p>
          </div>

          <div className="w-full sm:w-1/2 lg:w-[30%] xl:w-1/4">
            <h2 className="uppercase text-xs text-gray-600 mb-2">user name</h2>
            <p className="w-full bg-gray-100 rounded border border-gray-300 text-sm text-gray-700 py-1 px-2 leading-8">{userData?.userName}</p>
          </div>

          <div className="w-full sm:w-1/2 lg:w-[30%] xl:w-1/4">
            <h2 className="uppercase text-xs text-gray-600 mb-2">user email</h2>
            <p className="w-full bg-gray-100 rounded border border-gray-300 text-sm text-gray-700 py-1 px-2 leading-8">{userData?.userEmail}</p>
          </div>

          <div className="w-full sm:w-1/2 lg:w-[30%] xl:w-1/4">
            <h2 className="uppercase text-xs text-gray-600 mb-2">user phone</h2>
            <p className="w-full bg-gray-100 rounded border border-gray-300 text-sm text-gray-700 py-1 px-2 leading-8">{userData?.userPhone}</p>
          </div>

          <div className="w-full sm:w-1/2 lg:w-[30%] xl:w-1/4">
            <h2 className="uppercase text-xs text-gray-600 mb-2">profile color</h2>
            <p className="w-full bg-gray-100 rounded border border-gray-300 text-sm text-gray-700 py-1 px-2 leading-8">{userData?.userProfileColor}</p>
          </div>

          <div className="w-full sm:w-1/2 lg:w-[30%] xl:w-1/4">
            <h2 className="uppercase text-xs text-gray-600 mb-2">profile background color</h2>
            <p className="w-full bg-gray-100 rounded border border-gray-300 text-sm text-gray-700 py-1 px-2 leading-8">{userData?.userProfileBackgroundColor}</p>
          </div>

          <div className="w-full sm:w-1/2 lg:w-[30%] xl:w-1/4">
            <h2 className="uppercase text-xs text-gray-600 mb-2">profile created at</h2>
            <p className="w-full bg-gray-100 rounded border border-gray-300 text-sm text-gray-700 py-1 px-2 leading-8"> {dateAndTimeFormatter(userData?.createdAt)}</p>
          </div>

          <div className="w-full sm:w-1/2 lg:w-[30%] xl:w-1/4">
            <h2 className="uppercase text-xs text-gray-600 mb-2">profile updated at</h2>
            <p className="w-full bg-gray-100 rounded border border-gray-300 text-sm text-gray-700 py-1 px-2 leading-8"> {dateAndTimeFormatter(userData?.updatedAt)}</p>
          </div>
        </BorderContainerStyle1>
      </section >

      <section className="w-full my-3">
        <div className="w-full mb-5">
          <UserOrderForm formWidth="w-full md:w-[350px]" userId={userData?._id} fromAdmin={true} />
        </div>
        <Orders orders={userOrders} />
      </section>

      <section className="w-full my-3">
        <h2 className="text-lg font-semibold tracking-wide text-slate-700 mb-2 uppercase">payment details</h2>

        <BorderContainerStyle1>
          {
            userPaymentDetails?.length > 0 ? <Payments payments={userPaymentDetails} /> : <p className="w-full text-center text-sm text-slate-500">Data Not Available</p>
          }
        </BorderContainerStyle1>

      </section>
    </>
  )
}

export default Details