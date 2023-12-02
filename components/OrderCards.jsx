"use client"
import React from 'react'
import CustomButton from './FormElements/CustomButton'

const OrderCards = ({ orderId, orderPrice, orderStatus, orderPlaced, orderDeliver }) => {
    // card details looks like...
    // order id #05500
    // order price: ₹500
    // order pending
    // Order Placed: 01.04.2022
    // Estimated Time: 30 Days || Order Delivered: 31.04.2022

    const cancelOrder = (orderId) => {
        console.log("this is incomplete");
        console.log("order id is", orderId);
    }

    return (
        <div className='w-[200px] h-[220px] p-3 border-2 border-slate-400 flex flex-col justify-center gap-2 rounded-lg shadow-slate-500 hover:shadow-sm'>

            <h2 className='uppercase font-semibold mb-2 text-lg'>order id {orderId}</h2>
            <p className='capitalize text-sm text-gray-600'>{orderPrice} </p>
            <p className='capitalize text-sm text-gray-600'>{orderStatus}</p>
            <p className='capitalize text-sm text-gray-600'>{orderPlaced}</p>
            <p className='capitalize text-sm text-gray-600'>{orderDeliver}</p>

            <CustomButton btnType="button" btnName="cancel" btnColor="bg-red-500" btnDisabled={false} btnOnClick={(e) => {
                e.preventDefault();
                cancelOrder(orderId)
            }} />

        </div>
    )
}

export default OrderCards