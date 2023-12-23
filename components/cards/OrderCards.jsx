import { dateAndTimeFormatter } from '@/utils/dateAndTimeFormatter';
import React from 'react'

export const OrderCards = (order) => {
  const { orderId, orderPrice, orderStatus, createdAt, orderDelivered, orderDeliveredTime } = order;

  return (
    <div className='w-[200px] h-[220px] p-3 border-2 border-slate-400 flex flex-col justify-center gap-2 rounded-lg shadow-slate-500 hover:shadow-sm'>
      <h2 className='uppercase font-semibold mb-2 text-lg'>order id {orderId}</h2>
      <p className='capitalize text-sm text-gray-600'>order price: {orderPrice}</p>
      <p className='capitalize text-sm text-gray-600'>order placed: {createdAt}</p>
      <p className='capitalize text-sm text-gray-600'>order status: {orderStatus}</p>

      {orderDelivered && <p className='capitalize text-sm text-gray-600'>order delivered: {dateAndTimeFormatter(orderDeliveredTime)}</p>}
    </div>
  )
}
