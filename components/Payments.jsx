"use client"
import { dateAndTimeFormatter } from '@/utils/dateAndTimeFormatter';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

export const Payments = ({ payments }) => {

    const ordersArr = useSelector((state) => state?.order?.value)

    const [filter, setFilter] = useState("");

    const [paymentsArray, setPaymentsArray] = useState(payments)



    useEffect(() => {
        const filteredPayments = paymentsArray.filter(payment => {
            const orderPlaceTime = dateAndTimeFormatter(payment.createdAt)
            const paymentLastDate = dateAndTimeFormatter(payment.paymentLastDate)

            return (
                payment.paymentId === filter ||
                payment.paidAmount === filter ||
                payment.paymentStatus === filter ||
                orderPlaceTime.includes(filter) ||
                paymentLastDate.includes(filter)
            )
        })

        setPaymentsArray(filteredPayments);
    }, [filter])


    return (

        <>
            <nav className="w-full flex flex-row justify-between items-center gap-3">
                <h2 className="mb-1 capitalize text-2xl font-semibold text-slate-700"> payments </h2>
                <input type="search" name="searchOrders" placeholder="search previous payments by id, price, or status" value={filter} onChange={(e) => setFilter(e.target.value)} className="outline-none w-full md:w-60 border-2 focus:border-blue-500 hover:border-blue-500 rounded-md" />
            </nav>
            <section className="w-full">
                {/* current orders */}
                <h2 className="mb-1 capitalize text-2xl font-semibold text-slate-700">{filter ? "Available Payments" : "All Payments"}</h2>
                <div className="w-full flex flex-row flex-wrap gap-5 items-center">
                    {
                        !paymentsArray?.length > 0 && <div className="w-full">
                            <h2 className="text-center capitalize text-xl"> No Such Orders Available Right Now</h2>
                        </div>
                    }

                    {
                        paymentsArray?.length > 0 && paymentsArray.map((payment, paymentIndex) => (
                            <div key={`orderNumber_${paymentIndex}`} className="w-full sm:w-1/2 lg:w-[300px] xl:w-1/4 bg-slate-200 border-2 border-slate-700">
                                <h2 className="text-base text-slate-400">{payment.paymentId}</h2>
                                <p className="text-sm text-slate-400">order ref: {payment.orderId}</p>
                                <p className="text-sm text-slate-400">amount: {payment.paidAmount}</p>
                                <p className="text-sm text-slate-400">status: {payment.paymentStatus}</p>
                                <p className="text-sm text-slate-400">last date: {payment.paymentLastDate}</p>

                            </div>
                        ))
                    }
                </div>

            </section>
        </>
    )
}