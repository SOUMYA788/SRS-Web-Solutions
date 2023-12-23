"use client"
import React, { useState, useEffect } from 'react'
import { OrderCards } from './cards/OrderCards';
import { dateAndTimeFormatter } from '@/utils/dateAndTimeFormatter';
import { BorderContainerStyle1 } from './BorderContainer';

export const Orders = ({ orders }) => {

    // this card or component used in
    // - users dashboard/orders,
    // - admin -> user's list -> perticular user's orders details...

    /*
        // order related data will come here, not included payment related data they will store in another collection

        // orderId, orderPrice, orderStatus, orderPlaced, orderDeliver

        // card details looks like...
        // order id #05500
        // order price: ₹500
        // order status -> pending/delivered/cancelled/
        // 
        // Order Placed: 01.04.2022
        // Estimated Time: 30 Days || Order Delivered: 31.04.2022
    */

    const [filter, setFilter] = useState("");

    const [ordersArray, setOrdersArray] = useState(orders)

    useEffect(() => {
        const filteredOrders = orders.filter(order => {
            const orderPlaceTime = dateAndTimeFormatter(order.createdAt)
            const orderEstimatedTime = dateAndTimeFormatter(order.orderCompletionEstimatedTime)
            const orderDeliveredTime = dateAndTimeFormatter(order.orderDeliveredTime)

            if (order.orderId === filter || order.orderPrice === filter || order.orderStatus === filter || orderPlaceTime.contains(filter) || orderEstimatedTime.contains(filter) || orderDeliveredTime.contains(filter)) {
                return true;
            } else return false;
        })

        setOrdersArray(filteredOrders);
    }, [filter])


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
                        <OrderCards key={`orderNumber_${orderIndex}`} order={order} />
                    )) : <p className="w-full text-center text-sm text-slate-500">Data Not Available</p>
                }
            </BorderContainerStyle1>

        </section>
    )
}
