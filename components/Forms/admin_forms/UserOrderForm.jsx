"use client"
import React, { useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { useFormStatus } from "react-dom"
import { toast } from 'react-toastify'
import { showErrorToast, showSuccessToast } from '@/utils/showToast'

export const UserOrderForm = ({ formAction, fromAdmin, formWidth }) => {
    const [visibleForm, setVisibleForm] = useState(false);
    const [btnDisabled, SetBtnDisabled] = useState(false);
    const [formData, setFormData] = useState({
        orderId: "",
        orderPrice: "",
        orderStatus: "",
        deliverWithin: "",
        orderDeliveredDate: "",
        loginSecret: process.env.LOGIN_SECRET
    })

    const [formError, setFormError] = useState({
        error: null,
    })

    const toggleForm = (e) => {
        e.preventDefault();
        setVisibleForm((value) => !value)
    }

    const inputOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setFormError({
            ...formError,
            [e.target.name]: null
        })
    }


    const formSubmit = async (e) => {

        e.preventDefault();

        // varify order price...
        if (!parseInt(formData.orderPrice)) {
            setFormError({
                ...formError,
                orderPrice: "Invalid Price Value"
            })
            showErrorToast("Invalid Price Value");
            return
        }

        // varify order status...
        if (!["pending", "delivered", "cancelled"].includes(formData.orderStatus.toLowerCase())) {
            const errorMessage = "Invalid Order Status";
            setFormError({
                ...formError,
                orderStatus: errorMessage
            })
            showErrorToast(errorMessage);
            return
        }

        // varify deliverWithin
        const regex = /^[0-9]+\s[a-z]+/i
        if (!regex.test(formData.deliverWithin)) {
            const errorMessage = "Invalid Date";
            setFormError({
                ...formError,
                deliverWithin: errorMessage
            })
            showErrorToast(errorMessage);
            return
        }

        if (formData.orderDeliveredDate) {
            console.log("orderDeliveredData present there", formData.orderDeliveredDate.toString())
        } else {
            console.log("orderDeliveredData may be there", formData.orderDeliveredDate)
        }


        if (!formData.orderDeliveredDate.toString().includes("-") || formData.orderDeliveredDate.includes("()")) {

            const errorMessage = "Invalid Date";
            setFormError({
                ...formError,
                orderStatus: errorMessage
            })
            showErrorToast(errorMessage);
            return
        }

        // All Varifications are done...
        // UPLOAD LOGIN SECRET IN API, WHICH IS MUST...

        console.log("\n\nformData from Order Form\n", formData, '\n\n');
        if (formData.orderId) {
            const response = await fetch("/api/orders/update", {
                method: "POST",
                body: JSON.stringify(formData)
            })

            const responseData = await response.json();

            if (!response.ok) {
                showErrorToast(responseData.message);
            }

            showSuccessToast(responseData.message);

        } else {
            const response = await fetch("/api/orders/add", {
                method: "POST",
                body: JSON.stringify(formData)
            })

            const responseData = await response.json();

            if (!response.ok) {
                showErrorToast(responseData.message);
            } else {
                showSuccessToast(responseData.message);
            }
        }
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

            {/* action={formAction} */}
            <form onSubmit={formSubmit} className={`${formWidth || "w-full"} ${visibleForm ? "" : "hidden"} text-slate-800 px-3 py-4 border-2 border-gray-500 rounded-sm mt-3`} >
                <input type="text" name="orderId" placeholder="order id - for update purpose" value={formData.orderId} onChange={inputOnChange} className={`w-full mb-2 p-3 text-sm placeholder:text-slate-500 border-2 border-gray-400 bg-transparent rounded-md outline-none ${formError?.orderId ? "border-red-500 text-red-500" : ""} focus:border-gray-500`} />

                <input type="text" name="orderPrice" placeholder="order amount in INR" value={formData.orderPrice} onChange={inputOnChange} className={`w-full my-2 p-3 text-sm placeholder:text-slate-500 border-2 border-gray-400 bg-transparent rounded-md outline-none ${formError?.orderPrice ? "border-red-500 text-red-500" : ""} focus:border-gray-500`} required={true} />

                <input type="text" name="orderStatus" placeholder="status: PENDING, DELIVERED, or CANCELLED" value={formData.orderStatus} onChange={inputOnChange} className={`w-full my-2 p-3 text-sm placeholder:text-slate-500 border-2 border-gray-400 bg-transparent rounded-md outline-none ${formError?.orderStatus ? "border-red-500 text-red-500" : ""} focus:border-gray-500`} required />

                <input type="text" name="deliverWithin" placeholder="Order Deliver Within" value={formData.deliverWithin} onChange={inputOnChange} className={`w-full my-2 p-3 text-sm placeholder:text-slate-500 border-2 border-gray-400 bg-transparent rounded-md outline-none ${formError?.deliverWithin ? "border-red-500 text-red-500" : ""} focus:border-gray-500`} required />

                <input type="date" name="orderDeliveredDate" placeholder="Date of Delivery" value={formData.orderDeliveredDate} onChange={inputOnChange} className={`w-full my-2 p-3 text-sm border-2 border-gray-400 bg-transparent rounded-md outline-none focus:border-gray-500`} required />


                <button type="submit" className="w-full text-xs text-slate-700 placeholder:text-slate-700 border border-blue-500 mx-auto mt-4 px-4 py-2 uppercase outline-none hover:border-blue-700 rounded-sm tracking-wide focus:border-blue-700 focus:rounded-full focus:bg-blue-500 focus:text-white transition-all disabled:opacity-70">
                    Update Now
                </button>
            </form>
        </>
    )
}
