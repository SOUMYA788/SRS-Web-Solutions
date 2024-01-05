import { dateAndTimeFormatter } from '@/utils/dateAndTimeFormatter';
import React from 'react'

export const OrderCards = ({order}) => {
  const { _id, orderPrice, orderStatus, deliverWithin, createdAt, orderDelivered, orderDeliveredDate } = order;

  return (
    <div className='w-[250px] h-[250px] p-3 border-2 border-slate-400 flex flex-col justify-center gap-2 rounded-lg shadow-slate-500 hover:shadow-sm'>
      <h2 className='uppercase font-semibold mb-2 text-base'>order id {_id}</h2>
      <p className='capitalize text-sm text-gray-600'>price: ₹{orderPrice}</p>
      <p className='capitalize text-sm text-gray-600'>status: {orderStatus}</p>
      <p className='capitalize text-sm text-gray-600'>deliver within: {deliverWithin}</p>
      <p className='capitalize text-sm text-gray-600'>order placed: {dateAndTimeFormatter(createdAt)}</p>

      <p className='capitalize text-sm text-gray-600'>delivery date: {dateAndTimeFormatter(orderDeliveredDate)}</p>
    </div>
  )
}
