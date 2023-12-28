"use client"
import React, { useState, useEffect } from 'react'
import { BiPencil } from 'react-icons/bi'
import { useFormStatus, useFormState } from "react-dom"
import { showErrorToast, showSuccessToast } from '@/utils/showToast';
import { updateUserOrder } from '@/app/actions';

const SubmitBtn = () => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className="w-full text-xs text-slate-700 placeholder:text-slate-700 border border-blue-500 mx-auto mt-4 px-4 py-2 uppercase outline-none hover:border-blue-700 rounded-sm tracking-wide focus:border-blue-700 focus:rounded-full focus:bg-blue-500 focus:text-white transition-all disabled:border-red-500">
            {pending ? "processing..." : "Update Now"}
        </button>
    )

}


const formStateInfo = {
    message: "no form submitted in this session yet"
}

export const UserOrderForm = ({ fromAdmin, formWidth }) => {

    const [formState, formAction] = useFormState(updateUserOrder, formStateInfo)
    const [visibleForm, setVisibleForm] = useState(false);

    // function to show and hide the form
    const toggleForm = (e) => {
        e.preventDefault();
        setVisibleForm((value) => !value)
    }


    return (
        <>
            {
                fromAdmin && <div className="w-full flex flex-row flex-wrap justify-between items-center gap-3 mb-3">
                    <h2 className="text-lg font-semibold tracking-wide text-slate-700 uppercase">
                        order details
                    </h2>

                    <button type="button" className="text-2xl text-center border-2 outline-none focus:border-blue-500 hover:border-blue-500 rounded-md p-1" onClick={toggleForm}>
                        <BiPencil className="text-blue-500" />
                    </button>
                </div>
            }

            <form action={formAction} className={`${formWidth || "w-full"} ${visibleForm ? "" : "hidden"} text-slate-800 px-3 py-4 border-2 border-gray-500 rounded-sm mt-3`} >
                <input type="text" name="orderId" placeholder="order id - for update purpose" className={`w-full mb-2 p-3 text-sm placeholder:text-slate-500 border-2 border-gray-400 bg-transparent rounded-md outline-none focus:border-gray-500`} />

                <input type="text" name="orderPrice" placeholder="order amount in INR" className={`w-full my-2 p-3 text-sm placeholder:text-slate-500 border-2 border-gray-400 bg-transparent rounded-md outline-none focus:border-gray-500`} required={true} />

                <input type="text" name="orderStatus" placeholder="status: PENDING, DELIVERED, or CANCELLED" className={`w-full my-2 p-3 text-sm placeholder:text-slate-500 border-2 border-gray-400 bg-transparent rounded-md outline-none focus:border-gray-500`} required />

                <input type="text" name="deliverWithin" placeholder="Order Deliver Within" className={`w-full my-2 p-3 text-sm placeholder:text-slate-500 border-2 border-gray-400 bg-transparent rounded-md outline-none focus:border-gray-500`} required />

                <input type="date" name="orderDeliveredDate" placeholder="Date of Delivery" className={`w-full my-2 p-3 text-sm border-2 border-gray-400 bg-transparent rounded-md outline-none focus:border-gray-500`} required />
                <SubmitBtn />

                <p className="mt-4 text-sm capitalize text-center">{formState?.message}</p>
            </form>
        </>
    )
}
