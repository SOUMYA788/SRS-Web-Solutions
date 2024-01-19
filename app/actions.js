"use server"

import dbConnection from "@/middleware/dbConnection";
import OrderModel from "@/models/orders.model";


/**
 * used in userOrderForm to get and process data from a form.
 * @param {String} userId for user reference in database
 * @param {String} orderId for filter purpose in database
 * @param {Number} orderPrice Order Price Value in Integer
 * @param {String} orderStatus accept only pending || delivered || cancelled
 * @param {String} deliverWithin e.g. 30 Days
 * @param {String} orderDeliveredDate 01-jan-2023
 * @returns {Object} Update or Added Status
 */
export const updateUserOrder = async (userId, orderId, orderPrice, orderStatus, orderDeliveredDate, paymentStatus, paymentDateTime) => {

    try {

        // Varify User Id
        if (!userId) {
            throw new Error("Invalid User ID")
        }

        if (
            (!orderId && !parseInt(orderPrice)) ||
            (orderId && (orderPrice !== "" && !parseInt(orderPrice)))
        ) {
            throw new Error("Invalid Order Price")
        }

        if (!["pending", "delivered", "cancelled", ""].includes(orderStatus.toLowerCase().trim())) {
            throw new Error("Invalid Status")
        }

        // Varify order payment status: 
        if (!["paid", "unpaid", ""].includes(paymentStatus.toLowerCase().trim())) {
            //if (order id && !status) result is "unpaid" else change if present.
            throw new Error("Invalid Payment Status")
        }


        const newRawFormData = {
            user: userId,
            orderPrice: parseInt(orderPrice),
            paymentStatus: paymentStatus.toLowerCase().trim() === "" ? "unpaid" : paymentStatus,
            orderStatus: orderStatus.toLowerCase().trim() === "" ? "pending" : orderStatus,
            orderDeliveredDate,
            paymentDateTime,
        }

        const updatedRawFormData = {}

        if (parseInt(orderPrice)) { updatedRawFormData.orderPrice = parseInt(orderPrice) }

        if (paymentStatus.trim() !== "") { updatedRawFormData.paymentStatus = paymentStatus.toLowerCase() }

        if (orderStatus.trim() !== "") { updatedRawFormData.orderStatus = orderStatus.toLowerCase() }

        if (orderDeliveredDate.trim() !== "") { updatedRawFormData.orderDeliveredDate = orderDeliveredDate }

        if (paymentDateTime.trim() !== "") { 
            updatedRawFormData.paymentDateTime = paymentDateTime 
        }



        await dbConnection()

        if (orderId && orderId!=="") {

            const updatedOrder = await OrderModel.findByIdAndUpdate(
                { _id: orderId },
                { $set: updatedRawFormData },
                { runValidators: false },
                { new: true }
            );

            // we will proceed if user is not exist in database...
            if (!updatedOrder) {
                throw new Error("Faild to update order")
            }

            const updatedOrderArr = await OrderModel.find();

            return JSON.stringify({
                success: true,
                message: "Order Updated Succesfully",
                currentData: updatedOrder,
                allData: updatedOrderArr,
            })

        } else {
            const newOrder = new OrderModel(newRawFormData)
            const savedOrder = await newOrder.save();

            if (!savedOrder) { throw new Error("Faild to save the new order") }

            const updatedOrderArr = await OrderModel.find();

            return JSON.stringify({
                success: true,
                message: "Order Added Succesfully",
                currentData: newOrder,
                allData: updatedOrderArr
            })
        }
    } catch (error) {
        console.log("\n\n⚠⚠ ERROR FROM ACTION UPDATE_ORDER ⚠⚠\n", error.message, "\n\n");
        return JSON.stringify({
            success: false,
            message: error.message || "Order faild to Update or Added",
            data: null
        })
    }
}