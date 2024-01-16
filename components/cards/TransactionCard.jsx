import { dateAndTimeFormatter } from '@/utils/dateAndTimeFormatter';
import React from 'react'

export const TransactionCard = ({ orderId, userId, orderPrice, orderStatus, orderPlaceTime, orderDeliveredDate, paidAmount, paymentStatus, paymentDate, cardHeight }) => {

  return (
    <div className={`w-full xs:w-[250px] 566px:w-[48%] sm:w-64 mx-auto 566px:mx-0 sm:mx-auto 734px:mx-0 ${cardHeight || 'h-[300px]'} p-3 border-2 border-slate-400 flex flex-col justify-center gap-2 rounded-lg shadow-slate-500 hover:shadow-sm`}>

      <h2 className='uppercase font-semibold mb-2 text-base dark:text-slate-200'>order id {orderId}</h2>

      {userId && <p className='capitalize text-sm text-gray-600 dark:text-slate-400'>User ID: {userId}</p>}

      <p className='capitalize text-sm text-gray-600 dark:text-slate-400'>price: ₹{orderPrice}</p>
      <p className='capitalize text-sm text-gray-600 dark:text-slate-400'>order status: {orderStatus}</p>

      <p className='capitalize text-sm text-gray-600 dark:text-slate-400'>payment status: {paymentStatus}</p>

      {paidAmount && <p className='capitalize text-sm text-gray-600 dark:text-slate-400'>paid amount: {paidAmount}</p>}

      <p className='capitalize text-sm text-gray-600 dark:text-slate-400'>order placed: {dateAndTimeFormatter(orderPlaceTime, "date")}</p>

      {orderDeliveredDate && <p className='capitalize text-sm text-gray-600 dark:text-slate-400'>delivery date: {dateAndTimeFormatter(orderDeliveredDate, "date")}</p>}

      {paymentDate && <p className='capitalize text-sm text-gray-600 dark:text-slate-400'>Payment Date: {(paymentDate !== "undefined" && paymentDate !== undefined) ? dateAndTimeFormatter(paymentDate, "date") : paymentDate}</p>}

    </div>
  )
}
