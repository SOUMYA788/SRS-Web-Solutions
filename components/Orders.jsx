"use client"

import React, { useState, useEffect } from 'react'
import { TransactionCard } from './cards/TransactionCard';
import { dateAndTimeFormatter } from '@/utils/dateAndTimeFormatter';
import { BorderContainerStyle1 } from './BorderContainer';
import { useSelector } from 'react-redux';

export const Orders = ({ orders }) => {

    const ordersArr = useSelector((state) => state?.order?.value)

    const [filter, setFilter] = useState("");

    const [ordersArray, setOrdersArray] = useState(orders)

    useEffect(() => {

        if (filter) {

            const filteredOrders = ordersArray.filter(order => {
                const orderPlaceTime = dateAndTimeFormatter(order.createdAt, "date")
                const orderEstimatedTime = dateAndTimeFormatter(order.orderCompletionEstimatedTime, "date")
                const orderDeliveredTime = dateAndTimeFormatter(order.orderDeliveredTime, "date")

                return (
                    order.orderId === filter ||
                    order.orderPrice === filter ||
                    order.orderStatus === filter ||
                    orderPlaceTime?.includes(filter) ||
                    orderEstimatedTime?.includes(filter) ||
                    orderDeliveredTime?.includes(filter)
                );
            })

            setOrdersArray(filteredOrders);
        }

        if (ordersArr?.length > 0 || (ordersArr?.length > 0 && !filter)) { 
            setOrdersArray(ordersArr) 
        }

    }, [ordersArr, filter])



    return (
        <section className="w-full">

            <div className="w-full flex flex-row flex-wrap justify-between items-center gap-3 mb-2">
                <h2 className="text-base font-semibold tracking-wide text-slate-700 uppercase">{filter ? "Available Orders" : "All Orders"}</h2>

                <input type="search" name="searchOrders" placeholder="search orders" value={filter} onChange={(e) => setFilter(e.target.value)} className="text-sm outline-none w-full md:w-60 p-2 bg-blue-100 text-blue-500 border-2 border-blue-300 focus:border-blue-500 hover:border-blue-500 transition-colors placeholder:text-blue-400 rounded-md" />
            </div>

            {/* current orders */}

            <BorderContainerStyle1>
                {
                    ordersArray?.length > 0 ? ordersArray.map((order, orderIndex) => (
                        <TransactionCard orderId={order?._id} orderPrice={order?.orderPrice} orderStatus={order?.orderStatus} orderPlaceTime={order?.createdAt} deliverWithin={order?.deliverWithin} orderDeliveredDate={order?.orderDeliveredDate} paidAmount={order?.paidAmount} paymentStatus={order?.paymentStatus} paymentDate={order?.paymentDateTime} key={`orderNumber_${orderIndex}`}/>
                    )) : <p className="w-full text-center text-sm text-slate-500">Data Not Available</p>
                }
            </BorderContainerStyle1>

        </section>
    )
}
