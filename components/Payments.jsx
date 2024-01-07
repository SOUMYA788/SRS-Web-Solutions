"use client"
import { dateAndTimeFormatter } from '@/utils/dateAndTimeFormatter';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

const PaymentCardWrapper = ({ children }) => {
    return (
        <div className="w-40 h-40 flex flex-col items-center justify-center gap-5 rounded-md shadow-md text-gray-500 border border-slate-300 shadow-slate-400 tracking-wide">
            {children}
        </div>
    )
}

export const Payments = ({ payments }) => {

    const ordersArr = useSelector((state) => state?.order?.value)


    const [paymentsArray, setPaymentsArray] = useState(payments);
    const [paidAmount, setPaidAmount] = useState(0);
    const [unpaidAmount, setUnpaidAmount] = useState(0);


    useEffect(() => {

        if (ordersArr?.length > 0) {
            setPaymentsArray(ordersArr);
        }

    }, [ordersArr])


    useEffect(() => {

        setPaidAmount(0);
        setUnpaidAmount(0);

        const filterPaidArray = paymentsArray.filter(payments => payments?.paymentStatus?.toLowerCase() === "paid");

        filterPaidArray.forEach(obj => { setPaidAmount(parseInt(paidAmount) + parseInt(obj?.orderPrice)) });

        const filterUnPaidArray = paymentsArray.filter(payments => payments?.paymentStatus?.toLowerCase() === "unpaid");


        filterUnPaidArray.map((obj) => {
            setUnpaidAmount((value) => {
                return (value + obj?.orderPrice)
            })
        });

    }, [paymentsArray])



    return (

        <>
            <section className="w-full flex flex-row flex-wrap gap-5 items-center justify-between px-3">

                {/* <h2 className="text-center capitalize text-base"> We have to work on this</h2> */}

                {
                    !paymentsArray?.length > 0 && <div className="w-full">
                        <p className="w-full text-center capitalize text-sm text-slate-500"> No Data Available</p>
                    </div>
                }

                {
                    paymentsArray.length > 0 && <>

                        <PaymentCardWrapper>
                            <p className="text-base uppercase">RECEIVED</p>
                            <p className="text-lg">₹ {paidAmount}</p>
                        </PaymentCardWrapper>

                        <PaymentCardWrapper>
                            <p className="text-base uppercase">upcomming</p>
                            <p className="text-lg">₹ {unpaidAmount}</p>
                        </PaymentCardWrapper>

                        <PaymentCardWrapper>
                            <p className="text-base uppercase">total</p>
                            <p className="text-lg">₹ {parseInt(paidAmount) + parseInt(unpaidAmount)}</p>
                        </PaymentCardWrapper>
                    </>
                }

            </section>
        </>
    )
}