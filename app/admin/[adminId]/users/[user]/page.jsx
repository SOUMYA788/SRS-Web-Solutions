import { BorderContainerStyle1 } from '@/components/BorderContainer';
import { UserOrderForm } from '@/components/Forms/admin_forms/UserOrderForm';
import { Orders } from '@/components/Orders';
import { Payments } from '@/components/Payments';
import { UserProfileCardTwo } from '@/components/cards/UserProfileCardTwo';
import { dateAndTimeFormatter } from '@/utils/dateAndTimeFormatter';
import { getUserOrders } from '@/utils/getUserOrders';
import { getUserData } from '@/utils/getUsersData';
import React from 'react'


const Details = async ({ params }) => {
  const userId = params.user;


  const { success, data } = await getUserData(null, null, userId, process.env.LOGIN_SECRET);
  const userData = success && JSON.parse(data); // userData is not admin's data

  const stringifyOrders = await getUserOrders(null, null, userData?._id, process.env.LOGIN_SECRET);
  const userOrders = stringifyOrders ? JSON.parse(stringifyOrders) : null;


  const personalInformation = [
    {
      id: "personalInfo_1",
      headding: "user id",
      title: userData?._id,
    },
    {
      id: "personalInfo_2",
      headding: "user name",
      title: userData?.userName,
    },
    {
      id: "personalInfo_3",
      headding: "user email",
      title: userData?.userEmail,
    },
    {
      id: "personalInfo_4",
      headding: "user phone",
      title: userData?.userPhone,
    },
    {
      id: "personalInfo_5",
      headding: "profile background color",
      title: userData?.userProfileBackgroundColor,
    },
    {
      id: "personalInfo_6",
      headding: "profile created at",
      title: userData?.createdAt,
    },
    {
      id: "personalInfo_7",
      headding: "profile updated at",
      title: userData?.createdAt,
    },
  ]


  return (
    <>
      <section className="w-full">
        <h2 className="text-lg font-semibold tracking-wide text-slate-700 dark:text-slate-400 mb-2 uppercase">PROFILE</h2>

        <UserProfileCardTwo cardWidth="w-56" user={userData} />
      </section>


      <section className="w-full my-3">

        <h2 className="text-lg font-semibold tracking-wide text-slate-700 dark:text-slate-400 mb-2 uppercase">personal details</h2>

        <BorderContainerStyle1 className="w-full py-5">
          {
            personalInformation.map(({ id, headding, title }) => (
              <div key={id} className="w-full xs:w-3/4 sm:w-full md:w-[45%] xl:w-[30%] text-base xl:text-lg mx-auto sm:mx-0 my-2">
                <h2 className="uppercase text-gray-600 dark:text-slate-400 mb-2">{headding}</h2>
                <p className="w-full bg-gray-100 dark:bg-slate-700 dark:text-slate-300 rounded border border-gray-300 text-sm text-gray-700 py-1 px-2 leading-8">{title}</p>
              </div>
            ))
          }
        </BorderContainerStyle1>

      </section >

      <section className="w-full my-3">
        <div className="w-full mb-5">
          <UserOrderForm formWidth="w-full md:w-[350px]" userId={userData?._id} fromAdmin={true} />
        </div>
        <Orders orders={userOrders} />
      </section>

      <section className="w-full my-3">
        <h2 className="text-lg font-semibold tracking-wide text-slate-700 dark:text-slate-300 mb-2 uppercase">payment details</h2>

        <BorderContainerStyle1 className={"w-full"}>
          {
            <Payments payments={userOrders} />
          }
        </BorderContainerStyle1>

      </section>
    </>
  )
}

export default Details