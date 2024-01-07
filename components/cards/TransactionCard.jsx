import { dateAndTimeFormatter } from '@/utils/dateAndTimeFormatter';
import React from 'react'

export const TransactionCard = ({ orderId, userId, orderPrice, orderStatus, orderPlaceTime, orderDeliveredDate, paidAmount, paymentStatus, paymentDate, cardHeight }) => {

  return (
    <div className={`w-[250px] ${cardHeight || 'h-[300px]'} p-3 border-2 border-slate-400 flex flex-col justify-center gap-2 rounded-lg shadow-slate-500 hover:shadow-sm`}>


      <h2 className='uppercase font-semibold mb-2 text-base'>order id {orderId}</h2>

      {userId && <p className='capitalize text-sm text-gray-600'>User ID: {userId}</p>}

      <p className='capitalize text-sm text-gray-600'>price: ₹{orderPrice}</p>
      <p className='capitalize text-sm text-gray-600'>order status: {orderStatus}</p>

      <p className='capitalize text-sm text-gray-600'>payment status: {paymentStatus}</p>

      {paidAmount && <p className='capitalize text-sm text-gray-600'>paid amount: {paidAmount}</p>}

      <p className='capitalize text-sm text-gray-600'>order placed: {dateAndTimeFormatter(orderPlaceTime, "date")}</p>

      {orderDeliveredDate && <p className='capitalize text-sm text-gray-600'>delivery date: {dateAndTimeFormatter(orderDeliveredDate, "date")}</p>}

      {paymentDate && <p className='capitalize text-sm text-gray-600'>Payment Date: {(paymentDate !== "undefined" && paymentDate !== undefined) ? dateAndTimeFormatter(paymentDate, "date") : paymentDate}</p>}

    </div>
  )
}
