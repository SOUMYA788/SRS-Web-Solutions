"use client"
import React, { useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { CustomInputType1 } from '@/components/FormElements/CustomInput';
import { CustomButton } from '@/components/FormElements/CustomButton';
import { showErrorToast, showSuccessToast } from '@/utils/showToast';
import { updateUserOrder } from '@/app/actions';
import { useDispatch } from 'react-redux';
import { updateOrder } from '@/Redux/slices/userOrdersSlice';



export const UserOrderForm = ({ fromAdmin, formWidth, userId }) => {
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
        userId: userId || "",
        orderId: "",
        orderPrice: "",
        orderStatus: "",
        orderDeliveredDate: "",
        paymentStatus: "",
        paymentDateTime: "undefined",
    })

    const [formError, setFormError] = useState({ error: false, })

    const [formProcessing, setFormProcessing] = useState(false);

    const [visibleForm, setVisibleForm] = useState(false);

    // function to show and hide the form
    const toggleForm = (e) => {
        e.preventDefault();
        setVisibleForm((value) => !value)
    }

    const inputOnChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });

        setFormError({
            ...formError,
            error: false,
            [e.target.name]: null
        });
    }


    const btnSubmit = async (e) => {

        e.preventDefault();

        setFormProcessing(true); // Form processing start...

        // submit logic...
        try {

            const { userId, orderId, orderPrice, orderStatus, orderDeliveredDate, paymentStatus, paymentDateTime } = formState;


            // Varify User Id
            if (!userId) {
                setFormError({
                    ...formError,
                    error: true,
                    userId: "Invalid User ID"
                });

                throw new Error("Invalid User ID")
            }

            // Varify order price input
            if (
                (!orderId && !parseInt(orderPrice)) ||
                (orderId && (orderPrice !== "" && !parseInt(orderPrice)))
            ) {
                setFormError({
                    ...formError,
                    error: true,
                    orderPrice: null
                });

                throw new Error("Invalid Order Price")
            }

            // Varify order status input
            if (!["pending", "delivered", "cancelled", ""]?.includes(orderStatus.toLowerCase().trim())) {
                throw new Error("Invalid Status")
            }

            // Varify order payment status
            if (!["paid", "unpaid", ""]?.includes(paymentStatus.toLowerCase().trim())) {
                throw new Error("Invalid Payment Status")
            }

            // Delivered Date, and payment dateTime no need varification, form provides tamplate to fill that area.

            const stringifyOrderInfo = await updateUserOrder(userId, orderId, orderPrice, orderStatus, orderDeliveredDate, paymentStatus, paymentDateTime)

            const orderInfo = JSON.parse(stringifyOrderInfo);

            if (orderInfo?.success) {
                showSuccessToast(orderInfo?.message);
                dispatch(updateOrder(orderInfo.allData));
            } else {
                showErrorToast(orderInfo?.message);
            }

        } catch (error) {
            showErrorToast(error?.message || "Invalid Order Form Submit");
        } finally {
            setFormProcessing(false); // form processing end...            
        }
    }


    return (
        <>
            {
                fromAdmin && <div className="w-full flex flex-row flex-wrap justify-between items-center gap-3 mb-3">
                    <h2 className="text-lg font-semibold tracking-wide text-slate-700 dark:text-slate-400 uppercase">
                        order details
                    </h2>

                    <button type="button" className="text-2xl text-center border-2 outline-none focus:border-blue-500 hover:border-blue-500 dark:border-slate-400 dark:focus:border-slate-300 rounded-md p-1" onClick={toggleForm}>
                        <BiPencil className="text-blue-500" />
                    </button>
                </div>
            }

            <form className={`${formWidth || "w-full"} ${visibleForm ? "" : "hidden"} text-slate-800 px-3 py-4 border-2 border-gray-500 rounded-sm mt-3 flex flex-col gap-5 justify-center`} >

                <CustomInputType1 inputType="text" inputName="orderId" inputPlaceHolder="order id - for update purpose" inputValue={formState.orderId} inputOnChange={inputOnChange} inputError={formError?.orderId} inputRequired={false} />

                <CustomInputType1 inputType="text" inputName="orderPrice" inputPlaceHolder="order amount in INR" inputValue={formState.orderPrice} inputOnChange={inputOnChange} inputError={formError?.orderPrice} inputRequired={true} />

                <CustomInputType1 inputType="text" inputName="orderStatus" inputPlaceHolder="status: PENDING | DELIVERED | CANCELLED" inputValue={formState.orderStatus} inputOnChange={inputOnChange} inputError={formError?.orderStatus} inputRequired={false} />

                <CustomInputType1 inputType="date" inputName="orderDeliveredDate" inputPlaceHolder="Date of Delivery" inputValue={formState.orderDeliveredDate} inputOnChange={inputOnChange} inputError={formError?.orderDeliveredDate} inputRequired={true} inputLabel="Date of Delivery" />

                <CustomInputType1 inputType="text" inputName="paymentStatus" inputPlaceHolder="Payment Status: paid | unpaid" inputValue={formState.paymentStatus} inputOnChange={inputOnChange} inputError={formError?.paymentStatus} inputRequired={false} />

                {/* No Varification need for this, it provide pre-defined date and time format, no one can bypass it, also we use server action that's why no one can hit that req except admin. */}

                <CustomInputType1 inputType="datetime-local" inputName="paymentDateTime" inputPlaceHolder="01-Jan-2024 05:30 AM" inputValue={formState.paymentDateTime} inputOnChange={inputOnChange} inputError={formError?.paymentDateTime} inputRequired={false} inputLabel="Payment Date and Time" />


                <CustomButton btnType="submit" btnOnClick={btnSubmit} btnDisabled={formProcessing} formProcessing={formProcessing} btnName={formState.orderId ? "Update" : "Add"} />

            </form>
        </>
    )
}